# MesaFlow — Product Philosophy

**Document ID:** PROD-PHIL-001  
**Status:** Approved product constitution  
**Owner:** Product Management  
**Strategic authority:** CEO documentation in `docs/`  
**Version:** 1.0  
**Last updated:** 2026-07-10

---

## 1. Purpose of this document

This document is the product constitution of MesaFlow.

It translates the strategy approved by the CEO into durable principles for product discovery, design, specification, quality assurance and implementation. It does not replace the CEO documents and it does not create a new company strategy. It exists so that future contributors can make consistent product decisions without turning MesaFlow into a larger, slower or more complicated product than the restaurant actually needs.

The principles in this document apply to:

- Product Management;
- UX and UI design;
- Software Architecture;
- Engineering;
- Quality Assurance;
- Project Management;
- customer onboarding;
- product operations;
- future AI agents and Codex tasks.

When a proposed behavior is not explicitly specified elsewhere, the team should use this document to determine which option is most compatible with MesaFlow.

### 1.1 Order of authority

When documents appear to conflict, use this order of authority:

1. explicit decisions in the approved CEO documents;
2. explicit founder decisions recorded in `PRODUCT_DECISIONS.md`;
3. the approved MVP scope and PRD;
4. this Product Philosophy;
5. lower-level implementation or UX proposals.

A contributor must not silently resolve a material contradiction. The contradiction must be reported and escalated for a product decision.

### 1.2 What this document is not

This is not:

- a technical architecture;
- a design system;
- a list of implementation technologies;
- a commercial pricing contract;
- a substitute for user research;
- permission to invent functionality that has not been approved.

---

## 2. Strategic foundation

MesaFlow begins with one narrow problem:

> Busy restaurants still manage walk-in waiting lists with paper, memory, verbal communication or improvised WhatsApp messages, creating uncertainty for customers and stress for staff.

The first product must solve one complete operational loop:

1. the customer joins the restaurant queue;
2. the restaurant can see and manage that customer;
3. the customer receives a clear call when the table is ready;
4. the restaurant records the outcome.

The strategic wedge is the walk-in waiting list. It is not reservations, a marketplace, table planning, POS, CRM, loyalty, marketing automation or a complete restaurant operating system.

The strongest competitive alternative is not another SaaS product. It is the existing habit:

- paper;
- a notebook;
- memory;
- shouting a name;
- asking the customer to stay nearby;
- “we have always done it this way.”

Therefore MesaFlow cannot win merely by being more powerful than paper. It must be sufficiently simple and fast that staff voluntarily prefer it under pressure.

---

## 3. Product promise

### 3.1 External promise

> Allow any restaurant to replace a paper waiting list in minutes, eliminating queue chaos without requiring customers to install an application or remain at the door trying to hear the staff call them. The call reaches the customer directly in their pocket.

### 3.2 Internal product shorthand

> The queue follows the customer, not the other way around.

This shorthand should guide the experience:

- the customer should be free to move away from the entrance;
- the customer should not need to watch the host continuously;
- the customer should know that the entry exists;
- the customer should understand what happens next;
- the restaurant should retain operational control;
- the product should reduce, not relocate, the stress.

### 3.3 Product category

MesaFlow is initially:

> Digital waitlist software for restaurants.

It must not be described or designed as a reservation marketplace, full restaurant-management suite or customer-discovery platform.

---

## 4. The constitutional principles

The following principles are normative. Each principle has an identifier so that future product decisions can cite it.

## PHIL-001 — Easier than paper is the adoption threshold

Paper is immediate, familiar and requires no login. MesaFlow adds structure and communication, but every additional interaction creates adoption risk.

A workflow is not good merely because it is digitally correct. It is good when a member of staff can complete it during a busy dinner service without feeling that the software is slowing the restaurant down.

Implications:

- common actions should require the minimum reasonable input;
- defaults should remove setup work;
- optional details must remain optional;
- staff should not complete forms merely to satisfy the database;
- a feature that creates extra work must create obvious operational value;
- routine queue actions should not require navigation through multiple menus;
- product teams must test common workflows against the paper equivalent.

**Paper benchmark:** if an experienced host can write a group in a notebook faster and more reliably than the host can add it to MesaFlow, the workflow requires improvement.

## PHIL-002 — The product must survive peak pressure

MesaFlow is not primarily used in quiet conditions. Its quality is determined at the exact moment when:

- several customers arrive together;
- tables are turning;
- the telephone is ringing;
- colleagues are asking questions;
- customers want estimates;
- a notification fails;
- two employees interact with the list.

The product must optimize for interrupted attention and fast recovery.

Implications:

- current state must be visually obvious;
- critical actions must provide immediate feedback;
- errors must be recoverable;
- simultaneous users must not create duplicate outcomes;
- staff must be able to understand what changed;
- important warnings must be visible without making every entry look urgent;
- destructive or irreversible actions require appropriate confirmation;
- the product should avoid hidden modes and surprising behavior.

## PHIL-003 — Staff retain final operational control

Restaurants are physical environments with imperfect information. The system does not know every table shape, seating constraint, accessibility requirement, customer relationship or real-time operational exception.

MesaFlow may organize, highlight and recommend. It must not prevent reasonable staff judgment merely because a simplistic algorithm prefers another outcome.

Implications:

- chronological order is the fairness baseline, not an absolute seating command;
- staff may call a later group when a compatible table becomes available;
- the product can request a reason in protected situations without blocking the action;
- timers may be extended by staff;
- an Administrator can correct completed outcomes during the current service;
- optional customer preferences inform the decision but do not create a guarantee;
- the MVP does not automatically assign tables.

Control does not mean absence of accountability. Important deviations should be visible and logged.

## PHIL-004 — The product protects fairness without pretending all groups are equal

Restaurant queues are not strictly first-in, first-out. A table for two cannot always seat a party of twelve. However, operational flexibility can cause larger or more difficult groups to be ignored indefinitely.

MesaFlow must make fairness observable.

Implications:

- the default queue order is chronological;
- staff see elapsed wait time, not only arrival time;
- the system counts later-arriving groups seated first;
- long-wait entries receive progressive visual attention;
- groups above the configured threshold receive a clear large-group label;
- passing a protected entry requires a quick reason;
- the action is logged but not blocked;
- customer-facing language explains that order may vary with party size and available tables.

The product should not promise a false exact order. It should provide an honest relative position and make exceptions accountable.

## PHIL-005 — Simplicity is a feature with measurable value

Simplicity does not mean incomplete thinking. It means that complexity is absorbed by product design rather than transferred to the restaurant.

Implications:

- constrained options are preferred over free-form configuration;
- recommended defaults must exist;
- one clear workflow is preferred over several equivalent workflows;
- new states require a strong operational reason;
- rare edge cases should not dominate the primary interface;
- advanced settings should not appear before they are needed;
- each feature must identify the problem it solves and why it belongs in the current release.

The absence of a feature can be a deliberate product advantage.

## PHIL-006 — Complete the core loop before expanding the category

MesaFlow is not validated because restaurants create accounts or praise a demo. It is validated when restaurants repeatedly use the product during real service, successfully call customers and continue paying.

No major category expansion should occur until the core waiting-list loop demonstrates:

- staff adoption under pressure;
- weekly operational usage;
- successful customer calls;
- pilot-to-paid conversion;
- retention;
- sustainable messaging economics.

Reservations, table management, predictive wait times, multi-location management and integrations may be valuable later. They are not allowed to weaken the initial product.

## PHIL-007 — No customer application and no unnecessary account

The waiting customer is transient. The customer did not visit the restaurant to become a software user.

Implications:

- no app installation is required;
- no customer account is required;
- the QR flow opens a mobile web experience;
- access to an active entry uses a unique private link;
- the form asks only for operationally necessary information;
- the customer can understand the experience without training;
- MesaFlow branding remains discreet and secondary to the restaurant.

## PHIL-008 — Confirmation is part of the product, not decoration

After joining, a customer must not wonder whether the submission worked.

Every successful queue entry must produce an immediate, unambiguous confirmation that communicates:

- the customer is in the queue;
- the current relative position;
- that order may vary according to restaurant constraints;
- how the customer will be called;
- how to return to the status page;
- how to leave the queue.

When an external confirmation message is unavailable or commercially unsuitable, the on-screen confirmation remains mandatory.

## PHIL-009 — Communication must be clear, observable and cost-aware

WhatsApp is strategically important because it places the call in the customer’s pocket. It also introduces delivery uncertainty and variable cost.

Implications:

- WhatsApp is the primary automated call channel in the MVP;
- the customer status page remains the product-controlled fallback;
- paid SMS or voice fallback is not automatic in the MVP;
- message attempts and outcomes are visible to staff;
- a failed message never deletes or invalidates the queue entry;
- staff can retry or contact the customer manually;
- message consumption is measured from the beginning;
- commercial packaging remains flexible until real costs and usage are validated;
- templates are constrained to protect clarity and provider compliance.

## PHIL-010 — Reliability creates trust; trust creates retention

The product cannot fail at:

- losing a name;
- calling the wrong group;
- creating duplicate active outcomes;
- showing different queue states to different employees for an extended period;
- silently failing to send a message;
- closing a service while active groups remain;
- changing historical records without traceability.

The product must be designed so that a staff member can trust the list more than memory and more than paper.

When the system is uncertain, it should expose uncertainty rather than fabricate confidence.

## PHIL-011 — Defaults first, configuration second

Restaurants differ, but unlimited configuration creates onboarding friction and support burden.

MesaFlow should provide opinionated defaults based on the most common expected use case. The administrator may adjust a small number of operationally meaningful settings.

Examples of constrained configuration:

- call duration: 3, 5 or 10 minutes;
- long-wait threshold: 20, 30, 45 or 60 minutes;
- weighted-capacity cutoff: configurable with a sensible default;
- party-size increase approval threshold: configurable with a sensible default;
- maximum QR party size;
- maximum queue capacity;
- limited message-template fields.

A setting should not exist merely because it could exist.

## PHIL-012 — One source of operational truth

During an active service, the MesaFlow queue is the shared operational record.

Implications:

- multiple staff devices show the same current state;
- updates propagate without manual refresh under normal conditions;
- stale clients must not overwrite newer decisions;
- each entry has one current lifecycle state;
- completed entries remain visible for short-term awareness and correction;
- service history becomes read-only after closure;
- staff actions are attributable to individual accounts.

The product should reduce parallel notebooks and verbal shadow systems. It cannot force adoption, but it must make a single shared list clearly more useful.

## PHIL-013 — Honest information is better than precise-looking fiction

The MVP must not display a wait-time estimate before it can do so credibly.

The customer sees the number of groups ahead, accompanied by an explanation that seating order can vary. This is more honest than a precise time that ignores table compatibility, party size and real service conditions.

Future prediction may be introduced only when:

- sufficient historical data exists;
- the model can express uncertainty;
- the output improves decisions or expectations;
- error is measured;
- restaurants understand that it is an estimate.

## PHIL-014 — The restaurant’s language comes before software language

MesaFlow should sound like a tool built for restaurants, not an enterprise system.

Prefer language such as:

- “Call group”;
- “Table ready”;
- “Waiting”;
- “Called”;
- “Seated”;
- “No-show”;
- “Close new entries”;
- “End service.”

Avoid unnecessary technical language, internal identifiers, messaging-provider terms and abstract workflow terminology in user-facing interfaces.

## PHIL-015 — Exceptions should be handled without contaminating the primary flow

Real services contain exceptions. The product must support the important ones, but the normal flow should remain obvious.

Examples:

- manual entry without phone;
- customer asks to change party size;
- message fails;
- group needs more time;
- no-show returns;
- employee records the wrong outcome;
- oversized group requires staff discussion.

The design pattern is:

1. keep the normal path short;
2. surface the exception when it occurs;
3. provide a clear recovery action;
4. log material corrections;
5. avoid creating permanent states for temporary context.

This is why the MVP uses internal notes rather than a generic `Paused` state.

## PHIL-016 — Product data must serve decisions, not vanity

MesaFlow’s North Star is:

> Customers successfully called through MesaFlow per restaurant per week.

This measures the completed operational loop better than account creation, QR scans or website traffic.

Product analytics should prioritize:

- first queue entry;
- first successful call;
- active service days;
- customers called per week;
- successful call outcomes;
- staff adoption during peak periods;
- pilot-to-paid conversion;
- retention;
- message cost per restaurant;
- receptionist and owner feedback.

Metrics should not encourage behavior that harms the customer or creates artificial volume.

## PHIL-017 — Product growth must not compromise restaurant trust

A small “Powered by MesaFlow” mark may support organic discovery. It must remain discreet and never compete with the restaurant’s identity.

The initial plan does not remove MesaFlow branding. Future packaging may reconsider this, but branding must not damage the customer experience.

Growth mechanisms must be subordinate to operational trust.

## PHIL-018 — Build for the initial market without trapping the future

The first market is busy independent restaurants in Barreiro, Setúbal and Seixal, especially those with visible walk-in pressure and informal queue management.

The MVP intentionally limits the experience to:

- one establishment per account in the initial interface;
- one queue per establishment;
- a focused set of roles;
- one core operating model.

Product specifications should not require premature multi-location or multi-queue complexity. At the same time, product concepts and identifiers should remain coherent enough that future expansion does not require redefining the meaning of an entry, service, establishment or user.

This is a product requirement, not a technical-architecture instruction.

---

## 5. The MesaFlow decision filter

Every proposed feature, workflow or change should pass the following sequence.

### Gate 1 — Real problem

- Which user experiences the problem?
- During which real restaurant moment?
- How often does it occur?
- What happens today without the feature?
- Is the problem observed, evidenced or only imagined?

If the problem is unclear, do not specify the solution yet.

### Gate 2 — Core-loop relevance

Does the proposal materially improve one or more of these?

1. customer joins;
2. customer receives confirmation;
3. staff sees and trusts the queue;
4. staff calls the customer;
5. customer receives and responds to the call;
6. staff resolves the entry;
7. restaurant learns enough to continue using and paying.

If not, it is unlikely to belong in the MVP.

### Gate 3 — Operational value

- Does it reduce staff work?
- Does it reduce customer uncertainty?
- Does it prevent an important failure?
- Does it make the queue more trustworthy?
- Does it reduce front-door congestion?

### Gate 4 — Simplicity cost

- How many new concepts does it introduce?
- Does it add a state?
- Does it add a required field?
- Does it add a setting?
- Does it add a menu or navigation level?
- Does it require training?
- Does every restaurant need it?

A feature can solve a real problem and still be too expensive in complexity for the current phase.

### Gate 5 — Evidence and timing

- Is this necessary before the first five paying restaurants?
- Can the problem be handled manually during pilots?
- Will delaying it prevent validation?
- Is the feature reversible?
- What evidence would justify building it later?

### Gate 6 — Quality and economics

- Can the product make the behavior reliable?
- Does it create paid messaging cost?
- Does it create legal or privacy risk?
- Can usage be measured?
- Does it support sustainable pricing?

### Gate 7 — Scope decision

The outcome must be one of:

- **MVP — Must:** required for safe operation or core validation;
- **MVP — Should:** important, but may follow the first thin release inside the pilot phase;
- **Future:** valuable after evidence or scale;
- **Rejected:** conflicts with strategy or adds disproportionate complexity;
- **Open question:** requires founder decision or pilot evidence.

---

## 6. The simplicity budget

Every product surface has a limited simplicity budget.

### 6.1 Required fields

A field may be required only when the queue cannot operate safely without it.

For QR entry, the required fields are:

- name;
- phone number;
- party size.

Interior/terrace preference, baby chair, accessibility information and notes are optional because not every customer needs them.

For manual entry, phone is optional because the fallback must include customers without a usable device or contact number.

### 6.2 States

A lifecycle state is expensive because it affects:

- interface design;
- permissions;
- transitions;
- analytics;
- history;
- edge cases;
- training.

The MVP uses only:

- Waiting;
- Called;
- Seated;
- Cancelled;
- No-show.

Temporary circumstances belong in notes or attributes unless evidence proves that a new state is necessary.

### 6.3 Settings

A setting must represent a meaningful restaurant difference and should normally include a recommended default.

The product should prefer:

- a small set of allowed values;
- plain-language explanations;
- safe defaults;
- configuration during guided setup;
- administrator-only control for structural rules.

### 6.4 Actions

Common actions should be visible near the entry they affect. Secondary and destructive actions may require a contextual menu or confirmation, but should remain discoverable.

---

## 7. Autonomy and automation doctrine

MesaFlow automates communication and state propagation. It does not automate restaurant judgment in the MVP.

### 7.1 Automate when

- the rule is clear and consistent;
- the action saves repeated staff work;
- errors are visible and recoverable;
- the behavior does not require knowledge of the physical room;
- the cost is understood or measured.

Examples:

- calculate elapsed waiting time;
- recalculate groups ahead;
- send the configured call template;
- send the final call at the defined moment;
- add the standard grace period;
- recalculate weighted queue usage;
- synchronize entry state across devices;
- approve a low-risk party-size increase below the threshold.

### 7.2 Keep human control when

- table compatibility is contextual;
- a customer relationship matters;
- accessibility requires judgment;
- a group asks for an exception;
- an outcome may need correction;
- communication failed;
- automatic behavior could create a visibly unfair result.

### 7.3 Never hide automation

When an automatic action changes what staff or customers expect, the result should be visible.

Examples:

- final call indicates that two extra minutes were added;
- weighted capacity reflects the approved party size;
- automatic party-size approval is shown in the entry history;
- message delivery state is visible.

---

## 8. Trust hierarchy

When product goals compete, use this hierarchy:

1. do not lose or corrupt an active entry;
2. do not create the wrong operational outcome;
3. keep staff aware of the current state;
4. preserve customer clarity;
5. allow recovery from error;
6. keep the workflow fast;
7. collect useful analytics;
8. create growth or branding value.

Speed is essential, but not at the cost of silently calling or cancelling the wrong group.

---

## 9. Queue fairness doctrine

### 9.1 Fairness baseline

Arrival time establishes the default order.

### 9.2 Legitimate operational exceptions

A later group may be seated first because of:

- table capacity or layout;
- interior/terrace availability;
- accessibility requirements;
- party-size compatibility;
- another explicit operational decision.

### 9.3 Fairness signals

The dashboard must help staff recognize potential neglect through:

- total waiting time;
- large-group label;
- pass-over count;
- long-wait warning;
- approximate chronological position.

### 9.4 Protected pass-over

When an entry has reached the configured protection condition, a later seating decision requires a quick reason. The reason creates awareness and data, not a prohibition.

### 9.5 Customer honesty

The product must not tell a customer “you are definitely next” unless the restaurant explicitly makes that commitment. The default message is “There are X groups ahead of you,” with a note that order may vary.

---

## 10. Communication doctrine

### 10.1 Message hierarchy

The MVP supports four operational messages:

1. queue-entry confirmation;
2. table-ready call;
3. final call with two-minute extension;
4. cancellation or removal notice.

### 10.2 Confirmation economics

Immediate on-screen confirmation is mandatory. A WhatsApp confirmation may depend on provider economics and plan design. The table-ready call and final call are central to the product promise and must be treated as MVP-critical.

### 10.3 Template philosophy

Templates should be recognizable, concise and operational. Restaurants may personalize limited fields such as:

- restaurant name;
- greeting;
- where to report;
- a short approved instruction.

The MVP does not need unrestricted message authoring.

### 10.4 Delivery truth

The interface should distinguish, when provider data supports it:

- queued or requested;
- sent;
- delivered;
- failed.

The product must not label an unverified message as delivered.

---

## 11. Customer-data minimization

MesaFlow should collect only data necessary to operate the active queue, support the restaurant and evaluate the product.

Principles:

- no customer account by default;
- no unnecessary demographic profile;
- phone is used for operational communication;
- unique status links must not expose phone numbers;
- staff access should reflect operational need;
- retention and deletion policy must support applicable European privacy obligations;
- analytics should avoid collecting sensitive content from free-text notes unless necessary.

This philosophy does not replace legal review.

---

## 12. Product-language rules

### 12.1 Be direct

Use short labels that describe the action or state.

Good:

- “Join the queue”;
- “Call group”;
- “Mark as seated”;
- “Leave queue”;
- “I’m on my way”;
- “Close new entries.”

Avoid:

- “Initiate customer-notification workflow”;
- “Transition entity status”;
- “Execute queue termination.”

### 12.2 Explain consequences

Confirmations should explain what will happen.

Example:

> Leave the queue? Your place will be released and cannot be restored automatically.

### 12.3 Avoid blame

For delivery failures, describe the condition and action rather than blaming the customer or provider.

Example:

> Message not delivered. Try again or contact the customer manually.

### 12.4 Do not overpromise

MesaFlow may help reduce lost customers and improve flow. The product and sales language must not guarantee revenue increases.

---

## 13. Onboarding philosophy

The administrator should reach the first active queue quickly.

The setup flow should:

1. request essential establishment data;
2. show recommended queue settings already selected;
3. explain only settings that affect live operations;
4. generate the permanent QR;
5. offer staff invitations;
6. guide the administrator to open the first service.

Founder-led setup during pilots is a deliberate business strategy, but the product should still be understandable without custom configuration work.

The onboarding is successful when the restaurant can run a real service, not merely when all fields are completed.

---

## 14. Product-quality bar

A release is not ready for restaurant pilots if any of the following remain plausible under normal use:

- an accepted entry does not appear to staff;
- two simultaneous actions create two active call timers for one entry;
- a staff member cannot tell whether a message failed;
- an entry disappears without a terminal outcome;
- an old device overwrites a newer state;
- the service closes with active groups;
- the queue capacity is visibly inconsistent with approved party sizes;
- a customer can accidentally leave with one unconfirmed tap;
- the interface requires knowledge of table numbers;
- a no-contact entry appears to have been notified;
- a final call repeatedly adds grace time because of retries.

Pilot speed does not justify compromising the integrity of the core loop.

---

## 15. Product-expansion gate

A future capability should be considered only after the core queue demonstrates retention and payment.

### 15.1 Reservations

Consider when restaurants repeatedly request a connected workflow and the queue is already retained. Do not let reservation complexity redefine the MVP queue.

### 15.2 Table management

Consider when formal table inventory creates enough operational value to justify setup and maintenance. The current product must work in restaurants without numbered tables.

### 15.3 Predictive waiting time

Consider after sufficient historical service data exists. Prediction must show uncertainty and be evaluated against actual outcomes.

### 15.4 Multiple queues

Consider when restaurants have recurring independent operational flows, such as zones or distinct service areas, that cannot be handled with preferences.

### 15.5 Multiple establishments

Consider when paying restaurant groups require shared administration and reporting.

### 15.6 Integrations

Consider only when the integration reduces meaningful repeated work, improves data reliability or becomes a commercial requirement. Integration breadth is not a goal by itself.

---

## 16. Anti-patterns MesaFlow must reject

### AP-001 — Feature parity

Building something because a larger competitor has it.

### AP-002 — Configuration theatre

Adding settings to appear flexible without validated operational need.

### AP-003 — False intelligence

Showing precise estimates or recommendations without reliable evidence.

### AP-004 — Workflow bureaucracy

Forcing reasons, fields or approvals on every routine action.

### AP-005 — App-first customer experience

Requiring registration or installation for a temporary restaurant wait.

### AP-006 — Marketplace drift

Optimizing restaurant discovery, commissions or customer acquisition before winning queue operations.

### AP-007 — Dashboard vanity

Prioritizing attractive charts over active-service reliability.

### AP-008 — Hidden failure

Suppressing message, synchronization or state errors to keep the interface visually clean.

### AP-009 — Enterprise mimicry

Using complex navigation, terminology or permission models inappropriate for small and medium restaurants.

### AP-010 — Growth before trust

Allowing MesaFlow promotion, upsells or data collection to interrupt the restaurant-customer experience.

---

## 17. Product-review scorecard

A proposed workflow should be scored from 0 to 2 on each dimension.

| Dimension | 0 | 1 | 2 |
|---|---|---|---|
| Real problem | hypothetical | plausible | observed/validated |
| Core-loop impact | unrelated | supportive | essential |
| Staff effort | increases | neutral | reduces |
| Customer clarity | reduces | neutral | improves |
| Peak-service usability | poor | acceptable | obvious and fast |
| Failure recovery | absent | manual/unclear | clear and safe |
| Configuration cost | high | moderate | none/low |
| Scope fit | future | debatable | MVP-aligned |
| Measurability | unclear | partial | clear outcome |
| Strategic consistency | conflicts | neutral | reinforces focus |

Guidance:

- **17–20:** strong candidate;
- **13–16:** refine or validate;
- **9–12:** defer unless risk-critical;
- **0–8:** reject for current phase.

The scorecard informs judgment. It does not override explicit CEO decisions.

---

## 18. Product invariants

The following statements should remain true throughout the MVP:

1. A customer can join without an app.
2. Staff can add a customer manually.
3. One active entry has one current state.
4. Waiting and Called entries consume capacity.
5. Staff can make operational seating decisions.
6. Fairness signals make prolonged neglect visible.
7. A failed message does not erase an entry.
8. A customer can return to the status page through a private link.
9. The restaurant can stop new entries without abandoning active groups.
10. A service cannot end while active entries remain.
11. Closed-service history is not silently mutable.
12. MesaFlow remains a waitlist product until the waitlist is validated and retained.

---

## 19. Glossary of philosophy terms

| Term | Meaning |
|---|---|
| Core loop | Join → manage → call → resolve |
| Paper benchmark | Comparison against the speed and simplicity of the current notebook process |
| Protected entry | A waiting group whose delay or pass-over history requires additional staff awareness |
| Operational control | Staff authority to make the final real-world decision |
| Weighted capacity | Queue occupancy measured in configurable slots rather than simple group count |
| Restaurant-friendly | Designed for quick, obvious use during live service without technical language |
| Status page | Private mobile web page representing one customer’s active entry |
| Service | A bounded operational queue session, such as lunch or dinner |
| Scope expansion | Movement beyond the validated waiting-list wedge |

---

## 20. Final constitutional test

Before shipping any meaningful MesaFlow change, the responsible team should be able to complete this statement:

> This change helps **[specific user]** during **[specific restaurant moment]** by **[observable improvement]**. It belongs now because **[evidence or critical risk]**. It remains simpler than the alternative because **[interaction or configuration justification]**. If it fails, the user can recover by **[recovery path]**.

If the team cannot complete that statement clearly, the change is not ready for approval.
