# MesaFlow — Execution Backlog

**Document ID:** PM-BACKLOG-001  
**Product:** MesaFlow  
**Release:** MVP / Pilot Release  
**Status:** Project planning baseline  
**Owner:** Project Management  
**Version:** 1.0  
**Last updated:** 2026-07-10

---

## 1. Purpose

This document converts the approved product backlog into an execution view with delivery package, relative sprint and milestone traceability. It does not replace `PRODUCT_BACKLOG.md`.

This document organizes execution only. It does not redefine strategy, product scope, approved behavior, technology or architecture.


## 2. Backlog rules

- `PBI-001`–`PBI-059` retain their one-to-one relationship with `FEAT-001`–`FEAT-059`.
- Product priority remains P0 for every canonical MVP feature.
- Status begins as **Ready for architecture** and moves through the workflow in `WORKFLOW.md`.
- Sprint placement is provisional until Architecture and Engineering estimation.
- Dependencies shown here are product dependencies; Architecture adds technical tasks without changing them.

## 3. Canonical MVP execution backlog

| PBI | Feature | Epic | Wave | Sprint | Milestone | Product dependencies | Execution note |
|---|---|---|---|---|---|---|---|
| PBI-001 | `FEAT-001` — Administrator account creation | EPIC-A | Wave 0 | S1 | M1 | None | Standard feature packet |
| PBI-002 | `FEAT-002` — Establishment profile | EPIC-A | Wave 0 | S1 | M1 | FEAT-001 | Standard feature packet |
| PBI-003 | `FEAT-003` — Guided operational setup | EPIC-A | Wave 0 | S1 | M1 | FEAT-002 | Standard feature packet |
| PBI-004 | `FEAT-004` — Individual staff invitation and access | EPIC-A | Wave 0 | S1 | M1 | FEAT-001, FEAT-002 | Standard feature packet |
| PBI-005 | `FEAT-005` — Permissions | EPIC-A | Wave 0 | S1 | M1 | FEAT-001, FEAT-004 | Standard feature packet |
| PBI-006 | `FEAT-006` — Permanent establishment QR | EPIC-B | Wave 2 | S4 | M3 | FEAT-002 | Standard feature packet |
| PBI-007 | `FEAT-007` — QR download | EPIC-B | Wave 2 | S4 | M3 | FEAT-006 | Standard feature packet |
| PBI-008 | `FEAT-008` — QR regeneration | EPIC-B | Wave 2 | S4 | M3 | FEAT-006, FEAT-005 | Standard feature packet |
| PBI-009 | `FEAT-009` — Public welcome and state screen | EPIC-B | Wave 2 | S4 | M3 | FEAT-002, FEAT-006, FEAT-020, FEAT-021 | Standard feature packet |
| PBI-010 | `FEAT-010` — Customer queue-entry form | EPIC-B | Wave 2 | S4 | M3 | FEAT-009, FEAT-020 | Standard feature packet |
| PBI-011 | `FEAT-011` — Optional seating needs | EPIC-B | Wave 2 | S4 | M3 | FEAT-010 | Standard feature packet |
| PBI-012 | `FEAT-012` — Duplicate prevention | EPIC-B | Wave 2 | S4 | M3 | FEAT-010 | Standard feature packet |
| PBI-013 | `FEAT-013` — Maximum QR party size | EPIC-B | Wave 2 | S4 | M3 | FEAT-003, FEAT-010 | Standard feature packet |
| PBI-014 | `FEAT-014` — Full and closed states | EPIC-B | Wave 2 | S4 | M3 | FEAT-009, FEAT-018, FEAT-019, FEAT-021 | Standard feature packet |
| PBI-015 | `FEAT-015` — Manual entry | EPIC-C | Wave 1 | S2 | M2 | FEAT-020, FEAT-023 | Standard feature packet |
| PBI-016 | `FEAT-016` — No-contact handling | EPIC-C | Wave 4 | S6 | M4 | FEAT-015, FEAT-038 | Standard feature packet |
| PBI-017 | `FEAT-017` — Weighted capacity | EPIC-C | Wave 2 | S2 | M2 | FEAT-003 | Standard feature packet |
| PBI-018 | `FEAT-018` — Maximum slots | EPIC-C | Wave 1 | S2 | M2 | FEAT-003, FEAT-017 | Standard feature packet |
| PBI-019 | `FEAT-019` — Capacity recalculation | EPIC-C | Wave 1 | S2 | M2 | FEAT-017, FEAT-018, FEAT-049, FEAT-050, FEAT-051 | Joint package XP-01 |
| PBI-020 | `FEAT-020` — Open service | EPIC-D | Wave 0 | S1 | M1 | FEAT-002, FEAT-003 | Joint package XP-02 |
| PBI-021 | `FEAT-021` — Close/reopen entries | EPIC-D | Wave 1 | S3 | M2 | FEAT-020 | Joint package XP-02 |
| PBI-022 | `FEAT-022` — Safe service closure | EPIC-D | Wave 0 | S3 | M2 | FEAT-020, FEAT-049, FEAT-050, FEAT-051 | Joint package XP-02 |
| PBI-023 | `FEAT-023` — Waiting section | EPIC-D | Wave 1 | S2 | M2 | FEAT-020, FEAT-027 | Joint package XP-01 |
| PBI-024 | `FEAT-024` — Called section | EPIC-D | Wave 5 | S7 | M4 | FEAT-033, FEAT-034, FEAT-027 | Joint package XP-01 |
| PBI-025 | `FEAT-025` — Recently completed | EPIC-D | Wave 1 | S2 | M2 | FEAT-049, FEAT-050, FEAT-051 | Joint package XP-01 |
| PBI-026 | `FEAT-026` — Party-size filtering | EPIC-D | Wave 4 | S8 | M5 | FEAT-023 | Standard feature packet |
| PBI-027 | `FEAT-027` — Multi-device synchronization | EPIC-D | Wave 1 | S3 | M2 | FEAT-023, FEAT-024, FEAT-025 | Joint package XP-01 |
| PBI-028 | `FEAT-028` — Elapsed wait | EPIC-E | Wave 4 | S8 | M5 | FEAT-023 | Standard feature packet |
| PBI-029 | `FEAT-029` — Large-group label | EPIC-E | Wave 4 | S8 | M5 | FEAT-017, FEAT-023 | Standard feature packet |
| PBI-030 | `FEAT-030` — Pass-over count | EPIC-E | Wave 4 | S8 | M5 | FEAT-023, FEAT-049 | Standard feature packet |
| PBI-031 | `FEAT-031` — Long-wait warning | EPIC-E | Wave 4 | S8 | M5 | FEAT-003, FEAT-028 | Standard feature packet |
| PBI-032 | `FEAT-032` — Protected pass-over reason | EPIC-E | Wave 4 | S8 | M5 | FEAT-030, FEAT-031 | Standard feature packet |
| PBI-033 | `FEAT-033` — Call group | EPIC-F | Wave 3 | S6 | M4 | FEAT-023, FEAT-038 | Standard feature packet |
| PBI-034 | `FEAT-034` — Individual countdown | EPIC-F | Wave 3 | S6 | M4 | FEAT-033, FEAT-027 | Standard feature packet |
| PBI-035 | `FEAT-035` — Final call | EPIC-F | Wave 3 | S7 | M4 | FEAT-034, FEAT-038 | Standard feature packet |
| PBI-036 | `FEAT-036` — Grace period | EPIC-F | Wave 3 | S7 | M4 | FEAT-035 | Standard feature packet |
| PBI-037 | `FEAT-037` — Manual additional time | EPIC-F | Wave 3 | S7 | M4 | FEAT-034 | Standard feature packet |
| PBI-038 | `FEAT-038` — WhatsApp messages | EPIC-F | Wave 3 | S6 | M4 | FEAT-010, FEAT-015 | Standard feature packet |
| PBI-039 | `FEAT-039` — Template personalization | EPIC-F | Wave 3 | S7 | M4 | FEAT-003, FEAT-038 | Standard feature packet |
| PBI-040 | `FEAT-040` — Delivery visibility | EPIC-F | Wave 3 | S6 | M4 | FEAT-038 | Standard feature packet |
| PBI-041 | `FEAT-041` — Retry | EPIC-F | Wave 3 | S7 | M4 | FEAT-040 | Standard feature packet |
| PBI-042 | `FEAT-042` — Consumption measurement | EPIC-F | Wave 3 | S7 | M4 | FEAT-038, FEAT-040 | Standard feature packet |
| PBI-043 | `FEAT-043` — Private status page | EPIC-G | Wave 2 | S5 | M3 | FEAT-010 | Standard feature packet |
| PBI-044 | `FEAT-044` — Groups-ahead position | EPIC-G | Wave 2 | S5 | M3 | FEAT-043, FEAT-023 | Standard feature packet |
| PBI-045 | `FEAT-045` — Customer edit | EPIC-G | Wave 2 | S5 | M3 | FEAT-043 | Standard feature packet |
| PBI-046 | `FEAT-046` — Party-size change | EPIC-G | Wave 4 | S8 | M5 | FEAT-043, FEAT-017, FEAT-019 | Standard feature packet |
| PBI-047 | `FEAT-047` — Confirmed leave | EPIC-G | Wave 5 | S9 | M6 | FEAT-043, FEAT-050 | Standard feature packet |
| PBI-048 | `FEAT-048` — “I’m on my way” | EPIC-G | Wave 3 | S7 | M4 | FEAT-033, FEAT-043 | Standard feature packet |
| PBI-049 | `FEAT-049` — Mark Seated | EPIC-H | Wave 0 | S2 | M2 | FEAT-023, FEAT-024, FEAT-019 | Joint package XP-01 |
| PBI-050 | `FEAT-050` — Cancel with actor/reason | EPIC-H | Wave 0 | S2 | M2 | FEAT-023, FEAT-024, FEAT-019 | Joint package XP-01 |
| PBI-051 | `FEAT-051` — Mark No-show | EPIC-H | Wave 0 | S2 | M2 | FEAT-024, FEAT-019 | Joint package XP-01 |
| PBI-052 | `FEAT-052` — Reactivate No-show | EPIC-H | Wave 5 | S9 | M6 | FEAT-051, FEAT-019 | Standard feature packet |
| PBI-053 | `FEAT-053` — Internal notes | EPIC-H | Wave 4 | S8 | M5 | FEAT-023, FEAT-024 | Standard feature packet |
| PBI-054 | `FEAT-054` — Outcome correction | EPIC-H | Wave 1 | S3 | M2 | FEAT-025, FEAT-055 | Joint package XP-02 |
| PBI-055 | `FEAT-055` — Audit trail | EPIC-H | Wave 0 | S1 | M1 | FEAT-001, FEAT-004 | Joint package XP-02 |
| PBI-056 | `FEAT-056` — Closed-service history | EPIC-H | Wave 5 | S9 | M6 | FEAT-022, FEAT-055 | Joint package XP-02 |
| PBI-057 | `FEAT-057` — Discreet branding | EPIC-I | Wave 5 | S5 | M3 | FEAT-009, FEAT-043 | Standard feature packet |
| PBI-058 | `FEAT-058` — Tablet and desktop staff experience | EPIC-I | Wave 5 | S10 | M6 | FEAT-023, FEAT-024, FEAT-025 | Standard feature packet |
| PBI-059 | `FEAT-059` — Mobile-first customer experience | EPIC-I | Wave 2 | S5 | M3 | FEAT-009, FEAT-010, FEAT-043 | Standard feature packet |


## 4. Cross-feature integrity backlog

| PBI | Outcome | Planned validation point |
|---|---|---|
| PBI-060 | Complete service without paper | Continuous; final in S10 |
| PBI-061 | Single current entry truth | S2–S3 and S10 concurrency rehearsal |
| PBI-062 | Messaging-provider degradation | S6–S7 and S10 incident rehearsal |
| PBI-063 | Entry-path equality | S4 and S8 |
| PBI-064 | Fairness without rigid automation | S8 and S10 |
| PBI-065 | Cross-path capacity integrity | S2, S4, S8 and S10 |
| PBI-066 | Private customer access | S5 and security regression in S10 |
| PBI-067 | Restaurant-device usability | Continuous; final matrix in S10 |
| PBI-068 | Pilot evidence baseline | S7, S9 and final reconciliation in S10 |

## 5. Backlog decomposition rule

Engineering tasks created beneath a PBI must include the parent `PBI` and canonical `FEAT` ID. Tasks may represent implementation, test, content, migration, observability or operational readiness, but may not become unapproved product functionality.

## 6. Backlog ordering rule

Within a sprint, the team starts with the smallest vertical slice that proves an invariant, then completes the remaining acceptance paths. A feature in a joint package may reach **Implemented** before other members, but none reaches **Done** until the package-level integrated exit condition passes.
