# MesaFlow — Implementation Sequence

## Dependency-safe order

1. **A0.1 Repository and CI**
2. **A0.2 PostgreSQL, migration and test harness**
3. **A0.3 ORM decision spike**
4. **A0.4 Tenant context and RLS proof**
5. **A0.5 Authentication adapter proof**
6. **A0.6 SSE reconnect/reconciliation proof**
7. **A0.7 Transactional outbox/worker proof**
8. **A0.8 Architecture decisions and backlog re-estimation**
9. **S1 Identity, membership, establishment and service foundation**
10. **S2 Queue domain and one-device operational loop**
11. **S3 Multi-device synchronization and safe service controls**
12. **S4 QR/public join**
13. **S5 Private customer status**
14. **S6 Call lifecycle and provider foundation**
15. **S7 Timers, retries and acknowledgement**
16. **S8 Fairness and adaptations**
17. **S9 Recovery and history**
18. **S10 hardening and release rehearsal**

## Vertical-slice rule

After A0, each slice should include database, application, API, UI, tests and documentation for the selected outcome. Avoid separate long-running “backend complete” and “frontend complete” phases.

## Review order inside a slice

1. Database constraints and migration review.
2. Domain/application tests.
3. API authorization and error contract.
4. UI behaviour and accessibility.
5. Integration and E2E tests.
6. Security review.
7. Documentation and final Reviewer gate.
