# MesaFlow — Personas

**Document ID:** PROD-PER-001  
**Product:** MesaFlow  
**Release:** MVP / Pilot Release  
**Status:** Approved user-model specification  
**Owner:** Product Management  
**Version:** 1.0  
**Last updated:** 2026-07-10

---

## 1. Purpose

This document defines the people MesaFlow is designed for.

Personas are not demographic stereotypes. They are operational models used to make product decisions consistently.

Each persona describes:

- the situation in which the person uses MesaFlow;
- the job they are trying to complete;
- their anxieties and constraints;
- what success looks like;
- which product behavior helps or harms them;
- what MesaFlow must never assume.

The MVP must serve all primary personas without forcing one person’s workflow onto another.

---

## 2. Persona hierarchy

| Persona ID | Persona | Product relationship | MVP importance |
|---|---|---|---|
| PER-001 | Restaurant Administrator | Configures and owns the operating environment | Primary |
| PER-002 | Staff Operator | Runs the queue during service | Primary |
| PER-003 | Self-service Customer | Joins and follows the queue through QR | Primary |
| PER-004 | Assisted Customer | Enters through staff rather than QR | Primary inclusion persona |
| PER-005 | Restaurant Owner evaluating MesaFlow | Decides whether to adopt and pay | Commercial decision persona |
| PER-006 | Customer accompanying a group | Receives information indirectly from the primary contact | Secondary |

---

## 3. PER-001 — Restaurant Administrator

### 3.1 Typical real-world roles

The Administrator may be:

- the restaurant owner;
- a general manager;
- a floor manager with authority to configure operations;
- a trusted person responsible for software and staff access.

The role is defined by responsibility, not job title.

### 3.2 Context

The Administrator wants to replace an existing waiting-list process without launching a transformation project.

They may be:

- using paper today;
- using a notebook, spreadsheet or notes application;
- relying on one experienced employee’s memory;
- worried that new software will create more work than it removes;
- willing to pay only if staff actually use the product during busy periods.

### 3.3 Primary jobs to be done

1. Set up MesaFlow without technical help.
2. Configure only the rules that differ between restaurants.
3. Generate a stable QR that can be printed once.
4. Give staff access without sharing one account.
5. Know whether the queue is being used correctly.
6. Understand whether messaging is working and what it may cost.
7. Review basic service outcomes.
8. Correct operational mistakes before a service closes.
9. Protect the restaurant from excessive waiting-list load.

### 3.4 Functional goals

- launch the first service in under ten minutes;
- set a queue limit appropriate to the restaurant;
- define call timing;
- protect large groups from being ignored;
- maintain a trustworthy record;
- avoid configuring a table map or complex automation;
- preserve control while delegating day-to-day operation.

### 3.5 Emotional goals

The Administrator wants to feel:

- confident that the product will not embarrass the restaurant;
- certain that staff cannot accidentally change structural rules;
- reassured that a failed WhatsApp message is visible;
- in control of cost exposure;
- proud that the customer experience feels modern but not overengineered.

### 3.6 Pain points

- products that require too many settings;
- hidden message costs;
- shared logins with no accountability;
- tools that assume every restaurant numbers tables;
- dashboards that are useful only after long training;
- systems that promise precise waiting times without evidence;
- staff refusing to adopt new software;
- losing historical context after an employee makes a mistake.

### 3.7 Behaviors

The Administrator is likely to:

- accept good defaults rather than customize everything;
- test the product before printing the QR widely;
- ask whether staff can use it from tablets;
- review the product more often at the start than later;
- compare subscription cost with lost customers, staff stress and poor reviews;
- care more about reliability than visual novelty.

### 3.8 Product needs

MesaFlow must provide:

- guided onboarding;
- constrained, understandable configuration;
- one stable establishment context;
- individual staff accounts;
- role boundaries;
- clear QR lifecycle;
- basic service history;
- auditability;
- message-consumption visibility;
- a product that remains useful even when WhatsApp fails.

### 3.9 Anti-needs

The Administrator does not need in the MVP:

- custom roles;
- a full business intelligence suite;
- a marketplace;
- reservations;
- table layout design;
- integrations before standalone value is proven;
- a customer application;
- complex campaign tools.

### 3.10 Success statement

> “I configured it once, the team uses it during busy service, and I can see that customers are no longer crowded at the door.”

### 3.11 Failure statement

> “It looked good in the demo, but the team returned to paper because it was slower or because they could not trust what the other device showed.”

### 3.12 Relevant canonical features

`FEAT-001`–`FEAT-008`, `FEAT-017`–`FEAT-019`, `FEAT-031`, `FEAT-039`, `FEAT-042`, `FEAT-054`–`FEAT-058`.

---

## 4. PER-002 — Staff Operator

### 4.1 Typical real-world roles

The Staff Operator may be:

- a host;
- a waiter;
- a floor manager;
- a receptionist;
- an owner working the floor;
- any employee currently responsible for the waiting list.

### 4.2 Context

The Staff Operator uses MesaFlow while:

- customers are arriving;
- tables are turning;
- colleagues are asking questions;
- the entrance is noisy;
- customers are impatient;
- the employee is balancing queue work with other responsibilities.

The product competes with paper at the most stressful moment of the service.

### 4.3 Primary jobs to be done

1. Add a customer quickly when QR is not suitable.
2. See who is waiting and for how long.
3. Identify groups compatible with an available table.
4. Avoid forgetting a large or long-wait group.
5. Call one or several groups.
6. Know whether the message was sent or failed.
7. See when a customer says they are on the way.
8. Resolve every entry correctly.
9. Correct a mistake without corrupting history.
10. Coordinate with colleagues using other devices.

### 4.4 Functional goals

- perform common actions in seconds;
- avoid navigating through configuration;
- see the information needed for the next seating decision;
- keep the queue moving;
- call customers without shouting at the entrance;
- maintain flexibility when the real floor differs from the theoretical order;
- avoid duplicate actions with colleagues.

### 4.5 Emotional goals

The Staff Operator wants to feel:

- less stressed;
- supported rather than monitored;
- trusted to use judgement;
- protected from arguments about queue fairness;
- confident that the customer was called;
- certain that another colleague is seeing the same state.

### 4.6 Pain points

- illegible paper;
- names being misheard;
- customers asking repeatedly for updates;
- not knowing whether another employee called someone;
- being forced to explain every routine decision;
- software that takes more taps than writing a name;
- large groups remaining invisible because they are hard to seat;
- false precision about wait time;
- automatic actions that contradict the real room.

### 4.7 Behaviors

The Staff Operator may:

- prioritize speed over completeness;
- leave optional fields blank during busy periods;
- use internal notes for exceptional context;
- filter by party size when a table becomes free;
- call more than one group when several tables are available;
- override chronological order for legitimate operational reasons;
- resist any feature that feels like management bureaucracy.

### 4.8 Product needs

MesaFlow must provide:

- fast manual entry;
- a clear Waiting section;
- separate Called entries;
- recent outcomes;
- party-size filtering;
- elapsed wait;
- large-group label;
- pass-over visibility;
- long-wait warning;
- quick protected bypass reasons;
- independent timers;
- visible communication status;
- retry;
- no-contact treatment;
- rapid multi-device synchronization;
- explicit terminal outcomes.

### 4.9 Anti-needs

The Staff Operator does not need:

- a forced table map;
- automatic seating decisions;
- strict FIFO blocking;
- a mandatory explanation for every action;
- customer account management;
- marketing data;
- custom analytics;
- staff-performance scoring.

### 4.10 Success statement

> “I can see the queue, call the right group and move on. The system helps me remember what matters without getting in my way.”

### 4.11 Failure statement

> “During the rush, I need to keep paper beside the tablet because the software is slower or because I do not trust its current state.”

### 4.12 Relevant canonical features

`FEAT-015`–`FEAT-041`, `FEAT-049`–`FEAT-056`, `FEAT-058`.

---

## 5. PER-003 — Self-service Customer

### 5.1 Context

The Self-service Customer arrives without a reservation or needs to join the walk-in queue.

They may be:

- hungry;
- with children;
- part of a group;
- unfamiliar with the restaurant;
- unsure whether the wait is worth it;
- worried about losing their turn;
- unwilling to install an app for one visit.

### 5.2 Primary jobs to be done

1. Understand whether the queue is open.
2. Join quickly.
3. Know that the entry was accepted.
4. Move away from the entrance.
5. Check relative position.
6. Update a low-risk detail.
7. Know when the restaurant calls.
8. Indicate that the group is returning.
9. Leave the queue when plans change.

### 5.3 Functional goals

- complete the form without creating an account;
- receive clear confirmation;
- see groups ahead;
- understand that order may vary;
- reopen the status page;
- receive the call through WhatsApp;
- avoid being accidentally removed;
- avoid being promised an inaccurate wait time.

### 5.4 Emotional goals

The customer wants to feel:

- acknowledged;
- free to wait nearby;
- less anxious about missing the call;
- treated fairly;
- confident that the restaurant has not forgotten them;
- respected when they decide to leave.

### 5.5 Pain points

- standing in a crowded doorway;
- listening for a name in a noisy environment;
- uncertainty about whether the name was written correctly;
- being overtaken with no explanation;
- installing a new app;
- giving unnecessary personal information;
- having to ask staff for every update;
- losing the place because of one accidental tap.

### 5.6 Behaviors

The customer may:

- scan before speaking to staff;
- enter the phone number quickly and make mistakes;
- leave the page after confirmation;
- share the status with the group;
- change party size while waiting;
- respond to the call while walking back;
- leave for another restaurant if the queue feels uncertain.

### 5.7 Product needs

MesaFlow must provide:

- restaurant-branded welcome;
- short mobile form;
- clear unavailable states;
- private status link;
- groups-ahead display;
- elapsed wait;
- call countdown;
- WhatsApp call;
- final call;
- “I’m on my way”;
- confirmed leave action;
- low-risk editing;
- transparent explanation of flexible order.

### 5.8 Anti-needs

The customer does not need:

- an account;
- an app;
- a loyalty profile;
- table selection;
- exact predicted time;
- access to other customers’ information;
- repeated marketing consent during a queue interaction.

### 5.9 Success statement

> “I joined in less than a minute, waited somewhere more comfortable and returned when the message arrived.”

### 5.10 Failure statement

> “I scanned the QR, but I still did not know whether I was really in the queue or whether I had missed my turn.”

### 5.11 Relevant canonical features

`FEAT-006`–`FEAT-014`, `FEAT-033`–`FEAT-048`, `FEAT-057`, `FEAT-059`.

---

## 6. PER-004 — Assisted Customer

### 6.1 Context

The Assisted Customer cannot or does not want to use the QR journey.

Possible reasons:

- no smartphone;
- low digital confidence;
- visual or motor difficulty;
- language difficulty;
- no data connection;
- unwillingness to provide a phone number;
- preference to speak directly with staff.

### 6.2 Primary jobs to be done

1. Join the same queue as everyone else.
2. Avoid being penalized for not using QR.
3. Receive understandable instructions from staff.
4. Be called in person when no contact is available.
5. Retain the same fairness protection as digital customers.

### 6.3 Product principles for this persona

- QR is the default, not a condition of service.
- Manual entry is a first-class entry path.
- Phone is optional.
- No-contact status is an internal operational signal, not a lower-priority state.
- The customer should not need to understand MesaFlow to benefit from it.

### 6.4 Success statement

> “The employee added me without making me feel excluded, and I remained in the same queue.”

### 6.5 Failure statement

> “Because I could not use the QR, I was treated as an informal note and forgotten.”

### 6.6 Relevant canonical features

`FEAT-015`, `FEAT-016`, `FEAT-023`, `FEAT-028`–`FEAT-032`, `FEAT-049`–`FEAT-053`.

---

## 7. PER-005 — Restaurant Owner evaluating MesaFlow

### 7.1 Context

This persona may overlap with the Administrator but appears before purchase and at renewal.

They evaluate whether MesaFlow:

- creates enough operational value;
- is simple enough for staff;
- has predictable cost;
- reduces queue friction;
- helps avoid lost customers;
- is worth approximately the proposed monthly price.

### 7.2 Decision questions

- Will the team actually use it?
- How quickly can it replace paper?
- Does WhatsApp add hidden cost?
- Will customers understand it?
- What happens when messaging fails?
- Can I stop a queue from growing too large?
- Does it help with large groups?
- Can I see basic results?
- Is this only a demo, or can it run a real Saturday night?

### 7.3 Adoption evidence

The owner is more likely to continue when:

- the team uses MesaFlow during peak periods;
- paper is no longer needed;
- customers move away from the entrance;
- fewer status questions reach staff;
- no entries are lost;
- service history feels credible;
- message usage is understandable;
- the pilot produces a clear testimonial-worthy improvement.

### 7.4 Churn risks

- staff resistance;
- perceived slowness;
- message cost surprise;
- unreliable synchronization;
- false waiting estimates;
- complexity beyond the core queue;
- need to maintain both paper and MesaFlow;
- poor support during initial pilot.

### 7.5 Relevant canonical features

All MVP features contribute, especially `FEAT-003`, `FEAT-027`, `FEAT-040`–`FEAT-042`, `FEAT-055`–`FEAT-059`.

---

## 8. PER-006 — Customer accompanying a group

### 8.1 Context

The queue entry has one primary contact, but several people may depend on the information.

This person may:

- ask the primary contact for updates;
- arrive later;
- be delayed in traffic;
- join the seated group after the rest;
- never interact directly with MesaFlow.

### 8.2 Product implications

- MesaFlow does not require every group member to register.
- The product does not enforce that the entire party is present before seating.
- Party size may change through the approved control.
- The primary contact remains responsible for receiving operational communication.
- The restaurant retains judgement about whether absent members can join later.

---

## 9. Cross-persona tensions

### 9.1 Speed versus completeness

- Customer and Staff want minimal input.
- Administrator wants enough information and accountability.

Resolution:

- only three required QR fields;
- only two required minimum manual fields;
- optional preferences;
- material audit without mandatory explanation for routine actions.

### 9.2 Fairness versus table compatibility

- Customer expects chronological fairness.
- Staff needs to seat compatible groups.

Resolution:

- chronological canonical order;
- groups-ahead wording;
- transparency that order may vary;
- elapsed wait;
- pass-over count;
- long-wait warning;
- protected bypass reason;
- no automatic blocking.

### 9.3 Communication convenience versus cost

- Customer benefits from WhatsApp.
- Owner fears unpredictable cost.

Resolution:

- WhatsApp as primary operational channel;
- web page remains available;
- no automatic paid fallback;
- message consumption measured before final packaging.

### 9.4 Self-service versus control

- Customer wants to correct details.
- Staff must protect seating reality.

Resolution:

- name and preference editing allowed;
- reductions automatic;
- small increases may be automatic;
- larger increases require approval;
- phone changes require staff;
- timer extension remains staff-controlled.

### 9.5 Accountability versus staff friction

- Administrator needs attribution.
- Staff rejects bureaucracy.

Resolution:

- individual accounts;
- automatic action logging;
- reasons only for protected bypass;
- no custom permission complexity;
- no staff scoring.

---

## 10. Persona-based product review checklist

Before approving a feature or UX change, ask:

### Administrator
- Does this reduce setup confidence?
- Does it add configuration without clear operational value?
- Does it expose cost or hide it?
- Can the Administrator understand the effect of the setting?

### Staff
- Can this be used during a rush?
- Does it add steps to a frequent action?
- Does it preserve human judgement?
- Does it make another employee’s state trustworthy?

### Self-service Customer
- Is account or app friction introduced?
- Is the current queue state clear?
- Is the wording honest?
- Can the customer recover the status page safely?

### Assisted Customer
- Does this create a digital-only path?
- Is manual entry equal in queue treatment?
- Can the staff operate the entry without phone contact?

### Evaluating Owner
- Does this make the value easier or harder to explain?
- Does it create hidden cost or support burden?
- Does it help replace paper or broaden the product prematurely?

---

## 11. Persona validity during pilot

Personas should be revised only from evidence, including:

- observed service behavior;
- staff interviews after peak service;
- customer confusion or abandonment;
- support incidents;
- feature-use data;
- conversion and retention interviews;
- repeated differences across restaurant types.

A single opinion does not automatically justify a new persona or new product role.
