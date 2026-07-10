# MesaFlow — Milestones

**Document ID:** PM-MILESTONE-001  
**Product:** MesaFlow  
**Release:** MVP / Pilot Release  
**Status:** Project planning baseline  
**Owner:** Project Management  
**Version:** 1.0  
**Last updated:** 2026-07-10

---

## 1. Purpose

This document defines evidence-based milestones for the MesaFlow MVP. Milestones are achieved by outcomes and gates, not by elapsed time or percentage complete.

This document organizes execution only. It does not redefine strategy, product scope, approved behavior, technology or architecture.


## 2. Milestone summary

| Milestone | Name | Target iterations | Exit outcome |
|---|---|---|---|
| M0 | Project planning complete | Before A0 | Approved project package exists and Architecture may begin |
| M1 | Architecture baseline | A0–S1 | Technical decomposition and foundations protect all approved invariants |
| M2 | Manual queue operational | S2–S3 | Restaurant runs one manual-only service without paper |
| M3 | Customer self-entry operational | S4–S5 | Eligible customer joins and monitors without staff help |
| M4 | Call-in-pocket operational | S6–S7 | Call, timer, WhatsApp, failure and retry work coherently |
| M5 | Fairness and adaptation operational | S8 | Long-wait and repeatedly passed groups are visible and accountable |
| M6 | Pilot release candidate | S9–S10 | Full MVP and release quality gates pass |
| M7 | Live pilot entry | After M6 | Operational support, privacy, device and incident readiness are approved |

## 3. Milestone gates

### M0 — Project planning complete

Required evidence:

- all requested project documents exist;
- all 59 feature IDs are traceable;
- product consistency review is complete;
- dependency cycles and risks are recorded;
- architecture handoff questions are explicit.

### M1 — Architecture baseline

Required evidence:

- architecture covers state, service, capacity, timers, messaging, authorization, private access, audit, history and synchronization;
- engineering backlog is decomposed and estimated;
- verification approach exists for every P0 NFR;
- no unapproved behavior is introduced;
- critical external dependencies have owners.

### M2 — Manual queue operational

Required evidence:

- one service opens and closes;
- staff adds assisted groups with and without phone;
- Waiting and Recently completed remain complete;
- Seated, Cancelled and No-show transitions are explicit;
- capacity recalculates after every relevant transition;
- two devices converge and reject incompatible stale actions;
- Administrator corrects an outcome before closure;
- closed service cannot be edited.

### M3 — Customer self-entry operational

Required evidence:

- permanent QR and regeneration behavior pass;
- public no-service, intake-closed and full states differ correctly;
- required/optional fields and maximum party-size rules pass;
- duplicate and last-capacity races do not create invalid entries;
- private link is unguessable, isolated and reusable;
- customer sees honest groups-ahead information;
- mobile experience and accessibility P0 requirements pass.

### M4 — Call-in-pocket operational

Required evidence:

- multiple Called entries have independent authoritative deadlines;
- final call and two-minute grace occur exactly once;
- manual extension updates all views;
- “I’m on my way” changes no deadline;
- provider failure leaves queue state valid and visible;
- retry repeats communication only;
- consumption and provider-supported outcomes are recorded.

### M5 — Fairness and adaptation operational

Required evidence:

- elapsed wait and large-group label are correct;
- qualifying pass-over increments exactly once;
- configured long-wait threshold is applied;
- protected bypass requires a quick reason but does not block staff;
- party-size changes follow automatic/approval/capacity rules;
- manual and QR customers receive equal fairness treatment.

### M6 — Pilot release candidate

Required evidence:

- all `FEAT-001`–`FEAT-059` pass;
- PBI-060–PBI-068 pass;
- all applicable S0/S1 edge cases pass;
- all P0 NFRs pass or have approved bounded exceptions;
- full responsive, accessibility, security, load and incident rehearsals pass;
- no paper source of truth is required;
- documentation matches delivered behavior.

### M7 — Live pilot entry

Required evidence:

- named pilot restaurant and responsible contacts;
- support and incident process;
- privacy/retention procedure;
- provider and cost monitoring;
- device/browser expectations;
- pilot script, feedback collection and rollback/containment procedure;
- go/no-go approval by Product, Project and technical owner.

## 4. Milestone status rule

A milestone is either **Not achieved** or **Achieved**. “Mostly achieved” may be used for reporting progress but never authorizes work that depends on the gate.
