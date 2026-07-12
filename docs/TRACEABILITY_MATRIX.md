# MesaFlow — Technical Traceability Matrix

This is the initial implementation-level matrix. Feature-level acceptance references remain authoritative in the Product documents.

| Strategic / product outcome | Canonical scope | UX | Technical modules | Initial tasks | Test evidence |
|---|---|---|---|---|---|
| Engineering foundation | Architecture, Technology Stack, A0 | n/a | MOD-001-015 foundation | ENG-A0-001-010 | scaffold, PostgreSQL, ORM, RLS, auth, realtime, outbox, migration rehearsal and CI quality gates |
| Observability foundation | Observability, Security Architecture | n/a | MOD-015 foundation | ENG-A0-009 | structured logging, correlation/request context, redaction unit and security tests |
| A0 closure and product-sprint readiness | Project/Sprint Plan, A0 | n/a | all foundation modules | ENG-A0-010 | closure evidence, S1-S3 estimates/readiness/gates and S1 prompts |
| Authentication foundation | Authorization Model, Security Architecture, ADR-011 | n/a | MOD-001-004 foundation | ENG-A0-005, ENG-S1-002-005 | auth boundary unit tests and future provider adapter tests |
| Realtime foundation | Realtime and Concurrency, ADR-012 | n/a | MOD-007 foundation | ENG-A0-006, ENG-S3-001-003 | SSE/reconnect/reconciliation unit tests and future two-device E2E |
| Outbox worker foundation | Data Architecture, ADR-008, ADR-013 | n/a | MOD-009-010 foundation | ENG-A0-007, S6-S7 tasks | transactional outbox/worker integration tests and future provider idempotency tests |
| Tenant isolation foundation | Multi-Tenancy, Security Architecture, ADR-010 | n/a | MOD-001-004, MOD-012 foundation | ENG-A0-004, ENG-S1-001-005 | RLS positive/negative integration tests |
| Accountable restaurant context | FEAT-001–005 | S01, S11, S12, S18 | MOD-001–004, MOD-012 | ENG-S1-001–005, 009 | tenant/capability/invite E2E |
| Open one active service | FEAT-020 | UF-01, S03, S04 | MOD-005, MOD-012 | ENG-S1-006–008 | concurrent-open integration + E2E |
| Material action attribution | FEAT-055 | S06 activity | MOD-012 | ENG-S1-009 | append-only audit tests |
| Manual queue operation | S2 canonical features | UF-02, S04–S07 | MOD-006, MOD-012 | ENG-S2-001–006 | manual-service E2E |
| Multi-device trustworthy state | S3 canonical features | UF-11, S19 | MOD-007, MOD-005–006 | ENG-S3-001–004 | stale-write/reconnect/two-device E2E |
| Accountless QR join | FEAT-006–014 | UF-03, S13–S15, S20 | MOD-008, MOD-014 | S4 tasks | QR/capacity/duplicate/security E2E |
| Private customer status | FEAT-043–045, 057, 059 | UF-08/09, S16/S17 | MOD-008, MOD-014 | S5 tasks | token isolation and mobile E2E |
| Call independent of delivery | FEAT-016, 033–042, 048 | UF-04/12 | MOD-009–010 | S6–S7 tasks | outbox/provider/timer/idempotency |
| Fairness and adaptation | S8 canonical features | queue warnings/detail | MOD-006 | S8 tasks | pass-over and party-size cases |
| Recovery and immutable history | FEAT-047, 052, 056 | UF-06/07, S09/S10 | MOD-006, MOD-011 | S9 tasks | correction/recovery/history tests |
| Pilot-quality responsive operation | FEAT-058, PBI-060–068 | all screens | MOD-013–015 | S10 tasks | full regression/device/accessibility/load |

## Traceability update rule

A task cannot move to `Em desenvolvimento` unless its row or source references identify:

- approved feature/PBI or architecture requirement;
- relevant screen/flow when user-facing;
- module;
- expected automated evidence.

Post-A0 task-to-feature estimates for S1-S3 are maintained in `S1_S3_REESTIMATION.md`; the S1 execution entry is `FIRST_PRODUCT_SPRINT.md`.
