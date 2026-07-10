# MesaFlow — Feature Execution Map

**Document ID:** PM-MAP-001  
**Product:** MesaFlow  
**Release:** MVP / Pilot Release  
**Status:** Project planning baseline  
**Owner:** Project Management  
**Version:** 1.0  
**Last updated:** 2026-07-10

---

## 1. Purpose

This document provides one canonical execution trace for every approved MVP feature while preserving the existing identifiers.

This document organizes execution only. It does not redefine strategy, product scope, approved behavior, technology or architecture.


## 2. Map conventions

- Wave comes from the approved product sequencing in `FEATURE_PRIORITIES.md`.
- Sprint and milestone are Project Management baselines subject to post-architecture estimation.
- Dependencies are copied from `PRODUCT_BACKLOG.md`.
- Package identifies joint completion constraints.

## 3. Complete feature map

| Feature | Name | Epic | PBI | Wave | Sprint | Milestone | Dependencies | Package |
|---|---|---|---|---|---|---|---|---|
| `FEAT-001` | Administrator account creation | EPIC-A | PBI-001 | Wave 0 | S1 | M1 | None | Standard |
| `FEAT-002` | Establishment profile | EPIC-A | PBI-002 | Wave 0 | S1 | M1 | FEAT-001 | Standard |
| `FEAT-003` | Guided operational setup | EPIC-A | PBI-003 | Wave 0 | S1 | M1 | FEAT-002 | Standard |
| `FEAT-004` | Individual staff invitation and access | EPIC-A | PBI-004 | Wave 0 | S1 | M1 | FEAT-001, FEAT-002 | Standard |
| `FEAT-005` | Permissions | EPIC-A | PBI-005 | Wave 0 | S1 | M1 | FEAT-001, FEAT-004 | Standard |
| `FEAT-006` | Permanent establishment QR | EPIC-B | PBI-006 | Wave 2 | S4 | M3 | FEAT-002 | Standard |
| `FEAT-007` | QR download | EPIC-B | PBI-007 | Wave 2 | S4 | M3 | FEAT-006 | Standard |
| `FEAT-008` | QR regeneration | EPIC-B | PBI-008 | Wave 2 | S4 | M3 | FEAT-006, FEAT-005 | Standard |
| `FEAT-009` | Public welcome and state screen | EPIC-B | PBI-009 | Wave 2 | S4 | M3 | FEAT-002, FEAT-006, FEAT-020, FEAT-021 | XP-03 |
| `FEAT-010` | Customer queue-entry form | EPIC-B | PBI-010 | Wave 2 | S4 | M3 | FEAT-009, FEAT-020 | XP-03 |
| `FEAT-011` | Optional seating needs | EPIC-B | PBI-011 | Wave 2 | S4 | M3 | FEAT-010 | XP-03 |
| `FEAT-012` | Duplicate prevention | EPIC-B | PBI-012 | Wave 2 | S4 | M3 | FEAT-010 | XP-03 |
| `FEAT-013` | Maximum QR party size | EPIC-B | PBI-013 | Wave 2 | S4 | M3 | FEAT-003, FEAT-010 | XP-03 |
| `FEAT-014` | Full and closed states | EPIC-B | PBI-014 | Wave 2 | S4 | M3 | FEAT-009, FEAT-018, FEAT-019, FEAT-021 | XP-03 |
| `FEAT-015` | Manual entry | EPIC-C | PBI-015 | Wave 1 | S2 | M2 | FEAT-020, FEAT-023 | Standard |
| `FEAT-016` | No-contact handling | EPIC-C | PBI-016 | Wave 4 | S6 | M4 | FEAT-015, FEAT-038 | XP-04 |
| `FEAT-017` | Weighted capacity | EPIC-C | PBI-017 | Wave 2 | S2 | M2 | FEAT-003 | XP-03 |
| `FEAT-018` | Maximum slots | EPIC-C | PBI-018 | Wave 1 | S2 | M2 | FEAT-003, FEAT-017 | XP-03 |
| `FEAT-019` | Capacity recalculation | EPIC-C | PBI-019 | Wave 1 | S2 | M2 | FEAT-017, FEAT-018, FEAT-049, FEAT-050, FEAT-051 | XP-01 |
| `FEAT-020` | Open service | EPIC-D | PBI-020 | Wave 0 | S1 | M1 | FEAT-002, FEAT-003 | XP-02 |
| `FEAT-021` | Close/reopen entries | EPIC-D | PBI-021 | Wave 1 | S3 | M2 | FEAT-020 | XP-02 |
| `FEAT-022` | Safe service closure | EPIC-D | PBI-022 | Wave 0 | S3 | M2 | FEAT-020, FEAT-049, FEAT-050, FEAT-051 | XP-02 |
| `FEAT-023` | Waiting section | EPIC-D | PBI-023 | Wave 1 | S2 | M2 | FEAT-020, FEAT-027 | XP-01 |
| `FEAT-024` | Called section | EPIC-D | PBI-024 | Wave 5 | S7 | M4 | FEAT-033, FEAT-034, FEAT-027 | XP-01 |
| `FEAT-025` | Recently completed | EPIC-D | PBI-025 | Wave 1 | S2 | M2 | FEAT-049, FEAT-050, FEAT-051 | XP-01 |
| `FEAT-026` | Party-size filtering | EPIC-D | PBI-026 | Wave 4 | S8 | M5 | FEAT-023 | XP-05 |
| `FEAT-027` | Multi-device synchronization | EPIC-D | PBI-027 | Wave 1 | S3 | M2 | FEAT-023, FEAT-024, FEAT-025 | XP-01 |
| `FEAT-028` | Elapsed wait | EPIC-E | PBI-028 | Wave 4 | S8 | M5 | FEAT-023 | XP-05 |
| `FEAT-029` | Large-group label | EPIC-E | PBI-029 | Wave 4 | S8 | M5 | FEAT-017, FEAT-023 | XP-05 |
| `FEAT-030` | Pass-over count | EPIC-E | PBI-030 | Wave 4 | S8 | M5 | FEAT-023, FEAT-049 | XP-05 |
| `FEAT-031` | Long-wait warning | EPIC-E | PBI-031 | Wave 4 | S8 | M5 | FEAT-003, FEAT-028 | XP-05 |
| `FEAT-032` | Protected pass-over reason | EPIC-E | PBI-032 | Wave 4 | S8 | M5 | FEAT-030, FEAT-031 | XP-05 |
| `FEAT-033` | Call group | EPIC-F | PBI-033 | Wave 3 | S6 | M4 | FEAT-023, FEAT-038 | XP-04 |
| `FEAT-034` | Individual countdown | EPIC-F | PBI-034 | Wave 3 | S6 | M4 | FEAT-033, FEAT-027 | XP-04 |
| `FEAT-035` | Final call | EPIC-F | PBI-035 | Wave 3 | S7 | M4 | FEAT-034, FEAT-038 | XP-04 |
| `FEAT-036` | Grace period | EPIC-F | PBI-036 | Wave 3 | S7 | M4 | FEAT-035 | XP-04 |
| `FEAT-037` | Manual additional time | EPIC-F | PBI-037 | Wave 3 | S7 | M4 | FEAT-034 | XP-04 |
| `FEAT-038` | WhatsApp messages | EPIC-F | PBI-038 | Wave 3 | S6 | M4 | FEAT-010, FEAT-015 | XP-04 |
| `FEAT-039` | Template personalization | EPIC-F | PBI-039 | Wave 3 | S7 | M4 | FEAT-003, FEAT-038 | XP-04 |
| `FEAT-040` | Delivery visibility | EPIC-F | PBI-040 | Wave 3 | S6 | M4 | FEAT-038 | XP-04 |
| `FEAT-041` | Retry | EPIC-F | PBI-041 | Wave 3 | S7 | M4 | FEAT-040 | XP-04 |
| `FEAT-042` | Consumption measurement | EPIC-F | PBI-042 | Wave 3 | S7 | M4 | FEAT-038, FEAT-040 | XP-04 |
| `FEAT-043` | Private status page | EPIC-G | PBI-043 | Wave 2 | S5 | M3 | FEAT-010 | XP-03 |
| `FEAT-044` | Groups-ahead position | EPIC-G | PBI-044 | Wave 2 | S5 | M3 | FEAT-043, FEAT-023 | XP-03 |
| `FEAT-045` | Customer edit | EPIC-G | PBI-045 | Wave 2 | S5 | M3 | FEAT-043 | XP-03 |
| `FEAT-046` | Party-size change | EPIC-G | PBI-046 | Wave 4 | S8 | M5 | FEAT-043, FEAT-017, FEAT-019 | XP-05 |
| `FEAT-047` | Confirmed leave | EPIC-G | PBI-047 | Wave 5 | S9 | M6 | FEAT-043, FEAT-050 | Standard |
| `FEAT-048` | “I’m on my way” | EPIC-G | PBI-048 | Wave 3 | S7 | M4 | FEAT-033, FEAT-043 | XP-04 |
| `FEAT-049` | Mark Seated | EPIC-H | PBI-049 | Wave 0 | S2 | M2 | FEAT-023, FEAT-024, FEAT-019 | XP-01 |
| `FEAT-050` | Cancel with actor/reason | EPIC-H | PBI-050 | Wave 0 | S2 | M2 | FEAT-023, FEAT-024, FEAT-019 | XP-01 |
| `FEAT-051` | Mark No-show | EPIC-H | PBI-051 | Wave 0 | S2 | M2 | FEAT-024, FEAT-019 | XP-01 |
| `FEAT-052` | Reactivate No-show | EPIC-H | PBI-052 | Wave 5 | S9 | M6 | FEAT-051, FEAT-019 | Standard |
| `FEAT-053` | Internal notes | EPIC-H | PBI-053 | Wave 4 | S8 | M5 | FEAT-023, FEAT-024 | Standard |
| `FEAT-054` | Outcome correction | EPIC-H | PBI-054 | Wave 1 | S3 | M2 | FEAT-025, FEAT-055 | XP-02 |
| `FEAT-055` | Audit trail | EPIC-H | PBI-055 | Wave 0 | S1 | M1 | FEAT-001, FEAT-004 | XP-02 |
| `FEAT-056` | Closed-service history | EPIC-H | PBI-056 | Wave 5 | S9 | M6 | FEAT-022, FEAT-055 | XP-02 |
| `FEAT-057` | Discreet branding | EPIC-I | PBI-057 | Wave 5 | S5 | M3 | FEAT-009, FEAT-043 | Standard |
| `FEAT-058` | Tablet and desktop staff experience | EPIC-I | PBI-058 | Wave 5 | S10 | M6 | FEAT-023, FEAT-024, FEAT-025 | Standard |
| `FEAT-059` | Mobile-first customer experience | EPIC-I | PBI-059 | Wave 2 | S5 | M3 | FEAT-009, FEAT-010, FEAT-043 | Standard |


## 4. Coverage check

- Canonical features represented: **59 of 59**.
- Feature ID range: `FEAT-001` through `FEAT-059` without renumbering.
- Primary backlog mapping: `PBI-001` through `PBI-059` one to one.
- Cross-feature integrity coverage: `PBI-060` through `PBI-068` in S10, with earlier continuous verification.

## 5. Handoff use

The Software Architect should use this map to create technical work packages and trace each decision/task back to the affected feature. Engineering and QA should retain both `FEAT` and `PBI` identifiers in implementation and test records.
