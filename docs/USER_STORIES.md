# MesaFlow — User Stories

**Document ID:** PROD-US-001  
**Product:** MesaFlow  
**Release:** MVP / Pilot Release  
**Status:** Approved user-story specification  
**Owner:** Product Management  
**Version:** 1.0  
**Last updated:** 2026-07-10

---

## 1. Purpose

This document translates the canonical MesaFlow features into user-centered delivery units.

Each primary story is linked one-to-one with a canonical feature:

- `FEAT-001` maps to `US-001`;
- …
- `FEAT-059` maps to `US-059`.

Stories `US-060`–`US-068` protect cross-feature integrity that cannot be validated through one feature alone.

These stories specify product intent and acceptance. They do not define technical architecture, database models, frameworks or implementation tasks.

---

## 2. Story completion standard

A story is not complete merely because a screen or control exists.

Completion requires:

1. the intended persona can achieve the stated outcome;
2. permissions are correct;
3. required behavior works end to end;
4. unavailable and failure states are understandable;
5. derived queue values remain correct;
6. material actions are audited or measured where required;
7. the story works in its linked journey;
8. explicit exclusions remain excluded.

---

## 3. Primary feature stories


### US-001 — Administrator account creation

**Canonical feature:** `FEAT-001`  

**Primary persona:** Restaurant Administrator  

**Related journeys:** JRN-001  

**Priority:** P0  


> As a restaurant administrator, I want to create the first administrator account, so that a first internal user can create an account and becomes Administrator.


#### Problem and value

The restaurant needs an accountable owner of setup and access. This story creates value only when it works inside the complete queue journey rather than as an isolated interface element.


#### Preconditions

- No prior canonical feature is required beyond valid access to the relevant MesaFlow entry point.
- The user has valid Administrator access.

#### Acceptance summary

- **US-001-AC1:** The first valid internal account created for a new restaurant context is assigned the Administrator role.
- **US-001-AC2:** The user must be able to continue directly into establishment setup.
- **US-001-AC3:** Account creation must not expose role or permission complexity that does not exist in the MVP.

#### Safeguards

- The story must not expose multi-establishment or custom-role complexity.
- Access and QR changes remain attributable where material.

#### Explicit exclusions

- Custom roles.
- Enterprise identity management.
- Multi-establishment administration.

#### Completion evidence

- `US-001` is demonstrated inside JRN-001.
- All acceptance-summary statements pass without an undocumented manual workaround.
- No behavior from `OUT_OF_SCOPE.md` is introduced.


### US-002 — Establishment profile

**Canonical feature:** `FEAT-002`  

**Primary persona:** Restaurant Administrator  

**Related journeys:** JRN-001  

**Priority:** P0  


> As a restaurant administrator, I want to establishment profile, so that administrator stores required restaurant identity, contact, language and time-zone information.


#### Problem and value

Public and operational experiences require a restaurant context. This story creates value only when it works inside the complete queue journey rather than as an isolated interface element.


#### Preconditions

- Required dependent product capabilities are available: `FEAT-001`.
- The user has valid Administrator access.

#### Acceptance summary

- **US-002-AC1:** Required establishment data: restaurant name, address, phone, primary language and time zone.
- **US-002-AC2:** Optional identity fields may include logo, website, social links and short description.
- **US-002-AC3:** The profile supplies restaurant identity to public screens and approved message fields.

#### Safeguards

- The story must not expose multi-establishment or custom-role complexity.
- Access and QR changes remain attributable where material.

#### Explicit exclusions

- Custom roles.
- Enterprise identity management.
- Multi-establishment administration.

#### Completion evidence

- `US-002` is demonstrated inside JRN-001.
- All acceptance-summary statements pass without an undocumented manual workaround.
- No behavior from `OUT_OF_SCOPE.md` is introduced.


### US-003 — Guided operational setup

**Canonical feature:** `FEAT-003`  

**Primary persona:** Restaurant Administrator  

**Related journeys:** JRN-001  

**Priority:** P0  


> As a restaurant administrator, I want to guided operational setup, so that the product provides recommended defaults and collects only approved queue settings.


#### Problem and value

A configuration-heavy setup would prevent activation. This story creates value only when it works inside the complete queue journey rather than as an isolated interface element.


#### Preconditions

- Required dependent product capabilities are available: `FEAT-002`.
- The user has valid Administrator access.

#### Acceptance summary

- **US-003-AC1:** The setup covers only queue rules approved for the MVP.
- **US-003-AC2:** Recommended values are prefilled and may be accepted without modification.
- **US-003-AC3:** The setup includes maximum slots, call duration, long-wait threshold, QR party-size maximum, weighted-capacity cutoff, party-size approval threshold, reporting instruction and displayed restaurant name.
- **US-003-AC4:** Completion results in a queue that is ready to open.

#### Safeguards

- The story must not expose multi-establishment or custom-role complexity.
- Access and QR changes remain attributable where material.

#### Explicit exclusions

- Custom roles.
- Enterprise identity management.
- Multi-establishment administration.

#### Completion evidence

- `US-003` is demonstrated inside JRN-001.
- All acceptance-summary statements pass without an undocumented manual workaround.
- No behavior from `OUT_OF_SCOPE.md` is introduced.


### US-004 — Individual staff invitation and access

**Canonical feature:** `FEAT-004`  

**Primary persona:** Restaurant Administrator  

**Related journeys:** JRN-001  

**Priority:** P0  


> As a restaurant administrator, I want to individual staff invitation and access, so that administrator invites individual Staff users.


#### Problem and value

Shared access removes accountability. This story creates value only when it works inside the complete queue journey rather than as an isolated interface element.


#### Preconditions

- Required dependent product capabilities are available: `FEAT-001`, `FEAT-002`.
- The user has valid Administrator access.

#### Acceptance summary

- **US-004-AC1:** The Administrator invites each staff member to an individual account.
- **US-004-AC2:** Invited staff receive the Staff role for the establishment.
- **US-004-AC3:** Shared credentials and a shared operational PIN are not part of the MVP.
- **US-004-AC4:** Removing access must not erase historical attribution.

#### Safeguards

- The story must not expose multi-establishment or custom-role complexity.
- Access and QR changes remain attributable where material.

#### Explicit exclusions

- Custom roles.
- Enterprise identity management.
- Multi-establishment administration.

#### Completion evidence

- `US-004` is demonstrated inside JRN-001.
- All acceptance-summary statements pass without an undocumented manual workaround.
- No behavior from `OUT_OF_SCOPE.md` is introduced.


### US-005 — Permissions

**Canonical feature:** `FEAT-005`  

**Primary persona:** Restaurant Administrator  

**Related journeys:** JRN-001  

**Priority:** P0  


> As a restaurant administrator, I want to permissions, so that administrator and Staff permissions follow Section 11.


#### Problem and value

Structural settings should not be changed accidentally during service. This story creates value only when it works inside the complete queue journey rather than as an isolated interface element.


#### Preconditions

- Required dependent product capabilities are available: `FEAT-001`, `FEAT-004`.
- The user has valid Administrator access.

#### Acceptance summary

- **US-005-AC1:** Administrator can configure structural rules and perform all operational actions.
- **US-005-AC2:** Staff can operate services and entries but cannot alter structural settings.
- **US-005-AC3:** Permission differences must be reflected in both available actions and enforcement.
- **US-005-AC4:** The MVP has no custom roles or permission builder.

#### Safeguards

- The story must not expose multi-establishment or custom-role complexity.
- Access and QR changes remain attributable where material.

#### Explicit exclusions

- Custom roles.
- Enterprise identity management.
- Multi-establishment administration.

#### Completion evidence

- `US-005` is demonstrated inside JRN-001.
- All acceptance-summary statements pass without an undocumented manual workaround.
- No behavior from `OUT_OF_SCOPE.md` is introduced.


### US-006 — Permanent establishment QR

**Canonical feature:** `FEAT-006`  

**Primary persona:** Restaurant Administrator  

**Related journeys:** JRN-001  

**Priority:** P0  


> As a restaurant administrator, I want to permanent establishment QR, so that one permanent public QR points to the current establishment queue state.


#### Problem and value

Restaurant needs a reusable entry point. This story creates value only when it works inside the complete queue journey rather than as an isolated interface element.


#### Preconditions

- Required dependent product capabilities are available: `FEAT-002`.
- The user has valid Administrator access.

#### Acceptance summary

- **US-006-AC1:** One public QR entry point is associated with the establishment.
- **US-006-AC2:** The QR remains valid across service openings and closures until explicitly regenerated.
- **US-006-AC3:** Scanning always resolves to the current public queue state rather than to a stale service-specific page.

#### Safeguards

- The story must not expose multi-establishment or custom-role complexity.
- Access and QR changes remain attributable where material.

#### Explicit exclusions

- Remote marketplace discovery.
- Customer account creation.
- Predicted waiting time.

#### Completion evidence

- `US-006` is demonstrated inside JRN-001.
- All acceptance-summary statements pass without an undocumented manual workaround.
- No behavior from `OUT_OF_SCOPE.md` is introduced.


### US-007 — QR download

**Canonical feature:** `FEAT-007`  

**Primary persona:** Restaurant Administrator  

**Related journeys:** JRN-001  

**Priority:** P0  


> As a restaurant administrator, I want to download the current QR for printing, so that administrator can obtain a printable asset.


#### Problem and value

Restaurant must deploy the QR physically. This story creates value only when it works inside the complete queue journey rather than as an isolated interface element.


#### Preconditions

- Required dependent product capabilities are available: `FEAT-006`.
- The user has valid Administrator access.

#### Acceptance summary

- **US-007-AC1:** Administrator can obtain the current QR in a form suitable for printing.
- **US-007-AC2:** The output must preserve scan reliability at normal restaurant display sizes.
- **US-007-AC3:** Downloading the QR does not open or close a service.

#### Safeguards

- The story must not expose multi-establishment or custom-role complexity.
- Access and QR changes remain attributable where material.

#### Explicit exclusions

- Remote marketplace discovery.
- Customer account creation.
- Predicted waiting time.

#### Completion evidence

- `US-007` is demonstrated inside JRN-001.
- All acceptance-summary statements pass without an undocumented manual workaround.
- No behavior from `OUT_OF_SCOPE.md` is introduced.


### US-008 — QR regeneration

**Canonical feature:** `FEAT-008`  

**Primary persona:** Restaurant Administrator  

**Related journeys:** JRN-001  

**Priority:** P0  


> As a restaurant administrator, I want to regenerate a compromised public QR safely, so that administrator can invalidate the old entry link and issue a new QR after warning and confirmation.


#### Problem and value

Public access may be misused or exposed. This story creates value only when it works inside the complete queue journey rather than as an isolated interface element.


#### Preconditions

- Required dependent product capabilities are available: `FEAT-006`, `FEAT-005`.
- The user has valid Administrator access.

#### Acceptance summary

- **US-008-AC1:** Only an Administrator can regenerate the QR.
- **US-008-AC2:** The product warns that previously printed QRs will stop accepting new entries.
- **US-008-AC3:** Existing accepted queue entries and their private status links remain valid.
- **US-008-AC4:** Regeneration is recorded as a material action.

#### Safeguards

- The story must not expose multi-establishment or custom-role complexity.
- Access and QR changes remain attributable where material.

#### Explicit exclusions

- Remote marketplace discovery.
- Customer account creation.
- Predicted waiting time.

#### Completion evidence

- `US-008` is demonstrated inside JRN-001.
- All acceptance-summary statements pass without an undocumented manual workaround.
- No behavior from `OUT_OF_SCOPE.md` is introduced.


### US-009 — Public welcome and state screen

**Canonical feature:** `FEAT-009`  

**Primary persona:** Customer  

**Related journeys:** JRN-003  

**Priority:** P0  


> As a customer, I want to public welcome and state screen, so that show restaurant identity, current queue state and appropriate next action.


#### Problem and value

Customers need trust and context before entering data. This story creates value only when it works inside the complete queue journey rather than as an isolated interface element.


#### Preconditions

- Required dependent product capabilities are available: `FEAT-002`, `FEAT-006`, `FEAT-020`, `FEAT-021`.
- The customer has reached the appropriate public or private MesaFlow flow.

#### Acceptance summary

- **US-009-AC1:** The first public screen identifies the restaurant and explains the current queue state.
- **US-009-AC2:** When intake is available, the primary action is to join the queue.
- **US-009-AC3:** When unavailable, the screen distinguishes no active service, intake closed and queue full.
- **US-009-AC4:** The screen does not promise a waiting-time estimate in the MVP.

#### Safeguards

- A failed or invalid submission must not create a silent partial entry.
- The customer must not receive a predicted wait-time promise.

#### Explicit exclusions

- Remote marketplace discovery.
- Customer account creation.
- Predicted waiting time.

#### Completion evidence

- `US-009` is demonstrated inside JRN-003.
- All acceptance-summary statements pass without an undocumented manual workaround.
- No behavior from `OUT_OF_SCOPE.md` is introduced.


### US-010 — Customer queue-entry form

**Canonical feature:** `FEAT-010`  

**Primary persona:** Customer  

**Related journeys:** JRN-003  

**Priority:** P0  


> As a customer, I want to customer queue-entry form, so that collect name, phone and party size with mobile-friendly validation.


#### Problem and value

Customer self-entry must remove staff work. This story creates value only when it works inside the complete queue journey rather than as an isolated interface element.


#### Preconditions

- Required dependent product capabilities are available: `FEAT-009`, `FEAT-020`.
- The customer has reached the appropriate public or private MesaFlow flow.

#### Acceptance summary

- **US-010-AC1:** Required fields are name, phone number and party size.
- **US-010-AC2:** The form is short, mobile-first and uses clear field-level validation.
- **US-010-AC3:** Submission revalidates service and capacity state at the moment of acceptance.
- **US-010-AC4:** A successful submission immediately creates one active entry and shows confirmation.

#### Safeguards

- A failed or invalid submission must not create a silent partial entry.
- The customer must not receive a predicted wait-time promise.

#### Explicit exclusions

- Remote marketplace discovery.
- Customer account creation.
- Predicted waiting time.

#### Completion evidence

- `US-010` is demonstrated inside JRN-003.
- All acceptance-summary statements pass without an undocumented manual workaround.
- No behavior from `OUT_OF_SCOPE.md` is introduced.


### US-011 — Optional seating needs

**Canonical feature:** `FEAT-011`  

**Primary persona:** Customer  

**Related journeys:** JRN-003  

**Priority:** P0  


> As a customer, I want to optional seating needs, so that capture approved optional preferences without making them mandatory.


#### Problem and value

Some groups have relevant constraints. This story creates value only when it works inside the complete queue journey rather than as an isolated interface element.


#### Preconditions

- Required dependent product capabilities are available: `FEAT-010`.
- The customer has reached the appropriate public or private MesaFlow flow.

#### Acceptance summary

- **US-011-AC1:** Optional fields are interior/terrace preference, baby chair, accessibility requirement and customer note.
- **US-011-AC2:** Optional needs must never block submission merely because they are absent.
- **US-011-AC3:** Preferences are advisory to staff and do not guarantee accommodation.
- **US-011-AC4:** Sensitive or irrelevant profile collection is excluded.

#### Safeguards

- A failed or invalid submission must not create a silent partial entry.
- The customer must not receive a predicted wait-time promise.

#### Explicit exclusions

- Remote marketplace discovery.
- Customer account creation.
- Predicted waiting time.

#### Completion evidence

- `US-011` is demonstrated inside JRN-003.
- All acceptance-summary statements pass without an undocumented manual workaround.
- No behavior from `OUT_OF_SCOPE.md` is introduced.


### US-012 — Duplicate prevention

**Canonical feature:** `FEAT-012`  

**Primary persona:** Customer  

**Related journeys:** JRN-003  

**Priority:** P0  


> As a customer, I want to duplicate prevention, so that block a second active entry for the same phone in the same queue.


#### Problem and value

Accidental duplicate entries distort capacity and fairness. This story creates value only when it works inside the complete queue journey rather than as an isolated interface element.


#### Preconditions

- Required dependent product capabilities are available: `FEAT-010`.
- The customer has reached the appropriate public or private MesaFlow flow.

#### Acceptance summary

- **US-012-AC1:** A phone number cannot have two active entries in the same establishment queue.
- **US-012-AC2:** The duplicate check applies to Waiting and Called entries.
- **US-012-AC3:** Terminal historical entries do not permanently block later participation.
- **US-012-AC4:** The product must not silently create a duplicate when simultaneous submissions occur.

#### Safeguards

- A failed or invalid submission must not create a silent partial entry.
- The customer must not receive a predicted wait-time promise.

#### Explicit exclusions

- Remote marketplace discovery.
- Customer account creation.
- Predicted waiting time.

#### Completion evidence

- `US-012` is demonstrated inside JRN-003.
- All acceptance-summary statements pass without an undocumented manual workaround.
- No behavior from `OUT_OF_SCOPE.md` is introduced.


### US-013 — Maximum QR party size

**Canonical feature:** `FEAT-013`  

**Primary persona:** Customer  

**Related journeys:** JRN-003  

**Priority:** P0  


> As a customer, I want to receive clear guidance when my party is too large for self-entry, so that block self-entry above the configured size and direct the customer to staff.


#### Problem and value

Oversized groups need direct staff assessment. This story creates value only when it works inside the complete queue journey rather than as an isolated interface element.


#### Preconditions

- Required dependent product capabilities are available: `FEAT-003`, `FEAT-010`.
- The customer has reached the appropriate public or private MesaFlow flow.

#### Acceptance summary

- **US-013-AC1:** Administrator configures the largest party size accepted through self-entry.
- **US-013-AC2:** A party above that size is directed to speak with staff.
- **US-013-AC3:** Staff may still create or retain the group manually after operational assessment.
- **US-013-AC4:** The rule controls QR self-entry, not an absolute restaurant ban.

#### Safeguards

- A failed or invalid submission must not create a silent partial entry.
- The customer must not receive a predicted wait-time promise.

#### Explicit exclusions

- Remote marketplace discovery.
- Customer account creation.
- Predicted waiting time.

#### Completion evidence

- `US-013` is demonstrated inside JRN-003.
- All acceptance-summary statements pass without an undocumented manual workaround.
- No behavior from `OUT_OF_SCOPE.md` is introduced.


### US-014 — Full and closed states

**Canonical feature:** `FEAT-014`  

**Primary persona:** Customer  

**Related journeys:** JRN-003  

**Priority:** P0  


> As a customer, I want to full and closed states, so that show distinct no-service, intake-closed and queue-full states.


#### Problem and value

Customers need a clear explanation when they cannot join. This story creates value only when it works inside the complete queue journey rather than as an isolated interface element.


#### Preconditions

- Required dependent product capabilities are available: `FEAT-009`, `FEAT-018`, `FEAT-019`, `FEAT-021`.
- The customer has reached the appropriate public or private MesaFlow flow.

#### Acceptance summary

- **US-014-AC1:** Queue full is based on weighted active capacity, not merely visible group count.
- **US-014-AC2:** Intake closed means the restaurant deliberately stopped new entries while serving the existing queue.
- **US-014-AC3:** No active service means the restaurant has not opened a current operational session.
- **US-014-AC4:** Opening a form does not reserve capacity; final submission determines acceptance.

#### Safeguards

- A failed or invalid submission must not create a silent partial entry.
- The customer must not receive a predicted wait-time promise.

#### Explicit exclusions

- Remote marketplace discovery.
- Customer account creation.
- Predicted waiting time.

#### Completion evidence

- `US-014` is demonstrated inside JRN-003.
- All acceptance-summary statements pass without an undocumented manual workaround.
- No behavior from `OUT_OF_SCOPE.md` is introduced.


### US-015 — Manual entry

**Canonical feature:** `FEAT-015`  

**Primary persona:** Staff member  

**Related journeys:** JRN-004  

**Priority:** P0  


> As a staff member, I want to manual entry, so that staff can add a group with name and party size; phone is optional.


#### Problem and value

QR cannot be mandatory. This story creates value only when it works inside the complete queue journey rather than as an isolated interface element.


#### Preconditions

- Required dependent product capabilities are available: `FEAT-020`, `FEAT-023`.
- The user has valid operational access to the current establishment.

#### Acceptance summary

- **US-015-AC1:** Staff can create an entry using name and party size as the minimum.
- **US-015-AC2:** Phone and customer preferences are optional.
- **US-015-AC3:** Manual entries enter the same chronological queue and follow the same fairness model.
- **US-015-AC4:** The interface must support rapid entry during a busy service.

#### Safeguards

- Manual and QR entry paths must use the same current capacity truth.
- Only approved current party size may affect capacity.

#### Explicit exclusions

- Automatic table assignment.
- Unlimited weighting tiers.
- Mandatory phone for assisted entry.

#### Completion evidence

- `US-015` is demonstrated inside JRN-004.
- All acceptance-summary statements pass without an undocumented manual workaround.
- No behavior from `OUT_OF_SCOPE.md` is introduced.


### US-016 — No-contact handling

**Canonical feature:** `FEAT-016`  

**Primary persona:** Staff member  

**Related journeys:** JRN-004  

**Priority:** P0  


> As a staff member, I want to no-contact handling, so that clearly label no-contact entries and suppress automated attempts.


#### Problem and value

Staff must not assume a manual group received a message. This story creates value only when it works inside the complete queue journey rather than as an isolated interface element.


#### Preconditions

- Required dependent product capabilities are available: `FEAT-015`, `FEAT-038`.
- The user has valid operational access to the current establishment.

#### Acceptance summary

- **US-016-AC1:** An entry without a phone number is clearly marked as No contact.
- **US-016-AC2:** No WhatsApp attempt is made for a no-contact entry.
- **US-016-AC3:** The entry remains fully operable and must be called in person.
- **US-016-AC4:** Adding a valid phone later enables subsequent operational messaging.

#### Safeguards

- Manual and QR entry paths must use the same current capacity truth.
- Only approved current party size may affect capacity.

#### Explicit exclusions

- Automatic table assignment.
- Unlimited weighting tiers.
- Mandatory phone for assisted entry.

#### Completion evidence

- `US-016` is demonstrated inside JRN-004.
- All acceptance-summary statements pass without an undocumented manual workaround.
- No behavior from `OUT_OF_SCOPE.md` is introduced.


### US-017 — Weighted capacity

**Canonical feature:** `FEAT-017`  

**Primary persona:** Restaurant Administrator  

**Related journeys:** JRN-005  

**Priority:** P0  


> As a restaurant administrator, I want to weighted capacity, so that use one- or two-slot weighting with a configurable cutoff.


#### Problem and value

Large groups create more queue load. This story creates value only when it works inside the complete queue journey rather than as an isolated interface element.


#### Preconditions

- Required dependent product capabilities are available: `FEAT-003`.
- The user has valid Administrator access.

#### Acceptance summary

- **US-017-AC1:** Capacity uses one-slot and two-slot group weights.
- **US-017-AC2:** Default: parties up to 6 use one slot; parties of 7 or more use two.
- **US-017-AC3:** Administrator can configure the cutoff to match the restaurant.
- **US-017-AC4:** Weighting affects intake capacity but does not automatically determine seating order.

#### Safeguards

- Manual and QR entry paths must use the same current capacity truth.
- Only approved current party size may affect capacity.

#### Explicit exclusions

- Automatic table assignment.
- Unlimited weighting tiers.
- Mandatory phone for assisted entry.

#### Completion evidence

- `US-017` is demonstrated inside JRN-005.
- All acceptance-summary statements pass without an undocumented manual workaround.
- No behavior from `OUT_OF_SCOPE.md` is introduced.


### US-018 — Maximum slots

**Canonical feature:** `FEAT-018`  

**Primary persona:** Restaurant Administrator  

**Related journeys:** JRN-005  

**Priority:** P0  


> As a restaurant administrator, I want to maximum slots, so that administrator sets maximum active slots.


#### Problem and value

Restaurant needs to cap waiting-list load. This story creates value only when it works inside the complete queue journey rather than as an isolated interface element.


#### Preconditions

- Required dependent product capabilities are available: `FEAT-003`, `FEAT-017`.
- The user has valid Administrator access.

#### Acceptance summary

- **US-018-AC1:** Administrator configures the maximum number of active weighted slots.
- **US-018-AC2:** Waiting and Called entries consume slots.
- **US-018-AC3:** Seated, Cancelled and No-show entries do not consume slots.
- **US-018-AC4:** Existing entries are not removed if the configured limit is reduced below current usage.

#### Safeguards

- Manual and QR entry paths must use the same current capacity truth.
- Only approved current party size may affect capacity.

#### Explicit exclusions

- Automatic table assignment.
- Unlimited weighting tiers.
- Mandatory phone for assisted entry.

#### Completion evidence

- `US-018` is demonstrated inside JRN-005.
- All acceptance-summary statements pass without an undocumented manual workaround.
- No behavior from `OUT_OF_SCOPE.md` is introduced.


### US-019 — Capacity recalculation

**Canonical feature:** `FEAT-019`  

**Primary persona:** Staff member  

**Related journeys:** JRN-005  

**Priority:** P0  


> As a staff member, I want to keep queue capacity accurate after every relevant change, so that recalculate consistently and update public intake state.


#### Problem and value

State and party-size changes alter availability. This story creates value only when it works inside the complete queue journey rather than as an isolated interface element.


#### Preconditions

- Required dependent product capabilities are available: `FEAT-017`, `FEAT-018`, `FEAT-049`, `FEAT-050`, `FEAT-051`.
- The user has valid operational access to the current establishment.

#### Acceptance summary

- **US-019-AC1:** Capacity recalculates after accepted entry, approved party-size change, seating, cancellation, no-show and reactivation.
- **US-019-AC2:** The current public full/available state updates from the recalculated value.
- **US-019-AC3:** Capacity must use approved current party size, not an unapproved requested size.
- **US-019-AC4:** The same rules apply across all staff devices and public submission checks.

#### Safeguards

- Manual and QR entry paths must use the same current capacity truth.
- Only approved current party size may affect capacity.

#### Explicit exclusions

- Automatic table assignment.
- Unlimited weighting tiers.
- Mandatory phone for assisted entry.

#### Completion evidence

- `US-019` is demonstrated inside JRN-005.
- All acceptance-summary statements pass without an undocumented manual workaround.
- No behavior from `OUT_OF_SCOPE.md` is introduced.


### US-020 — Open service

**Canonical feature:** `FEAT-020`  

**Primary persona:** Staff member  

**Related journeys:** JRN-002 / JRN-015  

**Priority:** P0  


> As a staff member, I want to open service, so that authorized staff opens a new service.


#### Problem and value

Queue activity needs a bounded operational session. This story creates value only when it works inside the complete queue journey rather than as an isolated interface element.


#### Preconditions

- Required dependent product capabilities are available: `FEAT-002`, `FEAT-003`.
- The user has valid operational access to the current establishment.

#### Acceptance summary

- **US-020-AC1:** Authorized staff explicitly opens a new service.
- **US-020-AC2:** A service is a bounded operational session such as lunch or dinner.
- **US-020-AC3:** Only one active service exists for the establishment in the MVP.
- **US-020-AC4:** Opening enables queue intake unless staff immediately closes new entries.

#### Safeguards

- A stale device must not create a contradictory valid transition.
- The workflow must remain practical during a busy service.

#### Explicit exclusions

- Multiple simultaneous queues.
- Table-map management.
- Staff scheduling.

#### Completion evidence

- `US-020` is demonstrated inside JRN-002 / JRN-015.
- All acceptance-summary statements pass without an undocumented manual workaround.
- No behavior from `OUT_OF_SCOPE.md` is introduced.


### US-021 — Close/reopen entries

**Canonical feature:** `FEAT-021`  

**Primary persona:** Staff member  

**Related journeys:** JRN-002 / JRN-015  

**Priority:** P0  


> As a staff member, I want to close/reopen entries, so that toggle customer self-entry without resolving existing groups.


#### Problem and value

Restaurant may stop intake while serving current groups. This story creates value only when it works inside the complete queue journey rather than as an isolated interface element.


#### Preconditions

- Required dependent product capabilities are available: `FEAT-020`.
- The user has valid operational access to the current establishment.

#### Acceptance summary

- **US-021-AC1:** Staff can close new entries without affecting Waiting or Called groups.
- **US-021-AC2:** Staff can reopen intake during the same active service.
- **US-021-AC3:** The public state updates immediately to explain whether joining is allowed.
- **US-021-AC4:** This control is distinct from ending the service.

#### Safeguards

- A stale device must not create a contradictory valid transition.
- The workflow must remain practical during a busy service.

#### Explicit exclusions

- Multiple simultaneous queues.
- Table-map management.
- Staff scheduling.

#### Completion evidence

- `US-021` is demonstrated inside JRN-002 / JRN-015.
- All acceptance-summary statements pass without an undocumented manual workaround.
- No behavior from `OUT_OF_SCOPE.md` is introduced.


### US-022 — Safe service closure

**Canonical feature:** `FEAT-022`  

**Primary persona:** Staff member  

**Related journeys:** JRN-002 / JRN-015  

**Priority:** P0  


> As a staff member, I want to close a service only after all active entries are resolved, so that block closure until no Waiting or Called entries remain.


#### Problem and value

Ending with active groups would orphan customers. This story creates value only when it works inside the complete queue journey rather than as an isolated interface element.


#### Preconditions

- Required dependent product capabilities are available: `FEAT-020`, `FEAT-049`, `FEAT-050`, `FEAT-051`.
- The user has valid operational access to the current establishment.

#### Acceptance summary

- **US-022-AC1:** End service is blocked while Waiting or Called entries remain.
- **US-022-AC2:** Staff must resolve active entries before closure.
- **US-022-AC3:** Closure freezes service records and generates the approved history summary.
- **US-022-AC4:** Ending a service does not invalidate customers’ ability to see their final outcome.

#### Safeguards

- A stale device must not create a contradictory valid transition.
- The workflow must remain practical during a busy service.

#### Explicit exclusions

- Multiple simultaneous queues.
- Table-map management.
- Staff scheduling.

#### Completion evidence

- `US-022` is demonstrated inside JRN-002 / JRN-015.
- All acceptance-summary statements pass without an undocumented manual workaround.
- No behavior from `OUT_OF_SCOPE.md` is introduced.


### US-023 — Waiting section

**Canonical feature:** `FEAT-023`  

**Primary persona:** Staff member  

**Related journeys:** JRN-006 / JRN-014  

**Priority:** P0  


> As a staff member, I want to see the active waiting queue clearly, so that show chronological list and approved operational indicators.


#### Problem and value

Staff needs a trusted view of active waiting groups. This story creates value only when it works inside the complete queue journey rather than as an isolated interface element.


#### Preconditions

- Required dependent product capabilities are available: `FEAT-020`, `FEAT-027`.
- The user has valid operational access to the current establishment.

#### Acceptance summary

- **US-023-AC1:** Waiting entries are shown in chronological arrival order by default.
- **US-023-AC2:** Each row exposes name, party size, entry time, elapsed wait, contact status, relevant preferences, large-group status, pass-over count and warning state.
- **US-023-AC3:** Operational filters do not rewrite canonical order.
- **US-023-AC4:** The section must support direct approved actions without opening unnecessary layers.

#### Safeguards

- A stale device must not create a contradictory valid transition.
- The workflow must remain practical during a busy service.

#### Explicit exclusions

- Multiple simultaneous queues.
- Table-map management.
- Staff scheduling.

#### Completion evidence

- `US-023` is demonstrated inside JRN-006 / JRN-014.
- All acceptance-summary statements pass without an undocumented manual workaround.
- No behavior from `OUT_OF_SCOPE.md` is introduced.


### US-024 — Called section

**Canonical feature:** `FEAT-024`  

**Primary persona:** Staff member  

**Related journeys:** JRN-006 / JRN-014  

**Priority:** P0  


> As a staff member, I want to manage all currently called groups, so that show independent timers and call actions.


#### Problem and value

Active calls require focused timing and delivery visibility. This story creates value only when it works inside the complete queue journey rather than as an isolated interface element.


#### Preconditions

- Required dependent product capabilities are available: `FEAT-033`, `FEAT-034`, `FEAT-027`.
- The user has valid operational access to the current establishment.

#### Acceptance summary

- **US-024-AC1:** Called entries are separated from Waiting.
- **US-024-AC2:** Each entry shows remaining time, message state, acknowledgement state and available resolution actions.
- **US-024-AC3:** Multiple entries may be Called concurrently.
- **US-024-AC4:** Expiry does not automatically invent a terminal outcome; staff resolves the entry.

#### Safeguards

- A stale device must not create a contradictory valid transition.
- The workflow must remain practical during a busy service.

#### Explicit exclusions

- Multiple simultaneous queues.
- Table-map management.
- Staff scheduling.

#### Completion evidence

- `US-024` is demonstrated inside JRN-006 / JRN-014.
- All acceptance-summary statements pass without an undocumented manual workaround.
- No behavior from `OUT_OF_SCOPE.md` is introduced.


### US-025 — Recently completed

**Canonical feature:** `FEAT-025`  

**Primary persona:** Staff member  

**Related journeys:** JRN-006 / JRN-014  

**Priority:** P0  


> As a staff member, I want to recently completed, so that show current-service terminal entries without dominating active work.


#### Problem and value

Staff needs short-term awareness and error correction. This story creates value only when it works inside the complete queue journey rather than as an isolated interface element.


#### Preconditions

- Required dependent product capabilities are available: `FEAT-049`, `FEAT-050`, `FEAT-051`.
- The user has valid operational access to the current establishment.

#### Acceptance summary

- **US-025-AC1:** Current-service Seated, Cancelled and No-show entries remain accessible for recent context.
- **US-025-AC2:** The section does not dominate active queue work.
- **US-025-AC3:** Eligible outcome correction is available according to role and service state.
- **US-025-AC4:** Historical services are accessed through history, not an endlessly growing live list.

#### Safeguards

- A stale device must not create a contradictory valid transition.
- The workflow must remain practical during a busy service.

#### Explicit exclusions

- Multiple simultaneous queues.
- Table-map management.
- Staff scheduling.

#### Completion evidence

- `US-025` is demonstrated inside JRN-006 / JRN-014.
- All acceptance-summary statements pass without an undocumented manual workaround.
- No behavior from `OUT_OF_SCOPE.md` is introduced.


### US-026 — Party-size filtering

**Canonical feature:** `FEAT-026`  

**Primary persona:** Staff member  

**Related journeys:** JRN-006 / JRN-014  

**Priority:** P0  


> As a staff member, I want to party-size filtering, so that filter without changing canonical order.


#### Problem and value

Staff needs to find groups compatible with an available table. This story creates value only when it works inside the complete queue journey rather than as an isolated interface element.


#### Preconditions

- Required dependent product capabilities are available: `FEAT-023`.
- The user has valid operational access to the current establishment.

#### Acceptance summary

- **US-026-AC1:** Staff can narrow the Waiting view by party size or useful size range.
- **US-026-AC2:** Filtering does not change queue position or customer-facing groups-ahead calculation.
- **US-026-AC3:** Removing the filter returns the canonical chronological view.
- **US-026-AC4:** The feature supports table compatibility without pretending to manage tables.

#### Safeguards

- A stale device must not create a contradictory valid transition.
- The workflow must remain practical during a busy service.

#### Explicit exclusions

- Multiple simultaneous queues.
- Table-map management.
- Staff scheduling.

#### Completion evidence

- `US-026` is demonstrated inside JRN-006 / JRN-014.
- All acceptance-summary statements pass without an undocumented manual workaround.
- No behavior from `OUT_OF_SCOPE.md` is introduced.


### US-027 — Multi-device synchronization

**Canonical feature:** `FEAT-027`  

**Primary persona:** Staff member  

**Related journeys:** JRN-006 / JRN-014  

**Priority:** P0  


> As a staff member, I want to share one current queue state across staff devices, so that propagate queue changes rapidly and prevent conflicting valid transitions.


#### Problem and value

Multiple employees must not act on stale queue data. This story creates value only when it works inside the complete queue journey rather than as an isolated interface element.


#### Preconditions

- Required dependent product capabilities are available: `FEAT-023`, `FEAT-024`, `FEAT-025`.
- The user has valid operational access to the current establishment.

#### Acceptance summary

- **US-027-AC1:** Accepted changes propagate across simultaneously open staff devices without manual refresh.
- **US-027-AC2:** Conflicting actions cannot both become valid final transitions.
- **US-027-AC3:** A device returning from temporary disconnection reconciles with current state.
- **US-027-AC4:** Users receive a clear indication when an attempted action is no longer valid.

#### Safeguards

- A stale device must not create a contradictory valid transition.
- The workflow must remain practical during a busy service.

#### Explicit exclusions

- Multiple simultaneous queues.
- Table-map management.
- Staff scheduling.

#### Completion evidence

- `US-027` is demonstrated inside JRN-006 / JRN-014.
- All acceptance-summary statements pass without an undocumented manual workaround.
- No behavior from `OUT_OF_SCOPE.md` is introduced.


### US-028 — Elapsed wait

**Canonical feature:** `FEAT-028`  

**Primary persona:** Staff member  

**Related journeys:** JRN-010  

**Priority:** P0  


> As a staff member, I want to elapsed wait, so that show continuously understandable elapsed wait.


#### Problem and value

Arrival time alone is hard to interpret under pressure. This story creates value only when it works inside the complete queue journey rather than as an isolated interface element.


#### Preconditions

- Required dependent product capabilities are available: `FEAT-023`.
- The user has valid operational access to the current establishment.

#### Acceptance summary

- **US-028-AC1:** Every active entry displays understandable elapsed waiting time.
- **US-028-AC2:** Elapsed wait derives from accepted entry time and continues while Waiting.
- **US-028-AC3:** Staff can still see original entry time for context.
- **US-028-AC4:** The display remains readable during long services and across midnight.

#### Safeguards

- Fairness signals inform staff but do not automatically control seating.
- The product preserves legitimate human operational judgement.

#### Explicit exclusions

- Algorithmic seating enforcement.
- Automatic prioritization.
- Guaranteed strict FIFO.

#### Completion evidence

- `US-028` is demonstrated inside JRN-010.
- All acceptance-summary statements pass without an undocumented manual workaround.
- No behavior from `OUT_OF_SCOPE.md` is introduced.


### US-029 — Large-group label

**Canonical feature:** `FEAT-029`  

**Primary persona:** Staff member  

**Related journeys:** JRN-010  

**Priority:** P0  


> As a staff member, I want to identify large groups immediately, so that apply label according to configured weighting cutoff or approved large-group rule.


#### Problem and value

Operationally difficult groups need visibility. This story creates value only when it works inside the complete queue journey rather than as an isolated interface element.


#### Preconditions

- Required dependent product capabilities are available: `FEAT-017`, `FEAT-023`.
- The user has valid operational access to the current establishment.

#### Acceptance summary

- **US-029-AC1:** A visible label identifies groups at or above the configured large-group/weighting cutoff.
- **US-029-AC2:** The label does not automatically move the group or force priority.
- **US-029-AC3:** Party-size changes update the label after approval.
- **US-029-AC4:** The visual treatment must not rely only on color.

#### Safeguards

- Fairness signals inform staff but do not automatically control seating.
- The product preserves legitimate human operational judgement.

#### Explicit exclusions

- Algorithmic seating enforcement.
- Automatic prioritization.
- Guaranteed strict FIFO.

#### Completion evidence

- `US-029` is demonstrated inside JRN-010.
- All acceptance-summary statements pass without an undocumented manual workaround.
- No behavior from `OUT_OF_SCOPE.md` is introduced.


### US-030 — Pass-over count

**Canonical feature:** `FEAT-030`  

**Primary persona:** Staff member  

**Related journeys:** JRN-010  

**Priority:** P0  


> As a staff member, I want to pass-over count, so that count qualifying later-seated groups.


#### Problem and value

Later seating can silently disadvantage earlier groups. This story creates value only when it works inside the complete queue journey rather than as an isolated interface element.


#### Preconditions

- Required dependent product capabilities are available: `FEAT-023`, `FEAT-049`.
- The user has valid operational access to the current establishment.

#### Acceptance summary

- **US-030-AC1:** A pass-over is counted when a later-arriving group reaches Seated while the earlier group remains active.
- **US-030-AC2:** Later cancellation or no-show does not count as a pass-over.
- **US-030-AC3:** The counter is visible to staff and retained in service records.
- **US-030-AC4:** Corrections must recalculate the counter when the qualifying seating outcome changes.

#### Safeguards

- Fairness signals inform staff but do not automatically control seating.
- The product preserves legitimate human operational judgement.

#### Explicit exclusions

- Algorithmic seating enforcement.
- Automatic prioritization.
- Guaranteed strict FIFO.

#### Completion evidence

- `US-030` is demonstrated inside JRN-010.
- All acceptance-summary statements pass without an undocumented manual workaround.
- No behavior from `OUT_OF_SCOPE.md` is introduced.


### US-031 — Long-wait warning

**Canonical feature:** `FEAT-031`  

**Primary persona:** Restaurant Administrator  

**Related journeys:** JRN-010  

**Priority:** P0  


> As a restaurant administrator, I want to receive a clear warning for prolonged waiting, so that highlight at one of four configured thresholds.


#### Problem and value

Long-wait entries may be overlooked. This story creates value only when it works inside the complete queue journey rather than as an isolated interface element.


#### Preconditions

- Required dependent product capabilities are available: `FEAT-003`, `FEAT-028`.
- The user has valid Administrator access.

#### Acceptance summary

- **US-031-AC1:** Administrator selects 20, 30, 45 or 60 minutes.
- **US-031-AC2:** An active Waiting entry is highlighted when it reaches the threshold.
- **US-031-AC3:** The warning remains until the entry leaves Waiting.
- **US-031-AC4:** The warning indicates attention is required but does not force a specific action.

#### Safeguards

- Fairness signals inform staff but do not automatically control seating.
- The product preserves legitimate human operational judgement.

#### Explicit exclusions

- Algorithmic seating enforcement.
- Automatic prioritization.
- Guaranteed strict FIFO.

#### Completion evidence

- `US-031` is demonstrated inside JRN-010.
- All acceptance-summary statements pass without an undocumented manual workaround.
- No behavior from `OUT_OF_SCOPE.md` is introduced.


### US-032 — Protected pass-over reason

**Canonical feature:** `FEAT-032`  

**Primary persona:** Staff member  

**Related journeys:** JRN-010  

**Priority:** P0  


> As a staff member, I want to record a quick reason when bypassing a protected group, so that require a quick reason in protected cases without blocking the action.


#### Problem and value

Flexibility needs accountability. This story creates value only when it works inside the complete queue journey rather than as an isolated interface element.


#### Preconditions

- Required dependent product capabilities are available: `FEAT-030`, `FEAT-031`.
- The user has valid operational access to the current establishment.

#### Acceptance summary

- **US-032-AC1:** A quick reason is required when staff seats a later group while bypassing a protected earlier group.
- **US-032-AC2:** Approved reasons include table incompatibility, zone preference, accessibility, operational decision and Other.
- **US-032-AC3:** The reason is recorded with actor and time.
- **US-032-AC4:** The product never blocks the seating decision after a reason is supplied.

#### Safeguards

- Fairness signals inform staff but do not automatically control seating.
- The product preserves legitimate human operational judgement.

#### Explicit exclusions

- Algorithmic seating enforcement.
- Automatic prioritization.
- Guaranteed strict FIFO.

#### Completion evidence

- `US-032` is demonstrated inside JRN-010.
- All acceptance-summary statements pass without an undocumented manual workaround.
- No behavior from `OUT_OF_SCOPE.md` is introduced.


### US-033 — Call group

**Canonical feature:** `FEAT-033`  

**Primary persona:** Staff member  

**Related journeys:** JRN-006 / JRN-008  

**Priority:** P0  


> As a staff member, I want to call a waiting group, so that move entry to Called, begin timer and attempt notification.


#### Problem and value

Staff needs one clear action to indicate table readiness. This story creates value only when it works inside the complete queue journey rather than as an isolated interface element.


#### Preconditions

- Required dependent product capabilities are available: `FEAT-023`, `FEAT-038`.
- The user has valid operational access to the current establishment.

#### Acceptance summary

- **US-033-AC1:** Calling changes the entry from Waiting to Called.
- **US-033-AC2:** The action starts the configured timer and attempts the table-ready message when contact exists.
- **US-033-AC3:** No table number is required.
- **US-033-AC4:** A concurrent stale call attempt cannot create a second active timer.

#### Safeguards

- Communication failure must not corrupt queue state.
- Retry or delayed provider status must not duplicate timers, calls or grace periods.

#### Explicit exclusions

- Automatic paid SMS fallback.
- Automated voice calls.
- Marketing campaigns.

#### Completion evidence

- `US-033` is demonstrated inside JRN-006 / JRN-008.
- All acceptance-summary statements pass without an undocumented manual workaround.
- No behavior from `OUT_OF_SCOPE.md` is introduced.


### US-034 — Individual countdown

**Canonical feature:** `FEAT-034`  

**Primary persona:** Staff member  

**Related journeys:** JRN-006 / JRN-008  

**Priority:** P0  


> As a staff member, I want to track an independent countdown for each called group, so that show synchronized remaining time per entry.


#### Problem and value

Multiple called groups need independent deadlines. This story creates value only when it works inside the complete queue journey rather than as an isolated interface element.


#### Preconditions

- Required dependent product capabilities are available: `FEAT-033`, `FEAT-027`.
- The user has valid operational access to the current establishment.

#### Acceptance summary

- **US-034-AC1:** Each Called entry has its own synchronized countdown.
- **US-034-AC2:** Remaining time is visible on staff and customer views.
- **US-034-AC3:** Timer state survives normal page closing and reopening.
- **US-034-AC4:** The timer is not paused by delivery delay or customer acknowledgement.

#### Safeguards

- Communication failure must not corrupt queue state.
- Retry or delayed provider status must not duplicate timers, calls or grace periods.

#### Explicit exclusions

- Automatic paid SMS fallback.
- Automated voice calls.
- Marketing campaigns.

#### Completion evidence

- `US-034` is demonstrated inside JRN-006 / JRN-008.
- All acceptance-summary statements pass without an undocumented manual workaround.
- No behavior from `OUT_OF_SCOPE.md` is introduced.


### US-035 — Final call

**Canonical feature:** `FEAT-035`  

**Primary persona:** Staff member  

**Related journeys:** JRN-006 / JRN-008  

**Priority:** P0  


> As a staff member, I want to send one final warning before the call period expires, so that attempt the final-call message one minute before the original deadline.


#### Problem and value

A last warning reduces missed returns. This story creates value only when it works inside the complete queue journey rather than as an isolated interface element.


#### Preconditions

- Required dependent product capabilities are available: `FEAT-034`, `FEAT-038`.
- The user has valid operational access to the current establishment.

#### Acceptance summary

- **US-035-AC1:** The final-call event occurs one minute before the original configured call period expires.
- **US-035-AC2:** The message is attempted only when an eligible contact exists.
- **US-035-AC3:** The product records the attempt and outcome.
- **US-035-AC4:** Retrying messages does not schedule another final-call event.

#### Safeguards

- Communication failure must not corrupt queue state.
- Retry or delayed provider status must not duplicate timers, calls or grace periods.

#### Explicit exclusions

- Automatic paid SMS fallback.
- Automated voice calls.
- Marketing campaigns.

#### Completion evidence

- `US-035` is demonstrated inside JRN-006 / JRN-008.
- All acceptance-summary statements pass without an undocumented manual workaround.
- No behavior from `OUT_OF_SCOPE.md` is introduced.


### US-036 — Grace period

**Canonical feature:** `FEAT-036`  

**Primary persona:** Staff member  

**Related journeys:** JRN-006 / JRN-008  

**Priority:** P0  


> As a staff member, I want to grace period, so that add two minutes exactly once.


#### Problem and value

Final call should provide a consistent opportunity to return. This story creates value only when it works inside the complete queue journey rather than as an isolated interface element.


#### Preconditions

- Required dependent product capabilities are available: `FEAT-035`.
- The user has valid operational access to the current establishment.

#### Acceptance summary

- **US-036-AC1:** The final-call event adds exactly two minutes to the deadline.
- **US-036-AC2:** The extension occurs once even when message delivery fails.
- **US-036-AC3:** All active views show the revised deadline.
- **US-036-AC4:** The grace period is a product rule, not a customer-controlled action.

#### Safeguards

- Communication failure must not corrupt queue state.
- Retry or delayed provider status must not duplicate timers, calls or grace periods.

#### Explicit exclusions

- Automatic paid SMS fallback.
- Automated voice calls.
- Marketing campaigns.

#### Completion evidence

- `US-036` is demonstrated inside JRN-006 / JRN-008.
- All acceptance-summary statements pass without an undocumented manual workaround.
- No behavior from `OUT_OF_SCOPE.md` is introduced.


### US-037 — Manual additional time

**Canonical feature:** `FEAT-037`  

**Primary persona:** Staff member  

**Related journeys:** JRN-006 / JRN-008  

**Priority:** P0  


> As a staff member, I want to manual additional time, so that staff extends a timer and all views update.


#### Problem and value

Staff needs to handle real exceptions. This story creates value only when it works inside the complete queue journey rather than as an isolated interface element.


#### Preconditions

- Required dependent product capabilities are available: `FEAT-034`.
- The user has valid operational access to the current establishment.

#### Acceptance summary

- **US-037-AC1:** Staff can add further time to an active Called entry.
- **US-037-AC2:** The revised deadline updates for all users.
- **US-037-AC3:** The action is attributed in the audit trail.
- **US-037-AC4:** Manual extra time does not reset or repeat the automatic final-call rule.

#### Safeguards

- Communication failure must not corrupt queue state.
- Retry or delayed provider status must not duplicate timers, calls or grace periods.

#### Explicit exclusions

- Automatic paid SMS fallback.
- Automated voice calls.
- Marketing campaigns.

#### Completion evidence

- `US-037` is demonstrated inside JRN-006 / JRN-008.
- All acceptance-summary statements pass without an undocumented manual workaround.
- No behavior from `OUT_OF_SCOPE.md` is introduced.


### US-038 — WhatsApp messages

**Canonical feature:** `FEAT-038`  

**Primary persona:** Staff member  

**Related journeys:** JRN-009 / JRN-018  

**Priority:** P0  


> As a staff member, I want to whatsApp messages, so that use WhatsApp for approved operational calls where contact exists.


#### Problem and value

Customer should not remain at the door. This story creates value only when it works inside the complete queue journey rather than as an isolated interface element.


#### Preconditions

- Required dependent product capabilities are available: `FEAT-010`, `FEAT-015`.
- The user has valid operational access to the current establishment.

#### Acceptance summary

- **US-038-AC1:** The approved operational message set covers entry confirmation where commercially enabled, table-ready call, final call and cancellation/removal.
- **US-038-AC2:** WhatsApp is the primary automated channel.
- **US-038-AC3:** The queue remains operable when messaging is unavailable.
- **US-038-AC4:** No automatic paid SMS or voice fallback is included.

#### Safeguards

- Communication failure must not corrupt queue state.
- Retry or delayed provider status must not duplicate timers, calls or grace periods.

#### Explicit exclusions

- Automatic paid SMS fallback.
- Automated voice calls.
- Marketing campaigns.

#### Completion evidence

- `US-038` is demonstrated inside JRN-009 / JRN-018.
- All acceptance-summary statements pass without an undocumented manual workaround.
- No behavior from `OUT_OF_SCOPE.md` is introduced.


### US-039 — Template personalization

**Canonical feature:** `FEAT-039`  

**Primary persona:** Restaurant Administrator  

**Related journeys:** JRN-009 / JRN-018  

**Priority:** P0  


> As a restaurant administrator, I want to template personalization, so that allow constrained approved fields, not unlimited automation.


#### Problem and value

Restaurant identity and reporting instruction vary. This story creates value only when it works inside the complete queue journey rather than as an isolated interface element.


#### Preconditions

- Required dependent product capabilities are available: `FEAT-003`, `FEAT-038`.
- The user has valid Administrator access.

#### Acceptance summary

- **US-039-AC1:** Administrator uses product-controlled templates with limited editable fields.
- **US-039-AC2:** Editable content may include restaurant name, greeting and where to report.
- **US-039-AC3:** Required operational meaning cannot be removed.
- **US-039-AC4:** The MVP does not include a free-form campaign or automation editor.

#### Safeguards

- Communication failure must not corrupt queue state.
- Retry or delayed provider status must not duplicate timers, calls or grace periods.

#### Explicit exclusions

- Automatic paid SMS fallback.
- Automated voice calls.
- Marketing campaigns.

#### Completion evidence

- `US-039` is demonstrated inside JRN-009 / JRN-018.
- All acceptance-summary statements pass without an undocumented manual workaround.
- No behavior from `OUT_OF_SCOPE.md` is introduced.


### US-040 — Delivery visibility

**Canonical feature:** `FEAT-040`  

**Primary persona:** Staff member  

**Related journeys:** JRN-009 / JRN-018  

**Priority:** P0  


> As a staff member, I want to delivery visibility, so that show truthful provider-supported status.


#### Problem and value

Hidden failure destroys trust. This story creates value only when it works inside the complete queue journey rather than as an isolated interface element.


#### Preconditions

- Required dependent product capabilities are available: `FEAT-038`.
- The user has valid operational access to the current establishment.

#### Acceptance summary

- **US-040-AC1:** Staff sees truthful states supported by the messaging service, such as attempted, sent, delivered or failed.
- **US-040-AC2:** The product does not invent read status.
- **US-040-AC3:** A delayed provider update does not block queue operation.
- **US-040-AC4:** No-contact and not-attempted states are distinguishable from failure.

#### Safeguards

- Communication failure must not corrupt queue state.
- Retry or delayed provider status must not duplicate timers, calls or grace periods.

#### Explicit exclusions

- Automatic paid SMS fallback.
- Automated voice calls.
- Marketing campaigns.

#### Completion evidence

- `US-040` is demonstrated inside JRN-009 / JRN-018.
- All acceptance-summary statements pass without an undocumented manual workaround.
- No behavior from `OUT_OF_SCOPE.md` is introduced.


### US-041 — Retry

**Canonical feature:** `FEAT-041`  

**Primary persona:** Staff member  

**Related journeys:** JRN-009 / JRN-018  

**Priority:** P0  


> As a staff member, I want to retry, so that staff retries without duplicating grace periods or state transitions.


#### Problem and value

Transient failure must be recoverable. This story creates value only when it works inside the complete queue journey rather than as an isolated interface element.


#### Preconditions

- Required dependent product capabilities are available: `FEAT-040`.
- The user has valid operational access to the current establishment.

#### Acceptance summary

- **US-041-AC1:** Staff may retry a failed eligible message.
- **US-041-AC2:** A retry is recorded as a separate attempt for consumption measurement.
- **US-041-AC3:** Retry does not duplicate state transition, countdown or grace period.
- **US-041-AC4:** The most recent result and attempt history remain understandable.

#### Safeguards

- Communication failure must not corrupt queue state.
- Retry or delayed provider status must not duplicate timers, calls or grace periods.

#### Explicit exclusions

- Automatic paid SMS fallback.
- Automated voice calls.
- Marketing campaigns.

#### Completion evidence

- `US-041` is demonstrated inside JRN-009 / JRN-018.
- All acceptance-summary statements pass without an undocumented manual workaround.
- No behavior from `OUT_OF_SCOPE.md` is introduced.


### US-042 — Consumption measurement

**Canonical feature:** `FEAT-042`  

**Primary persona:** Restaurant Administrator  

**Related journeys:** JRN-009 / JRN-018  

**Priority:** P0  


> As a restaurant administrator, I want to consumption measurement, so that count message attempts and outcomes per establishment.


#### Problem and value

Pricing and margins depend on actual usage. This story creates value only when it works inside the complete queue journey rather than as an isolated interface element.


#### Preconditions

- Required dependent product capabilities are available: `FEAT-038`, `FEAT-040`.
- The user has valid Administrator access.

#### Acceptance summary

- **US-042-AC1:** Message attempts and available outcomes are counted per establishment and service.
- **US-042-AC2:** Counts distinguish message purpose where operationally useful.
- **US-042-AC3:** The data supports later pricing and margin validation.
- **US-042-AC4:** The feature does not itself define packages, overages or invoices.

#### Safeguards

- Communication failure must not corrupt queue state.
- Retry or delayed provider status must not duplicate timers, calls or grace periods.

#### Explicit exclusions

- Automatic paid SMS fallback.
- Automated voice calls.
- Marketing campaigns.

#### Completion evidence

- `US-042` is demonstrated inside JRN-009 / JRN-018.
- All acceptance-summary statements pass without an undocumented manual workaround.
- No behavior from `OUT_OF_SCOPE.md` is introduced.


### US-043 — Private status page

**Canonical feature:** `FEAT-043`  

**Primary persona:** Customer  

**Related journeys:** JRN-007 / JRN-011 / JRN-012 / JRN-017  

**Priority:** P0  


> As a customer, I want to private status page, so that provide an unguessable entry-specific web link.


#### Problem and value

Customer needs access without an account. This story creates value only when it works inside the complete queue journey rather than as an isolated interface element.


#### Preconditions

- Required dependent product capabilities are available: `FEAT-010`.
- The customer has reached the appropriate public or private MesaFlow flow.

#### Acceptance summary

- **US-043-AC1:** Every accepted customer entry receives an unguessable entry-specific link.
- **US-043-AC2:** The link does not expose the phone number.
- **US-043-AC3:** The customer can close and reopen the page while the link remains valid.
- **US-043-AC4:** After service closure the page shows a safe final or expired state.

#### Safeguards

- Customer self-service must not expose another entry or internal notes.
- Customer convenience must not weaken staff control over sensitive operational changes.

#### Explicit exclusions

- Customer account.
- Native app.
- Customer-controlled timer extension.

#### Completion evidence

- `US-043` is demonstrated inside JRN-007 / JRN-011 / JRN-012 / JRN-017.
- All acceptance-summary statements pass without an undocumented manual workaround.
- No behavior from `OUT_OF_SCOPE.md` is introduced.


### US-044 — Groups-ahead position

**Canonical feature:** `FEAT-044`  

**Primary persona:** Customer  

**Related journeys:** JRN-007 / JRN-011 / JRN-012 / JRN-017  

**Priority:** P0  


> As a customer, I want to groups-ahead position, so that show groups ahead and the order-variation explanation.


#### Problem and value

Customer needs clarity without false waiting-time precision. This story creates value only when it works inside the complete queue journey rather than as an isolated interface element.


#### Preconditions

- Required dependent product capabilities are available: `FEAT-043`, `FEAT-023`.
- The customer has reached the appropriate public or private MesaFlow flow.

#### Acceptance summary

- **US-044-AC1:** The customer sees the number of active groups ahead.
- **US-044-AC2:** Supporting copy explains that order may vary by party size and available tables.
- **US-044-AC3:** The MVP does not show a predicted wait time.
- **US-044-AC4:** The displayed value recalculates after relevant queue changes.

#### Safeguards

- Customer self-service must not expose another entry or internal notes.
- Customer convenience must not weaken staff control over sensitive operational changes.

#### Explicit exclusions

- Customer account.
- Native app.
- Customer-controlled timer extension.

#### Completion evidence

- `US-044` is demonstrated inside JRN-007 / JRN-011 / JRN-012 / JRN-017.
- All acceptance-summary statements pass without an undocumented manual workaround.
- No behavior from `OUT_OF_SCOPE.md` is introduced.


### US-045 — Customer edit

**Canonical feature:** `FEAT-045`  

**Primary persona:** Customer  

**Related journeys:** JRN-007 / JRN-011 / JRN-012 / JRN-017  

**Priority:** P0  


> As a customer, I want to customer edit, so that allow name and preference edits; phone remains staff-controlled.


#### Problem and value

Minor mistakes should not require staff. This story creates value only when it works inside the complete queue journey rather than as an isolated interface element.


#### Preconditions

- Required dependent product capabilities are available: `FEAT-043`.
- The customer has reached the appropriate public or private MesaFlow flow.

#### Acceptance summary

- **US-045-AC1:** The customer may directly edit name and approved optional preferences.
- **US-045-AC2:** Phone-number changes require staff intervention.
- **US-045-AC3:** Edits update the operational view and are attributable where material.
- **US-045-AC4:** The customer cannot edit internal notes or outcomes.

#### Safeguards

- Customer self-service must not expose another entry or internal notes.
- Customer convenience must not weaken staff control over sensitive operational changes.

#### Explicit exclusions

- Customer account.
- Native app.
- Customer-controlled timer extension.

#### Completion evidence

- `US-045` is demonstrated inside JRN-007 / JRN-011 / JRN-012 / JRN-017.
- All acceptance-summary statements pass without an undocumented manual workaround.
- No behavior from `OUT_OF_SCOPE.md` is introduced.


### US-046 — Party-size change

**Canonical feature:** `FEAT-046`  

**Primary persona:** Customer  

**Related journeys:** JRN-007 / JRN-011 / JRN-012 / JRN-017  

**Priority:** P0  


> As a customer, I want to party-size change, so that apply reductions and low-risk increases automatically; route larger increases for approval.


#### Problem and value

Group attendance changes while waiting. This story creates value only when it works inside the complete queue journey rather than as an isolated interface element.


#### Preconditions

- Required dependent product capabilities are available: `FEAT-043`, `FEAT-017`, `FEAT-019`.
- The customer has reached the appropriate public or private MesaFlow flow.

#### Acceptance summary

- **US-046-AC1:** Party-size reductions apply automatically.
- **US-046-AC2:** Increases below the configured approval threshold apply automatically.
- **US-046-AC3:** Increases at or above the threshold remain pending until staff approves or rejects.
- **US-046-AC4:** Default: +1 automatic; +2 or more requires approval.

#### Safeguards

- Customer self-service must not expose another entry or internal notes.
- Customer convenience must not weaken staff control over sensitive operational changes.

#### Explicit exclusions

- Customer account.
- Native app.
- Customer-controlled timer extension.

#### Completion evidence

- `US-046` is demonstrated inside JRN-007 / JRN-011 / JRN-012 / JRN-017.
- All acceptance-summary statements pass without an undocumented manual workaround.
- No behavior from `OUT_OF_SCOPE.md` is introduced.


### US-047 — Confirmed leave

**Canonical feature:** `FEAT-047`  

**Primary persona:** Customer  

**Related journeys:** JRN-007 / JRN-011 / JRN-012 / JRN-017  

**Priority:** P0  


> As a customer, I want to confirmed leave, so that require explicit confirmation before customer cancellation.


#### Problem and value

Accidental exit would create a poor experience. This story creates value only when it works inside the complete queue journey rather than as an isolated interface element.


#### Preconditions

- Required dependent product capabilities are available: `FEAT-043`, `FEAT-050`.
- The customer has reached the appropriate public or private MesaFlow flow.

#### Acceptance summary

- **US-047-AC1:** Leave queue first opens a clear confirmation step.
- **US-047-AC2:** Confirmation produces Cancelled by customer.
- **US-047-AC3:** Cancellation frees capacity and updates queue positions.
- **US-047-AC4:** The action cannot be reversed by the customer; staff may handle exceptional correction during the active service.

#### Safeguards

- Customer self-service must not expose another entry or internal notes.
- Customer convenience must not weaken staff control over sensitive operational changes.

#### Explicit exclusions

- Customer account.
- Native app.
- Customer-controlled timer extension.

#### Completion evidence

- `US-047` is demonstrated inside JRN-007 / JRN-011 / JRN-012 / JRN-017.
- All acceptance-summary statements pass without an undocumented manual workaround.
- No behavior from `OUT_OF_SCOPE.md` is introduced.


### US-048 — “I’m on my way”

**Canonical feature:** `FEAT-048`  

**Primary persona:** Customer  

**Related journeys:** JRN-007 / JRN-011 / JRN-012 / JRN-017  

**Priority:** P0  


> As a customer, I want to “I’m on my way”, so that record acknowledgement without extending time.


#### Problem and value

Staff benefits from knowing that the customer saw the call. This story creates value only when it works inside the complete queue journey rather than as an isolated interface element.


#### Preconditions

- Required dependent product capabilities are available: `FEAT-033`, `FEAT-043`.
- The customer has reached the appropriate public or private MesaFlow flow.

#### Acceptance summary

- **US-048-AC1:** The action is available to a Called customer.
- **US-048-AC2:** Selecting it records a visible acknowledgement for staff.
- **US-048-AC3:** It does not pause, reset or extend the timer.
- **US-048-AC4:** Repeated selections do not create repeated operational effects.

#### Safeguards

- Customer self-service must not expose another entry or internal notes.
- Customer convenience must not weaken staff control over sensitive operational changes.

#### Explicit exclusions

- Customer account.
- Native app.
- Customer-controlled timer extension.

#### Completion evidence

- `US-048` is demonstrated inside JRN-007 / JRN-011 / JRN-012 / JRN-017.
- All acceptance-summary statements pass without an undocumented manual workaround.
- No behavior from `OUT_OF_SCOPE.md` is introduced.


### US-049 — Mark Seated

**Canonical feature:** `FEAT-049`  

**Primary persona:** Staff member  

**Related journeys:** JRN-007 / JRN-008 / JRN-013  

**Priority:** P0  


> As a staff member, I want to mark Seated, so that allow from Waiting or Called and update all dependent information.


#### Problem and value

Successful outcome must free capacity and complete the loop. This story creates value only when it works inside the complete queue journey rather than as an isolated interface element.


#### Preconditions

- Required dependent product capabilities are available: `FEAT-023`, `FEAT-024`, `FEAT-019`.
- The user has valid operational access to the current establishment.

#### Acceptance summary

- **US-049-AC1:** Staff can mark a Waiting or Called entry Seated.
- **US-049-AC2:** The entry becomes terminal, frees capacity and moves to Recently completed.
- **US-049-AC3:** Queue positions and pass-over calculations update.
- **US-049-AC4:** The action records actor and time.

#### Safeguards

- The entry must retain one current lifecycle truth.
- Closed-service records must remain read-only.

#### Explicit exclusions

- Advanced business intelligence.
- Post-closure editing.
- Revenue attribution.

#### Completion evidence

- `US-049` is demonstrated inside JRN-007 / JRN-008 / JRN-013.
- All acceptance-summary statements pass without an undocumented manual workaround.
- No behavior from `OUT_OF_SCOPE.md` is introduced.


### US-050 — Cancel with actor/reason

**Canonical feature:** `FEAT-050`  

**Primary persona:** Staff member  

**Related journeys:** JRN-007 / JRN-008 / JRN-013  

**Priority:** P0  


> As a staff member, I want to cancel with actor/reason, so that preserve cancellation source.


#### Problem and value

Customer and restaurant cancellations have different meaning. This story creates value only when it works inside the complete queue journey rather than as an isolated interface element.


#### Preconditions

- Required dependent product capabilities are available: `FEAT-023`, `FEAT-024`, `FEAT-019`.
- The user has valid operational access to the current establishment.

#### Acceptance summary

- **US-050-AC1:** Staff cancellation distinguishes cancelled by customer and cancelled by restaurant.
- **US-050-AC2:** No-show remains its own terminal outcome.
- **US-050-AC3:** Cancellation frees capacity and may trigger an approved customer notice.
- **US-050-AC4:** The source is retained in history and audit.

#### Safeguards

- The entry must retain one current lifecycle truth.
- Closed-service records must remain read-only.

#### Explicit exclusions

- Advanced business intelligence.
- Post-closure editing.
- Revenue attribution.

#### Completion evidence

- `US-050` is demonstrated inside JRN-007 / JRN-008 / JRN-013.
- All acceptance-summary statements pass without an undocumented manual workaround.
- No behavior from `OUT_OF_SCOPE.md` is introduced.


### US-051 — Mark No-show

**Canonical feature:** `FEAT-051`  

**Primary persona:** Staff member  

**Related journeys:** JRN-007 / JRN-008 / JRN-013  

**Priority:** P0  


> As a staff member, I want to mark No-show, so that staff explicitly resolves the entry as No-show.


#### Problem and value

Absent groups must stop consuming capacity. This story creates value only when it works inside the complete queue journey rather than as an isolated interface element.


#### Preconditions

- Required dependent product capabilities are available: `FEAT-024`, `FEAT-019`.
- The user has valid operational access to the current establishment.

#### Acceptance summary

- **US-051-AC1:** Staff explicitly marks a group No-show.
- **US-051-AC2:** The entry frees capacity and leaves active sections.
- **US-051-AC3:** Timer expiry alone does not silently mark no-show.
- **US-051-AC4:** The outcome is included in service history.

#### Safeguards

- The entry must retain one current lifecycle truth.
- Closed-service records must remain read-only.

#### Explicit exclusions

- Advanced business intelligence.
- Post-closure editing.
- Revenue attribution.

#### Completion evidence

- `US-051` is demonstrated inside JRN-007 / JRN-008 / JRN-013.
- All acceptance-summary statements pass without an undocumented manual workaround.
- No behavior from `OUT_OF_SCOPE.md` is introduced.


### US-052 — Reactivate No-show

**Canonical feature:** `FEAT-052`  

**Primary persona:** Staff member  

**Related journeys:** JRN-007 / JRN-008 / JRN-013  

**Priority:** P0  


> As a staff member, I want to reactivate No-show, so that return it to Waiting at the queue end.


#### Problem and value

Staff may need to correct or accommodate a returning group. This story creates value only when it works inside the complete queue journey rather than as an isolated interface element.


#### Preconditions

- Required dependent product capabilities are available: `FEAT-051`, `FEAT-019`.
- The user has valid operational access to the current establishment.

#### Acceptance summary

- **US-052-AC1:** Staff may reactivate a current-service No-show.
- **US-052-AC2:** The group returns to Waiting at the end of the current queue.
- **US-052-AC3:** Current capacity must permit or clearly surface the operational conflict.
- **US-052-AC4:** The original no-show and reactivation remain in audit history.

#### Safeguards

- The entry must retain one current lifecycle truth.
- Closed-service records must remain read-only.

#### Explicit exclusions

- Advanced business intelligence.
- Post-closure editing.
- Revenue attribution.

#### Completion evidence

- `US-052` is demonstrated inside JRN-007 / JRN-008 / JRN-013.
- All acceptance-summary statements pass without an undocumented manual workaround.
- No behavior from `OUT_OF_SCOPE.md` is introduced.


### US-053 — Internal notes

**Canonical feature:** `FEAT-053`  

**Primary persona:** Staff member  

**Related journeys:** JRN-007 / JRN-008 / JRN-013  

**Priority:** P0  


> As a staff member, I want to record lightweight internal context, so that staff can add non-customer-visible operational notes.


#### Problem and value

Temporary context should not create more states. This story creates value only when it works inside the complete queue journey rather than as an isolated interface element.


#### Preconditions

- Required dependent product capabilities are available: `FEAT-023`, `FEAT-024`.
- The user has valid operational access to the current establishment.

#### Acceptance summary

- **US-053-AC1:** Staff can attach internal operational text to an entry.
- **US-053-AC2:** Notes are not visible to the customer.
- **US-053-AC3:** Notes do not create new lifecycle states or pause time.
- **US-053-AC4:** The product should keep note entry optional and lightweight.

#### Safeguards

- The entry must retain one current lifecycle truth.
- Closed-service records must remain read-only.

#### Explicit exclusions

- Advanced business intelligence.
- Post-closure editing.
- Revenue attribution.

#### Completion evidence

- `US-053` is demonstrated inside JRN-007 / JRN-008 / JRN-013.
- All acceptance-summary statements pass without an undocumented manual workaround.
- No behavior from `OUT_OF_SCOPE.md` is introduced.


### US-054 — Outcome correction

**Canonical feature:** `FEAT-054`  

**Primary persona:** Restaurant Administrator  

**Related journeys:** JRN-015 / JRN-018  

**Priority:** P0  


> As a restaurant administrator, I want to outcome correction, so that permit an Administrator to correct a completed outcome during the current service, with recalculation and audit.


#### Problem and value

Human errors occur during service. This story creates value only when it works inside the complete queue journey rather than as an isolated interface element.


#### Preconditions

- Required dependent product capabilities are available: `FEAT-025`, `FEAT-055`.
- The user has valid Administrator access.

#### Acceptance summary

- **US-054-AC1:** An Administrator may correct a terminal outcome during the same active service.
- **US-054-AC2:** The correction recalculates capacity, queue-derived values and metrics.
- **US-054-AC3:** The original and corrected values remain in the audit trail.
- **US-054-AC4:** No correction is allowed after service closure.

#### Safeguards

- The entry must retain one current lifecycle truth.
- Closed-service records must remain read-only.

#### Explicit exclusions

- Advanced business intelligence.
- Post-closure editing.
- Revenue attribution.

#### Completion evidence

- `US-054` is demonstrated inside JRN-015 / JRN-018.
- All acceptance-summary statements pass without an undocumented manual workaround.
- No behavior from `OUT_OF_SCOPE.md` is introduced.


### US-055 — Audit trail

**Canonical feature:** `FEAT-055`  

**Primary persona:** Restaurant Administrator  

**Related journeys:** JRN-015 / JRN-018  

**Priority:** P0  


> As a restaurant administrator, I want to retain trustworthy attribution for material actions, so that preserve material events and actors.


#### Problem and value

Trust and diagnosis require action history. This story creates value only when it works inside the complete queue journey rather than as an isolated interface element.


#### Preconditions

- Required dependent product capabilities are available: `FEAT-001`, `FEAT-004`.
- The user has valid Administrator access.

#### Acceptance summary

- **US-055-AC1:** Material actions retain actor, timestamp, action and relevant before/after context.
- **US-055-AC2:** The trail includes configuration changes, service controls, calls, extensions, outcomes, corrections, pass-over reasons and QR regeneration.
- **US-055-AC3:** Audit supports trust and diagnosis without becoming the primary live interface.
- **US-055-AC4:** Historical attribution survives staff deactivation.

#### Safeguards

- The entry must retain one current lifecycle truth.
- Closed-service records must remain read-only.

#### Explicit exclusions

- Advanced business intelligence.
- Post-closure editing.
- Revenue attribution.

#### Completion evidence

- `US-055` is demonstrated inside JRN-015 / JRN-018.
- All acceptance-summary statements pass without an undocumented manual workaround.
- No behavior from `OUT_OF_SCOPE.md` is introduced.


### US-056 — Closed-service history

**Canonical feature:** `FEAT-056`  

**Primary persona:** Restaurant Administrator  

**Related journeys:** JRN-015 / JRN-018  

**Priority:** P0  


> As a restaurant administrator, I want to closed-service history, so that provide the approved summary and read-only records.


#### Problem and value

Owner needs proof of use and basic outcomes. This story creates value only when it works inside the complete queue journey rather than as an isolated interface element.


#### Preconditions

- Required dependent product capabilities are available: `FEAT-022`, `FEAT-055`.
- The user has valid Administrator access.

#### Acceptance summary

- **US-056-AC1:** Closed services show date/time, received, seated, cancellations, no-shows, average and maximum wait, pass-overs, messages sent and messages failed.
- **US-056-AC2:** Closed records are read-only.
- **US-056-AC3:** The history remains basic and operational rather than an advanced BI suite.
- **US-056-AC4:** Metrics use consistent definitions documented with the product.

#### Safeguards

- The entry must retain one current lifecycle truth.
- Closed-service records must remain read-only.

#### Explicit exclusions

- Advanced business intelligence.
- Post-closure editing.
- Revenue attribution.

#### Completion evidence

- `US-056` is demonstrated inside JRN-015 / JRN-018.
- All acceptance-summary statements pass without an undocumented manual workaround.
- No behavior from `OUT_OF_SCOPE.md` is introduced.


### US-057 — Discreet branding

**Canonical feature:** `FEAT-057`  

**Primary persona:** Restaurant Administrator  

**Related journeys:** JRN-001 / JRN-003 / JRN-006  

**Priority:** P0  


> As a restaurant administrator, I want to discreet branding, so that show small MesaFlow branding on customer pages in the initial plan.


#### Problem and value

MesaFlow benefits from organic awareness without disrupting restaurant identity. This story creates value only when it works inside the complete queue journey rather than as an isolated interface element.


#### Preconditions

- Required dependent product capabilities are available: `FEAT-009`, `FEAT-043`.
- The user has valid Administrator access.

#### Acceptance summary

- **US-057-AC1:** Customer-facing public and status pages show a small MesaFlow mark in the footer.
- **US-057-AC2:** Restaurant identity remains visually primary.
- **US-057-AC3:** The initial plan does not allow removal.
- **US-057-AC4:** Future commercial plans may revisit white-label capability.

#### Safeguards

- Responsive and brand treatment must preserve the same approved behavior.
- Restaurant identity remains primary in customer-facing flows.

#### Explicit exclusions

- White-label removal in initial plan.
- Native staff application.
- Device-specific feature divergence.

#### Completion evidence

- `US-057` is demonstrated inside JRN-001 / JRN-003 / JRN-006.
- All acceptance-summary statements pass without an undocumented manual workaround.
- No behavior from `OUT_OF_SCOPE.md` is introduced.


### US-058 — Tablet and desktop staff experience

**Canonical feature:** `FEAT-058`  

**Primary persona:** Staff member  

**Related journeys:** JRN-001 / JRN-003 / JRN-006  

**Priority:** P0  


> As a staff member, I want to operate MesaFlow fully from tablet and desktop, so that primary staff workflows are fully usable on both form factors.


#### Problem and value

Restaurants commonly operate on both. This story creates value only when it works inside the complete queue journey rather than as an isolated interface element.


#### Preconditions

- Required dependent product capabilities are available: `FEAT-023`, `FEAT-024`, `FEAT-025`.
- The user has valid operational access to the current establishment.

#### Acceptance summary

- **US-058-AC1:** All primary staff operations are usable on common tablet and desktop dimensions.
- **US-058-AC2:** The product does not assume a mouse-only workflow.
- **US-058-AC3:** Critical information remains readable during a busy service.
- **US-058-AC4:** Responsive adaptation must preserve action meaning and current state.

#### Safeguards

- Responsive and brand treatment must preserve the same approved behavior.
- Restaurant identity remains primary in customer-facing flows.

#### Explicit exclusions

- White-label removal in initial plan.
- Native staff application.
- Device-specific feature divergence.

#### Completion evidence

- `US-058` is demonstrated inside JRN-001 / JRN-003 / JRN-006.
- All acceptance-summary statements pass without an undocumented manual workaround.
- No behavior from `OUT_OF_SCOPE.md` is introduced.


### US-059 — Mobile-first customer experience

**Canonical feature:** `FEAT-059`  

**Primary persona:** Customer  

**Related journeys:** JRN-001 / JRN-003 / JRN-006  

**Priority:** P0  


> As a customer, I want to use the customer journey comfortably on a phone, so that all public and status flows are designed for common mobile screens.


#### Problem and value

QR entry happens primarily on phones. This story creates value only when it works inside the complete queue journey rather than as an isolated interface element.


#### Preconditions

- Required dependent product capabilities are available: `FEAT-009`, `FEAT-010`, `FEAT-043`.
- The customer has reached the appropriate public or private MesaFlow flow.

#### Acceptance summary

- **US-059-AC1:** Public welcome, form, confirmation and status flows are designed primarily for mobile browsers.
- **US-059-AC2:** No app installation or customer account is required.
- **US-059-AC3:** Touch targets, validation and content hierarchy support one-handed use.
- **US-059-AC4:** The experience remains usable when reopened from a WhatsApp link.

#### Safeguards

- Responsive and brand treatment must preserve the same approved behavior.
- Restaurant identity remains primary in customer-facing flows.

#### Explicit exclusions

- White-label removal in initial plan.
- Native staff application.
- Device-specific feature divergence.

#### Completion evidence

- `US-059` is demonstrated inside JRN-001 / JRN-003 / JRN-006.
- All acceptance-summary statements pass without an undocumented manual workaround.
- No behavior from `OUT_OF_SCOPE.md` is introduced.


---

## 4. Cross-feature integrity stories


### US-060 — Run a complete service without paper

**Primary persona:** Restaurant team  

**Related journeys:** JRN-002–JRN-015  

**Priority:** P0 integrity story  


> As a restaurant team, I want to operate one complete service from opening to read-only history, so that the restaurant can trust MesaFlow as the sole waiting-list source.


#### Acceptance summary

- **US-060-AC1:** A service can open, accept QR and manual entries, call groups, resolve every entry and close.
- **US-060-AC2:** The team does not require a parallel paper source of truth.
- **US-060-AC3:** Closed-service metrics derive from the completed service.

#### Completion evidence

- Demonstrated in an end-to-end pilot rehearsal.
- Supported by all linked canonical feature stories.
- No parallel undocumented process is required.


### US-061 — Preserve one current entry truth

**Primary persona:** Restaurant team  

**Related journeys:** JRN-006 / JRN-014 / JRN-015  

**Priority:** P0 integrity story  


> As a restaurant team, I want to have one authoritative lifecycle state for every entry, so that colleagues and customers do not act on contradictory information.


#### Acceptance summary

- **US-061-AC1:** Two incompatible transitions cannot both become valid.
- **US-061-AC2:** All active views reconcile to the accepted state.
- **US-061-AC3:** Audit retains accepted material changes.

#### Completion evidence

- Demonstrated in an end-to-end pilot rehearsal.
- Supported by all linked canonical feature stories.
- No parallel undocumented process is required.


### US-062 — Continue when WhatsApp is unavailable

**Primary persona:** Staff member  

**Related journeys:** JRN-009  

**Priority:** P0 integrity story  


> As a staff member, I want to keep operating the queue when messaging fails, so that a third-party communication failure does not stop service.


#### Acceptance summary

- **US-062-AC1:** Entries remain valid during provider failure.
- **US-062-AC2:** Staff sees truthful failure or unavailable status.
- **US-062-AC3:** Manual recovery remains possible and timers preserve approved behavior.

#### Completion evidence

- Demonstrated in an end-to-end pilot rehearsal.
- Supported by all linked canonical feature stories.
- No parallel undocumented process is required.


### US-063 — Treat assisted and QR customers equally

**Primary persona:** Assisted customer  

**Related journeys:** JRN-003 / JRN-004 / JRN-010  

**Priority:** P0 integrity story  


> As a assisted customer, I want to remain in the same fair queue regardless of entry method, so that digital confidence does not determine service priority.


#### Acceptance summary

- **US-063-AC1:** Manual and QR entries share ordering and fairness rules.
- **US-063-AC2:** No-contact entries remain fully operable.
- **US-063-AC3:** Manual entry does not create a lower-priority state.

#### Completion evidence

- Demonstrated in an end-to-end pilot rehearsal.
- Supported by all linked canonical feature stories.
- No parallel undocumented process is required.


### US-064 — Protect fairness without blocking judgement

**Primary persona:** Staff member  

**Related journeys:** JRN-006 / JRN-010  

**Priority:** P0 integrity story  


> As a staff member, I want to see when a group has waited or been passed unusually long, so that I can act responsibly without rigid automation.


#### Acceptance summary

- **US-064-AC1:** Elapsed wait, pass-over and warning signals are visible.
- **US-064-AC2:** Protected bypass requires a quick reason.
- **US-064-AC3:** Staff remains able to act after recording the reason.

#### Completion evidence

- Demonstrated in an end-to-end pilot rehearsal.
- Supported by all linked canonical feature stories.
- No parallel undocumented process is required.


### US-065 — Keep capacity consistent across all entry paths

**Primary persona:** Restaurant team  

**Related journeys:** JRN-003 / JRN-004 / JRN-005 / JRN-011  

**Priority:** P0 integrity story  


> As a restaurant team, I want to use one weighted-capacity truth, so that the queue never accepts more load through one path than another.


#### Acceptance summary

- **US-065-AC1:** QR, manual entry and approved party-size changes use the same rules.
- **US-065-AC2:** Only approved current party size affects usage.
- **US-065-AC3:** Public availability updates after capacity-changing events.

#### Completion evidence

- Demonstrated in an end-to-end pilot rehearsal.
- Supported by all linked canonical feature stories.
- No parallel undocumented process is required.


### US-066 — Preserve safe private customer access

**Primary persona:** Customer  

**Related journeys:** JRN-003 / JRN-017  

**Priority:** P0 integrity story  


> As a customer, I want to reopen my own entry without an account, so that I can follow the queue without exposing my phone or another customer.


#### Acceptance summary

- **US-066-AC1:** Private links are unguessable and entry-specific.
- **US-066-AC2:** Phone is absent from the URL.
- **US-066-AC3:** Closed or expired entries show a safe final state.

#### Completion evidence

- Demonstrated in an end-to-end pilot rehearsal.
- Supported by all linked canonical feature stories.
- No parallel undocumented process is required.


### US-067 — Maintain usability on restaurant devices

**Primary persona:** Staff member  

**Related journeys:** JRN-002 / JRN-006 / JRN-014  

**Priority:** P0 integrity story  


> As a staff member, I want to use all primary actions from tablet and desktop, so that device choice does not force the restaurant back to paper.


#### Acceptance summary

- **US-067-AC1:** Primary actions are available on both form factors.
- **US-067-AC2:** Critical state and warnings remain readable.
- **US-067-AC3:** No core workflow assumes mouse-only use.

#### Completion evidence

- Demonstrated in an end-to-end pilot rehearsal.
- Supported by all linked canonical feature stories.
- No parallel undocumented process is required.


### US-068 — Measure pilot evidence without advanced BI

**Primary persona:** Restaurant owner evaluating MesaFlow  

**Related journeys:** JRN-018  

**Priority:** P0 integrity story  


> As a restaurant owner evaluating mesaflow, I want to review trustworthy basic service and message metrics, so that I can decide whether MesaFlow creates enough value to continue.


#### Acceptance summary

- **US-068-AC1:** Closed-service metrics use approved definitions.
- **US-068-AC2:** Message attempts and failures are measurable.
- **US-068-AC3:** No advanced analytics suite is introduced.

#### Completion evidence

- Demonstrated in an end-to-end pilot rehearsal.
- Supported by all linked canonical feature stories.
- No parallel undocumented process is required.


---

## 5. Story coverage matrix

| Story range | Scope |
|---|---|
| US-001–US-005 | Account, establishment and access |
| US-006–US-014 | QR and public entry |
| US-015–US-019 | Manual entry and queue capacity |
| US-020–US-027 | Service operation |
| US-028–US-032 | Fairness and prioritization |
| US-033–US-042 | Calling and messaging |
| US-043–US-048 | Customer status and self-service |
| US-049–US-056 | Outcomes, correction and history |
| US-057–US-059 | Brand and responsive experience |
| US-060–US-068 | Cross-feature integrity |

All `FEAT-001`–`FEAT-059` have one primary story.

---

## 6. Definition of ready

A story is ready for implementation planning when:

- persona and outcome are unambiguous;
- the canonical feature exists;
- linked journeys are defined;
- dependencies are known;
- acceptance summary is stable;
- exclusions are explicit;
- no unresolved strategic conflict exists.

---

## 7. Definition of done for Product Management

A story is behaviorally complete when:

1. the intended persona achieves the outcome;
2. acceptance-summary statements are true;
3. permissions are correct;
4. unavailable and failure states are understandable;
5. capacity, position, timers and metrics remain correct where relevant;
6. multi-device behavior preserves one truth;
7. the linked journey works end to end;
8. audit and measurement exist where required;
9. explicit exclusions remain excluded;
10. the restaurant does not require an undocumented paper workaround.
