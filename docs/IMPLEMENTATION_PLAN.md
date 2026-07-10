# MesaFlow — Implementation Plan

## 1. Delivery approach

Implementation follows thin, verifiable increments. Foundation work must produce executable evidence and must not become an open-ended platform project.

## 2. Phases

### A0 — Engineering foundation and decision spikes

Deliver:

- repository scaffold;
- strict TypeScript configuration;
- modular boundaries;
- local PostgreSQL environment;
- migration/test strategy;
- Prisma-versus-Drizzle decision;
- authentication-provider interface and vendor evaluation;
- SSE feasibility proof;
- outbox worker proof;
- CI quality gates;
- baseline observability and security controls.

Exit evidence: the repository builds, tests run against PostgreSQL, one tenant-scoped sample query is denied cross-tenant, one SSE sample reconnects, and one outbox item is processed idempotently.

### S1 — Accountable restaurant and service foundations

Canonical scope: `FEAT-001–005`, `FEAT-020`, `FEAT-055`.

Deliver:

- managed sign-in integration;
- tenant, establishment, user and membership persistence;
- capability authorization;
- administrator team-management flow;
- open-service flow;
- audit attribution;
- no-active-service and live-queue shells.

Exit evidence: an administrator signs in, creates or activates the restaurant context, invites Staff, opens the only active service and sees the action in audit evidence.

### S2 — Integrated queue truth

Canonical scope: `FEAT-015`, `FEAT-017–019`, `FEAT-023`, `FEAT-025`, `FEAT-049–051`.

Deliver:

- manual entry;
- queue listing;
- lifecycle transition engine;
- capacity truth;
- entry detail;
- terminal resolution;
- transactional audit.

Exit evidence: one-device manual service can create, inspect and resolve entries without paper.

### S3 — Synchronized manual service

Canonical scope: `FEAT-021–022`, `FEAT-027`, `FEAT-054`.

Deliver:

- optimistic concurrency/version checks;
- SSE synchronization and reconciliation;
- intake close/reopen;
- correction flow;
- safe service closure.

Exit evidence: two devices operate the same service without lost updates.

### S4–S5 — Public entry and private customer experience

Deliver QR credential resolution, accountless join, duplicate/capacity race handling, confirmation, private status and approved self-service actions.

### S6–S7 — Calls, timers and messaging

Deliver call transition, deadline/grace behaviour, transactional outbox, worker, provider adapter, webhooks, normalized delivery status, retries and idempotency.

### S8 — Fairness and operational adaptation

Deliver pass-over evidence, large-group handling, approved party-size changes, warnings and notes.

### S9 — Departure, recovery and history

Deliver customer leave, no-show recovery and immutable service history.

### S10 — Hardening and pilot rehearsal

Deliver responsive/device validation, security review, performance/load profile, failure rehearsal, accessibility closure, operational runbooks and release evidence.

## 3. Cross-cutting work

Every sprint includes:

- tenant-isolation tests;
- capability tests;
- audit verification;
- observability;
- migration review;
- accessibility;
- documentation updates;
- regression coverage.

## 4. Prohibited implementation shortcuts

- client-side-only authorization;
- tenant filtering added manually at controller level without repository enforcement;
- queue state stored primarily in browser state;
- direct provider SDK use inside domain/application modules;
- lifecycle change inside notification callbacks;
- generic event bus or microservice extraction before evidence requires it;
- unbounded retry loops;
- logging raw customer contact data;
- using disabled invalid lifecycle actions where UX requires omission.
