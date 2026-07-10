# MesaFlow — Execution Roadmap

**Document ID:** PM-ROADMAP-001  
**Product:** MesaFlow  
**Release:** MVP / Pilot Release  
**Status:** Project planning baseline  
**Owner:** Project Management  
**Version:** 1.0  
**Last updated:** 2026-07-10

---

## 1. Purpose

This roadmap converts the approved product waves into relative delivery stages and decision gates. It intentionally avoids calendar commitments until architecture and engineering estimates exist.

This document organizes execution only. It does not redefine strategy, product scope, approved behavior, technology or architecture.


## 2. Roadmap assumptions

- One architecture iteration precedes feature delivery.
- Ten delivery sprints are the baseline sequence.
- A two-week sprint is a planning assumption only.
- Sprints may be split or merged after estimation, but feature order and milestone gates must remain dependency-safe.
- Product scope remains `FEAT-001`–`FEAT-059` plus PBI-060–PBI-068 integrity work.

## 3. Roadmap overview

| Stage | Relative iterations | Approved outcome | Release status |
|---|---:|---|---|
| Architecture readiness | A0 | Technical decomposition protects all product invariants | Architecture baseline |
| Foundations | S1 | Identity, establishment, service and audit foundations | Internal foundation |
| Manual queue | S2–S3 | One complete manual-only service without paper | Milestone M2 |
| Customer self-entry | S4–S5 | QR customer joins, confirms and monitors independently | Milestone M3 |
| Call in the pocket | S6–S7 | WhatsApp call, timer, failure visibility, retry and cost evidence | Milestone M4 |
| Fairness and adaptation | S8 | Long-wait, pass-over and controlled changes work coherently | Milestone M5 |
| Completion and hardening | S9–S10 | History, responsive quality and full pilot script pass | Milestone M6 |

## 4. Detailed roadmap

### A0 — Architecture and decomposition

Outputs:

- approved architecture package;
- technical task breakdown and estimates;
- dependency-cycle decomposition;
- P0 NFR verification strategy;
- pilot-load definition proposal;
- privacy/security readiness plan;
- release environments and observability plan;
- initial test strategy and device matrix.

Gate: no architecture choice silently changes approved product behavior.

### S1 — Foundations

Features: `FEAT-001`–`FEAT-005`, `FEAT-020`, `FEAT-055`.

Outcome: one accountable restaurant context can exist, authorized staff can enter it, one service can open and material actions have an attribution foundation.

### S2–S3 — Manual queue milestone

Features: `FEAT-015`, `FEAT-017`–`FEAT-019`, `FEAT-021`–`FEAT-023`, `FEAT-025`, `FEAT-027`, `FEAT-049`–`FEAT-051`, `FEAT-054`.

Outcome: staff can run a complete manual service, share current state, resolve groups, recalculate capacity, correct current-service mistakes and close safely.

Gate M2: scripted manual-only service runs without paper on two staff devices.

### S4–S5 — Customer self-entry milestone

Features: `FEAT-006`–`FEAT-014`, `FEAT-043`–`FEAT-045`, `FEAT-057`, `FEAT-059`.

Outcome: an eligible customer can scan, understand availability, create exactly one entry, receive immediate confirmation, reopen private status and make approved low-risk edits.

Gate M3: normal QR journey and all unavailable branches pass on target mobile browsers.

### S6–S7 — Calling and messaging milestone

Features: `FEAT-016`, `FEAT-024`, `FEAT-033`–`FEAT-042`, `FEAT-048`.

Outcome: staff can call multiple groups with independent authoritative timers; customers receive the approved call or staff sees truthful failure; retry does not repeat business effects.

Gate M4: provider failure and delayed status are demonstrated without stopping queue operations.

### S8 — Fairness and operational adaptation

Features: `FEAT-026`, `FEAT-028`–`FEAT-032`, `FEAT-046`, `FEAT-053`.

Outcome: elapsed wait, large-group status, pass-overs and protected reasons remain accurate while staff retains judgement; customer party-size changes follow approval and capacity rules.

Gate M5: a repeatedly passed large group cannot remain invisible or bypassed without required accountability.

### S9–S10 — Completion, evidence and pilot hardening

Features: `FEAT-047`, `FEAT-052`, `FEAT-056`, `FEAT-058`, plus PBI-060–PBI-068.

Outcome: all customer departures and no-show recovery paths work; closed history is reproducible and read-only; staff workflows are usable on tablet and desktop; full service and failure rehearsals pass.

Gate M6: release-level Definition of Done and pilot entry criteria pass.

## 5. Post-MVP boundary

PBI-069 and above remain outside this roadmap unless Product Management records evidence, changes priority and updates affected approved documents. No post-MVP candidate may be inserted because it is technically convenient.
