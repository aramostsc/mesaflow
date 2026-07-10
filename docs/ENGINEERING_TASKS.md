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

## ENG-A0-003 — Decide Prisma versus Drizzle

**Origin:** `TECHNOLOGY_STACK.md`, `MULTI_TENANCY.md`, `REALTIME_AND_CONCURRENCY.md`  
**Outcome:** choose the persistence tool without weakening PostgreSQL capabilities.  
**Scope:** implement equivalent proof migrations and queries for tenant RLS, composite uniqueness, transaction + optimistic version update, migration rollback/recovery and integration-test ergonomics.  
**Non-goals:** production schema, general repository implementation, vendor change.  
**Primary agent:** Database Engineer.  
**Reviewers:** Tech Lead, Security Engineer, Reviewer.  
**Acceptance:** evidence table, runnable proof, ADR, chosen option and rejected option rationale.  
**Tests:** cross-tenant denial, failed stale update, rollback, clean database bootstrap.  
**Risk:** an ORM may obscure RLS/session context or make transactional composition unsafe.

## ENG-A0-007 — Transactional outbox proof

**Origin:** `ARCHITECTURE.md`, `DOMAIN_MODEL.md`.  
**Outcome:** prove queue commands can commit domain state and notification intent atomically.  
**Scope:** outbox table, transaction write, claim/lease, retry, dead-letter classification, idempotent handler and fake provider.  
**Non-goals:** real WhatsApp vendor, production templates, customer-facing messaging.  
**Primary agent:** Backend Engineer with Database Engineer review.  
**Acceptance:** rollback leaves neither domain change nor outbox item; committed item is eventually processed; repeated worker execution does not duplicate the normalized result.  
**Tests:** transaction rollback, duplicate delivery, lease expiry, provider temporary/permanent failure.

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
