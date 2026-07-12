# MesaFlow — Engineering Task Template and Initial Tasks

## Task template

- **ID**
- **Title**
- **Origin documents and IDs**
- **Operational outcome**
- **Scope**
- **Non-goals**
- **Primary agent**
- **Reviewers**
- **Dependencies**
- **Likely files/areas**
- **Technical acceptance criteria**
- **Tests**
- **Documentation updates**
- **Risk**
- **Initial status**

## A0 canonical task list

The canonical A0 sprint task list is `ENG-A0-001` through `ENG-A0-010` as maintained in `TECHNICAL_BACKLOG.md`.

| ID | Title |
|---|---|
| ENG-A0-001 | Scaffold strict TypeScript/Next.js repository |
| ENG-A0-002 | Establish PostgreSQL local/test environment |
| ENG-A0-003 | Decide Prisma versus Drizzle |
| ENG-A0-004 | Prove tenant context and RLS |
| ENG-A0-005 | Define authentication port and provider spike |
| ENG-A0-006 | Prove SSE reconnect and reconciliation |
| ENG-A0-007 | Prove transactional outbox worker |
| ENG-A0-008 | Establish CI and quality gates |
| ENG-A0-009 | Add structured logging and correlation IDs |
| ENG-A0-010 | Re-estimate S1–S3 |

## ENG-A0-003 — Decide Prisma versus Drizzle

**Origin:** `TECHNOLOGY_STACK.md`, `MULTI_TENANCY.md`, `REALTIME_AND_CONCURRENCY.md`
**Outcome:** choose the persistence tool without weakening PostgreSQL capabilities.
**Scope:** compare Prisma and Drizzle, implement technical proof migrations and queries for composite uniqueness, transaction rollback, optimistic stale-version update, migration/recovery ergonomics and integration-test ergonomics.
**Non-goals:** production schema, tenant RLS proof, tenant context implementation, general repository implementation, vendor change.
**Primary agent:** Database Engineer.
**Reviewers:** Tech Lead, Security Engineer, Reviewer.
**Acceptance:** evidence table, runnable proof, ADR, chosen option and rejected option rationale.
**Tests:** failed stale update, rollback, clean database bootstrap. Tenant context and cross-tenant denial tests belong to `ENG-A0-004`.
**Risk:** an ORM may obscure RLS/session context or make transactional composition unsafe.

## ENG-A0-007 — Transactional outbox proof

**Origin:** `ARCHITECTURE.md`, `DOMAIN_MODEL.md`.  
**Outcome:** prove queue commands can commit domain state and notification intent atomically.  
**Scope:** outbox table, transaction write, claim/lease, retry, dead-letter classification, idempotent handler and fake provider.  
**Non-goals:** real WhatsApp vendor, production templates, customer-facing messaging.  
**Primary agent:** Backend Engineer with Database Engineer review.  
**Acceptance:** rollback leaves neither domain change nor outbox item; committed item is eventually processed; repeated worker execution does not duplicate the normalized result.  
**Tests:** transaction rollback, duplicate delivery, lease expiry, provider temporary/permanent failure.

## ENG-S1-001 — Persist Tenant, Establishment, User and Membership

**Origin:** `FEAT-001–005`, `US-001–005`, `AC-001–028`, `BR-001–011`, `BR-016–034`, `DOMAIN_MODEL.md`, `DATA_ARCHITECTURE.md`, `MULTI_TENANCY.md`, `ADR-009`, `ADR-010`.
**Operational outcome:** establish the minimum product persistence and isolation foundation required for accountable restaurant identity and access work.
**Scope:** product tables for Tenant, Establishment, User and Membership; approved relationships; opaque identifiers; tenant-owned foreign keys and uniqueness; SQL-reviewed Drizzle migration; default-deny RLS using transaction-local server context; explicit fictional multi-tenant fixtures.
**Non-goals:** real authentication/provider integration, session resolution, capability enforcement, invitations, establishment settings/setup behavior, Service, Queue Entry, Audit Event, APIs, UI or completion of any `FEAT-*`.
**Primary agent:** Database Engineer.
**Reviewers:** Backend Engineer, Security Engineer, QA Engineer and Reviewer.
**Dependencies:** `ENG-A0-003`, `ENG-A0-004`, `ENG-A0-008`, `ENG-A0-009`; no Supabase environment is required.
**Likely files/areas:** `drizzle/schema.ts`, `drizzle/migrations/`, `src/modules/identity`, `src/modules/tenancy`, `src/modules/establishments`, `tests/fixtures`, `tests/integration`, `tests/security` and operational documentation.
**Technical acceptance criteria:** clean migration bootstrap succeeds; every tenant-owned row has non-null `tenant_id`; relationships and tenant-scoped uniqueness are enforced; RLS is enabled and forced; the non-owner application role can access only rows for transaction-local tenant context; missing or mismatched context denies access; A0 probe tables are not reused as product tables; migration recovery is documented.
**Tests:** clean database/reset migration; relationship and uniqueness constraints; own-tenant positive access; cross-tenant read/write/object-substitution denial; missing-context denial; tenant-context non-leakage; explicit two-tenant fictional fixtures; full `db:ci` and `verify`.
**Documentation updates:** `DATA_ARCHITECTURE.md`, `MULTI_TENANCY.md`, `TECHNICAL_BACKLOG.md`, `TRACEABILITY_MATRIX.md`, `TECHNICAL_RISK_REGISTER.md`, `ENGINEERING_HANDOFF.md`, `PROJECT_STATUS.md` and `CHANGELOG.md` as applicable.
**Risk:** product schema may accidentally weaken tenant isolation or absorb behavior assigned to later S1 tasks.
**Initial status:** Ready after pre-S1 baseline organization.

## ENG-S1-007 — Open Service use case

**Origin:** `FEAT-020`, `UF-01`, S03, Domain Model.  
**Outcome:** an authorised user opens the single active service.  
**Scope:** command, capability check, active-service uniqueness, audit event, normalized conflict result and API route.  
**Non-goals:** intake close/reopen, queue entries, service closure.  
**Acceptance:** exactly one active service per establishment, cross-tenant denial, duplicate/concurrent open returns the current authoritative state, audit attribution exists.  
**Tests:** happy path, missing capability, two simultaneous opens, revoked membership, database constraint.

## ENG-S1-008 — No-active-service and queue shell

**Origin:** S03, S04, UX-001, UX-006, UX-011.  
**Outcome:** staff see the correct operational landing state and authorised action.  
**Scope:** tablet-first page shell, permission-aware Open Service action, empty queue state and error/conflict handling.  
**Non-goals:** queue rows, manual entry, service controls beyond opening.  
**Acceptance:** keyboard accessible, responsive at approved breakpoints, action omitted without capability, form/context preserved on recoverable error.  
**Tests:** component states, accessibility checks and E2E against S1-007.

## Post-A0 task additions

`ENG-A0-010` adds the following required technical tasks without changing product scope:

- `ENG-S1-011` — real Supabase Auth adapter/session-cookie/revocation proof behind `AuthPort`;
- `ENG-S2-007` — weighted capacity settings and recalculation for `FEAT-017–019`;
- `ENG-S2-008` — integrated one-device S2 acceptance evidence;
- `ENG-S3-005` — Administrator outcome correction for `FEAT-054`;
- `ENG-S3-006` — two-device S3/M2 acceptance evidence.

Full estimates, dependencies, readiness and gates live in `S1_S3_REESTIMATION.md`; task execution begins from `FIRST_PRODUCT_SPRINT.md`.
