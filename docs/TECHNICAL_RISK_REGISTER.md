# MesaFlow — Technical Risk Register

| ID | Risk | Probability | Impact | Mitigation | Owner | Review |
|---|---|---:|---:|---|---|---|
| TR-001 | Cross-tenant data exposure | Low | Critical | ENG-A0-004 proved transaction-local tenant context and RLS denial; every product schema/API still requires negative tests | Security/Database | every schema/API change |
| TR-002 | Lost or conflicting queue updates | High | Critical | transactions, versions, idempotency, reconciliation tests | Backend | S2–S3 |
| TR-003 | Duplicate calls/notifications | Medium | High | ENG-A0-007 proved duplicate worker execution does not reprocess a completed technical event; product command idempotency, provider idempotency keys and webhook dedupe still required | Backend | S6–S7 |
| TR-004 | Provider failure blocks operations | Medium | High | ENG-A0-007 proved async retry/failure classification for technical outbox events; degraded UI and real provider failure handling still required | Backend/Frontend | S6–S10 |
| TR-005 | Realtime connection gives false confidence | Low | High | ENG-A0-006 proved SSE replay and snapshot reconciliation; product clients must still show connection state and refetch authoritative queries | Backend/Frontend | S3 |
| TR-006 | ORM weakens RLS/transactions | Low | High | Drizzle selected in ADR-009; ENG-A0-004 proved transaction-local tenant context, RLS denial and no context leakage | Database | mitigated in ENG-A0-003 and ENG-A0-004 |
| TR-007 | Managed vendor lock-in | Medium | Medium | AuthPort defined in ADR-011; provider SDKs must stay behind adapters, normalized state and exportability | Architect/Backend | provider adapter selection |
| TR-008 | Restaurant UI is too slow or dense | Medium | High | tablet-first implementation, direct frequent actions, field testing | Frontend/UX | each sprint review |
| TR-009 | Audit data is incomplete or mutable | Medium | High | append-only table, transactionally written audit, tests | Database/Backend | S1 onward |
| TR-010 | Public tokens are guessable or leaked | Low | Critical | high entropy, hashed storage where applicable, no logs, rate limits | Security | S4–S5 |
| TR-011 | Migration causes outage/data loss | Medium | High | ENG-A0-008 adds clean test-database migration rehearsal and Drizzle metadata checks in CI; destructive changes still require review, backups and recovery strategy | Database/DevOps | every release |
| TR-012 | MVP expands through technical convenience | High | Medium | source traceability, non-goals, Reviewer scope gate | Tech Lead | every task |
| TR-013 | Insufficient pilot observability | Low | High | ENG-A0-009 adds structured logs, correlation context, redaction and security tests; health checks, metrics, alerts and provider selection remain for deployment/S10 | DevOps | A0/S10 |
| TR-014 | Browser/device incompatibility | Medium | Medium | supported-browser matrix and target-device E2E | QA/Frontend | S10 |
| TR-015 | Retention/privacy procedure unresolved | Medium | High | Product/legal decision before pilot; configurable retention design | Product/Security | before S9/pilot |
| TR-016 | Local PostgreSQL validation blocked by missing Docker/runtime | Low | Low | Docker runtime is now available and `db:*` validation passed; keep Docker availability documented for contributors | DevOps | mitigated in ENG-A0-002 |

`ENG-S1-001` materially mitigates `TR-001` and `TR-006` for the product identity tables through forced default-deny RLS, a non-bypass role, transaction-local context, immutable Membership ownership and real negative operations. These risks remain active for every future product table and access path.

Residual low risk: foreign-key or uniqueness failures can confirm existence when an attacker already knows an opaque global User UUID. Tenant code cannot list global users, errors must be normalized by future APIs, and UUIDs must remain unguessable; this is reviewed again with `ENG-S1-002` request resolution.

## Critical open decisions

- Authentication adapter validation for Supabase Auth.
- Hosting platform and EU region.
- Realtime platform fit.
- WhatsApp provider and truthful status mapping.
- Supported browser/device matrix.
- Pilot load profile.
- Retention/deletion/access procedure.
- Pilot incident ownership.

These decisions are time-bounded dependencies, not permission to invent product behaviour.

## Post-A0 disposition for S1-S3

- **Partially mitigated, repeat on product paths:** TR-001, TR-005, TR-006 and TR-013.
- **Transferred to S1:** TR-007, TR-009, TR-011 and TR-012.
- **Transferred to S2/S3:** TR-002; TR-009/011/012 continue.
- **Later-sprint active:** TR-003/004/010/014/015.
- **Mitigated foundation blocker:** TR-016.

Detailed probability, confidence, trigger, owner and gate impact are recorded in `S1_S3_REESTIMATION.md`. No risk is considered resolved merely because an A0 technical probe exists.
