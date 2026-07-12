# ADR-009 — Data Access Layer: Drizzle over Prisma

**Status:** Accepted
**Date:** 2026-07-11
**Owner:** Tech Lead / Database Engineering
**Task:** `ENG-A0-003`

## Context

MesaFlow uses PostgreSQL as the system of record and must preserve tenant isolation, transaction safety, auditability and future Row-Level Security as first-class concerns.

`TECHNOLOGY_STACK.md` deferred the Prisma versus Drizzle decision to A0. The deciding criteria were RLS readiness, migration reviewability, transaction ergonomics, SQL control, testability, TypeScript strictness, CI fit and maintainability for future Codex agents.

## Decision

MesaFlow will use **Drizzle** and **Drizzle Kit** as the primary data-access and migration tooling.

Drizzle is selected because it keeps PostgreSQL concepts visible in TypeScript, produces reviewable SQL migrations, supports raw SQL where needed and fits the planned repository pattern without encouraging broad model-level CRUD access.

## Comparison Matrix

| Criterion | Result | Notes |
|---|---|---|
| MesaFlow MVP fit | Drizzle | Better alignment with PostgreSQL-first architecture and explicit module repositories. |
| Simplicity | Drizzle | Lighter abstraction and fewer generated-client behaviours to police. |
| Codex clarity | Drizzle | Schema and queries remain close to SQL, easier to review for tenant/concurrency mistakes. |
| Multi-tenancy safety | Drizzle | Neither tool enforces tenant context alone; Drizzle makes repository SQL/context boundaries more visible. |
| Future RLS | Drizzle | Official Drizzle docs include PostgreSQL RLS support; custom SQL remains straightforward. |
| SQL control | Drizzle | Stronger direct SQL ergonomics for locks, `SET LOCAL`, partial indexes and outbox claiming. |
| Migrations | Drizzle | Generated SQL files are the review artifact; custom SQL can sit beside generated migrations. |
| Testability | Drizzle | Thin PostgreSQL integration works cleanly with Vitest and existing test DB. |
| Type safety | Tie | Prisma has strong generated client types; Drizzle has strong query/table types with less abstraction. |
| DX | Prisma | Prisma has broader onboarding familiarity and richer generated CRUD ergonomics. |
| Performance | Drizzle | Thin SQL layer reduces abstraction overhead and keeps optimized queries explicit. |
| Observability/debugging | Drizzle | SQL-oriented queries are easier to inspect and reason about during incidents. |
| Lock-in | Drizzle | Lower lock-in when SQL migrations remain portable and repositories hide tooling. |
| Maturity/ecosystem | Prisma | Prisma has a larger ecosystem and longer enterprise track record. |
| Developer onboarding | Tie | Prisma is familiar; Drizzle is simpler for SQL-literate contributors and database-heavy work. |

## Guardrails

- Use `drizzle-kit generate` to create SQL migrations.
- Review generated SQL before merge.
- Do not use `drizzle-kit push` outside disposable local experiments.
- Keep production code behind module repositories and application ports.
- Do not import Drizzle directly from UI or route handlers.
- Use raw SQL deliberately for RLS, transaction-local tenant context, locks, partial indexes, advanced constraints and outbox leasing.
- Tenant context and RLS denial are proved by `ENG-A0-004` / `ADR-010` and must be preserved by future product repositories.

## Spike Evidence

The spike created only technical artifacts:

- `drizzle/schema.ts`
- `drizzle/migrations/0000_steep_mesmero.sql`
- `tests/integration/drizzle-spike.integration.test.ts`

The spike proved:

- SQL migration generation with Drizzle Kit.
- Migration application against local PostgreSQL test database.
- Typed insert/select/update through Drizzle.
- Transaction rollback.
- Composite uniqueness.
- Optimistic stale-version update returning no rows.

No product schema, tenant model, RLS policy, authentication, API or business logic was implemented.

## Consequences

Positive:

- PostgreSQL remains visible and reviewable.
- Migrations stay SQL-first.
- Future RLS and transaction-local context can be implemented explicitly.
- Codex agents are less likely to hide risky behaviour behind generated CRUD.

Tradeoffs:

- Prisma’s richer generated-client DX is not used.
- The team must maintain disciplined repository boundaries and migration review.
- Advanced business invariants still require database constraints and tests; Drizzle does not replace domain policy.

## Follow-up

`ENG-A0-004` completed this follow-up in `ADR-010` by proving:

- server-derived tenant context;
- transaction-local tenant setting;
- default-deny RLS;
- negative cross-tenant tests;
- repository denial when tenant context is missing or mismatched.
