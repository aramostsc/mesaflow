# MesaFlow — Product Backlog

**Document ID:** PROD-BACKLOG-001  
**Product:** MesaFlow  
**Status:** Approved product backlog baseline  
**Owner:** Product Management  
**Version:** 1.0  
**Last updated:** 2026-07-10

---

## 1. Purpose

This document organizes approved MesaFlow product work without converting Product Management into technical project planning.

The backlog defines:

- product backlog item identifiers;
- user or business outcome;
- priority;
- canonical feature relationship;
- dependencies;
- readiness;
- evidence required before future items enter scope.

It does not define:

- sprint dates;
- engineering estimates;
- assignees;
- technology;
- architecture;
- database tasks;
- implementation sequence below the product-wave level.

---

## 2. Backlog hierarchy

| Level | Purpose |
|---|---|
| Epic | Groups related product outcomes |
| Feature | Canonical user-visible or operational capability |
| Product backlog item | Prioritizable expression of an outcome |
| Engineering task | Defined later by Engineering or Project Management |

For the MVP baseline, each canonical feature has one primary backlog item:

- `FEAT-001` maps to `PBI-001`;
- …
- `FEAT-059` maps to `PBI-059`.

Integrity items `PBI-060`–`PBI-068` ensure the product works as one system.

---

## 3. Status definitions

| Status | Meaning |
|---|---|
| Ready for architecture | Product outcome and boundaries are sufficiently defined |
| Needs technical decomposition | Product is defined; Engineering must create implementation work |
| Evidence required | Future item must not enter scope before validation |
| Deferred | Deliberately not scheduled for the MVP |
| Rejected for MVP | Conflicts with current scope |

---

## 4. MVP backlog


## EPIC-A — Account, establishment and access

| PBI ID | Canonical feature | Outcome | Dependencies | Priority | Status |
|---|---|---|---|---|---|
| PBI-001 | FEAT-001 — Administrator account creation | A first internal user can create an account and becomes Administrator. | None | P0 | Ready for architecture |
| PBI-002 | FEAT-002 — Establishment profile | Administrator stores required restaurant identity, contact, language and time-zone information. | FEAT-001 | P0 | Ready for architecture |
| PBI-003 | FEAT-003 — Guided operational setup | The product provides recommended defaults and collects only approved queue settings. | FEAT-002 | P0 | Ready for architecture |
| PBI-004 | FEAT-004 — Individual staff invitation and access | Administrator invites individual Staff users. | FEAT-001, FEAT-002 | P0 | Ready for architecture |
| PBI-005 | FEAT-005 — Permissions | Administrator and Staff permissions follow Section 11. | FEAT-001, FEAT-004 | P0 | Ready for architecture |

## EPIC-B — QR and public entry

| PBI ID | Canonical feature | Outcome | Dependencies | Priority | Status |
|---|---|---|---|---|---|
| PBI-006 | FEAT-006 — Permanent establishment QR | One permanent public QR points to the current establishment queue state. | FEAT-002 | P0 | Ready for architecture |
| PBI-007 | FEAT-007 — QR download | Administrator can obtain a printable asset. | FEAT-006 | P0 | Ready for architecture |
| PBI-008 | FEAT-008 — QR regeneration | Administrator can invalidate the old entry link and issue a new QR after warning and confirmation. | FEAT-006, FEAT-005 | P0 | Ready for architecture |
| PBI-009 | FEAT-009 — Public welcome and state screen | Show restaurant identity, current queue state and appropriate next action. | FEAT-002, FEAT-006, FEAT-020, FEAT-021 | P0 | Ready for architecture |
| PBI-010 | FEAT-010 — Customer queue-entry form | Collect name, phone and party size with mobile-friendly validation. | FEAT-009, FEAT-020 | P0 | Ready for architecture |
| PBI-011 | FEAT-011 — Optional seating needs | Capture approved optional preferences without making them mandatory. | FEAT-010 | P0 | Ready for architecture |
| PBI-012 | FEAT-012 — Duplicate prevention | Block a second active entry for the same phone in the same queue. | FEAT-010 | P0 | Ready for architecture |
| PBI-013 | FEAT-013 — Maximum QR party size | Block self-entry above the configured size and direct the customer to staff. | FEAT-003, FEAT-010 | P0 | Ready for architecture |
| PBI-014 | FEAT-014 — Full and closed states | Show distinct no-service, intake-closed and queue-full states. | FEAT-009, FEAT-018, FEAT-019, FEAT-021 | P0 | Ready for architecture |

## EPIC-C — Manual entry and queue capacity

| PBI ID | Canonical feature | Outcome | Dependencies | Priority | Status |
|---|---|---|---|---|---|
| PBI-015 | FEAT-015 — Manual entry | Staff can add a group with name and party size; phone is optional. | FEAT-020, FEAT-023 | P0 | Ready for architecture |
| PBI-016 | FEAT-016 — No-contact handling | Clearly label no-contact entries and suppress automated attempts. | FEAT-015, FEAT-038 | P0 | Ready for architecture |
| PBI-017 | FEAT-017 — Weighted capacity | Use one- or two-slot weighting with a configurable cutoff. | FEAT-003 | P0 | Ready for architecture |
| PBI-018 | FEAT-018 — Maximum slots | Administrator sets maximum active slots. | FEAT-003, FEAT-017 | P0 | Ready for architecture |
| PBI-019 | FEAT-019 — Capacity recalculation | Recalculate consistently and update public intake state. | FEAT-017, FEAT-018, FEAT-049, FEAT-050, FEAT-051 | P0 | Ready for architecture |

## EPIC-D — Service operation

| PBI ID | Canonical feature | Outcome | Dependencies | Priority | Status |
|---|---|---|---|---|---|
| PBI-020 | FEAT-020 — Open service | Authorized staff opens a new service. | FEAT-002, FEAT-003 | P0 | Ready for architecture |
| PBI-021 | FEAT-021 — Close/reopen entries | Toggle customer self-entry without resolving existing groups. | FEAT-020 | P0 | Ready for architecture |
| PBI-022 | FEAT-022 — Safe service closure | Block closure until no Waiting or Called entries remain. | FEAT-020, FEAT-049, FEAT-050, FEAT-051 | P0 | Ready for architecture |
| PBI-023 | FEAT-023 — Waiting section | Show chronological list and approved operational indicators. | FEAT-020, FEAT-027 | P0 | Ready for architecture |
| PBI-024 | FEAT-024 — Called section | Show independent timers and call actions. | FEAT-033, FEAT-034, FEAT-027 | P0 | Ready for architecture |
| PBI-025 | FEAT-025 — Recently completed | Show current-service terminal entries without dominating active work. | FEAT-049, FEAT-050, FEAT-051 | P0 | Ready for architecture |
| PBI-026 | FEAT-026 — Party-size filtering | Filter without changing canonical order. | FEAT-023 | P0 | Ready for architecture |
| PBI-027 | FEAT-027 — Multi-device synchronization | Propagate queue changes rapidly and prevent conflicting valid transitions. | FEAT-023, FEAT-024, FEAT-025 | P0 | Ready for architecture |

## EPIC-E — Fairness and prioritization

| PBI ID | Canonical feature | Outcome | Dependencies | Priority | Status |
|---|---|---|---|---|---|
| PBI-028 | FEAT-028 — Elapsed wait | Show continuously understandable elapsed wait. | FEAT-023 | P0 | Ready for architecture |
| PBI-029 | FEAT-029 — Large-group label | Apply label according to configured weighting cutoff or approved large-group rule. | FEAT-017, FEAT-023 | P0 | Ready for architecture |
| PBI-030 | FEAT-030 — Pass-over count | Count qualifying later-seated groups. | FEAT-023, FEAT-049 | P0 | Ready for architecture |
| PBI-031 | FEAT-031 — Long-wait warning | Highlight at one of four configured thresholds. | FEAT-003, FEAT-028 | P0 | Ready for architecture |
| PBI-032 | FEAT-032 — Protected pass-over reason | Require a quick reason in protected cases without blocking the action. | FEAT-030, FEAT-031 | P0 | Ready for architecture |

## EPIC-F — Calling and messaging

| PBI ID | Canonical feature | Outcome | Dependencies | Priority | Status |
|---|---|---|---|---|---|
| PBI-033 | FEAT-033 — Call group | Move entry to Called, begin timer and attempt notification. | FEAT-023, FEAT-038 | P0 | Ready for architecture |
| PBI-034 | FEAT-034 — Individual countdown | Show synchronized remaining time per entry. | FEAT-033, FEAT-027 | P0 | Ready for architecture |
| PBI-035 | FEAT-035 — Final call | Attempt the final-call message one minute before the original deadline. | FEAT-034, FEAT-038 | P0 | Ready for architecture |
| PBI-036 | FEAT-036 — Grace period | Add two minutes exactly once. | FEAT-035 | P0 | Ready for architecture |
| PBI-037 | FEAT-037 — Manual additional time | Staff extends a timer and all views update. | FEAT-034 | P0 | Ready for architecture |
| PBI-038 | FEAT-038 — WhatsApp messages | Use WhatsApp for approved operational calls where contact exists. | FEAT-010, FEAT-015 | P0 | Ready for architecture |
| PBI-039 | FEAT-039 — Template personalization | Allow constrained approved fields, not unlimited automation. | FEAT-003, FEAT-038 | P0 | Ready for architecture |
| PBI-040 | FEAT-040 — Delivery visibility | Show truthful provider-supported status. | FEAT-038 | P0 | Ready for architecture |
| PBI-041 | FEAT-041 — Retry | Staff retries without duplicating grace periods or state transitions. | FEAT-040 | P0 | Ready for architecture |
| PBI-042 | FEAT-042 — Consumption measurement | Count message attempts and outcomes per establishment. | FEAT-038, FEAT-040 | P0 | Ready for architecture |

## EPIC-G — Customer status and self-service

| PBI ID | Canonical feature | Outcome | Dependencies | Priority | Status |
|---|---|---|---|---|---|
| PBI-043 | FEAT-043 — Private status page | Provide an unguessable entry-specific web link. | FEAT-010 | P0 | Ready for architecture |
| PBI-044 | FEAT-044 — Groups-ahead position | Show groups ahead and the order-variation explanation. | FEAT-043, FEAT-023 | P0 | Ready for architecture |
| PBI-045 | FEAT-045 — Customer edit | Allow name and preference edits; phone remains staff-controlled. | FEAT-043 | P0 | Ready for architecture |
| PBI-046 | FEAT-046 — Party-size change | Apply reductions and low-risk increases automatically; route larger increases for approval. | FEAT-043, FEAT-017, FEAT-019 | P0 | Ready for architecture |
| PBI-047 | FEAT-047 — Confirmed leave | Require explicit confirmation before customer cancellation. | FEAT-043, FEAT-050 | P0 | Ready for architecture |
| PBI-048 | FEAT-048 — “I’m on my way” | Record acknowledgement without extending time. | FEAT-033, FEAT-043 | P0 | Ready for architecture |

## EPIC-H — Outcomes, correction and history

| PBI ID | Canonical feature | Outcome | Dependencies | Priority | Status |
|---|---|---|---|---|---|
| PBI-049 | FEAT-049 — Mark Seated | Allow from Waiting or Called and update all dependent information. | FEAT-023, FEAT-024, FEAT-019 | P0 | Ready for architecture |
| PBI-050 | FEAT-050 — Cancel with actor/reason | Preserve cancellation source. | FEAT-023, FEAT-024, FEAT-019 | P0 | Ready for architecture |
| PBI-051 | FEAT-051 — Mark No-show | Staff explicitly resolves the entry as No-show. | FEAT-024, FEAT-019 | P0 | Ready for architecture |
| PBI-052 | FEAT-052 — Reactivate No-show | Return it to Waiting at the queue end. | FEAT-051, FEAT-019 | P0 | Ready for architecture |
| PBI-053 | FEAT-053 — Internal notes | Staff can add non-customer-visible operational notes. | FEAT-023, FEAT-024 | P0 | Ready for architecture |
| PBI-054 | FEAT-054 — Outcome correction | Permit an Administrator to correct a completed outcome during the current service, with recalculation and audit. | FEAT-025, FEAT-055 | P0 | Ready for architecture |
| PBI-055 | FEAT-055 — Audit trail | Preserve material events and actors. | FEAT-001, FEAT-004 | P0 | Ready for architecture |
| PBI-056 | FEAT-056 — Closed-service history | Provide the approved summary and read-only records. | FEAT-022, FEAT-055 | P0 | Ready for architecture |

## EPIC-I — Brand and responsive experience

| PBI ID | Canonical feature | Outcome | Dependencies | Priority | Status |
|---|---|---|---|---|---|
| PBI-057 | FEAT-057 — Discreet branding | Show small MesaFlow branding on customer pages in the initial plan. | FEAT-009, FEAT-043 | P0 | Ready for architecture |
| PBI-058 | FEAT-058 — Tablet and desktop staff experience | Primary staff workflows are fully usable on both form factors. | FEAT-023, FEAT-024, FEAT-025 | P0 | Ready for architecture |
| PBI-059 | FEAT-059 — Mobile-first customer experience | All public and status flows are designed for common mobile screens. | FEAT-009, FEAT-010, FEAT-043 | P0 | Ready for architecture |

## EPIC-J — Cross-feature integrity

| PBI ID | Integrity item | Outcome | Story | Dependencies | Priority | Status |
|---|---|---|---|---|---|---|
| PBI-060 | Complete service without paper | A restaurant can open, operate and close a service using MesaFlow as the sole waiting-list truth. | US-060 | All P0 operational epics | P0 | Ready for architecture |
| PBI-061 | Single current entry truth | Concurrent devices, retries and reconnections preserve one authoritative lifecycle state. | US-061 | FEAT-027, FEAT-055 | P0 | Ready for architecture |
| PBI-062 | Messaging-provider degradation | The queue remains operational and honest when WhatsApp is unavailable. | US-062 | FEAT-038–FEAT-042 | P0 | Ready for architecture |
| PBI-063 | Entry-path equality | Manual and QR customers use the same queue, capacity and fairness rules. | US-063 | FEAT-010, FEAT-015–FEAT-019 | P0 | Ready for architecture |
| PBI-064 | Fairness without rigid automation | Long waits and pass-overs remain visible while Staff retains operational control. | US-064 | FEAT-028–FEAT-032 | P0 | Ready for architecture |
| PBI-065 | Cross-path capacity integrity | QR, manual entry, edits, outcomes and reactivation use one weighted-capacity truth. | US-065 | FEAT-017–FEAT-019, FEAT-046, FEAT-049–FEAT-052 | P0 | Ready for architecture |
| PBI-066 | Private customer access | Entry-specific links expose only approved data and remain usable without accounts. | US-066 | FEAT-043–FEAT-048 | P0 | Ready for architecture |
| PBI-067 | Restaurant-device usability | All primary Staff operations work on tablet and desktop. | US-067 | FEAT-058 | P0 | Ready for architecture |
| PBI-068 | Pilot evidence baseline | Closed services and message usage provide enough evidence for continuation decisions. | US-068 | FEAT-042, FEAT-055–FEAT-056 | P0 | Ready for architecture |

## 5. P1 — Post-pilot hardening and optimization

| PBI ID | Candidate | Outcome | Evidence required | Priority | Status |
|---|---|---|---|---|---|
| PBI-069 | Multilingual customer experience | Add validated customer-facing languages without changing queue rules. | Repeated pilot demand across language groups. | P1 | Evidence required |
| PBI-070 | Improved onboarding guidance | Refine explanations, examples and setup assistance from observed confusion. | Onboarding observation identifies repeated friction. | P1 | Evidence required |
| PBI-071 | Downloadable basic service report | Allow Administrator to export the approved basic service summary. | Restaurants repeatedly need offline sharing or records. | P1 | Evidence required |
| PBI-072 | Service comparison view | Compare a small number of approved metrics across services without advanced BI. | Administrators repeatedly review trends. | P1 | Evidence required |
| PBI-073 | Expanded constrained templates | Add validated operational template variants while preserving mandatory meaning. | Repeated restaurant need not solved by current fields. | P1 | Evidence required |
| PBI-074 | Branding-plan option | Evaluate paid control of discreet MesaFlow branding. | Demonstrated willingness to pay. | P1 | Evidence required |
| PBI-075 | Saved configuration presets | Offer simple presets for restaurant types if onboarding evidence supports them. | Repeated similar configurations across pilots. | P1 | Evidence required |
| PBI-076 | Customer-language selection | Allow a customer to select among launched languages. | Multiple languages are launched and selection adds value. | P1 | Evidence required |
| PBI-077 | Operational empty-state refinement | Improve education and next action in empty Staff states. | Observed Staff confusion. | P1 | Evidence required |
| PBI-078 | History metric definitions in UI | Expose concise explanations for approved metrics. | Administrators misinterpret current definitions. | P1 | Evidence required |
| PBI-079 | Pilot feedback capture support | Provide lightweight in-product or linked feedback at approved moments. | Manual feedback collection proves too unreliable. | P1 | Evidence required |
| PBI-080 | Browser and device hardening | Expand documented compatibility based on actual pilot device use. | Unsupported but common devices appear in pilots. | P1 | Evidence required |

## 6. P2 — Product expansion

| PBI ID | Candidate | Outcome | Admission evidence | Priority | Status |
|---|---|---|---|---|---|
| PBI-081 | Predictive wait time | Provide a measured restaurant-specific estimate with explicit uncertainty. | Enough clean history, stable metric definitions and proven customer value. | P2 | Deferred |
| PBI-082 | Multiple simultaneous queues | Support genuinely separate operational queues. | Repeated need that cannot be handled with preferences and filters. | P2 | Deferred |
| PBI-083 | Multiple establishments | Allow an owner to manage more than one location. | A paying restaurant group requires it. | P2 | Deferred |
| PBI-084 | Reservation management | Connect advance bookings to restaurant operations. | Core waitlist retention is proven and reservation demand repeats. | P2 | Deferred |
| PBI-085 | Table map and table inventory | Represent physical tables and availability. | Lack of table structure materially limits value. | P2 | Deferred |
| PBI-086 | Controlled white-label plan | Remove MesaFlow attribution for an approved paid tier. | Commercial willingness to pay is validated. | P2 | Deferred |
| PBI-087 | Advanced reporting | Add deeper analysis beyond the approved service summary. | Restaurants make recurring management decisions from current history. | P2 | Deferred |
| PBI-088 | Optional paid fallback channel | Add SMS or another fallback with transparent cost controls. | Messaging failure impact and willingness to pay are validated. | P2 | Deferred |

## 7. P3 — Ecosystem expansion

| PBI ID | Candidate | Outcome | Admission evidence | Priority | Status |
|---|---|---|---|---|---|
| PBI-089 | POS integration | Connect waitlist outcomes to a validated POS workflow. | Specific vendor and measurable acquisition or retention value. | P3 | Deferred |
| PBI-090 | CRM and loyalty | Support consented cross-visit customer relationships. | Queue product is established and privacy/value model is clear. | P3 | Deferred |
| PBI-091 | Restaurant marketplace | Create customer discovery and demand aggregation. | Meaningful supply density and consumer strategy exist. | P3 | Deferred |
| PBI-092 | Demand forecasting | Use historical data to forecast future walk-in demand. | Reliable data volume and management use case exist. | P3 | Deferred |
| PBI-093 | Staffing recommendations | Relate demand patterns to staffing decisions. | Demand forecasting is reliable and restaurants request it. | P3 | Deferred |
| PBI-094 | Automated marketing | Send non-operational customer communications. | Consent, purpose, pricing and strategic category expansion are approved. | P3 | Deferred |

## 8. Rejected for the MVP

| Candidate | Reason |
|---|---|
| Native customer application | Conflicts with no-install, low-friction MVP proposition. |
| Customer account requirement | Adds friction to a temporary queue interaction. |
| Strict automatic FIFO enforcement | Conflicts with table compatibility and Staff judgement. |
| Automatic No-show on timer expiry | Treats a signal as proof and removes human context. |
| Shared Staff PIN as primary access | Weakens attribution. |
| Free-form message automation | Expands into campaign and automation tooling. |
| Hidden predicted waiting time | Creates false precision without sufficient data. |
| Paper as official fallback truth | Defeats MesaFlow’s operational purpose. |

---

## 9. Backlog totals

This baseline contains **94 product backlog items**:

- 59 canonical MVP feature items;
- 9 cross-feature integrity items;
- 12 P1 hardening candidates;
- 8 P2 expansion candidates;
- 6 P3 ecosystem candidates.

---

## 10. Definition of ready

A backlog item is ready for architecture or delivery planning when:

1. target persona is clear;
2. problem and outcome are validated or strategically approved;
3. canonical feature and story exist for MVP work;
4. acceptance criteria exist;
5. business rules are known;
6. edge cases and NFRs are referenced;
7. scope exclusions are clear;
8. no unresolved CEO-strategy conflict remains.

---

## 11. Definition of product done

A backlog item is product-done when:

- its acceptance criteria pass;
- linked journeys work;
- applicable S0 and S1 edge cases pass;
- applicable P0 NFRs pass;
- metrics and audit exist where required;
- no unapproved scope was added;
- documentation reflects the shipped behavior.

---

## 12. Backlog admission for new requests

A new request must include:

- who experiences the problem;
- how often it occurs;
- current workaround;
- severity;
- evidence from target restaurants;
- expected outcome;
- new states, rules or settings required;
- effect on simplicity;
- effect on message cost or privacy;
- proposed success evidence.

“Competitors have it” or “it is easy to build” is not sufficient evidence.

---

## 13. Backlog review moments

Review the backlog:

- after each restaurant onboarding;
- after significant live-service incidents;
- after the 30-day pilot;
- when a request repeats across the target segment;
- when WhatsApp economics change;
- before moving any P2 or P3 item into active product scope.

---

## 14. Product/Project boundary

Product Management owns:

- priority;
- outcome;
- scope;
- rules;
- acceptance;
- evidence.

Project Management and Engineering later own:

- sequencing within approved waves;
- estimates;
- staffing;
- milestones;
- technical dependencies;
- implementation tasks;
- delivery risk.

This backlog must not be converted into a technical architecture by Product Management.
