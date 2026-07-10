# MesaFlow — Execution Epics

**Document ID:** PM-EPIC-001  
**Product:** MesaFlow  
**Release:** MVP / Pilot Release  
**Status:** Project planning baseline  
**Owner:** Project Management  
**Version:** 1.0  
**Last updated:** 2026-07-10

---

## 1. Purpose

This document defines the delivery framing, entry conditions, exit conditions and cross-epic handoffs for the approved canonical product epics.

This document organizes execution only. It does not redefine strategy, product scope, approved behavior, technology or architecture.

## 2. Epic completion rule

An epic is complete only when all included features satisfy their acceptance criteria in the linked journeys, applicable critical edge cases and P0 NFRs. Completion cannot be inferred from feature count alone.

## EPIC-A — Account, establishment and access

**Execution outcome:** A restaurant can activate the product, protect structural settings and attribute staff actions.

**Features:** `FEAT-001`, `FEAT-002`, `FEAT-003`, `FEAT-004`, `FEAT-005`

### Included outcomes

- `FEAT-001` — Administrator account creation: A first internal user can create an account and becomes Administrator.
- `FEAT-002` — Establishment profile: Administrator stores required restaurant identity, contact, language and time-zone information.
- `FEAT-003` — Guided operational setup: The product provides recommended defaults and collects only approved queue settings.
- `FEAT-004` — Individual staff invitation and access: Administrator invites individual Staff users.
- `FEAT-005` — Permissions: Administrator and Staff permissions follow Section 11.

### External feature dependencies

None; this epic contains root capabilities.

### Entry condition

Approved identity, role and establishment behaviors are available to Architecture.

### Exit condition

Administrator and Staff permissions are enforced through every path, and material actions remain attributable.

## EPIC-B — QR and public entry

**Execution outcome:** Customers can understand queue availability and self-enter without staff help.

**Features:** `FEAT-006`, `FEAT-007`, `FEAT-008`, `FEAT-009`, `FEAT-010`, `FEAT-011`, `FEAT-012`, `FEAT-013`, `FEAT-014`

### Included outcomes

- `FEAT-006` — Permanent establishment QR: One permanent public QR points to the current establishment queue state.
- `FEAT-007` — QR download: Administrator can obtain a printable asset.
- `FEAT-008` — QR regeneration: Administrator can invalidate the old entry link and issue a new QR after warning and confirmation.
- `FEAT-009` — Public welcome and state screen: Show restaurant identity, current queue state and appropriate next action.
- `FEAT-010` — Customer queue-entry form: Collect name, phone and party size with mobile-friendly validation.
- `FEAT-011` — Optional seating needs: Capture approved optional preferences without making them mandatory.
- `FEAT-012` — Duplicate prevention: Block a second active entry for the same phone in the same queue.
- `FEAT-013` — Maximum QR party size: Block self-entry above the configured size and direct the customer to staff.
- `FEAT-014` — Full and closed states: Show distinct no-service, intake-closed and queue-full states.

### External feature dependencies

`FEAT-002`, `FEAT-003`, `FEAT-005`, `FEAT-018`, `FEAT-019`, `FEAT-020`, `FEAT-021`

### Entry condition

Establishment, service state and queue-capacity contracts are available.

### Exit condition

Eligible customers create exactly one valid entry; unavailable states and QR rotation behave safely.

## EPIC-C — Manual entry and queue capacity

**Execution outcome:** Assisted customers enter the same queue and all entry paths respect one capacity truth.

**Features:** `FEAT-015`, `FEAT-016`, `FEAT-017`, `FEAT-018`, `FEAT-019`

### Included outcomes

- `FEAT-015` — Manual entry: Staff can add a group with name and party size; phone is optional.
- `FEAT-016` — No-contact handling: Clearly label no-contact entries and suppress automated attempts.
- `FEAT-017` — Weighted capacity: Use one- or two-slot weighting with a configurable cutoff.
- `FEAT-018` — Maximum slots: Administrator sets maximum active slots.
- `FEAT-019` — Capacity recalculation: Recalculate consistently and update public intake state.

### External feature dependencies

`FEAT-003`, `FEAT-020`, `FEAT-023`, `FEAT-038`, `FEAT-049`, `FEAT-050`, `FEAT-051`

### Entry condition

Service and active-entry model are available.

### Exit condition

Manual and QR entry paths share one weighted-capacity truth; no-contact customers receive equal queue treatment.

## EPIC-D — Service operation

**Execution outcome:** A team can run one bounded live service from multiple devices without contradictory state.

**Features:** `FEAT-020`, `FEAT-021`, `FEAT-022`, `FEAT-023`, `FEAT-024`, `FEAT-025`, `FEAT-026`, `FEAT-027`

### Included outcomes

- `FEAT-020` — Open service: Authorized staff opens a new service.
- `FEAT-021` — Close/reopen entries: Toggle customer self-entry without resolving existing groups.
- `FEAT-022` — Safe service closure: Block closure until no Waiting or Called entries remain.
- `FEAT-023` — Waiting section: Show chronological list and approved operational indicators.
- `FEAT-024` — Called section: Show independent timers and call actions.
- `FEAT-025` — Recently completed: Show current-service terminal entries without dominating active work.
- `FEAT-026` — Party-size filtering: Filter without changing canonical order.
- `FEAT-027` — Multi-device synchronization: Propagate queue changes rapidly and prevent conflicting valid transitions.

### External feature dependencies

`FEAT-002`, `FEAT-003`, `FEAT-033`, `FEAT-034`, `FEAT-049`, `FEAT-050`, `FEAT-051`

### Entry condition

Establishment setup, lifecycle outcomes and synchronization decomposition are available.

### Exit condition

One service runs on multiple devices with no contradictory valid state, unsafe closure or hidden active entry.

## EPIC-E — Fairness and prioritization

**Execution outcome:** Long-wait and repeatedly passed groups remain visible without blocking staff judgement.

**Features:** `FEAT-028`, `FEAT-029`, `FEAT-030`, `FEAT-031`, `FEAT-032`

### Included outcomes

- `FEAT-028` — Elapsed wait: Show continuously understandable elapsed wait.
- `FEAT-029` — Large-group label: Apply label according to configured weighting cutoff or approved large-group rule.
- `FEAT-030` — Pass-over count: Count qualifying later-seated groups.
- `FEAT-031` — Long-wait warning: Highlight at one of four configured thresholds.
- `FEAT-032` — Protected pass-over reason: Require a quick reason in protected cases without blocking the action.

### External feature dependencies

`FEAT-003`, `FEAT-017`, `FEAT-023`, `FEAT-049`

### Entry condition

Chronological queue, capacity and seating outcomes are stable.

### Exit condition

Elapsed wait, pass-over and protected bypass behavior remain accurate after all relevant queue changes.

## EPIC-F — Calling and messaging

**Execution outcome:** A table-ready call reaches the customer or exposes communication failure truthfully.

**Features:** `FEAT-033`, `FEAT-034`, `FEAT-035`, `FEAT-036`, `FEAT-037`, `FEAT-038`, `FEAT-039`, `FEAT-040`, `FEAT-041`, `FEAT-042`

### Included outcomes

- `FEAT-033` — Call group: Move entry to Called, begin timer and attempt notification.
- `FEAT-034` — Individual countdown: Show synchronized remaining time per entry.
- `FEAT-035` — Final call: Attempt the final-call message one minute before the original deadline.
- `FEAT-036` — Grace period: Add two minutes exactly once.
- `FEAT-037` — Manual additional time: Staff extends a timer and all views update.
- `FEAT-038` — WhatsApp messages: Use WhatsApp for approved operational calls where contact exists.
- `FEAT-039` — Template personalization: Allow constrained approved fields, not unlimited automation.
- `FEAT-040` — Delivery visibility: Show truthful provider-supported status.
- `FEAT-041` — Retry: Staff retries without duplicating grace periods or state transitions.
- `FEAT-042` — Consumption measurement: Count message attempts and outcomes per establishment.

### External feature dependencies

`FEAT-003`, `FEAT-010`, `FEAT-015`, `FEAT-023`, `FEAT-027`

### Entry condition

Waiting queue, customer contact model and messaging-provider contract are available.

### Exit condition

Called state, timers, messaging status, retry and usage remain authoritative during success and failure.

## EPIC-G — Customer status and self-service

**Execution outcome:** Customers can monitor and safely update their entry without an app or account.

**Features:** `FEAT-043`, `FEAT-044`, `FEAT-045`, `FEAT-046`, `FEAT-047`, `FEAT-048`

### Included outcomes

- `FEAT-043` — Private status page: Provide an unguessable entry-specific web link.
- `FEAT-044` — Groups-ahead position: Show groups ahead and the order-variation explanation.
- `FEAT-045` — Customer edit: Allow name and preference edits; phone remains staff-controlled.
- `FEAT-046` — Party-size change: Apply reductions and low-risk increases automatically; route larger increases for approval.
- `FEAT-047` — Confirmed leave: Require explicit confirmation before customer cancellation.
- `FEAT-048` — “I’m on my way”: Record acknowledgement without extending time.

### External feature dependencies

`FEAT-010`, `FEAT-017`, `FEAT-019`, `FEAT-023`, `FEAT-033`, `FEAT-050`

### Entry condition

Accepted customer entry and private-access contract are available.

### Exit condition

The linked customer sees only approved data and can perform only approved low-risk actions.

## EPIC-H — Outcomes, correction and history

**Execution outcome:** Every entry reaches an explicit outcome, remains correctable during service and becomes trustworthy history.

**Features:** `FEAT-049`, `FEAT-050`, `FEAT-051`, `FEAT-052`, `FEAT-053`, `FEAT-054`, `FEAT-055`, `FEAT-056`

### Included outcomes

- `FEAT-049` — Mark Seated: Allow from Waiting or Called and update all dependent information.
- `FEAT-050` — Cancel with actor/reason: Preserve cancellation source.
- `FEAT-051` — Mark No-show: Staff explicitly resolves the entry as No-show.
- `FEAT-052` — Reactivate No-show: Return it to Waiting at the queue end.
- `FEAT-053` — Internal notes: Staff can add non-customer-visible operational notes.
- `FEAT-054` — Outcome correction: Permit an Administrator to correct a completed outcome during the current service, with recalculation and audit.
- `FEAT-055` — Audit trail: Preserve material events and actors.
- `FEAT-056` — Closed-service history: Provide the approved summary and read-only records.

### External feature dependencies

`FEAT-001`, `FEAT-004`, `FEAT-019`, `FEAT-022`, `FEAT-023`, `FEAT-024`, `FEAT-025`

### Entry condition

Lifecycle, audit, capacity and service-boundary behavior are available.

### Exit condition

Every entry is explicitly resolved; corrections are auditable; closed history is immutable and reproducible.

## EPIC-I — Brand and responsive experience

**Execution outcome:** The product is usable on restaurant tablets/desktops and customer phones while restaurant identity remains primary.

**Features:** `FEAT-057`, `FEAT-058`, `FEAT-059`

### Included outcomes

- `FEAT-057` — Discreet branding: Show small MesaFlow branding on customer pages in the initial plan.
- `FEAT-058` — Tablet and desktop staff experience: Primary staff workflows are fully usable on both form factors.
- `FEAT-059` — Mobile-first customer experience: All public and status flows are designed for common mobile screens.

### External feature dependencies

`FEAT-009`, `FEAT-010`, `FEAT-023`, `FEAT-024`, `FEAT-025`, `FEAT-043`

### Entry condition

Primary public, status and staff flows exist for responsive validation.

### Exit condition

Primary staff and customer journeys pass the approved device, accessibility and branding requirements.

## EPIC-J — Cross-feature integrity

**Backlog items:** `PBI-060`–`PBI-068`.

This is an execution and validation epic, not a new product-feature range. It verifies:

- complete service without paper;
- one current entry truth;
- provider degradation;
- equality of QR and manual entry;
- fairness without rigid automation;
- cross-path capacity integrity;
- private customer access;
- restaurant-device usability;
- pilot evidence baseline.

**Exit condition:** all nine integrity items pass in integrated rehearsals and no undocumented manual workaround remains.

## 3. Epic order

`EPIC-A` enables `EPIC-C`/`EPIC-D`; those enable `EPIC-B`; `EPIC-B` and `EPIC-D` enable `EPIC-F`/`EPIC-G`; operational queue truth enables `EPIC-E` and `EPIC-H`; `EPIC-I` is applied continuously and closes after all primary flows exist. `EPIC-J` runs continuously and closes last.
