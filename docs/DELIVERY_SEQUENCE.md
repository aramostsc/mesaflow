# MesaFlow — Delivery Sequence

**Document ID:** PM-SEQ-001  
**Product:** MesaFlow  
**Release:** MVP / Pilot Release  
**Status:** Project planning baseline  
**Owner:** Project Management  
**Version:** 1.0  
**Last updated:** 2026-07-10

---

## 1. Purpose

This document defines the dependency-safe order in which the approved MVP should be delivered and integrated.

This document organizes execution only. It does not redefine strategy, product scope, approved behavior, technology or architecture.


## 2. Sequence doctrine

The sequence minimizes rework by establishing operational truth before customer convenience and by integrating each differentiated capability into an already trustworthy queue.

## 3. Ordered delivery packages

### DS-00 — Architecture readiness

**Input:** all approved CEO/Product documents and this planning package.  
**Output:** technical decomposition, estimates and verification plan.  
**Gate:** A0.

### DS-01 — Accountable operating context

**Features:** `FEAT-001`–`FEAT-005`, `FEAT-020`, `FEAT-055`.

Order:

1. Administrator identity and establishment;
2. guided operational settings;
3. individual Staff access and permission enforcement;
4. service opening;
5. material-action attribution foundation.

### DS-02 — Queue truth vertical package

**Features:** `FEAT-015`, `FEAT-017`–`FEAT-019`, `FEAT-023`, `FEAT-025`, `FEAT-049`–`FEAT-051`.

Order is iterative, not strictly linear because capacity and outcomes are mutually dependent:

1. accept a manual Waiting entry;
2. display it in the active queue;
3. apply configured weight and capacity;
4. resolve as Seated/Cancelled/No-show;
5. recalculate capacity and active sections;
6. expose recently completed result;
7. repeat for each transition and race until one truth is preserved.

### DS-03 — Shared service control and closure

**Features:** `FEAT-021`, `FEAT-022`, `FEAT-027`, `FEAT-054`.

Order:

1. propagate accepted queue changes;
2. reject stale/incompatible actions;
3. close/reopen intake;
4. correct current-service outcome with audit/recalculation;
5. prevent closure with active entries;
6. close into immutable record boundary.

**Gate:** M2 manual service without paper.

### DS-04 — Public QR intake

**Features:** `FEAT-006`–`FEAT-014`.

Order:

1. permanent QR and printable asset;
2. public welcome tied to current service state;
3. mobile required fields and optional needs;
4. duplicate and maximum-party validation;
5. atomic capacity acceptance;
6. distinct no-service, intake-closed and full states;
7. QR regeneration without invalidating accepted customers.

### DS-05 — Private customer continuity

**Features:** `FEAT-043`–`FEAT-045`, `FEAT-057`, `FEAT-059`.

Order:

1. immediate confirmation and private link;
2. groups-ahead/elapsed status;
3. safe reopen and final/expired view;
4. approved name/preference edits;
5. mobile, accessibility and discreet-branding validation.

**Gate:** M3 self-entry.

### DS-06 — Call and provider core

**Features:** `FEAT-016`, `FEAT-033`, `FEAT-034`, `FEAT-038`, `FEAT-040`.

Order:

1. contact/no-contact distinction;
2. atomic Waiting→Called action;
3. authoritative per-entry deadline;
4. approved WhatsApp attempt where contact exists;
5. truthful provider status;
6. multi-device/customer status propagation.

### DS-07 — Timer recovery and communication economics

**Features:** `FEAT-024`, `FEAT-035`–`FEAT-037`, `FEAT-039`, `FEAT-041`, `FEAT-042`, `FEAT-048`.

Order:

1. Called section and multiple independent timers;
2. final-call trigger;
3. one-time two-minute grace;
4. manual additional time;
5. constrained templates;
6. retry without repeated effects;
7. usage/outcome measurement;
8. acknowledgement without deadline change.

**Gate:** M4 call in the pocket.

### DS-08 — Fairness and controlled adaptation

**Features:** `FEAT-026`, `FEAT-028`–`FEAT-032`, `FEAT-046`, `FEAT-053`.

Order:

1. elapsed wait and party-size filter;
2. large-group label;
3. qualifying pass-over count;
4. long-wait warning;
5. protected bypass reason;
6. party-size reduction/increase/approval conflicts;
7. lightweight internal notes without new state.

**Gate:** M5 fairness.

### DS-09 — Completion and history

**Features:** `FEAT-047`, `FEAT-052`, `FEAT-056`.

Order:

1. confirmed customer departure;
2. no-show reactivation at queue end with capacity check;
3. service metric reconciliation;
4. basic read-only history.

### DS-10 — Responsive hardening and pilot proof

**Features:** `FEAT-058`; integrity `PBI-060`–`PBI-068`.

Order:

1. complete staff tablet/desktop matrix;
2. full service without paper;
3. concurrency and reconnection rehearsal;
4. provider degradation rehearsal;
5. entry-path equality and capacity integrity;
6. private-access/security regression;
7. fairness and device usability validation;
8. pilot evidence reconciliation;
9. M6/M7 go-no-go.

## 4. Sequence change rule

The Software Architect may recommend task-level reordering. The Project Manager may reallocate sprint placement. Neither may skip a gate, move a dependent product outcome ahead of a missing prerequisite, or declare a joint package complete through partial behavior.
