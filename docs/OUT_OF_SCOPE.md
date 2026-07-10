# MesaFlow — Out of Scope

**Document ID:** PROD-OOS-001  
**Product:** MesaFlow  
**Release:** MVP / Pilot Release  
**Status:** Approved product boundary  
**Owner:** Product Management  
**Version:** 1.0  
**Last updated:** 2026-07-10

---

## 1. Purpose

This document protects the MesaFlow MVP from scope expansion.

An out-of-scope item is not necessarily a bad idea. It is an item that:

- solves a different stage of the restaurant journey;
- introduces disproportionate operational or configuration complexity;
- lacks validation for the initial target;
- weakens the product’s ability to replace paper simply;
- should only be considered after the waitlist product proves adoption and willingness to pay.

The existence of an item in this document means it must not be implemented silently as part of an MVP feature.

---

## 2. Boundary principle

MesaFlow MVP owns this journey:

> A walk-in group joins an active restaurant waiting list, waits away from the entrance, receives a table-ready call and reaches a clear outcome.

The MVP does not own:

- planning a visit in advance;
- managing physical table inventory;
- taking orders or payment;
- marketing to customers after the visit;
- aggregating restaurant demand;
- managing restaurant staff or kitchen operations.

---

## 3. Reservations

Explicitly excluded:

- booking dates and times;
- reservation availability;
- reservation deposits;
- confirmation and reminder journeys;
- reservation modification and cancellation;
- merging reservations with the live queue;
- no-show policy for booked customers;
- reservation marketplace distribution.

### Why excluded

Reservations create a distinct inventory, time-slot and policy model. Adding them before the live waitlist is validated would expand MesaFlow from a focused queue product into a broader front-of-house platform.

### Future entry trigger

Reconsider only when:

- the waitlist product has paying retention;
- multiple target restaurants repeatedly request a connected reservation workflow;
- the product team can define how reservations and walk-ins interact without damaging simplicity.

---

## 4. Table management

Explicitly excluded:

- visual table map;
- table numbering requirement;
- table status;
- capacity by individual table;
- combining and splitting tables;
- automatic table assignment;
- formal section or waiter ownership;
- cleaning or turnover states;
- optimization of seating arrangements.

### Why excluded

Many target restaurants do not formally label tables in a way customers understand. Staff already know their room. The MVP must support that knowledge rather than requiring restaurants to digitize the floor before receiving value.

The call message therefore says that the table is ready and where the customer should report; it does not require “Table X”.

### Future entry trigger

Reconsider when repeated pilot evidence shows that lack of table inventory:

- causes material seating errors;
- prevents useful wait prediction;
- limits willingness to pay more than the complexity it introduces.

---

## 5. Multiple queues

Explicitly excluded:

- separate interior and terrace queues;
- rooftop and main-room queues;
- event queue plus normal queue;
- separate queues by party size;
- separate lunch products operating simultaneously;
- transferring entries between queues.

Interior/terrace remains an entry preference in the MVP.

### Why excluded

Multiple queues complicate customer position, weighted capacity, staffing and fairness. One queue provides one source of truth.

### Future entry trigger

Reconsider when multiple restaurants demonstrate a recurring operational model that cannot be handled through preferences, filters and staff judgement.

---

## 6. Multiple establishments

Explicitly excluded from the MVP interface:

- owner portfolio dashboard;
- switching between branches;
- group-level administrators;
- shared staff across establishments;
- combined analytics;
- centralized templates;
- location-specific billing.

### Why excluded

The initial sales and pilot motion targets independent restaurants. A multi-location model adds navigation, permissions, configuration inheritance and commercial complexity before single-location adoption is validated.

### Future readiness

The product should avoid making future multi-establishment support impossible. This is a design constraint, not permission to expose partial multi-location features.

### Future entry trigger

A paying restaurant group needs the capability and agrees to pilot the operating model.

---

## 7. Predicted waiting time

Explicitly excluded:

- fixed staff-entered wait estimate;
- automatic estimated minutes;
- “your table will be ready at” promise;
- AI prediction;
- prediction by party size, day or time;
- confidence ranges.

### Why excluded

The initial product does not yet have enough trustworthy restaurant-specific data. False precision damages trust more than no estimate.

The customer sees:

- elapsed waiting time;
- groups ahead;
- explanation that order may vary.

### Future entry trigger

Reconsider when:

- enough clean service history exists;
- table and outcome definitions are stable;
- prediction accuracy can be measured;
- restaurants and customers demonstrate that the estimate changes useful behavior.

---

## 8. Strict algorithmic ordering

Explicitly excluded:

- forcing exact FIFO seating;
- automatic reordering;
- blocking staff from choosing another group;
- automatically prioritizing based on a hidden score;
- automatic penalties for bypassing a group;
- automatic seating recommendation presented as authoritative.

### Why excluded

Restaurant seating depends on physical tables, group sizes, preferences and human knowledge. MesaFlow makes fairness visible but does not replace operational judgement.

Included instead:

- chronological canonical order;
- party-size filtering;
- long-wait warning;
- pass-over count;
- quick reason in protected cases.

---

## 9. Customer account and native app

Explicitly excluded:

- customer registration;
- password or social login;
- saved profile;
- native iOS or Android app;
- app installation prompt;
- cross-restaurant customer identity;
- saved queue history;
- customer wallet or loyalty identity.

### Why excluded

An account or app creates friction for a momentary restaurant need. The approved experience uses a private entry-specific web link.

---

## 10. Remote marketplace and discovery

Explicitly excluded:

- restaurant browsing;
- joining arbitrary restaurants remotely;
- consumer marketplace;
- restaurant ranking;
- promoted listings;
- demand generation;
- paid placement;
- queue comparison across restaurants;
- customer discovery application.

### Why excluded

The MVP is a B2B operational tool. Marketplace dynamics require supply density, consumer acquisition and a different trust model.

The permanent QR is an on-site restaurant entry point, not a consumer marketplace listing.

---

## 11. POS and restaurant-system integrations

Explicitly excluded:

- POS integration;
- reservation-platform integration;
- payment integration;
- accounting integration;
- staff scheduling integration;
- kitchen display integration;
- automatic table status from another system;
- generic integration marketplace.

### Why excluded

Integrations introduce vendor-specific dependencies and support burden before the standalone product value is proven.

### Future entry trigger

A specific integration should only enter the roadmap when it:

- solves a repeated validated workflow;
- materially improves acquisition or retention;
- has a viable support and commercial model.

---

## 12. CRM, loyalty and marketing

Explicitly excluded:

- customer database for marketing;
- profiles across visits;
- segments;
- campaigns;
- offers;
- loyalty points;
- birthday messages;
- review requests;
- remarketing;
- customer-value scoring.

### Why excluded

The phone number is collected for an immediate operational queue purpose. Expanding into marketing changes consent, privacy and product purpose. It also distracts from validating the queue.

---

## 13. Ordering, payment and kitchen operations

Explicitly excluded:

- menus;
- pre-ordering while waiting;
- food ordering;
- deposits;
- bill payment;
- kitchen queue;
- order-status notifications;
- inventory;
- delivery or takeaway.

These are separate product categories.

---

## 14. Staff and workforce management

Explicitly excluded:

- shifts;
- attendance;
- clock-in;
- payroll;
- performance scores;
- employee scheduling;
- staff chat;
- task management;
- labor forecasting.

Individual staff accounts exist for access and attribution only.

---

## 15. Advanced permissions

Explicitly excluded:

- custom roles;
- permission matrices;
- area-specific access;
- temporary role escalation;
- read-only analysts;
- external agency role;
- shared operational PIN.

The MVP has Administrator and Staff.

---

## 16. Advanced analytics

Explicitly excluded:

- custom dashboards;
- cohort analysis;
- revenue attribution;
- conversion funnels exposed to restaurants;
- benchmarking between restaurants;
- predictive demand;
- export builder;
- scheduled reports;
- configurable metrics;
- staff performance ranking.

Included history is intentionally basic:

- received;
- seated;
- cancelled;
- no-show;
- average wait;
- maximum wait;
- pass-overs;
- messages sent and failed.

---

## 17. Communication expansion

Explicitly excluded:

- automatic paid SMS fallback;
- automated voice calls;
- email journeys;
- marketing WhatsApp;
- fully free-form message builder;
- multi-step automation;
- customer-selected channel;
- two-way conversational bot;
- automatic interpretation of WhatsApp replies.

### Why excluded

Every automatic paid channel affects restaurant cost, reliability and support. The MVP uses WhatsApp operational messages and a web status page, with manual staff recovery when necessary.

---

## 18. Fully automatic no-show behavior

Explicitly excluded:

- timer expiry automatically marking No-show;
- automatic cancellation without staff;
- automatically seating or skipping based on timer;
- customer acknowledgement guaranteeing preservation of the table.

### Why excluded

The staff has real-world context. Timer expiry is a decision signal, not proof of absence.

---

## 19. Customer-controlled queue manipulation

Explicitly excluded:

- selecting a preferred position;
- paying for priority;
- pausing the queue entry;
- repeatedly extending call time;
- moving to a later slot;
- changing phone without staff;
- restoring a cancelled entry independently;
- choosing a specific table.

Included self-service is limited to low-risk corrections and explicit departure.

---

## 20. White-label removal in the initial plan

Explicitly excluded:

- removing all MesaFlow branding in the initial plan;
- replacing MesaFlow attribution with custom provider text.

Restaurant identity remains primary and MesaFlow branding remains discreet.

A paid white-label option may be evaluated later as a commercial feature.

---

## 21. Unsupported state expansion

Do not add these states without a new approved product decision:

- Paused;
- Arrived;
- Confirmed;
- Group incomplete;
- Partially seated;
- Waiting for preferred zone;
- Table assigned;
- Contact failed;
- Expired;
- Rejected.

These conditions can be represented through existing state, attributes, notes or communication indicators where approved.

---

## 22. Common scope-creep disguises

The following phrases do not make an out-of-scope item acceptable:

- “It is only one field.”
- “The database already supports it.”
- “Competitors have it.”
- “It will help later.”
- “It is easy for Codex.”
- “We can hide it behind settings.”
- “The customer asked once.”
- “It is not a full reservation system.”
- “It is just a basic table map.”
- “It is just an estimate.”
- “It is just one extra role.”

Product complexity is measured by behavior, states, support and user understanding—not code size.

---

## 23. Handling new requests

When an out-of-scope request appears:

1. record the user and problem;
2. identify the current workaround;
3. determine frequency and severity;
4. check whether an approved MVP feature can solve it;
5. collect evidence across target restaurants;
6. estimate added states, rules and configuration;
7. define success evidence;
8. place it in the backlog;
9. do not implement until priority is approved.

---

## 24. Future-feature admission gate

An out-of-scope capability may enter a later release only when:

- the target user and problem are clear;
- the current queue product has relevant adoption evidence;
- the feature does not contradict product philosophy;
- the added complexity is understood;
- required data is available and trustworthy;
- success can be measured;
- commercial value or retention value is plausible;
- Product Management updates all affected documents.

---

## 25. Final boundary test

A proposed feature is likely outside the MVP when it requires MesaFlow to know:

- which exact table is free;
- what time a future guest will arrive;
- what a customer ordered or paid;
- who the customer was across previous visits;
- which employee should work;
- which restaurant a consumer should choose;
- how long a table will remain occupied;
- which marketing message to send after the visit.

The MVP needs to know:

- who is waiting now;
- how large the group is;
- how long it has waited;
- how it can be contacted;
- whether it has been called;
- what happened to the entry.
