# MesaFlow — Dependencies

**Document ID:** PM-DEP-001  
**Product:** MesaFlow  
**Release:** MVP / Pilot Release  
**Status:** Project planning baseline  
**Owner:** Project Management  
**Version:** 1.0  
**Last updated:** 2026-07-10

---

## 1. Purpose

This document identifies product, execution, external and gate dependencies that control delivery order.

This document organizes execution only. It does not redefine strategy, product scope, approved behavior, technology or architecture.


## 2. Dependency classes

| Class | Meaning | Management rule |
|---|---|---|
| Product | Approved feature outcome requires another feature outcome | Preserve dependency unless Product Management updates canonical documents |
| Execution | Work must be packaged or sequenced to avoid incomplete truth | Project Manager plans joint package or predecessor sprint |
| Architecture | Technical design is required before safe decomposition | Software Architect owns resolution and records decisions |
| External | Provider, legal, pilot or operational input is outside the delivery team | Named owner and due gate required |
| Quality gate | Acceptance, edge case or NFR evidence must exist before milestone | QA/Product jointly verify |

## 3. Critical path

`FEAT-001/002/003` → `FEAT-020` → queue truth package (`FEAT-015`, `FEAT-017–019`, `FEAT-023`, `FEAT-025`, `FEAT-027`, `FEAT-049–051`) → QR entry (`FEAT-006–014`) → call package (`FEAT-024`, `FEAT-033–042`) → safe closure/history (`FEAT-022`, `FEAT-054–056`) → integrated pilot gate.

A delay on this path delays the first complete service.

## 4. Circular dependency treatment

### DEP-CYCLE-01 — Active sections and synchronization

- `FEAT-023` depends on `FEAT-027`.
- `FEAT-024` depends on `FEAT-027`.
- `FEAT-027` depends on `FEAT-023`, `FEAT-024` and `FEAT-025`.

**Treatment:** Architecture decomposes a synchronization-enabling slice and an integrated completion slice. Project completion remains joint. This is XP-01, not a product change.

### DEP-CYCLE-02 — Capacity and terminal outcomes

- `FEAT-019` depends on `FEAT-049`–`FEAT-051`.
- `FEAT-049`–`FEAT-051` depend on `FEAT-019`.

**Treatment:** implement and verify outcome transitions and capacity recalculation in the same vertical package. No outcome or capacity feature is Done until all related recalculations pass.

## 5. External dependencies

| ID | Dependency | Needed by | Owner | Required gate | Failure response |
|---|---|---|---|---|---|
| EXT-01 | WhatsApp provider capability, templates and truthful statuses | FEAT-038–042 | Technical/Product owner | Before S6 commitment | Use product-controlled status page and manual recovery; do not invent delivery certainty |
| EXT-02 | Privacy retention/deletion/access procedure | NFR-042 and production launch | Product/Legal/Technical owner | Before M6 | Block live production launch if unresolved |
| EXT-03 | Normal pilot-load profile | NFR-009–016 performance tests | Product + Architect | Before S10 performance test | Use conservative test profile, then formally approve |
| EXT-04 | Supported browser/device matrix | FEAT-058–059, NFR-053–058 | Product + QA | Before S5/S10 test execution | Select representative pilot devices; document exclusions |
| EXT-05 | Pilot restaurant and rehearsal participants | PBI-060–068 | Pilot operations | Before M6 | Use realistic internal rehearsal; live pilot still blocked without operational owner |
| EXT-06 | Engineering capacity and estimates | Calendar roadmap | Engineering + Project | End of A0 | Keep roadmap relative; do not publish dates |
| EXT-07 | Incident ownership and support route | NFR-023, 067–070 | Project/Pilot operations | Before M6 | Block pilot start without named response path |
| EXT-08 | Supabase EU project, credentials and session-cookie/revocation validation | ENG-S1-011, FEAT-001/004 | DevOps + Security | Before real S1 auth adapter acceptance | Continue schema work with `AuthPort` fake; use Clerk/Auth.js only through an approved fallback decision |
| EXT-09 | Managed authentication email/invite configuration | ENG-S1-004, FEAT-004 | Product + DevOps | Before integrated invitation acceptance | Backend contract may use deterministic fake, but S1 gate remains conditional |
| EXT-10 | Hosted SSE runtime/environment | ENG-S3-002, FEAT-027 | Architect + DevOps | Before hosted S3/M2 acceptance | Local SSE-first proof permits implementation; hosted gate remains open |

## 6. Full canonical feature dependencies

| Feature | Approved product dependencies | Baseline sprint |
|---|---|---|
| `FEAT-001` | None | S1 |
| `FEAT-002` | FEAT-001 | S1 |
| `FEAT-003` | FEAT-002 | S1 |
| `FEAT-004` | FEAT-001, FEAT-002 | S1 |
| `FEAT-005` | FEAT-001, FEAT-004 | S1 |
| `FEAT-006` | FEAT-002 | S4 |
| `FEAT-007` | FEAT-006 | S4 |
| `FEAT-008` | FEAT-006, FEAT-005 | S4 |
| `FEAT-009` | FEAT-002, FEAT-006, FEAT-020, FEAT-021 | S4 |
| `FEAT-010` | FEAT-009, FEAT-020 | S4 |
| `FEAT-011` | FEAT-010 | S4 |
| `FEAT-012` | FEAT-010 | S4 |
| `FEAT-013` | FEAT-003, FEAT-010 | S4 |
| `FEAT-014` | FEAT-009, FEAT-018, FEAT-019, FEAT-021 | S4 |
| `FEAT-015` | FEAT-020, FEAT-023 | S2 |
| `FEAT-016` | FEAT-015, FEAT-038 | S6 |
| `FEAT-017` | FEAT-003 | S2 |
| `FEAT-018` | FEAT-003, FEAT-017 | S2 |
| `FEAT-019` | FEAT-017, FEAT-018, FEAT-049, FEAT-050, FEAT-051 | S2 |
| `FEAT-020` | FEAT-002, FEAT-003 | S1 |
| `FEAT-021` | FEAT-020 | S3 |
| `FEAT-022` | FEAT-020, FEAT-049, FEAT-050, FEAT-051 | S3 |
| `FEAT-023` | FEAT-020, FEAT-027 | S2 |
| `FEAT-024` | FEAT-033, FEAT-034, FEAT-027 | S7 |
| `FEAT-025` | FEAT-049, FEAT-050, FEAT-051 | S2 |
| `FEAT-026` | FEAT-023 | S8 |
| `FEAT-027` | FEAT-023, FEAT-024, FEAT-025 | S3 |
| `FEAT-028` | FEAT-023 | S8 |
| `FEAT-029` | FEAT-017, FEAT-023 | S8 |
| `FEAT-030` | FEAT-023, FEAT-049 | S8 |
| `FEAT-031` | FEAT-003, FEAT-028 | S8 |
| `FEAT-032` | FEAT-030, FEAT-031 | S8 |
| `FEAT-033` | FEAT-023, FEAT-038 | S6 |
| `FEAT-034` | FEAT-033, FEAT-027 | S6 |
| `FEAT-035` | FEAT-034, FEAT-038 | S7 |
| `FEAT-036` | FEAT-035 | S7 |
| `FEAT-037` | FEAT-034 | S7 |
| `FEAT-038` | FEAT-010, FEAT-015 | S6 |
| `FEAT-039` | FEAT-003, FEAT-038 | S7 |
| `FEAT-040` | FEAT-038 | S6 |
| `FEAT-041` | FEAT-040 | S7 |
| `FEAT-042` | FEAT-038, FEAT-040 | S7 |
| `FEAT-043` | FEAT-010 | S5 |
| `FEAT-044` | FEAT-043, FEAT-023 | S5 |
| `FEAT-045` | FEAT-043 | S5 |
| `FEAT-046` | FEAT-043, FEAT-017, FEAT-019 | S8 |
| `FEAT-047` | FEAT-043, FEAT-050 | S9 |
| `FEAT-048` | FEAT-033, FEAT-043 | S7 |
| `FEAT-049` | FEAT-023, FEAT-024, FEAT-019 | S2 |
| `FEAT-050` | FEAT-023, FEAT-024, FEAT-019 | S2 |
| `FEAT-051` | FEAT-024, FEAT-019 | S2 |
| `FEAT-052` | FEAT-051, FEAT-019 | S9 |
| `FEAT-053` | FEAT-023, FEAT-024 | S8 |
| `FEAT-054` | FEAT-025, FEAT-055 | S3 |
| `FEAT-055` | FEAT-001, FEAT-004 | S1 |
| `FEAT-056` | FEAT-022, FEAT-055 | S9 |
| `FEAT-057` | FEAT-009, FEAT-043 | S5 |
| `FEAT-058` | FEAT-023, FEAT-024, FEAT-025 | S10 |
| `FEAT-059` | FEAT-009, FEAT-010, FEAT-043 | S5 |


## 7. Dependency readiness rule

A dependency is Ready when its accepted interface/behavior is stable enough for the dependent item, the responsible owner is named, and any temporary test substitute cannot change final product behavior. A mock or stub does not satisfy final feature acceptance.

Post-A0 dependency timing, alternatives and blocker status for S1-S3 are detailed in `S1_S3_REESTIMATION.md`.
