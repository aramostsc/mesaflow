# MesaFlow — Product Decision Log

**Document ID:** PROD-DEC-001  
**Product:** MesaFlow  
**Release:** MVP / Pilot Release  
**Status:** Approved decision record  
**Owner:** Product Management  
**Version:** 1.0  
**Last updated:** 2026-07-10

---

## 1. Purpose

This document records the product decisions made during MesaFlow CEO strategy and Product Management discovery.

It prevents future agents or contributors from:

- reopening settled questions without evidence;
- silently changing product behavior;
- confusing technical preference with product strategy;
- introducing scope because an implementation makes it easy;
- losing the rationale behind constrained choices.

A decision can be revisited, but it must not be ignored.

---

## 2. Status definitions

- **Approved:** Current product decision for the MVP.
- **Hypothesis:** Approved assumption to test commercially or operationally.
- **Superseded:** Retained for history but replaced by a newer decision.
- **Open:** Requires an explicit future decision; not permission to invent behavior.

---

## 3. Decision authority

When sources conflict, use this order:

1. approved CEO strategy documents;
2. `PRODUCT_PHILOSOPHY.md`;
3. `PRD.md`;
4. this decision log;
5. dedicated scope, feature, rule and acceptance documents;
6. backlog or implementation notes.

A genuine conflict must be reported rather than silently reconciled.

---

## 4. Approved decisions

| Decision ID | Status | Decision | Rationale | Revisit trigger |
|---|---|---|---|---|
| PD-001 | Approved | The MVP is a focused digital restaurant waitlist, not a complete restaurant-management platform. | The initial problem is queue chaos; breadth would delay validation and adoption. | A proposal introduces reservations, POS, CRM, marketplace or operational modules. |
| PD-002 | Approved | The primary competitor is paper and informal staff memory. | The product must win through added value without becoming slower than the existing habit. | Pilot evidence shows another competitor or workflow is the real replacement barrier. |
| PD-003 | Approved | The product objective is to replace paper in minutes and move the call into the customer’s pocket. | This expresses the operational and customer value in one testable outcome. | Customer behavior or restaurant adoption disproves the core proposition. |
| PD-004 | Approved | Customers do not install an application or create an account. | The interaction is temporary and account friction would reduce adoption. | A later consumer product creates repeated cross-restaurant value. |
| PD-005 | Approved | The customer joins primarily through a permanent restaurant QR. | A reusable on-site entry point minimizes staff work and deployment friction. | Abuse or conversion evidence requires an additional controlled entry model. |
| PD-006 | Approved | A public welcome screen appears before the form. | Restaurant identity and current state increase trust and prevent invalid entry attempts. | Usability testing proves the extra step materially harms completion. |
| PD-007 | Approved | Required QR fields are name, phone and party size. | These are the minimum data needed to identify, contact and seat a group. | Pilot evidence shows a required field is unnecessary or another is essential. |
| PD-008 | Approved | Interior/terrace, baby chair, accessibility and notes are optional. | They may influence seating but must not burden every customer. | A specific optional field repeatedly causes confusion or proves unnecessary. |
| PD-009 | Approved | QR entry does not require phone verification before acceptance. | Verification adds time and may add cost to the restaurant. | Material abuse or wrong-number rates make verification necessary and viable. |
| PD-010 | Approved | The same phone cannot have two active entries in the same queue. | Duplicates distort capacity and fairness. | Legitimate shared-phone use proves common enough to require a new model. |
| PD-011 | Approved | Staff can add entries manually. | QR must not exclude elderly, offline or digitally uncomfortable customers. | Manual entry is no longer needed in validated target operations. |
| PD-012 | Approved | Phone is optional for manual entries. | The restaurant must be able to include a customer who cannot or will not provide contact. | Operational evidence shows the risk is unacceptable. |
| PD-013 | Approved | No-contact entries are visibly marked and receive no automated message attempt. | Staff must understand that in-person calling is required. | A future safe alternative contact workflow is introduced. |
| PD-014 | Approved | The MVP has one establishment in the product interface. | The initial target is an independent restaurant and multi-location adds premature complexity. | Paying groups repeatedly require centralized management. |
| PD-015 | Approved | The MVP has one active queue per establishment. | One queue preserves a clear source of truth and simple customer position. | Preferences cannot handle repeated validated multi-zone operations. |
| PD-016 | Approved | Interior and terrace are preferences, not separate queues. | Staff can use existing knowledge without fragmenting queue truth. | Repeated pilot evidence requires independent capacity and position. |
| PD-017 | Approved | A queue operates within explicit services such as lunch or dinner. | A bounded service enables safe closure and meaningful history. | Restaurant operations require a different session boundary. |
| PD-018 | Approved | Staff can close new entries while continuing the current queue. | Restaurants need to stop intake without abandoning waiting customers. | No revisit expected unless service controls change. |
| PD-019 | Approved | A service cannot end with Waiting or Called entries. | Closure must not orphan active customers. | No revisit expected; this is an integrity rule. |
| PD-020 | Approved | Closed-service records are read-only. | Historical trust requires a stable final record. | A formal controlled post-closure correction policy is later validated. |
| PD-021 | Approved | The primary lifecycle states are Waiting, Called, Seated, Cancelled and No-show. | These states describe the minimum operational journey without unnecessary complexity. | A validated case cannot be represented through attributes or notes. |
| PD-022 | Approved | There is no Paused state in the MVP. | Temporary context can be handled with internal notes without complicating capacity and position. | Repeated operational need shows pause has a clear, safe meaning. |
| PD-023 | Approved | The product does not enforce whether the full group is present. | Restaurants may seat present members while another is delayed. | Restaurants request and validate a consistent completeness policy. |
| PD-024 | Approved | The canonical queue order is chronological arrival. | It provides a fair understandable baseline. | No revisit expected; operational selection remains flexible. |
| PD-025 | Approved | Staff may call or seat a later group based on table compatibility and judgement. | Strict FIFO is incompatible with real restaurant seating. | A future table model enables a better approved rule without blocking staff. |
| PD-026 | Approved | The customer sees the number of groups ahead, not an absolute guarantee. | The order may change based on group and table compatibility. | A future position model becomes more truthful and understandable. |
| PD-027 | Approved | The customer sees an explanation that order may vary. | Transparency prevents the groups-ahead number from becoming a false promise. | Research shows a clearer equivalent formulation. |
| PD-028 | Approved | The MVP does not show a predicted waiting time. | The product lacks enough trustworthy data and false precision damages trust. | Sufficient history and validated prediction accuracy exist. |
| PD-029 | Approved | Elapsed waiting time is prominent in the Staff dashboard. | Staff needs a direct signal to avoid forgetting difficult groups. | No revisit expected; presentation may evolve. |
| PD-030 | Approved | The product counts qualifying pass-overs. | Time alone does not show how often a group was disadvantaged by later seating. | The metric proves misleading in live use and is replaced by a better fairness signal. |
| PD-031 | Approved | A pass-over occurs when a later-arriving group is Seated while the earlier group remains active. | Seated is the meaningful successful priority event; cancellation is not. | Testing identifies a necessary edge refinement. |
| PD-032 | Approved | Long-wait warning uses constrained choices: 20, 30, 45 or 60 minutes. | Restaurants vary, but unlimited configuration increases complexity. | Pilot data supports different constrained values. |
| PD-033 | Approved | Passing a protected group requires a quick reason but is never blocked. | This balances accountability with human operational control. | Reason capture creates more friction than value or needs a different trigger. |
| PD-034 | Approved | Approved pass-over reasons are constrained and include Other. | Structured reasons support learning while preserving exceptional judgement. | Pilot evidence supports revising the list. |
| PD-035 | Approved | Large groups receive a visible label. | Staff must notice groups that are operationally difficult to place. | A different indicator proves more effective. |
| PD-036 | Approved | Queue capacity is measured through weighted slots. | A large group creates different waiting-list load than a small group. | Pilot evidence supports a different simple capacity model. |
| PD-037 | Approved | The MVP uses only one-slot and two-slot weighting. | More tiers would create configuration and explanation complexity. | Target restaurants demonstrate that two levels are materially insufficient. |
| PD-038 | Approved | Default weighting is up to 6 people = 1 slot; 7 or more = 2 slots. | It provides a practical starting point while remaining configurable. | Pilot data supports a better default. |
| PD-039 | Approved | Waiting and Called entries consume capacity. | Calling a customer does not mean the waiting burden has ended. | No revisit expected unless lifecycle changes. |
| PD-040 | Approved | Seated, Cancelled and No-show do not consume capacity. | These terminal outcomes end active waiting demand. | No revisit expected. |
| PD-041 | Approved | The restaurant configures maximum active slots. | Restaurants need a simple way to cap waiting load. | Pilot evidence supports automatic capacity guidance later. |
| PD-042 | Approved | The restaurant configures the maximum party size allowed through QR. | Oversized parties require direct staff judgement. | A later table or event model safely handles oversized self-entry. |
| PD-043 | Approved | An oversized QR party is directed to staff rather than rejected absolutely. | Staff retains control and may accommodate the group manually. | No revisit expected. |
| PD-044 | Approved | The call duration is configurable only as 3, 5 or 10 minutes. | Constrained choices reduce setup error and support consistent behavior. | Pilot evidence supports changing the choices. |
| PD-045 | Approved | The final call is attempted with one minute remaining in the original call period. | A consistent last warning reduces missed returns. | Communication testing supports a different point. |
| PD-046 | Approved | The final call adds two minutes exactly once. | The message must give a real, predictable grace period. | Pilot evidence supports a different fixed grace period. |
| PD-047 | Approved | Multiple groups may be Called simultaneously. | Restaurants may have more than one table available. | No revisit expected. |
| PD-048 | Approved | Each Called group has an independent timer. | Concurrent calls require independent deadlines. | No revisit expected. |
| PD-049 | Approved | Staff can grant extra time manually. | Real exceptions require human flexibility. | Abuse or confusion requires a constrained extension model. |
| PD-050 | Approved | “I’m on my way” informs staff but does not stop or extend the timer. | The acknowledgement is useful, but customer-controlled extension would undermine operations. | Pilot evidence supports a different staff-confirmed interaction. |
| PD-051 | Approved | Timer expiry does not automatically mark No-show. | Only staff has enough real-world context to decide absence. | A future operational policy is explicitly validated. |
| PD-052 | Approved | WhatsApp is the primary automated operational channel. | It matches customer behavior and the approved product proposition. | Provider cost, policy or customer behavior makes another channel better. |
| PD-053 | Approved | The web status page remains available regardless of messaging. | The queue must not depend entirely on a third-party message. | No revisit expected. |
| PD-054 | Approved | There is no automatic paid SMS or voice fallback in the MVP. | Fallback adds unpredictable restaurant cost and scope. | Pricing and demand validate a paid fallback product. |
| PD-055 | Approved | Message consumption is measured before final commercial packaging is fixed. | The business must learn real usage and margin. | Pricing and provider economics are validated. |
| PD-056 | Approved | Messaging failure does not cancel or invalidate the queue entry. | Communication failure must not corrupt operational truth. | No revisit expected. |
| PD-057 | Approved | Staff sees truthful provider-supported delivery status and may retry. | Hidden failure destroys trust; retry supports recovery. | Provider capability changes the available statuses. |
| PD-058 | Approved | Retrying a message does not repeat state changes, final call or grace extension. | A retry is communication recovery, not a new operational event. | No revisit expected. |
| PD-059 | Approved | Message text uses product templates with limited personalization. | Consistency and required meaning are more important than unlimited editing. | Validated restaurant needs justify broader controlled templates. |
| PD-060 | Approved | Customer status access uses an unguessable entry-specific link. | It avoids account and paid verification friction while protecting access. | Security review or abuse requires a stronger recovery model. |
| PD-061 | Approved | The phone number is not exposed in the status URL. | Contact data should not become an access token or leak through URLs. | No revisit expected. |
| PD-062 | Approved | The customer can edit name and approved preferences directly. | Low-risk corrections should not create staff work. | Abuse or operational conflict requires narrower editing. |
| PD-063 | Approved | Phone-number changes require staff. | The phone controls operational contact and needs deliberate correction. | A future verified self-service change becomes viable. |
| PD-064 | Approved | Party-size reductions are automatic. | A smaller group generally reduces operational burden. | Pilot evidence identifies a necessary exception. |
| PD-065 | Approved | Small increases may be automatic; larger increases require staff approval. | This reduces friction without allowing disruptive hidden changes. | Pilot data supports changing the threshold logic. |
| PD-066 | Approved | Default party-size approval threshold is +2 people. | +1 is low risk; +2 or more can materially affect seating. | Pilot evidence supports another default. |
| PD-067 | Approved | Leaving the queue requires explicit confirmation. | Accidental removal would be highly frustrating and hard to recover. | Usability research supports an equally safe interaction. |
| PD-068 | Approved | Cancellation records whether it was by customer or restaurant; No-show remains separate. | The outcomes have different operational and analytical meaning. | No revisit expected. |
| PD-069 | Approved | A No-show can be reactivated by staff at the end of the queue. | This corrects mistakes without disadvantaging customers who remained available. | Pilot evidence supports a different fair recovery rule. |
| PD-070 | Approved | Internal notes handle temporary operational context. | Notes avoid creating more states. | Repeated structured context requires a dedicated approved attribute. |
| PD-071 | Approved | An Administrator can correct a terminal outcome only during the active service. | Human errors are recoverable without weakening closed history. | A future governed correction model is required. |
| PD-072 | Approved | Material actions are attributed to individual internal users. | Trust, diagnosis and accountability require actor history. | No revisit expected. |
| PD-073 | Approved | Staff uses individual accounts; there is no shared PIN workflow. | Shared access removes meaningful attribution. | A tightly controlled kiosk mode is later validated. |
| PD-074 | Approved | The live dashboard has Waiting, Called and Recently completed sections. | These sections match the operational mental model and keep active work clear. | Usability testing supports a simpler equivalent structure. |
| PD-075 | Approved | Staff may filter by party size but cannot permanently reorder the canonical queue. | Filtering supports table compatibility without falsifying position. | A future explicit prioritization model is approved. |
| PD-076 | Approved | Multiple staff devices must show a rapidly consistent queue. | Restaurants operate collaboratively and stale state creates duplicate actions. | No revisit expected; performance targets may be refined. |
| PD-077 | Approved | The Staff experience is fully usable on tablet and desktop. | Both are common restaurant operating devices. | Pilot evidence adds a critical staff form factor. |
| PD-078 | Approved | The customer experience is mobile-first. | QR and WhatsApp flows occur primarily on phones. | No revisit expected. |
| PD-079 | Approved | Customer pages show discreet MesaFlow branding in the initial plan. | It supports organic awareness without overtaking restaurant identity. | A future paid white-label plan is validated. |
| PD-080 | Approved | Basic history is organized by closed service. | The service is the meaningful operational unit. | A later reporting model adds aggregation without changing source history. |
| PD-081 | Approved | History includes received, seated, cancellations, no-shows, average wait, maximum wait, pass-overs, sent and failed messages. | These metrics validate use, outcomes, fairness and messaging economics without advanced BI. | Pilot learning adds or removes a metric. |
| PD-082 | Approved | The MVP remains prepared conceptually for future multi-location and multi-queue support but does not expose them. | Avoiding a dead end is different from building future scope. | Architecture review identifies a conflict that can be resolved without exposing product behavior. |
| PD-083 | Approved | Reservations, table map, POS, CRM, loyalty, marketplace and predictive wait are future, not MVP. | They broaden the product before the queue is validated. | Each capability meets its explicit future admission trigger. |
| PD-084 | Hypothesis | The initial commercial hypothesis is approximately €29/month with a 30-day pilot, subject to validation. | The price is intended to be easy to decide and compatible with a focused SaaS. | Pilot conversion, cost and interviews support a different model. |
| PD-085 | Approved | The MVP must measure messaging usage but does not define final overage or package mechanics. | Commercial packaging depends on actual message economics. | The provider and pricing model are selected and validated. |
| PD-086 | Approved | Exact technology, architecture, database and provider choices are outside Product Management responsibility. | The product documents define outcomes and constraints, not implementation. | A technical choice changes approved behavior and requires product review. |

---

## 5. Open commercial and operational decisions

The following are deliberately not finalized by the product specification:

| Open ID | Question | Current constraint |
|---|---|---|
| OPEN-001 | Which WhatsApp provider is used? | Must support the approved operational behavior and expose truthful outcomes where possible |
| OPEN-002 | Which messages are included in the base plan? | Usage must be measurable before packaging is fixed |
| OPEN-003 | Are overages charged, blocked or bundled? | Restaurant cost must remain understandable and commercially viable |
| OPEN-004 | What is the final launch price? | Approximately €29/month remains a hypothesis to validate |
| OPEN-005 | What data-retention periods apply? | Must support service history, privacy obligations and operational needs |
| OPEN-006 | Which languages launch first? | Product must remain localization-ready |
| OPEN-007 | What exact default maximum slots and QR party size are suggested? | Onboarding should present sensible defaults informed by pilots |
| OPEN-008 | What is the exact “page opened recently” definition? | Must be operationally useful and privacy-conscious |
| OPEN-009 | Which historical data is exportable? | Advanced reporting is out of scope; basic operational access is required |
| OPEN-010 | What pilot incident-support process is used? | Must be defined operationally before live pilot, outside core product behavior |

An open item must not be converted into product behavior by Engineering or Codex without approval.

---

## 6. Decision change procedure

To change an approved decision:

1. identify the decision ID;
2. state new evidence;
3. explain the user or business problem;
4. list affected features, rules, stories and acceptance criteria;
5. assess added complexity and failure modes;
6. define the replacement decision;
7. mark the previous decision Superseded rather than deleting it;
8. update all canonical documents in the same change set.

---

## 7. Decisions that require founder/CEO review

Product Management must escalate changes that affect:

- target customer;
- product category;
- pricing strategy;
- pilot terms;
- core value proposition;
- mandatory WhatsApp inclusion;
- move into reservations or marketplace;
- multi-location business strategy;
- brand positioning;
- business targets;
- promise of increased revenue.

---

## 8. Decisions that require Product Management approval

Product Management approval is required for changes to:

- feature scope;
- customer or staff flow;
- state model;
- capacity logic;
- fairness rules;
- call timing;
- self-service permissions;
- message behavior;
- history metrics;
- role permissions;
- MVP versus future classification.

---

## 9. Final decision principle

A decision should remain constrained until real restaurant evidence justifies complexity.

MesaFlow should not become harder to understand because a future possibility can be imagined.
