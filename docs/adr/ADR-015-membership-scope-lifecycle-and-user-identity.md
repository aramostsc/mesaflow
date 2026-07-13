# ADR-015 - Membership Scope, Lifecycle and User Identity

**Status:** Accepted
**Date:** 2026-07-12
**Owner:** Software Architecture
**Task:** `ENG-S1-001`
**References:** `FEAT-001-005`, `US-001-005`, `AC-001-028`, `BR-001-011`, `BR-016-034`, `ADR-005`, `ADR-009`, `ADR-010`, `ADR-011`

## Context

`ENG-S1-001` introduces the first product persistence for Tenant, Establishment, User and Membership. Independent review found that the existing documents did not fully settle whether Membership is tenant- or establishment-scoped, how access revocation preserves attribution, how staff email is canonicalized, which migration elements are owned by Drizzle schema, or how the first product migration is recovered.

The MVP exposes one establishment but the architecture must not make Tenant and Establishment permanently identical. Authentication remains behind `AuthPort`; application-owned User, Membership, roles and future capabilities remain separate from provider identity.

## Decision 1: Membership is tenant-level

Choose **Option C: tenant-level Membership with a separate establishment assignment only when required**.

Membership represents one User's access relationship with one Tenant. Its required ownership columns are `tenant_id` and `user_id`; it does not contain `establishment_id` in `ENG-S1-001`.

For the one-establishment MVP, authorized request context resolves the establishment from server-owned Tenant data after resolving an active Membership. `Staff` in the MVP operates that establishment, while `Administrator` retains tenant-level administrative responsibility. This does not expose multi-establishment administration in the product.

If validated multi-establishment requirements later need per-establishment access, a separate assignment relation will link Membership to Establishment. That relation must carry or validate Tenant ownership, use RLS, and be introduced by its own reviewed task and migration.

### Options considered

- **A - establishment required:** simple for the current UI, but duplicates memberships for multi-establishment users and silently makes a tenant access relationship location-specific. Rejected.
- **B - optional establishment:** avoids immediate extra tables but gives `NULL` overloaded meaning and complicates uniqueness, authorization and role semantics. Rejected.
- **C - tenant Membership plus future assignment:** clean separation and simplest current model; selected.
- **D - other:** no superior option identified.

### Consequences

Positive:

- matches the canonical `Tenant -> Membership` relationship;
- keeps tenant isolation and role resolution simple;
- avoids nullable scope and destructive redesign when multi-establishment is validated;
- does not introduce a premature assignment entity.

Negative:

- `ENG-S1-002` must resolve the MVP establishment separately after resolving Membership;
- per-establishment access cannot be expressed until an assignment task is approved.

## Decision 2: Membership uses active/revoked lifecycle

Choose **Option B: explicit `active` / `revoked` status**.

Membership includes:

- `status`, restricted to `active` or `revoked`;
- `revoked_at`, nullable only while active;
- a database check requiring `active -> revoked_at IS NULL` and `revoked -> revoked_at IS NOT NULL`.

A new Membership is active. Revocation updates the existing row to revoked and sets `revoked_at` in one transaction. The application role receives no Membership `DELETE` privilege. `revoked_by_user_id` and reason are deferred to the append-only Audit Event/use case because actor attribution must be transactional and must not create a circular identity lifecycle in this foundational schema.

A revoked row is not reactivated. Readmission creates a new active Membership so access periods remain distinguishable. A partial unique index permits at most one active Membership for `(tenant_id, user_id)` while allowing historical revoked rows. Roles remain exactly `Administrator` and `Staff`; capabilities remain a later task.

### Options considered

- **A - physical delete:** rejected because Audit Event does not yet exist and deletion would erase the current attribution link.
- **B - active/revoked:** selected as the smallest explicit lifecycle that supports removal and history.
- **C - general temporal validity:** rejected as unnecessary MVP complexity.
- **D - absolute immutability:** rejected because staff removal is approved behavior.
- **E - other:** no superior option identified.

### Consequences

Revoked memberships are excluded from authorization. Session revocation remains the responsibility of `ENG-S1-011`/provider behavior, while `ENG-S1-002` must reject revoked Membership immediately. Future Audit Event work records actor, reason and correlation without changing this lifecycle.

## Decision 3: Store one canonical email

Email normalization is mandatory in `ENG-S1-001`.

- Store one canonical value in `users.email`.
- Application input is trimmed and lowercased before persistence.
- Database constraints require `email = lower(btrim(email))` and non-empty content.
- A normal unique constraint on canonical `email` enforces logical uniqueness.
- Basic email syntax and provider verification remain application/provider responsibilities; PostgreSQL does not attempt complete email validation.
- Display-case preservation is not required for the MVP. A separate display email may be added only with a demonstrated UX need.

Alternatives rejected:

- `citext` adds an extension while still needing trimming rules;
- an expression-only unique index protects uniqueness but allows non-canonical stored values;
- application-only normalization is too easy to bypass in fixtures, scripts and migrations;
- a second canonical column duplicates meaning without current value.

Provider subject mapping remains behind the adapter work in `ENG-S1-011`; email must not silently become a provider-stable identifier. `ENG-S1-002` may rely on a reviewed application/provider mapping, not mutable email alone.

## Decision 4: Constraint source of truth

`drizzle/schema.ts` is the source of truth for every element Drizzle can represent reliably:

- types and enums;
- `NOT NULL` and defaults;
- primary, unique and foreign keys;
- representable `CHECK` constraints;
- indexes, including supported partial/expression indexes.

Reviewed manual SQL is limited to PostgreSQL behavior not represented reliably by the selected Drizzle version:

- roles and role attributes;
- grants and privilege revocations;
- `ENABLE/FORCE ROW LEVEL SECURITY`;
- policies;
- deliberately unsupported advanced PostgreSQL features.

Every manual block must be adjacent to the generated migration, explained in review, and covered by real PostgreSQL tests. Future `db:generate` output must be reviewed against both the prior snapshot and manual SQL. `db:ci`, `drizzle-kit check`, clean bootstrap and security tests are mandatory drift gates. A generated migration must never silently remove or replace manual security SQL.

## Decision 5: Migration recovery is forward-only after publication

### Before production or publication

While migration `0003` is uncommitted and unapplied outside disposable local/test databases, it may be corrected and regenerated. Local/test databases must be reset and the full migration chain rehearsed after every change.

### After merge but before real data

An applied migration is not edited. Corrections use a new forward-fix migration. A release may be rolled back at the application layer only when the prior application is compatible with the expanded schema. Database restore is reserved for failed deployment or corruption where forward-fix is unsafe.

### After real data exists

- never edit or delete an applied migration;
- use forward-only expand/migrate/contract changes;
- take and verify backups before destructive or contract phases;
- prefer idempotent data backfills with explicit verification;
- use point-in-time/database restore only under the operational recovery runbook;
- treat partial migration failure as a deployment stop, inspect transaction state, then apply a reviewed forward-fix or restore.

Automatic down migrations are not used. Reversal is an explicit reviewed migration or verified restore because automatic downs can destroy identity and authorization history.

## Security implications

- Membership and any future assignment are tenant-owned and subject to transaction-local default-deny RLS.
- Revoked Membership never authorizes access.
- No client-supplied tenant or establishment identifier establishes context.
- The application role cannot delete Membership history.
- Global User remains inaccessible through unrestricted tenant queries.
- Foreign-key and uniqueness failures must not be exposed as raw public API errors; future application errors normalize them.

## Implementation impact

`ENG-S1-001` correction must:

- remove `establishment_id` and its composite FK from Membership;
- add lifecycle status, `revoked_at`, consistency check and active-only uniqueness;
- add canonical email checks;
- move representable checks into `drizzle/schema.ts`;
- update migration `0003` while it remains unpublished;
- update fixtures and positive/negative tests for tenant-level scope, revocation, readmission and canonical email;
- align `DOMAIN_MODEL.md`, `DATA_ARCHITECTURE.md`, `MULTI_TENANCY.md`, `AUTHORIZATION_MODEL.md` and operational docs;
- document this migration recovery decision in the engineering handoff.

No assignment table, provider adapter, session resolution, capability matrix, invitation flow, Audit Event, API or UI is added by this correction.

## Impact on following tasks

- `ENG-S1-011`: maps managed identity behind `AuthPort`; does not own tenant/role truth and must not use email as immutable provider identity.
- `ENG-S1-002`: resolves an active tenant Membership, rejects revoked rows, then derives the establishment server-side for the one-establishment MVP.
- Capabilities: map from the active Membership role; no custom roles are introduced.
- Invitations: create or connect User and create one active Membership; readmission creates a new row.
- Audit Event: records invite/revoke actor, reason and correlation; it supplements rather than replaces Membership lifecycle history.
- Multi-establishment: requires a separately approved Membership-to-Establishment assignment model and product experience.

## Review conditions

Review this ADR only if Product approves multi-establishment administration, multiple simultaneous establishment contexts, role semantics beyond Administrator/Staff, legal deletion requirements, or a managed identity constraint that cannot remain behind `AuthPort`.
