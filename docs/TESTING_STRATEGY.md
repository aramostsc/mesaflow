# MesaFlow — Testing Strategy

## 1. Test pyramid

### Unit
Domain transitions, capability mapping, validation, ordering/fairness calculations, timer rules and normalized provider status.

### Integration
PostgreSQL repositories, transactions, RLS, migrations, outbox, webhook mapping and API/application integration.

### End-to-end
Critical staff and customer journeys in a production-like environment using deterministic provider fakes.

## 2. Mandatory critical suites

### Tenant isolation
- object ID substitution;
- mismatched tenant and establishment;
- public token from another tenant;
- background job tenant mismatch;
- provider webhook mapped across tenants;
- direct repository access without context;
- RLS denial.

### Authorization
- every capability positive and negative path;
- revoked membership;
- session revocation where supported;
- Staff attempts administrator actions;
- public principal attempts staff actions.

### Concurrency
- two devices open service simultaneously;
- duplicate manual/public submission;
- call/seat/no-show collisions;
- stale entry version;
- capacity race;
- reconnect after missed events;
- close service while another command is in flight.

### Notifications
- queue command succeeds while provider fails;
- outbox item retries;
- duplicate worker execution;
- duplicate webhook;
- late/out-of-order webhook;
- permanent failure;
- unavailable contact.

### Public security
- invalid/expired QR;
- invalid/private status token;
- token enumeration resistance;
- CSRF-relevant public mutations;
- rate limiting;
- no internal data leakage.

## 3. Sprint minimums

| Phase | Minimum evidence |
|---|---|
| A0 | unit harness, PostgreSQL integration harness, RLS proof, SSE proof, outbox proof, CI |
| S1 | tenant/auth/capability integration tests and open-service E2E |
| S2 | all lifecycle transitions, capacity and manual queue E2E |
| S3 | two-device concurrency/reconnection E2E |
| S4–S5 | QR/public join/status security and mobile E2E |
| S6–S7 | provider degradation, retries, timers and idempotency |
| S8 | fairness and party-size edge cases |
| S9 | recovery and immutable history |
| S10 | full regression, browser/device, accessibility, load and failure rehearsal |

## 4. Test data

Factories must create explicit tenants and never rely on a default global tenant. Fixtures use fictional contacts and must be safe to commit.

`ENG-A0-004` adds technical RLS integration evidence under `tests/integration/rls-tenant-context.integration.test.ts`. Product tenant-isolation tests must still be added with the real S1/S2 schemas.

`ENG-A0-005` adds provider-independent authentication boundary unit tests under `tests/unit/auth-boundary.test.ts`. Provider adapter tests must still be added when a real managed auth SDK is introduced.

`ENG-A0-006` adds technical SSE/reconnect/reconciliation unit tests under `tests/unit/realtime-sse.test.ts`. Product realtime tests must still be added when real service and queue events exist.

`ENG-A0-007` adds technical outbox/worker integration tests under `tests/integration/outbox-worker.integration.test.ts`. Product notification/provider tests must still be added when real outbox events and provider adapters exist.

`ENG-A0-008` makes unit, PostgreSQL integration and security suites mandatory CI gates. Integration discovery fails on an empty suite; the security harness temporarily allows no tests until product security cases begin, but the command is always executed.

`ENG-A0-009` adds unit evidence for execution-context isolation, child loggers, structured levels, error serialization, replaceable logger fakes and metadata preservation. The security gate now contains real tests for credential/cookie/header redaction, correlation-ID validation and safe error output; empty security discovery is no longer accepted.

## 5. Release blocking

Any S0/S1 issue, cross-tenant exposure, lost queue update, invalid lifecycle acceptance, unaudited material action or notification failure that reverses queue truth blocks release.

## 6. S1-S3 re-estimated evidence

- **S1:** product migration/RLS negatives, invalid/revoked sessions, capability matrix, concurrent service open, audit immutability, identity/context E2E and S01/S03/S11/S12/S18 accessibility.
- **S2:** lifecycle/capacity unit tests, repository/RLS integration, duplicate submissions, transactional terminal outcomes/capacity, one-device E2E and queue UI accessibility.
- **S3:** stale-write/concurrency collisions, authorized SSE replay/gap/reconnect, intake/closure races, correction audit, two-device E2E and reconnect/offline UX.

The full gate mapping and readiness are in `S1_S3_REESTIMATION.md`.
