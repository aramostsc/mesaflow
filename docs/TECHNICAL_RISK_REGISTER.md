# MesaFlow — Technical Risk Register

| ID | Risk | Probability | Impact | Mitigation | Owner | Review |
|---|---|---:|---:|---|---|---|
| TR-001 | Cross-tenant data exposure | Medium | Critical | server context, repository enforcement, RLS, negative tests | Security/Database | every schema/API change |
| TR-002 | Lost or conflicting queue updates | High | Critical | transactions, versions, idempotency, reconciliation tests | Backend | S2–S3 |
| TR-003 | Duplicate calls/notifications | Medium | High | command idempotency, outbox uniqueness, webhook dedupe | Backend | S6–S7 |
| TR-004 | Provider failure blocks operations | Medium | High | asynchronous adapter, degraded UI, retry classification | Backend/Frontend | S6–S10 |
| TR-005 | Realtime connection gives false confidence | Medium | High | visible connection state, resync on reconnect, authoritative queries | Backend/Frontend | S3 |
| TR-006 | ORM weakens RLS/transactions | Medium | High | A0 comparison spike and ADR | Database | A0 |
| TR-007 | Managed vendor lock-in | Medium | Medium | ports/adapters, normalized state, exportability | Architect/Backend | vendor selection |
| TR-008 | Restaurant UI is too slow or dense | Medium | High | tablet-first implementation, direct frequent actions, field testing | Frontend/UX | each sprint review |
| TR-009 | Audit data is incomplete or mutable | Medium | High | append-only table, transactionally written audit, tests | Database/Backend | S1 onward |
| TR-010 | Public tokens are guessable or leaked | Low | Critical | high entropy, hashed storage where applicable, no logs, rate limits | Security | S4–S5 |
| TR-011 | Migration causes outage/data loss | Medium | High | review, rehearsal, backups, expand/contract changes | Database/DevOps | every release |
| TR-012 | MVP expands through technical convenience | High | Medium | source traceability, non-goals, Reviewer scope gate | Tech Lead | every task |
| TR-013 | Insufficient pilot observability | Medium | High | correlation IDs, error capture, health checks, provider metrics | DevOps | A0/S10 |
| TR-014 | Browser/device incompatibility | Medium | Medium | supported-browser matrix and target-device E2E | QA/Frontend | S10 |
| TR-015 | Retention/privacy procedure unresolved | Medium | High | Product/legal decision before pilot; configurable retention design | Product/Security | before S9/pilot |

## Critical open decisions

- ORM selection.
- Authentication vendor.
- Hosting platform and EU region.
- Realtime platform fit.
- WhatsApp provider and truthful status mapping.
- Supported browser/device matrix.
- Pilot load profile.
- Retention/deletion/access procedure.
- Pilot incident ownership.

These decisions are time-bounded dependencies, not permission to invent product behaviour.
