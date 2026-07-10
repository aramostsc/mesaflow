# MesaFlow — Sprint Plan

**Document ID:** PM-SPRINT-001  
**Product:** MesaFlow  
**Release:** MVP / Pilot Release  
**Status:** Project planning baseline  
**Owner:** Project Management  
**Version:** 1.0  
**Last updated:** 2026-07-10

---

## 1. Purpose

This document provides a relative sprint baseline for a delivery team. It is not a calendar commitment and must be re-estimated after Architecture iteration A0.

This document organizes execution only. It does not redefine strategy, product scope, approved behavior, technology or architecture.


## 2. Cadence assumption

- Baseline sprint length: two weeks.
- Architecture iteration A0 precedes delivery.
- Each delivery sprint ends with an integrated demonstration and retrospective.
- S0/S1 defects discovered in the sprint are resolved before the affected milestone gate.
- Carry-over is visible; unfinished work is not relabelled Done.

## 3. Sprint sequence

| Iteration | Goal | Canonical features | Demonstration | Exit gate |
|---|---|---|---|---|
| A0 | Architecture and technical decomposition | No feature completion claimed | Architecture review against product invariants and P0 NFRs | Decomposed backlog is estimable and dependency-safe |
| S1 | Establish accountable restaurant and service foundations | FEAT-001–005, FEAT-020, FEAT-055 | Admin creates context, invites Staff, opens service; actions are attributable | Role and service foundation accepted |
| S2 | Create integrated queue-truth package | FEAT-015, 017–019, 023, 025, 049–051 | Staff adds, views and resolves manual entries; capacity updates | XP-01 core invariants pass on one device |
| S3 | Complete synchronized manual service | FEAT-021–022, 027, 054 | Two devices operate one service, close/reopen intake, correct and close safely | M2 manual-only service without paper |
| S4 | Deliver QR and public entry | FEAT-006–014 | Customer scans, joins and receives correct unavailable states | QR acceptance, duplicate and capacity races pass |
| S5 | Complete private customer experience | FEAT-043–045, 057, 059 | Customer confirms, reopens status and edits approved fields on mobile | M3 customer self-entry gate |
| S6 | Deliver core call and provider interaction | FEAT-016, 033–034, 038, 040 | Staff calls multiple contact/no-contact groups and sees truthful status | Called state and provider-degradation foundation pass |
| S7 | Complete timer, retry and usage behavior | FEAT-024, 035–037, 039, 041–042, 048 | Final call adds grace once; retry is idempotent; acknowledgement changes no timer | M4 call-in-pocket gate |
| S8 | Deliver fairness and adaptation | FEAT-026, 028–032, 046, 053 | Large group accumulates pass-overs; party-size changes and notes work | M5 fairness gate |
| S9 | Complete departure, recovery and history | FEAT-047, 052, 056 | Customer leaves safely; no-show returns at end; service history reconciles | Completion/history acceptance passes |
| S10 | Responsive hardening and pilot rehearsal | FEAT-058; PBI-060–068 | Full service, failures, concurrency and device matrix rehearsed | M6 pilot-release candidate |

## 4. Sprint-level planning template

Every sprint plan must state:

- sprint goal expressed as an operational outcome;
- included `FEAT` and `PBI` identifiers;
- acceptance criteria and journeys to demonstrate;
- applicable critical edge cases and P0 NFRs;
- dependencies expected at sprint start;
- owners for product, engineering, QA and unblock decisions;
- test data and device/environment needs;
- explicit non-goals;
- measurable exit evidence.

## 5. Sprint review rules

A sprint review must demonstrate real behavior rather than slides. For queue features, the demonstration must include at least two actors or surfaces when the product outcome spans staff/customer or multiple staff devices.

## 6. Sprint replanning rules

The Project Manager may change sprint allocation after estimation when:

- a package is too large for available capacity;
- a critical dependency is not Ready;
- an S0/S1 defect blocks the milestone;
- the Architect identifies a decomposition required to preserve behavior.

Replanning may not move a dependent feature ahead of its prerequisite or remove a P0 outcome without Product Management approval.
