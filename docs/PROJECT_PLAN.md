# MesaFlow — Project Plan

**Document ID:** PM-PLAN-001  
**Product:** MesaFlow  
**Release:** MVP / Pilot Release  
**Status:** Project planning baseline  
**Owner:** Project Management  
**Version:** 1.0  
**Last updated:** 2026-07-10

---

## 1. Purpose

This document is the controlling Project Management plan for turning the approved MesaFlow product specification into an architecture-ready and delivery-ready programme of work.

This document organizes execution only. It does not redefine strategy, product scope, approved behavior, technology or architecture.


## 2. Source authority and review status

The plan was produced after reviewing all approved CEO and Product Management documents in `docs/`.

### 2.1 Reviewed CEO documents

- `VISION.md`
- `MISSION.md`
- `BUSINESS_MODEL.md`
- `POSITIONING.md`
- `GOALS.md`
- `COMPETITIVE_ANALYSIS.md`
- `DECISION_PRINCIPLES.md`
- `NORTH_STAR.md`
- `CEO_BRAIN.md`
- `PRIORITIES.md`
- `CEO_NOTES.md`

### 2.2 Reviewed Product Management documents

- `PRODUCT_PHILOSOPHY.md`
- `PRD.md`
- `PERSONAS.md`
- `USER_JOURNEYS.md`
- `USER_STORIES.md`
- `BUSINESS_RULES.md`
- `MVP_SCOPE.md`
- `PRODUCT_BACKLOG.md`
- `FEATURE_CATALOG.md`
- `FEATURE_PRIORITIES.md`
- `ACCEPTANCE_CRITERIA.md`
- `NON_FUNCTIONAL_REQUIREMENTS.md`
- `EDGE_CASES.md`
- `OUT_OF_SCOPE.md`
- `PRODUCT_DECISIONS.md`

### 2.3 Authority rule

When an execution question appears to conflict with approved behavior, work stops at that decision point and is escalated. Project Management may sequence, split and package work, but may not alter feature outcomes, business rules, states, permissions, NFRs or scope boundaries.

## 3. Product execution objective

Deliver the approved `FEAT-001`–`FEAT-059` MVP as one trustworthy operational loop:

1. activate one restaurant context;
2. open one service;
3. accept QR and manual entries;
4. maintain one shared live queue;
5. preserve capacity and fairness truth;
6. call customers through WhatsApp while remaining operable during failure;
7. resolve every entry explicitly;
8. close the service safely;
9. expose read-only operational history suitable for pilot evaluation.

The product is not pilot-complete when isolated screens exist but this loop cannot run without paper.

## 4. Planning constraints

- All `FEAT-001`–`FEAT-059` remain P0 for the approved MVP.
- The implementation sequence follows the approved product waves, refined only to remove execution blockers.
- No reservations, table map, POS, CRM, marketplace, customer app, predictive wait time, automatic paid fallback or new lifecycle state may enter this plan.
- Every sprint must produce a demonstrable, integrated increment.
- No feature is marked Done through UI presence alone.
- S0 and S1 integrity defects block the affected gate.
- P0 NFR exceptions require explicit Product and technical approval with an owner and expiry.

## 5. Delivery model

The baseline uses one architecture iteration followed by ten relative delivery sprints. A two-week sprint is the planning assumption, not a date or staffing commitment. The Software Architect and Engineering team must estimate the decomposed work before calendar commitments are made.

| Stage | Purpose | Exit evidence |
|---|---|---|
| A0 | Architecture and technical decomposition | Architecture artifacts cover all approved product invariants and all P0 NFRs |
| S1–S3 | Establish one trustworthy manual queue | A complete manual-only service runs without paper |
| S4–S5 | Add customer self-entry and status | An eligible customer joins and monitors without staff help |
| S6–S7 | Deliver call and messaging loop | Multiple groups can be called; failure is visible and recoverable |
| S8 | Add fairness and operational adaptation | Long-wait and repeatedly passed groups cannot be silently ignored |
| S9–S10 | Complete history, responsive quality and hardening | Full pilot script passes and all release gates close |

## 6. Execution governance

### 6.1 Decision ownership

| Decision | Owner | Required consultation |
|---|---|---|
| Product outcome, priority or scope | Product Manager | CEO where strategic authority is affected |
| Sequence, milestone and delivery risk | Project Manager | Product, Architect, Engineering, QA |
| Technology and architecture | Software Architect | Engineering, Security, Product for behavior impact |
| Implementation and estimates | Engineering | Architect, Project Manager |
| Acceptance and release quality | Product + QA | Project Manager, Engineering |
| Pilot release decision | Product + Project + Technical owner | CEO/Founder and pilot operations |

### 6.2 Escalation triggers

Escalate before work continues when a proposal:

- changes a lifecycle state or transition;
- changes who consumes capacity;
- changes queue position meaning;
- changes timer or grace behavior;
- creates another communication channel;
- weakens role enforcement, audit or private-link isolation;
- adds an out-of-scope capability;
- requires paper to remain the source of truth;
- cannot satisfy an applicable P0 NFR.

## 7. Consistency review

### 7.1 Product consistency

No material contradiction was found between the approved CEO strategy and the Product Management specification. The product documents consistently preserve the waitlist wedge, no-app customer flow, human operational control, WhatsApp-first communication, truthful failure handling and explicit scope boundary.

The statement in `CEO_NOTES.md` that SMS may be considered as fallback is interpreted as a future consideration, not MVP approval. The later explicit MVP decisions prohibit automatic paid SMS or voice fallback.

### 7.2 Execution-level dependency circularities

Two circular groups exist in the feature dependency table:

1. `FEAT-023` / `FEAT-024` / `FEAT-025` ↔ `FEAT-027`;
2. `FEAT-019` ↔ `FEAT-049` / `FEAT-050` / `FEAT-051`.

These are not conflicting product requirements. They describe mutually necessary integrated behavior. They are managed as joint delivery packages; no member is marked Done until the package passes integrated acceptance. Architecture must decompose the enabling slices without changing the feature IDs or outcomes.

## 8. Required inputs still to be resolved

The following are not missing product requirements, but they are required before final estimates or live pilot:

- engineering team composition and available capacity;
- technical estimates after architecture decomposition;
- agreed normal pilot-load profile;
- supported-browser matrix;
- privacy retention, deletion and access procedure;
- selected WhatsApp provider capability and truthful status model;
- pilot support ownership and incident-response contacts;
- final test devices representative of pilot restaurants.

None blocks the start of Software Architecture. The relevant item must be closed before its delivery or pilot gate.

## 9. Project success criteria

The project succeeds when:

- all 59 canonical features satisfy their acceptance criteria;
- PBI-060–PBI-068 integrity outcomes pass end to end;
- all applicable S0/S1 edge cases pass;
- all P0 NFRs pass or have an approved bounded exception;
- the full service script runs without a parallel paper record;
- the queue remains trustworthy during concurrency, reconnection and messaging failure;
- closed-service history is read-only and reproducible;
- the release is usable on target staff and customer form factors;
- documentation accurately reflects delivered behavior.

## 10. Architecture gate

| Gate question | Answer |
|---|---|
| Is the product sufficiently defined to start architecture? | **Yes.** The canonical behavior, boundaries, rules, acceptance criteria, NFRs and edge cases are defined. |
| Is any information missing? | **No blocking product information.** Operational and technical inputs listed in Section 8 remain to be resolved during architecture and release preparation. |
| Is there any inconsistency between documents? | **No material product inconsistency.** Two execution dependency circularities require joint decomposition. |
| Is there any critical risk? | **No unmitigated risk that blocks architecture.** Data integrity, multi-device concurrency, provider degradation and privacy are critical-severity delivery risks and must be addressed early. |

## 11. Gate decision

Project Planning Phase Complete

Ready for Software Architecture.
