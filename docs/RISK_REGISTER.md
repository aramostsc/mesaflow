# MesaFlow — Risk Register

**Document ID:** PM-RISK-001  
**Product:** MesaFlow  
**Release:** MVP / Pilot Release  
**Status:** Project planning baseline  
**Owner:** Project Management  
**Version:** 1.0  
**Last updated:** 2026-07-10

---

## 1. Purpose

This register identifies execution risks, their triggers, mitigation and gate impact. It does not redefine product scope.

This document organizes execution only. It does not redefine strategy, product scope, approved behavior, technology or architecture.


## 2. Rating model

- Probability: Low / Medium / High.
- Impact: Moderate / High / Critical.
- Exposure: probability and impact considered together.
- A Critical-impact risk may remain open during architecture only when mitigation and gate ownership are explicit.

## 3. Risks

| ID | Risk | Prob. | Impact | Exposure | Trigger / early signal | Mitigation | Owner | Gate impact |
|---|---|---|---|---|---|---|---|---|
| R-01 | Multi-device actions create contradictory valid states | Medium | Critical | High | Duplicate calls/outcomes, stale overwrite or divergent views | Resolve authoritative transition and conflict model in A0; automate concurrency/reconnection tests | Architect/Engineering | Blocks M2/M6 |
| R-02 | Capacity differs across QR, manual, edits and outcomes | Medium | Critical | High | Public accepts while staff view says full; totals fail reconciliation | Deliver XP-01 jointly; invariant tests for every transition and race | Engineering/QA | Blocks M2/M3/M6 |
| R-03 | Timer, final call or retry applies business effects more than once | Medium | Critical | High | Duplicate grace, drifting deadline, retry changes state | One authoritative deadline; idempotency and delayed-event tests from S6 | Architect/QA | Blocks M4/M6 |
| R-04 | WhatsApp provider outage or limited status undermines trust | High | High | High | Failed/delayed callbacks, unclear delivery status | Product-controlled status page; truthful status labels; manual recovery; provider-failure rehearsal | Technical/Product owner | Blocks M4 if hidden; not queue operation |
| R-05 | Messaging cost is incompatible with initial pricing | Medium | High | Medium-High | Cost per restaurant exceeds approved assumption | Measure every attempt/outcome; review pilot usage before packaging changes | Product/CEO | Commercial pilot risk |
| R-06 | Staff finds the workflow slower than paper | Medium | Critical | High | Parallel notebook, task time or observed abandonment | Timed usability tests, minimal input, context actions, peak-pressure rehearsal | Product/UX/Project | Blocks M6/M7 |
| R-07 | Customer QR completion is poor | Medium | High | Medium-High | Repeated staff assistance, abandonment or invalid input | Mobile-first testing, clear public states, field-level errors and assisted fallback | Product/UX/QA | Blocks M3/M7 if systemic |
| R-08 | Private status link or logs expose customer data | Low-Medium | Critical | High | Cross-entry access, token/phone in URL or logs | Security review, isolation tests, data-minimized logs, retention policy | Architect/Security | Blocks M3/M7 |
| R-09 | Authorization is enforced only in UI | Medium | Critical | High | Staff can reach admin action through alternate route | Direct authorization tests for every protected action | Engineering/QA | Blocks M1/M6 |
| R-10 | Dependency cycles cause partial implementations to be falsely marked Done | High | High | High | FEAT-019/049 or FEAT-023/027 accepted separately without integration | Joint execution packages and package-level DoD | Project/Architect | Blocks M2 |
| R-11 | Team capacity or estimates make the baseline sprint plan unrealistic | High | Moderate | Medium | A0 estimates exceed iteration capacity | Keep roadmap relative; replan after estimation without changing gates | Project/Engineering | Affects dates, not scope |
| R-12 | Scope expands into reservations, table map or other platform work | Medium | High | Medium-High | New state/settings introduced as “small” addition | Formal change control and `OUT_OF_SCOPE.md` review | Product/Project | Blocks affected work |
| R-13 | History metrics cannot be reproduced after correction | Medium | High | Medium-High | Totals change inconsistently or closed record differs from events | Version metric definitions; correction and reconciliation tests | Product/Engineering/QA | Blocks M6 |
| R-14 | Pilot load or device assumptions are undefined | Medium | High | Medium-High | Performance results cannot be interpreted | Define load and supported matrix in A0 before test execution | Product/Architect/QA | Blocks M6 |
| R-15 | Accessibility and responsive obligations are deferred to the end | Medium | High | Medium-High | Critical action hidden or unusable at target breakpoint | Include P0 checks in each relevant sprint; final matrix in S10 | UX/QA | Blocks M3/M6 |
| R-16 | Temporary disconnection causes users to trust stale state | Medium | Critical | High | Reconnected device overwrites or presents success falsely | Reconnection conflict behavior, visible failure and recovery test | Architect/Engineering | Blocks M2/M6 |
| R-17 | No named incident/support owner for pilot | Medium | High | Medium-High | Live issue has no response path | Assign support, escalation and incident reconstruction process before M7 | Project/Pilot ops | Blocks M7 |
| R-18 | Documentation drifts from shipped behavior | Medium | High | Medium-High | Tests/tasks use competing IDs or undocumented behavior | Traceability review in every sprint and release DoD | Project/Product | Blocks M6 |

## 4. Critical risk posture

No risk in this register blocks the start of Architecture because each critical-severity risk is an explicit architecture and verification subject. M2, M3, M4, M6 and M7 remain blocked until their relevant critical risks are demonstrated as controlled.

## 5. Review cadence

Review risks at sprint planning, weekly delivery review, milestone gate and after every S0/S1 incident. New risks receive an owner and gate impact before the review closes.
