# MesaFlow — Execution Plan

**Document ID:** PM-EXEC-001  
**Product:** MesaFlow  
**Release:** MVP / Pilot Release  
**Status:** Project planning baseline  
**Owner:** Project Management  
**Version:** 1.0  
**Last updated:** 2026-07-10

---

## 1. Purpose

This document defines how approved product work moves from architecture through integrated delivery, quality gates and pilot readiness.

This document organizes execution only. It does not redefine strategy, product scope, approved behavior, technology or architecture.


## 2. Execution principles

1. Deliver vertical, testable slices rather than disconnected layers.
2. Resolve operational truth before adding convenience.
3. Treat capacity, state, timing, audit and synchronization as cross-cutting invariants.
4. Keep each increment usable in the context of a real service.
5. Demonstrate failure paths in the same sprint as the happy path.
6. Do not defer security, authorization, audit or responsive behavior to a final polish phase.
7. Remove convenience before truth if controlled de-scope becomes necessary.

## 3. Workstreams

| Workstream | Scope | Primary feature groups | Completion evidence |
|---|---|---|---|
| WS-01 Identity and access | Administrator, establishment, individual staff access, permissions, attribution | FEAT-001–FEAT-005, FEAT-055 | Unauthorized paths fail; actions retain actor attribution |
| WS-02 Service and queue truth | Service boundary, active sections, outcomes, capacity, synchronization | FEAT-015, FEAT-017–FEAT-027, FEAT-049–FEAT-054 | Manual-only service runs across devices without contradictory state |
| WS-03 Customer entry | Permanent QR, public states, entry form, private status and mobile flow | FEAT-006–FEAT-014, FEAT-043–FEAT-045, FEAT-057, FEAT-059 | Customer joins and reopens status without account or app |
| WS-04 Calling and communication | Called state, timers, final call, WhatsApp, failure, retry and usage | FEAT-016, FEAT-024, FEAT-033–FEAT-042, FEAT-048 | Call loop remains correct during provider failure and retry |
| WS-05 Fairness and adaptation | Wait visibility, pass-overs, protected bypass and controlled changes | FEAT-026, FEAT-028–FEAT-032, FEAT-046, FEAT-053 | Staff flexibility remains; neglected groups become visible and accountable |
| WS-06 Completion and evidence | Customer departure, reactivation, history, responsive hardening | FEAT-047, FEAT-052, FEAT-056, FEAT-058 | Full service closes into trustworthy history on target devices |
| WS-07 Quality and release | NFRs, edge cases, privacy, support readiness and pilot rehearsal | PBI-060–PBI-068 | Pilot gate passes without undocumented workaround |

## 4. Architecture iteration A0

Architecture begins only from the approved product model and must return a decomposition that covers:

- lifecycle and service-state invariants;
- concurrency and stale-action handling;
- one capacity truth across QR, manual, edits and outcomes;
- authoritative timer and one-time grace behavior;
- private-link isolation and role enforcement;
- audit and history reproducibility;
- messaging-provider failure and retry semantics;
- responsive and accessibility obligations;
- observability and incident reconstruction;
- privacy retention and deletion readiness.

A0 does not change the product. Any technical constraint that would change approved behavior is escalated to Product Management.

## 5. Delivery flow per feature

1. Confirm feature packet references `FEAT`, `PBI`, `US`, `AC`, `BR`, `EDGE` and `NFR` identifiers.
2. Decompose into engineering tasks without changing the outcome.
3. Estimate and identify technical dependencies.
4. Confirm UX/content and test fixtures are ready.
5. Implement behind the agreed integration workflow.
6. Run automated and exploratory acceptance.
7. Demonstrate the feature inside its linked user journey.
8. Update traceability and operational documentation.
9. Mark Done only after the applicable Definition of Done passes.

## 6. Joint execution packages

| Package | Features | Reason for joint execution | Package exit condition |
|---|---|---|---|
| XP-01 Queue truth | FEAT-019, FEAT-023–FEAT-025, FEAT-027, FEAT-049–FEAT-051 | Circular completion dependencies and one-state/capacity invariants | One entry remains authoritative across sections, outcomes, capacity and devices |
| XP-02 Service finality | FEAT-020–FEAT-022, FEAT-054–FEAT-056 | Closure, correction, audit and history must share one final truth | Active service is correctable; closed service is immutable and reproducible |
| XP-03 Customer-entry integrity | FEAT-009–FEAT-014, FEAT-017–FEAT-019, FEAT-043–FEAT-045 | Acceptance, duplicate, capacity and private status cannot diverge | Exactly one valid entry is accepted and immediately recoverable by the customer |
| XP-04 Call integrity | FEAT-024, FEAT-033–FEAT-042, FEAT-048 | State, timers, provider events and retry must not duplicate effects | One Called state, one deadline and truthful communication evidence exist |
| XP-05 Fairness integrity | FEAT-026, FEAT-028–FEAT-032, FEAT-046, FEAT-049 | Pass-over calculations depend on accepted order, party size and seating outcomes | Fairness indicators remain accurate after every relevant change |

## 7. Quality strategy by stage

| Stage | Required tests before exit |
|---|---|
| A0 | Architecture review against every P0 NFR and critical invariant |
| S1–S3 | Role enforcement, lifecycle, capacity, concurrency, closure and audit |
| S4–S5 | duplicate/capacity races, QR regeneration, private-link isolation, mobile usability |
| S6–S7 | provider outage, delayed status, retry idempotency, timer drift and one-time grace |
| S8 | pass-over correctness, threshold behavior, party-size change conflicts, no-contact equality |
| S9–S10 | correction/history reconciliation, responsive matrix, accessibility, load, incident rehearsal |

## 8. Blocker management

A blocker is recorded within the same working day with:

- affected feature/PBI;
- blocked acceptance or gate;
- owner;
- dependency or decision needed;
- impact on critical path;
- next review point.

A blocker that requires a product decision is not bypassed through an implementation assumption.

## 9. Change control

Any change to scope, state, permission, capacity, timer, communication channel, customer access or post-closure behavior requires Product Management review and updates to all affected canonical documents before implementation proceeds.

## 10. Execution completion

Execution is complete only when the release-level Definition of Done and the pilot entry criteria in `MVP_SCOPE.md` pass. Account creation, a successful demo or isolated feature completion do not constitute delivery completion.
