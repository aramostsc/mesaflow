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

## 5. Release blocking

Any S0/S1 issue, cross-tenant exposure, lost queue update, invalid lifecycle acceptance, unaudited material action or notification failure that reverses queue truth blocks release.
