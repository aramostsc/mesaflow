# MesaFlow — Edge Cases

**Document ID:** PROD-EDGE-001  
**Product:** MesaFlow  
**Release:** MVP / Pilot Release  
**Status:** Approved edge-case specification  
**Owner:** Product Management  
**Version:** 1.0  
**Last updated:** 2026-07-10

---

## 1. Purpose

This document identifies non-happy-path conditions that can damage trust, fairness, capacity, privacy or service continuity.

An edge case is not automatically a separate feature. Most cases must be handled through the approved state model and business rules rather than by adding new lifecycle states.

---

## 2. Severity

| Severity | Meaning |
|---|---|
| S0 | Integrity, privacy or operational blocker; must be resolved before live pilot |
| S1 | Core-flow or trust failure; normally blocks the affected pilot scenario |
| S2 | Material friction or ambiguity; should be resolved before broad pilot |
| S3 | Lower-impact refinement; may be addressed during controlled pilot |

---

## 3. Edge-case catalogue


### 3.1 Account, access and establishment

| Edge ID | Scenario | Expected product behavior | Related scope | Severity |
|---|---|---|---|---|
| EDGE-001 | The first account is created, but establishment setup is abandoned halfway. | Preserve safe completed data where supported; do not create an open service or public queue until required setup is valid. | FEAT-001–FEAT-003 | S2 |
| EDGE-002 | Two people attempt to create the first Administrator for the same restaurant context. | Only one valid accountable first Administrator is established; the other flow must not create a conflicting ownership state. | FEAT-001, FEAT-027 | S0 |
| EDGE-003 | An Administrator invites the same email twice. | Do not create two active identities or contradictory invitations; show the existing invitation or account state. | FEAT-004 | S2 |
| EDGE-004 | A Staff invitation expires before use. | The invitation cannot grant access; Administrator can issue a replacement. | FEAT-004 | S2 |
| EDGE-005 | A Staff user is removed while the dashboard is open. | Future privileged actions are refused; prior audit attribution remains. | FEAT-004–FEAT-005, FEAT-055 | S1 |
| EDGE-006 | A Staff user discovers a direct route to structural settings. | Authorization rejects the change even when the control is not visible in the normal UI. | FEAT-005 | S0 |
| EDGE-007 | Administrator changes the establishment time zone during an active service. | Current timestamps and deadlines remain coherent; the product must not rewrite historical accepted times ambiguously. The product should warn if the change could confuse the active service. | FEAT-002–FEAT-003, FEAT-034, FEAT-056 | S1 |
| EDGE-008 | Restaurant name contains long text or uncommon characters. | Public screens and messages remain understandable without truncating critical operational content. | FEAT-002, FEAT-009, FEAT-039 | S3 |
| EDGE-009 | An optional logo is missing or fails to render. | Restaurant name remains sufficient identity; public entry remains fully usable. | FEAT-002, FEAT-009 | S3 |
| EDGE-010 | A deactivated Staff member is the actor on historical events. | History continues to show a stable attributable identity or safe historical label. | FEAT-004, FEAT-055 | S1 |

### 3.2 QR and public queue state

| Edge ID | Scenario | Expected product behavior | Related scope | Severity |
|---|---|---|---|---|
| EDGE-011 | A customer scans the permanent QR before any service has ever opened. | Show a clear no-active-service state; do not expose an invalid form. | FEAT-006, FEAT-009, FEAT-014 | S2 |
| EDGE-012 | A customer keeps the public page open while Staff closes intake. | Submission revalidates and is rejected with the current intake-closed explanation. | FEAT-010, FEAT-014, FEAT-021 | S1 |
| EDGE-013 | A customer keeps the public page open while the queue becomes full. | Submission revalidates capacity; no over-capacity entry is silently accepted. | FEAT-010, FEAT-014, FEAT-019 | S0 |
| EDGE-014 | A customer opens an old QR after regeneration. | The old public entry point cannot create a new entry and provides a safe invalid/replaced state where practical. | FEAT-008 | S1 |
| EDGE-015 | An accepted customer opens their private link after public QR regeneration. | The private status remains valid and shows the accepted entry. | FEAT-008, FEAT-043 | S0 |
| EDGE-016 | Administrator regenerates QR during an active service. | Existing service and entries continue; only future public intake through the old QR is invalidated. | FEAT-008, FEAT-020 | S1 |
| EDGE-017 | QR download is requested repeatedly. | The same current QR is returned; repeated download does not regenerate or alter state. | FEAT-007–FEAT-008 | S2 |
| EDGE-018 | The printed QR is partially damaged and scan fails. | This is outside application control; the restaurant can reprint the same current QR without regenerating it. | FEAT-006–FEAT-007 | S3 |
| EDGE-019 | A public page is opened from a browser with cookies disabled. | Normal public entry and private-link access should remain usable unless a documented security requirement prevents it. | FEAT-009–FEAT-010, FEAT-043 | S2 |
| EDGE-020 | The public page is refreshed immediately after successful submission. | Do not create a second active entry; show or recover the existing accepted state where possible. | FEAT-010, FEAT-012, FEAT-043 | S1 |
| EDGE-021 | The same QR is displayed at multiple physical entrances. | All scans use the same establishment queue and capacity truth. | FEAT-006, FEAT-019 | S1 |
| EDGE-022 | Customer tries to join while no service exists, then Staff opens service without customer refreshing. | The customer must refresh or receive an updated available state; the product must not accept against stale unavailable data without revalidation. | FEAT-009–FEAT-010, FEAT-020 | S2 |

### 3.3 Customer data and entry validation

| Edge ID | Scenario | Expected product behavior | Related scope | Severity |
|---|---|---|---|---|
| EDGE-023 | Customer submits only spaces or punctuation as the name. | Reject invalid input with a field-specific explanation; no entry is created. | FEAT-010 | S2 |
| EDGE-024 | Customer enters an invalid or unsupported phone format. | Reject or request correction before acceptance according to the supported phone policy. | FEAT-010 | S2 |
| EDGE-025 | Customer enters party size zero, negative or non-numeric. | Reject the field; no capacity is reserved. | FEAT-010 | S2 |
| EDGE-026 | Customer enters an extremely large party size. | Apply the configured QR maximum and direct the customer to Staff without creating an entry. | FEAT-013 | S2 |
| EDGE-027 | Customer includes very long notes. | Apply a documented safe limit and preserve the rest of the valid submission; do not allow notes to break the dashboard. | FEAT-011 | S2 |
| EDGE-028 | Customer includes unsafe markup or script-like content in name or notes. | Render safely as data; do not execute or corrupt the interface. | FEAT-010–FEAT-011, NFR | S0 |
| EDGE-029 | Two customers legitimately share the same phone and want separate active groups. | The second active self-entry is blocked under the MVP rule; Staff handles the exceptional case manually. | FEAT-012, FEAT-015 | S2 |
| EDGE-030 | A customer enters the wrong phone number that belongs to another person. | The entry remains valid operationally; Staff may correct the phone. The product cannot claim verified ownership. | FEAT-010, FEAT-045 | S1 |
| EDGE-031 | A terminal entry from a prior service uses the same phone. | A new entry may be created because the prior entry is not active. | FEAT-012 | S1 |
| EDGE-032 | A customer submits at the same instant Staff ends the service. | Only one authoritative result is accepted: either the entry commits before closure and blocks closure as active, or submission is rejected after closure. | FEAT-010, FEAT-022, FEAT-027 | S0 |
| EDGE-033 | A customer submits at the same instant Staff closes new entries. | Acceptance is determined by the committed authoritative order; no entry exists in an undefined state. | FEAT-010, FEAT-021, FEAT-027 | S0 |
| EDGE-034 | A customer omits every optional preference. | Entry is accepted normally. | FEAT-011 | S3 |
| EDGE-035 | A customer selects conflicting optional preferences or writes a contradictory note. | Preserve the data as advisory and leave the seating decision to Staff; do not create a new state. | FEAT-011, FEAT-053 | S3 |

### 3.4 Manual entry and no-contact

| Edge ID | Scenario | Expected product behavior | Related scope | Severity |
|---|---|---|---|---|
| EDGE-036 | Staff creates a manual entry without phone. | Accept it, mark No contact and do not attempt automated messaging. | FEAT-015–FEAT-016 | S1 |
| EDGE-037 | Staff later adds a valid phone to a no-contact Waiting entry. | Future eligible messages may use it; no past confirmation is sent automatically unless explicitly triggered by approved behavior. | FEAT-016, FEAT-038 | S2 |
| EDGE-038 | Staff enters a phone already used by another active entry. | Apply the active duplicate rule or require explicit resolution; do not silently create duplicate active phone identity. | FEAT-012, FEAT-015 | S1 |
| EDGE-039 | Staff attempts manual entry while weighted capacity is full. | Reject or surface a clear capacity conflict; do not silently exceed the configured limit. | FEAT-015, FEAT-018–FEAT-019 | S0 |
| EDGE-040 | Staff manually adds a party above the QR maximum. | Allow after operational judgement if capacity permits; the QR maximum does not prohibit Staff entry. | FEAT-013, FEAT-015 | S2 |
| EDGE-041 | Staff double-taps Add group. | At most one active entry is created for the submitted operation. | FEAT-015, FEAT-027 | S0 |
| EDGE-042 | Manual entry is accepted on one device but another device is temporarily offline. | On reconnection, the second device receives the entry and does not overwrite the queue. | FEAT-015, FEAT-027 | S1 |
| EDGE-043 | Staff enters an incorrect party size and corrects it immediately. | Apply the approved edit/correction path and recalculate capacity without altering accepted-entry time. | FEAT-015, FEAT-019, FEAT-046 | S1 |

### 3.5 Weighted capacity and party-size changes

| Edge ID | Scenario | Expected product behavior | Related scope | Severity |
|---|---|---|---|---|
| EDGE-044 | A two-person group and a twelve-person group enter with the default cutoff. | The first consumes one slot and the second consumes two slots. | FEAT-017 | S1 |
| EDGE-045 | Administrator changes the two-slot cutoff while entries are active. | Current approved party sizes are re-evaluated consistently; no entry is removed. Warn if intake becomes over capacity. | FEAT-017–FEAT-019 | S1 |
| EDGE-046 | A customer reduces party size across the two-slot cutoff. | The change applies automatically, weight decreases and availability recalculates. | FEAT-019, FEAT-046 | S1 |
| EDGE-047 | A customer increases party size by one below the approval threshold and crosses the two-slot cutoff. | The approved automatic change immediately increases weight and may make the queue full. | FEAT-017–FEAT-019, FEAT-046 | S1 |
| EDGE-048 | A customer requests an approval-required increase while only the smaller size fits capacity. | Keep the current approved size and capacity until Staff decides. | FEAT-019, FEAT-046 | S0 |
| EDGE-049 | Staff approves an increase that would exceed configured capacity. | Surface the conflict clearly and require an authorized product-defined decision; never silently corrupt capacity. | FEAT-018–FEAT-019, FEAT-046 | S0 |
| EDGE-050 | Staff rejects a pending size increase. | Current party size, weight and queue position remain unchanged; pending state clears. | FEAT-046 | S2 |
| EDGE-051 | Customer submits repeated party-size requests before Staff responds. | Maintain one understandable current approved size and a clear pending request policy; do not apply cumulative hidden increases. | FEAT-046 | S1 |
| EDGE-052 | A terminal entry receives a late party-size request from an old page. | Reject the change; terminal history remains unchanged. | FEAT-043, FEAT-046, FEAT-049–FEAT-051 | S1 |
| EDGE-053 | Administrator lowers maximum slots below current active usage. | Existing groups remain; new intake stays blocked until usage falls within limit. | FEAT-018–FEAT-019 | S1 |
| EDGE-054 | Several terminal outcomes occur rapidly and free capacity. | Capacity recalculates once to the correct current value and public intake becomes available when permitted. | FEAT-019, FEAT-027 | S1 |
| EDGE-055 | A No-show is reactivated when capacity is full. | Surface the capacity conflict; do not silently create an invalid over-capacity active queue. | FEAT-019, FEAT-052 | S0 |

### 3.6 Service lifecycle

| Edge ID | Scenario | Expected product behavior | Related scope | Severity |
|---|---|---|---|---|
| EDGE-056 | Staff attempts to open a second service while one is active. | Reject the action and show the current active service. | FEAT-020 | S1 |
| EDGE-057 | A service crosses midnight. | Keep one service boundary and display local date/time coherently. | FEAT-020, FEAT-056 | S2 |
| EDGE-058 | Staff closes intake with zero active entries. | Public state becomes intake closed; service remains active until explicitly ended. | FEAT-021–FEAT-022 | S2 |
| EDGE-059 | Staff reopens intake while current usage equals capacity. | Public state remains queue full rather than falsely available. | FEAT-014, FEAT-019, FEAT-021 | S1 |
| EDGE-060 | Staff attempts to end service with one Called entry. | Block closure and identify the unresolved entry. | FEAT-022, FEAT-024 | S1 |
| EDGE-061 | Staff attempts to end service with one Waiting entry hidden by a filter. | Block closure based on canonical active truth, not current filtered view. | FEAT-022, FEAT-026 | S0 |
| EDGE-062 | Two Staff users attempt to end the service simultaneously after all entries resolve. | One closure succeeds; the other reconciles to the closed state without duplicate history. | FEAT-022, FEAT-027, FEAT-056 | S1 |
| EDGE-063 | A device remains open on the dashboard after service closes elsewhere. | It updates to closed/read-only state and cannot create new active actions. | FEAT-022, FEAT-027 | S1 |
| EDGE-064 | An Administrator changes a configuration after service closure but before opening the next service. | New configuration applies prospectively and does not rewrite the closed service. | FEAT-003, FEAT-056 | S1 |

### 3.7 Ordering, filtering and fairness

| Edge ID | Scenario | Expected product behavior | Related scope | Severity |
|---|---|---|---|---|
| EDGE-065 | Staff filters for parties of two while a long-wait large group is hidden. | The filter may hide it visually, but canonical protection and closure truth remain active; returning to full view restores it. | FEAT-026, FEAT-031 | S2 |
| EDGE-066 | A later group is marked Seated directly from Waiting. | Qualifying earlier active groups receive a pass-over. | FEAT-030, FEAT-049 | S1 |
| EDGE-067 | A later group is Called but not yet Seated. | Do not count a pass-over yet. | FEAT-030, FEAT-033 | S2 |
| EDGE-068 | A later group is marked No-show. | Do not count a pass-over. | FEAT-030, FEAT-051 | S2 |
| EDGE-069 | A later Seated outcome is corrected to Cancelled. | Recalculate and remove pass-overs that no longer qualify. | FEAT-030, FEAT-054 | S1 |
| EDGE-070 | An earlier group is Called when a later group is Seated. | The earlier group is still active; apply the approved pass-over definition consistently. | FEAT-024, FEAT-030 | S2 |
| EDGE-071 | A Waiting entry reaches long-wait threshold while its row is off-screen. | Protection activates regardless of visibility and appears when the row is rendered. | FEAT-031 | S1 |
| EDGE-072 | Long-wait threshold is changed during a service. | Re-evaluate active Waiting entries consistently using current elapsed wait. | FEAT-031 | S2 |
| EDGE-073 | Staff bypasses several protected groups with one seating action. | Require the product-defined accountability for affected protected entries without turning the flow into unreasonable repeated bureaucracy; preserve all necessary audit relationships. | FEAT-032 | S2 |
| EDGE-074 | Staff selects Other as bypass reason. | Allow the action; capture any required short context according to final UX specification. | FEAT-032 | S3 |
| EDGE-075 | A large group reduces below the configured cutoff. | Remove large-group label and recalculate weight after the approved change. | FEAT-017, FEAT-029, FEAT-046 | S1 |
| EDGE-076 | The first group in canonical order has an interior preference and only terrace is available. | Staff may choose a later compatible group; fairness signals and protected-reason rule still apply. | FEAT-011, FEAT-032 | S2 |

### 3.8 Calling, countdown and final call

| Edge ID | Scenario | Expected product behavior | Related scope | Severity |
|---|---|---|---|---|
| EDGE-077 | Two Staff users call the same Waiting entry simultaneously. | Exactly one Called transition and one countdown are created. | FEAT-027, FEAT-033–FEAT-034 | S0 |
| EDGE-078 | Staff calls an entry already Seated by another device. | Reject the stale call and show the current Seated outcome. | FEAT-027, FEAT-033, FEAT-049 | S1 |
| EDGE-079 | Staff calls a no-contact entry. | Move to Called and run the operational timer if approved, but do not attempt WhatsApp; show that in-person contact is required. | FEAT-016, FEAT-033–FEAT-034 | S1 |
| EDGE-080 | The customer page is closed when the group is called. | The server-side call state and deadline persist; reopening shows the current Called state. | FEAT-034, FEAT-043 | S1 |
| EDGE-081 | The Staff device clock differs from the customer phone clock. | Both views derive the countdown from one authoritative deadline rather than trusting local wall-clock assumptions. | FEAT-034, NFR | S0 |
| EDGE-082 | The call duration is 3 minutes; final call is due after 2 minutes. | Trigger final call at one minute remaining and extend the deadline by two minutes once. | FEAT-035–FEAT-036 | S1 |
| EDGE-083 | The call duration is 10 minutes. | Use the same final-call rule at one minute remaining, not a percentage of duration. | FEAT-035 | S2 |
| EDGE-084 | Final-call message fails. | Apply the two-minute grace period and show failure; do not remove the customer. | FEAT-035–FEAT-036, FEAT-040 | S1 |
| EDGE-085 | Final-call event is delivered twice by an external system. | Apply the grace period once and preserve one final-call event. | FEAT-035–FEAT-036, NFR | S0 |
| EDGE-086 | Staff manually extends time before the final-call point. | Preserve the approved definition of original final-call event; manual extension must not create repeated automatic final calls. | FEAT-035–FEAT-037 | S1 |
| EDGE-087 | Staff manually extends time after final call. | Update the current deadline and audit the action; do not add another automatic grace period. | FEAT-036–FEAT-037 | S1 |
| EDGE-088 | Two Staff users add extra time simultaneously. | Resolve to one authoritative deadline according to accepted actions and show the same result on all devices. | FEAT-027, FEAT-037 | S1 |
| EDGE-089 | Timer reaches zero while Staff is marking Seated. | Only the committed authoritative action determines state; expiry itself does not create No-show. | FEAT-034, FEAT-049, FEAT-051 | S0 |
| EDGE-090 | Customer selects “I’m on my way” at the same moment Staff marks No-show. | Only currently valid state allows acknowledgement; no automatic reactivation occurs. | FEAT-027, FEAT-048, FEAT-051 | S1 |
| EDGE-091 | Customer repeatedly taps “I’m on my way”. | Show one meaningful acknowledgement without extending time or duplicating audit noise unnecessarily. | FEAT-048 | S2 |

### 3.9 Messaging and provider behavior

| Edge ID | Scenario | Expected product behavior | Related scope | Severity |
|---|---|---|---|---|
| EDGE-092 | WhatsApp provider rejects a malformed or unsupported phone. | Show failure truthfully; entry and countdown remain valid. | FEAT-038, FEAT-040 | S1 |
| EDGE-093 | Provider accepts the message but delivery status is delayed. | Show the latest truthful state and do not block operation. | FEAT-040 | S2 |
| EDGE-094 | Provider never supplies delivered/read status. | Do not invent it; preserve the highest truthful supported state. | FEAT-040 | S1 |
| EDGE-095 | A call message fails and Staff retries. | Count a new attempt; do not create another Called transition or timer. | FEAT-041–FEAT-042 | S0 |
| EDGE-096 | A retry result arrives before the original delayed result. | Present an understandable attempt history/current result without corrupting queue state. | FEAT-040–FEAT-042 | S2 |
| EDGE-097 | Staff retries after the entry has become Seated. | Do not send an obsolete table-ready message; reject or disable the retry. | FEAT-041, FEAT-049 | S1 |
| EDGE-098 | Cancellation occurs while a call message is still in provider processing. | Entry becomes Cancelled; later provider status must not revert lifecycle state. | FEAT-038, FEAT-040, FEAT-050 | S0 |
| EDGE-099 | A template personalization removes where-to-report information. | Reject invalid template or restore mandatory operational meaning. | FEAT-039 | S1 |
| EDGE-100 | Personalized text exceeds provider limits. | Warn or constrain the Administrator before operational use; do not silently truncate critical meaning. | FEAT-039 | S2 |
| EDGE-101 | Restaurant identity contains characters unsupported by the provider. | Preserve a valid understandable fallback representation without failing the queue. | FEAT-002, FEAT-039 | S2 |
| EDGE-102 | Message consumption is recorded although delivery fails. | Count the attempt and available failure outcome according to the documented metric definition. | FEAT-042 | S2 |
| EDGE-103 | The provider is entirely unavailable for an hour. | Queue operation continues; Staff sees the integration problem and uses manual recovery. | FEAT-038, FEAT-040, NFR | S1 |
| EDGE-104 | The provider sends duplicate status updates. | Do not duplicate consumption events or business effects beyond the documented attempt/outcome model. | FEAT-040–FEAT-042 | S1 |

### 3.10 Private status and customer self-service

| Edge ID | Scenario | Expected product behavior | Related scope | Severity |
|---|---|---|---|---|
| EDGE-105 | A customer forwards the private link to another group member. | The link grants access to that entry by possession; no broader customer or queue data is exposed. | FEAT-043 | S2 |
| EDGE-106 | A customer changes one character in the private token. | Do not reveal whether another valid entry exists; show a safe invalid-link state. | FEAT-043, NFR | S0 |
| EDGE-107 | A customer opens the private link after the entry is Seated. | Show a safe final Seated state and no active self-service actions. | FEAT-043, FEAT-049 | S2 |
| EDGE-108 | A customer opens the private link after leaving the queue. | Show Cancelled by customer and no active editing. | FEAT-043, FEAT-047, FEAT-050 | S2 |
| EDGE-109 | A customer edits name while Staff is viewing the entry. | Update Staff view promptly without changing accepted-entry time or position. | FEAT-027, FEAT-045 | S2 |
| EDGE-110 | A customer tries to change phone through manipulated client behavior. | Reject the change; Staff intervention remains required. | FEAT-045, NFR | S0 |
| EDGE-111 | A customer reduces party size after being Called. | Apply the approved rule if the entry is still active, update capacity and show the current party size to Staff. | FEAT-019, FEAT-046 | S2 |
| EDGE-112 | A customer requests a large increase after being Called. | Apply the same approval rule; do not change approved party size before Staff decision. | FEAT-046 | S1 |
| EDGE-113 | A customer selects Leave queue while Staff simultaneously marks Seated. | Only one authoritative terminal outcome is accepted and all views reconcile. | FEAT-027, FEAT-047, FEAT-049 | S0 |
| EDGE-114 | A customer opens the confirmation dialog and closes it. | Keep the entry active. | FEAT-047 | S2 |
| EDGE-115 | A customer selects “I’m on my way” after the entry has been Cancelled. | Reject the stale acknowledgement and show the terminal outcome. | FEAT-048, FEAT-050 | S2 |
| EDGE-116 | Groups-ahead count changes upward because of reactivation or approved queue changes. | Show the truthful current value and retain explanatory copy that order may vary. | FEAT-044, FEAT-052 | S2 |

### 3.11 Outcomes, correction, audit and history

| Edge ID | Scenario | Expected product behavior | Related scope | Severity |
|---|---|---|---|---|
| EDGE-117 | Staff marks a Waiting entry Seated without calling. | Allow direct seating, free capacity and calculate pass-over effects. | FEAT-030, FEAT-049 | S1 |
| EDGE-118 | Staff double-taps Seated. | Create one terminal transition and one material audit event for the accepted outcome. | FEAT-049, FEAT-055 | S0 |
| EDGE-119 | Staff marks No-show immediately after calling by mistake. | Administrator may correct during the active service; preserve original event in audit. | FEAT-051, FEAT-054–FEAT-055 | S1 |
| EDGE-120 | Staff attempts to reactivate a No-show from a closed service. | Reject the action; closed history remains read-only. | FEAT-052, FEAT-056 | S1 |
| EDGE-121 | A reactivated entry’s original accepted time is older than all active entries. | Assign it a new current position at queue end while preserving historical event context. | FEAT-052 | S1 |
| EDGE-122 | Administrator corrects Seated to Cancelled during active service. | Recalculate capacity, pass-over and service metrics; preserve both outcomes in audit. | FEAT-030, FEAT-054–FEAT-056 | S0 |
| EDGE-123 | Administrator corrects Cancelled to Seated. | Recalculate all affected derived values and ensure current service remains coherent. | FEAT-019, FEAT-030, FEAT-054 | S0 |
| EDGE-124 | Administrator tries to correct after closure through a stale page. | Reject the mutation and refresh to read-only history. | FEAT-054, FEAT-056 | S0 |
| EDGE-125 | An internal note contains sensitive or inappropriate information. | The product limits visibility to authorized internal users; operational policy and safe limits should reduce misuse. | FEAT-053, NFR | S2 |
| EDGE-126 | A note is edited or removed during active service. | If editing is supported by final UX, preserve material audit according to policy; it must not affect state, time or capacity. | FEAT-053, FEAT-055 | S3 |
| EDGE-127 | A historical actor account no longer exists. | Retain a stable historical attribution label. | FEAT-055 | S1 |
| EDGE-128 | A service contains zero entries and is closed. | Create a valid zero-activity history record or follow an explicitly approved empty-service policy; never invent metrics. | FEAT-056 | S3 |
| EDGE-129 | Average wait has no valid seated or terminal population under the metric definition. | Show an honest unavailable/zero state according to documented definition, not a misleading value. | FEAT-056 | S2 |
| EDGE-130 | A service has one extremely long wait. | Maximum and average remain mathematically consistent and display without breaking the interface. | FEAT-056 | S2 |
| EDGE-131 | Message attempts exist for a service but provider outcomes arrive after closure. | Update only the permitted message-outcome reporting model without reopening lifecycle records; preserve audit integrity. | FEAT-040, FEAT-042, FEAT-056 | S1 |
| EDGE-132 | Two devices show Recently completed while Administrator corrects an outcome. | Both views and derived metrics update to the corrected truth. | FEAT-027, FEAT-054 | S1 |

### 3.12 Multi-device, network and temporal consistency

| Edge ID | Scenario | Expected product behavior | Related scope | Severity |
|---|---|---|---|---|
| EDGE-133 | One device loses connection before submitting an action. | Do not present success unless accepted; on reconnection show current state. | FEAT-027, NFR | S0 |
| EDGE-134 | One device loses connection after server acceptance but before local confirmation. | Reconciliation must reveal the accepted action and avoid duplicate reapplication. | FEAT-027, NFR | S0 |
| EDGE-135 | Two devices edit the same entry’s low-risk fields. | Resolve to one understandable current value and prevent stale overwrite of more recent accepted data. | FEAT-027, FEAT-045 | S1 |
| EDGE-136 | A browser tab is suspended for several minutes. | On resume, refresh current queue and timer truth before allowing a stale incompatible action. | FEAT-027, FEAT-034 | S1 |
| EDGE-137 | Device local time is wrong. | Service chronology and countdown derive from authoritative timestamps. | FEAT-028, FEAT-034, NFR | S0 |
| EDGE-138 | Daylight-saving or time-zone offset changes during a service. | Elapsed durations and deadlines remain continuous; history displays coherent local times. | FEAT-002, FEAT-028, FEAT-034, FEAT-056 | S1 |
| EDGE-139 | Staff opens multiple tabs with the same account. | All tabs receive current truth; duplicate action attempts remain safe. | FEAT-027 | S1 |
| EDGE-140 | A large update burst occurs when several groups are seated. | All devices converge on the correct list, capacity and position without missing entries. | FEAT-019, FEAT-027, FEAT-044 | S1 |
| EDGE-141 | Public and Staff connectivity recover at different times. | Each surface reconciles to the same authoritative state rather than assuming cached availability. | FEAT-014, FEAT-019, FEAT-027 | S1 |

### 3.13 Responsive, accessibility and localization

| Edge ID | Scenario | Expected product behavior | Related scope | Severity |
|---|---|---|---|---|
| EDGE-142 | A long restaurant name appears on a small phone. | Preserve critical join/status content and avoid covering primary actions. | FEAT-009, FEAT-059 | S3 |
| EDGE-143 | A Staff user increases browser text size. | Critical state, timers and actions remain usable without hidden content. | FEAT-058, NFR | S2 |
| EDGE-144 | A color-blind user views long-wait and failed-message states. | Text, icons or structure communicate the state independently of color. | FEAT-031, FEAT-040, NFR | S1 |
| EDGE-145 | A keyboard user operates the Staff dashboard. | Core actions are reachable and focus remains understandable according to the accessibility support level. | FEAT-058, NFR | S2 |
| EDGE-146 | A screen reader encounters a changing countdown. | Provide understandable current remaining time without overwhelming repeated announcements. | FEAT-034, NFR | S2 |
| EDGE-147 | The establishment language uses longer translated strings. | Responsive layout preserves meaning and actions without changing business logic. | FEAT-059, NFR | S2 |
| EDGE-148 | A right-to-left language is introduced later. | The content system should permit localization without changing queue semantics; full RTL support requires explicit release validation. | NFR | S3 |
| EDGE-149 | WhatsApp opens the private link in an in-app browser. | The mobile status journey remains usable. | FEAT-043, FEAT-059 | S1 |

---

## 4. Edge-case totals

This document defines **149 edge cases**.

The S0 cases concentrate on:

- duplicate or contradictory lifecycle transitions;
- silent capacity corruption;
- stale-device overwrite;
- private-link data exposure;
- unauthorized configuration;
- duplicated call timers or grace periods;
- post-closure mutation;
- false action success.

---

## 5. Handling rule

An edge case must not be “solved” by:

- adding an unapproved lifecycle state;
- asking Staff to maintain paper as the real source of truth;
- hiding the error;
- inventing successful message delivery;
- allowing silent over-capacity operation;
- weakening individual accountability;
- exposing personal data;
- moving a future feature into the MVP.

---

## 6. Test use

QA should link each relevant test to:

- `EDGE` ID;
- affected `FEAT` and `US`;
- applicable `BR`;
- applicable `AC`;
- applicable `NFR`.

At minimum, every S0 and S1 case requires explicit pre-pilot verification.
