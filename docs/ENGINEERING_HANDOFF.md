# MesaFlow — Engineering Handoff

## Handoff status

The project documentation is sufficient to begin Codex engineering with iteration A0. Product feature implementation must not skip A0 decision and safety proofs.

## ENG-A0-001 update

The repository now has an initial strict TypeScript/Next.js scaffold, baseline quality scripts, CI workflow and approved placeholder folders. Module folders are placeholders only; no product domain logic, authentication, database, ORM, realtime, outbox or provider integration has been implemented.

## ENG-A0-002 update

The repository now has a validated Docker Compose PostgreSQL service, separate development and test database URLs, technical database smoke scripts and a PostgreSQL integration test. The only SQL migration is a technical connectivity marker under `mesaflow_technical`; no product schema, ORM, RLS, tenant context or business persistence has been implemented.

## ENG-A0-003 update

Drizzle and Drizzle Kit were selected as the MesaFlow data-access and migration tooling in `ADR-009`. The spike validation passed with generated SQL migration, PostgreSQL transaction rollback, typed insert/select/update and stale-version checks. The current Drizzle schema and migration are technical spike artifacts only under `mesaflow_technical`; product schema remains for later tasks.

## ENG-A0-004 update

Tenant context and PostgreSQL RLS were proved in `ADR-010` using technical-only probe tables under `mesaflow_technical`. The pattern uses transaction-local `mesaflow.tenant_id`, `FORCE ROW LEVEL SECURITY`, a non-owner app probe role and negative integration tests. Product schema, authentication, repositories and business persistence remain for later tasks.

## ENG-A0-005 update

The authentication boundary was defined in `ADR-011` and `src/shared/auth`. Supabase Auth is recommended for the future provider adapter spike, with Clerk and Auth.js as fallbacks. The current code includes only provider-independent contracts, helpers and a mock port for unit tests; no real provider SDK, login flow, product user table, membership table, authorization model or tenant resolution was implemented.

## ENG-A0-006 update

The SSE-first realtime strategy was proved in `ADR-012` and `src/shared/realtime`. The proof includes versioned SSE envelopes, heartbeat serialization, tenant-scoped in-memory replay, `lastEventId` reconnect and snapshot reconciliation on missing/unknown ids or version gaps. No waitlist events, product API route, UI, worker, WebSocket or message broker was implemented.

## ENG-A0-007 update

The transactional outbox worker strategy was proved in `ADR-013`, `OUTBOX_ARCHITECTURE.md` and `src/shared/outbox`. The proof uses `mesaflow_technical.outbox_probe_events`, transaction-scoped event insertion, pending-only worker claiming, retry counts, permanent/exhausted failure handling, expired lease recovery, tenant-separated processing and PostgreSQL integration tests. No product waitlist events, WhatsApp integration, product APIs, UI, production daemon or final product schema was implemented.

## ENG-A0-008 update

CI and local quality gates are aligned through `db:ci` and `verify`. GitHub Actions uses frozen pnpm installation, PostgreSQL 16, migration rehearsal, migration metadata checks, format, lint, strict types, unit tests, non-empty integration tests, the security-test gate and production build. No product functionality, cloud deployment or product schema was added.

## ENG-A0-009 update

The provider-independent observability boundary is available in `src/shared/observability`. It provides validated/generated UUID correlation and request IDs, explicit execution context, child loggers, JSON-ready records, bounded redaction, safe error serialization and injectable sinks. Real security tests now prevent credential/header/cookie leakage and unsafe external IDs. No cloud provider, tracing infrastructure, product analytics or business audit schema was added.

## ENG-A0-010 update

Sprint A0 is closed by `A0_CLOSURE_REPORT.md`. S1-S3 have evidence-based relative estimates, confidence, readiness, critical path, external dependencies and gates in `S1_S3_REESTIMATION.md`. `FIRST_PRODUCT_SPRINT.md` is the next execution entry point and starts with `ENG-S1-001`; no S1 implementation was begun.

## Required first action

Load the repository in Codex and issue the start-engineering prompt from `CODEX_WORKFLOW.md`. Codex must read `AGENTS.md` before making changes.

## Ready agents

- Database Engineer: ready for A0 PostgreSQL/ORM/RLS work.
- Backend Engineer: ready for auth-port, SSE and outbox proofs.
- Frontend Engineer: ready for scaffold and SSE client proof; feature UI begins in S1.
- QA Engineer: ready to establish test harness and A0 evidence.
- Security Engineer: ready for tenancy/auth/token design review.
- DevOps Engineer: ready for local environment and CI.
- Reviewer: ready for task and A0 gate reviews.
- Documentation Manager: ready to maintain traceability, backlog, risks and status.

## Gate answers

- Ready for Codex implementation? **Yes, beginning with A0.**
- Sufficient Database documentation? **Yes.**
- Sufficient Backend documentation? **Yes.**
- Sufficient Frontend documentation? **Yes for scaffold/A0 and approved S1 screens.**
- Sufficient QA documentation? **Yes.**
- Blocking product contradictions? **No.**
- Blocking architecture contradictions? **No.**
- Deferred technical decisions? **Yes, explicitly handled by A0 spikes.**
- Is the first engineering sprint clear? **Yes.**

## Open items before pilot, not before A0

- team capacity and estimates;
- pilot load profile;
- browser/device matrix;
- privacy retention/deletion/access procedure;
- final WhatsApp provider;
- hosting/auth providers;
- support and incident ownership.

## Completion marker

Tech Lead Phase Complete

Ready for Codex Engineering Phase

## Current execution handoff

Sprint A0 Complete

Ready for `ENG-S1-001` via `FIRST_PRODUCT_SPRINT.md`
