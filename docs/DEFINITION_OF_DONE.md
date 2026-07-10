# MesaFlow — Definition of Done

**Document ID:** PM-DOD-001  
**Product:** MesaFlow  
**Release:** MVP / Pilot Release  
**Status:** Project planning baseline  
**Owner:** Project Management  
**Version:** 1.0  
**Last updated:** 2026-07-10

---

## 1. Purpose

This Definition of Done sets completion evidence for tasks, features, sprints, epics, milestones and the MVP release.

This document organizes execution only. It does not redefine strategy, product scope, approved behavior, technology or architecture.


## 2. Engineering task Done

- implementation or technical deliverable is complete and reviewed;
- agreed automated tests pass;
- error and failure path is handled where applicable;
- security, privacy, audit and observability obligations are included;
- no known S0/S1 defect is introduced;
- parent PBI/feature traceability is updated;
- documentation needed by the next task is current.

Task Done does not automatically mean feature Done.

## 3. Feature Done

- all feature acceptance criteria pass;
- linked user-story outcome is demonstrated;
- linked journey remains coherent;
- applicable business rules pass;
- applicable S0/S1 edge cases pass;
- applicable P0 NFRs pass;
- permissions and customer-data boundaries pass;
- material actions are audited where required;
- failure and retry paths are truthful and recoverable;
- responsive/accessibility obligations pass for the relevant surface;
- no out-of-scope behavior was added;
- shipped behavior is documented.

Features in XP-01 through XP-05 are not Done until the package exit condition passes.

## 4. Sprint Done

- sprint goal is demonstrated in an integrated environment;
- all items reported Done meet task/feature DoD;
- unfinished items are returned to the backlog with current evidence;
- S0/S1 defects affecting the sprint goal are closed;
- regression suite passes;
- traceability, risk and dependency records are updated;
- Product and QA accept the demonstrated outcome.

## 5. Epic Done

- every included canonical feature is Done;
- epic outcome passes end to end, including failure paths;
- external dependencies no longer prevent the outcome;
- cross-epic integration tests pass;
- no unresolved critical defect remains.

## 6. Milestone Done

- milestone exit evidence in `MILESTONES.md` is complete;
- affected PBI-060–PBI-068 outcomes pass;
- required P0 NFR evidence is attached;
- risks and approved exceptions are reviewed;
- gate decision and approvers are recorded.

## 7. MVP release Done

The MVP release is Done when:

1. all `FEAT-001`–`FEAT-059` are Done;
2. PBI-060–PBI-068 are Done;
3. all required end-to-end scenarios in `MVP_SCOPE.md` pass;
4. all applicable S0/S1 edge cases pass;
5. all P0 NFRs pass or have approved, bounded, non-paper exceptions;
6. role enforcement, private access and privacy readiness pass;
7. provider failure, concurrency, reconnection and timer rehearsals pass;
8. closed-service history is read-only and reproducible;
9. tablet, desktop and customer-mobile matrices pass;
10. support, monitoring, incident and pilot procedures are ready;
11. documentation matches the release;
12. Product, QA, Project and technical owner record go/no-go approval.

## 8. Prohibited completion claims

The following do not satisfy Done:

- “works on my device”;
- UI exists but the state is not authoritative;
- happy path passes but failure is hidden;
- manual refresh is required for normal synchronization;
- paper remains the real source of truth;
- an exception is undocumented;
- acceptance relies on a mock that changes final behavior;
- closed history can still be edited;
- a feature is marked Done while its joint package remains inconsistent.
