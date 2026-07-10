# MesaFlow — Business Rules

**Document ID:** PROD-BR-001  
**Product:** MesaFlow  
**Release:** MVP / Pilot Release  
**Status:** Approved business-rule specification  
**Owner:** Product Management  
**Version:** 1.0  
**Last updated:** 2026-07-10

---

## 1. Purpose

This document defines the authoritative behavioral rules of the MesaFlow MVP.

A business rule describes a truth that must remain consistent across interfaces, devices, services and implementation choices. Rules are independent of technical architecture.

When a feature, story, design or implementation appears to conflict with a rule:

1. check the approved CEO strategy;
2. check `PRODUCT_PHILOSOPHY.md`;
3. check `PRD.md` and `PRODUCT_DECISIONS.md`;
4. resolve the conflict explicitly;
5. do not silently weaken the rule.

---

## 2. Rule conventions

- **Must** means required behavior.
- **Must not** means prohibited behavior.
- **May** means behavior is allowed but not required.
- “Active entry” means `Waiting` or `Called`.
- “Terminal outcome” means `Seated`, `Cancelled` or `No-show`.
- “Staff” includes a Staff-role user and an Administrator performing operational work.
- Rule IDs are immutable. If a rule is replaced, mark it superseded rather than renumbering later rules.

---

## 3. Rule catalogue


### 3.1 Product governance and scope

| Rule ID | Rule | Related scope | Rationale |
|---|---|---|---|
| BR-001 | MesaFlow MVP serves one restaurant operating context and exposes one establishment in the product interface. | FEAT-001–FEAT-005 | Prevents premature multi-location complexity. |
| BR-002 | MesaFlow MVP supports one active queue per establishment. | FEAT-020 | Preserves one operational source of truth. |
| BR-003 | MesaFlow MVP supports at most one active service at a time for the establishment. | FEAT-020–FEAT-022 | Avoids overlapping service state. |
| BR-004 | The only internal roles in the MVP are Administrator and Staff. | FEAT-001, FEAT-004–FEAT-005 | Keeps permissions understandable. |
| BR-005 | The first valid internal account for a new restaurant context becomes Administrator. | FEAT-001 | Establishes an accountable owner. |
| BR-006 | Staff access must use individual accounts rather than a shared operational identity. | FEAT-004, FEAT-055 | Preserves attribution. |
| BR-007 | Administrator may perform all approved operational actions available to Staff. | FEAT-005 | Avoids an artificial operational limitation. |
| BR-008 | Only Administrator may change structural restaurant and queue configuration. | FEAT-003, FEAT-005 | Protects service stability. |
| BR-009 | Staff may operate services and entries but may not change structural rules. | FEAT-005 | Separates setup from live operation. |
| BR-010 | A removed or disabled Staff account must not erase its historical action attribution. | FEAT-004, FEAT-055 | Protects audit integrity. |
| BR-011 | No custom roles or permission builder exists in the MVP. | FEAT-005 | Prevents permission scope expansion. |
| BR-012 | No customer account is required or created for queue participation. | FEAT-009–FEAT-010, FEAT-043 | Protects the no-app, low-friction experience. |
| BR-013 | The customer journey must remain browser-based and must not require native application installation. | FEAT-059 | Supports immediate use. |
| BR-014 | Product behavior must not require a table map, numbered table or automatic table assignment. | FEAT-033, OUT_OF_SCOPE | Fits target restaurant reality. |
| BR-015 | An out-of-scope feature must not be introduced through an advanced setting, hidden flag or implementation shortcut. | MVP_SCOPE, OUT_OF_SCOPE | Prevents silent scope creep. |

### 3.2 Establishment profile and configuration

| Rule ID | Rule | Related scope | Rationale |
|---|---|---|---|
| BR-016 | Required establishment data is restaurant name, address, operational phone, primary language and time zone. | FEAT-002 | Provides minimum operating context. |
| BR-017 | Logo, website, social links and short description are optional. | FEAT-002 | Avoids blocking activation. |
| BR-018 | The establishment name is the default restaurant identity shown on public screens and messages. | FEAT-002, FEAT-039 | Maintains consistent identity. |
| BR-019 | Guided setup must present recommended values before requiring customization. | FEAT-003 | Reduces activation friction. |
| BR-020 | Guided setup may collect only approved MVP queue settings. | FEAT-003 | Prevents configuration sprawl. |
| BR-021 | Call duration must be one of 3, 5 or 10 minutes. | FEAT-003, FEAT-034 | Creates constrained operational behavior. |
| BR-022 | The recommended call-duration default is 5 minutes unless updated by an approved product decision. | FEAT-003, PD-044 | Provides a practical starting point. |
| BR-023 | Long-wait threshold must be one of 20, 30, 45 or 60 minutes. | FEAT-003, FEAT-031 | Balances adaptation and simplicity. |
| BR-024 | The recommended long-wait default is 30 minutes unless updated by an approved product decision. | FEAT-003, PD-032 | Provides a practical starting point. |
| BR-025 | The default two-slot cutoff is 7 or more people. | FEAT-017 | Implements approved weighted capacity. |
| BR-026 | The Administrator may configure the two-slot cutoff for the establishment. | FEAT-017 | Adapts to restaurant reality. |
| BR-027 | The default party-size increase requiring approval is +2 people. | FEAT-003, FEAT-046 | Allows +1 with low friction. |
| BR-028 | The Administrator may configure the increase threshold requiring Staff approval. | FEAT-003, FEAT-046 | Adapts operational risk. |
| BR-029 | The Administrator must configure a maximum active weighted-slot limit. | FEAT-018 | Controls waiting load. |
| BR-030 | The Administrator must configure the maximum party size accepted through QR self-entry. | FEAT-013 | Routes oversized groups to human review. |
| BR-031 | A short instruction explaining where a called customer should report must be configured before operational activation. | FEAT-003, FEAT-039 | Makes calls actionable without table numbers. |
| BR-032 | A configuration change applies prospectively to current calculations unless a specific rule states otherwise. | FEAT-017–FEAT-019 | Keeps current truth consistent. |
| BR-033 | Reducing maximum capacity below current usage must not remove or cancel existing active entries. | FEAT-018–FEAT-019 | Protects accepted customers. |
| BR-034 | When configured capacity is below current usage, new entry remains blocked until usage falls within the limit. | FEAT-018–FEAT-019 | Prevents further overload. |

### 3.3 QR and public access

| Rule ID | Rule | Related scope | Rationale |
|---|---|---|---|
| BR-035 | Each establishment has one current permanent public QR entry point. | FEAT-006 | Supports print-once deployment. |
| BR-036 | The permanent QR remains valid across service openings and closures until regeneration. | FEAT-006 | Avoids repeated printing. |
| BR-037 | The public QR must resolve to the establishment’s current queue state rather than a stale service-specific state. | FEAT-006, FEAT-009 | Prevents invalid joining. |
| BR-038 | Only Administrator may regenerate the public QR. | FEAT-008 | Protects public access control. |
| BR-039 | QR regeneration must require an explicit warning and confirmation. | FEAT-008 | Prevents accidental invalidation. |
| BR-040 | After QR regeneration, the old public QR must not accept new entries. | FEAT-008 | Makes regeneration meaningful. |
| BR-041 | QR regeneration must not cancel accepted entries or invalidate their private status links. | FEAT-008, FEAT-043 | Separates public intake from private entry access. |
| BR-042 | QR regeneration must be recorded as a material audited action. | FEAT-008, FEAT-055 | Supports diagnosis and accountability. |
| BR-043 | The public welcome screen must identify the restaurant before the join form. | FEAT-009 | Builds trust. |
| BR-044 | The public screen must distinguish: no active service, intake closed, queue full and intake available. | FEAT-009, FEAT-014 | Explains current availability truthfully. |
| BR-045 | The public screen must not display a predicted waiting time in the MVP. | FEAT-009, FEAT-044 | Avoids false precision. |
| BR-046 | Opening a public form does not reserve capacity. | FEAT-014 | Prevents ghost reservations. |
| BR-047 | Eligibility must be revalidated when the customer submits the form. | FEAT-010, FEAT-014 | Handles changing live state. |

### 3.4 Service lifecycle

| Rule ID | Rule | Related scope | Rationale |
|---|---|---|---|
| BR-048 | A service must be explicitly opened by an authorized internal user. | FEAT-020 | Creates a clear operational boundary. |
| BR-049 | A service is the unit used for current operation and closed-service history. | FEAT-020, FEAT-056 | Creates meaningful records. |
| BR-050 | Opening a service enables public intake unless Staff closes new entries. | FEAT-020–FEAT-021 | Defines normal start behavior. |
| BR-051 | Opening a service must not create a queue entry or send a customer message. | FEAT-020 | Prevents unintended side effects. |
| BR-052 | Staff may close new entries while retaining all active entries. | FEAT-021 | Stops intake safely. |
| BR-053 | Staff may reopen new entries during the same active service. | FEAT-021 | Supports changing restaurant conditions. |
| BR-054 | Closing new entries must not change Waiting or Called state. | FEAT-021 | Protects current customers. |
| BR-055 | A service may cross midnight and remains one service until explicitly closed. | FEAT-020, FEAT-056 | Preserves operational meaning. |
| BR-056 | A service cannot close while any entry is Waiting or Called. | FEAT-022 | Prevents orphaned entries. |
| BR-057 | The product must identify unresolved active entries when closure is blocked. | FEAT-022 | Makes required action clear. |
| BR-058 | Service closure freezes the service for normal editing. | FEAT-022, FEAT-054, FEAT-056 | Protects history. |
| BR-059 | Service closure generates the approved basic service-history view. | FEAT-022, FEAT-056 | Completes the operational cycle. |
| BR-060 | After closure, a customer private page may show the final safe outcome but may not permit active-entry editing. | FEAT-043, FEAT-056 | Maintains safe customer access. |

### 3.5 Queue entry

| Rule ID | Rule | Related scope | Rationale |
|---|---|---|---|
| BR-061 | QR entry requires name, phone number and party size. | FEAT-010 | Collects minimum contact and seating data. |
| BR-062 | Manual entry requires name and party size. | FEAT-015 | Keeps assisted entry fast. |
| BR-063 | Phone is optional for manual entry. | FEAT-015–FEAT-016 | Includes offline or unwilling customers. |
| BR-064 | Optional customer fields are interior/terrace preference, baby chair, accessibility need and customer note. | FEAT-011 | Captures useful seating context. |
| BR-065 | Absence of an optional field must not block entry acceptance. | FEAT-011 | Protects form simplicity. |
| BR-066 | Optional preferences are advisory and do not guarantee accommodation. | FEAT-011 | Prevents false promises. |
| BR-067 | A phone number may have only one active entry in the same establishment queue. | FEAT-012 | Prevents duplicate capacity and position. |
| BR-068 | The duplicate rule applies to Waiting and Called entries. | FEAT-012 | Defines active scope. |
| BR-069 | A terminal historical entry must not permanently block future participation. | FEAT-012 | Allows later visits and services. |
| BR-070 | Concurrent duplicate submissions must not both create active entries. | FEAT-012, FEAT-027 | Protects uniqueness under race conditions. |
| BR-071 | A QR party above the configured maximum must be directed to speak with Staff. | FEAT-013 | Routes exceptional parties to human review. |
| BR-072 | Exceeding the QR maximum is not an absolute restaurant rejection. | FEAT-013, FEAT-015 | Preserves Staff discretion. |
| BR-073 | Staff may create an oversized group manually after operational assessment. | FEAT-013, FEAT-015 | Supports exceptional accommodation. |
| BR-074 | Every accepted entry receives an accepted-entry time. | FEAT-010, FEAT-015, FEAT-028 | Anchors order and wait. |
| BR-075 | Every accepted entry initially enters Waiting unless an approved direct operational transition is performed by Staff. | FEAT-010, FEAT-015, FEAT-049 | Defines initial lifecycle. |
| BR-076 | Manual and QR entries participate in the same canonical queue order and fairness rules. | FEAT-015, FEAT-028–FEAT-032 | Prevents digital discrimination. |
| BR-077 | An entry without phone must show No contact to Staff. | FEAT-016 | Makes manual calling responsibility visible. |
| BR-078 | No automated WhatsApp message may be attempted for an entry without a valid phone. | FEAT-016, FEAT-038 | Avoids false delivery assumptions. |
| BR-079 | Adding a valid phone to an active no-contact entry enables future eligible messages but does not retroactively resend past events automatically. | FEAT-016, FEAT-038 | Avoids unexpected duplicate communication. |

### 3.6 Capacity and party size

| Rule ID | Rule | Related scope | Rationale |
|---|---|---|---|
| BR-080 | Queue capacity is measured in weighted slots. | FEAT-017–FEAT-019 | Reflects group-size burden. |
| BR-081 | The MVP supports only one-slot and two-slot weights. | FEAT-017 | Keeps configuration simple. |
| BR-082 | Parties below the configured two-slot cutoff consume one slot. | FEAT-017 | Defines weighting. |
| BR-083 | Parties at or above the configured two-slot cutoff consume two slots. | FEAT-017 | Defines weighting. |
| BR-084 | Weight affects intake capacity but does not automatically determine queue priority. | FEAT-017, FEAT-024 | Separates load from fairness. |
| BR-085 | Waiting entries consume weighted capacity. | FEAT-018 | They remain active demand. |
| BR-086 | Called entries consume weighted capacity. | FEAT-018 | The table has not yet been occupied. |
| BR-087 | Seated entries do not consume waiting capacity. | FEAT-018, FEAT-049 | They have left the waiting queue. |
| BR-088 | Cancelled entries do not consume waiting capacity. | FEAT-018, FEAT-050 | They have left the queue. |
| BR-089 | No-show entries do not consume waiting capacity. | FEAT-018, FEAT-051 | They have left the active queue. |
| BR-090 | Only the currently approved party size affects capacity. | FEAT-019, FEAT-046 | Pending requests must not alter truth. |
| BR-091 | Capacity recalculates after entry acceptance. | FEAT-019 | Updates availability. |
| BR-092 | Capacity recalculates after an approved party-size change. | FEAT-019, FEAT-046 | Updates weight. |
| BR-093 | Capacity recalculates after Seated, Cancelled or No-show. | FEAT-019, FEAT-049–FEAT-051 | Frees active load. |
| BR-094 | Capacity recalculates after No-show reactivation. | FEAT-019, FEAT-052 | Restores active load. |
| BR-095 | Public and Staff views must derive availability from the same current capacity truth. | FEAT-014, FEAT-019, FEAT-027 | Prevents contradictory acceptance. |
| BR-096 | When simultaneous submissions compete for remaining capacity, only submissions fitting committed capacity may succeed. | FEAT-014, FEAT-019, FEAT-027 | Prevents silent overbooking. |
| BR-097 | A party-size reduction requested by the customer applies automatically. | FEAT-046 | Reduces friction and load. |
| BR-098 | An increase below the configured approval threshold applies automatically. | FEAT-046 | Allows low-risk change. |
| BR-099 | An increase at or above the threshold remains pending until Staff approves or rejects it. | FEAT-046 | Protects seating reality. |
| BR-100 | A pending party-size request must not change capacity, large-group label or current party size. | FEAT-046 | Preserves approved truth. |
| BR-101 | Approval of a party-size change recalculates capacity and relevant labels immediately. | FEAT-019, FEAT-029, FEAT-046 | Keeps operation current. |
| BR-102 | A party-size change above the QR maximum may still be decided by Staff because that maximum governs self-entry, not absolute eligibility. | FEAT-013, FEAT-046 | Preserves human control. |

### 3.7 Ordering and fairness

| Rule ID | Rule | Related scope | Rationale |
|---|---|---|---|
| BR-103 | Canonical Waiting order is chronological by accepted-entry time. | FEAT-023 | Provides a fair baseline. |
| BR-104 | Staff may filter the Waiting view by party size. | FEAT-026 | Supports table compatibility. |
| BR-105 | Filtering must not change canonical order. | FEAT-026 | Preserves truth. |
| BR-106 | Filtering must not alter customer groups-ahead calculations. | FEAT-026, FEAT-044 | Prevents view-dependent position. |
| BR-107 | Staff may call or seat any operationally suitable group. | FEAT-023, FEAT-032–FEAT-033 | Preserves restaurant judgement. |
| BR-108 | Staff cannot permanently drag or reorder the canonical queue in the MVP. | FEAT-023, FEAT-026 | Protects position meaning. |
| BR-109 | Every Waiting entry must display elapsed wait and accepted-entry time to Staff. | FEAT-028 | Prevents silent neglect. |
| BR-110 | A group meeting the configured large-group cutoff must show a visible large-group label. | FEAT-029 | Highlights difficult groups. |
| BR-111 | The large-group label is informational and does not force priority. | FEAT-029 | Preserves human judgement. |
| BR-112 | A pass-over occurs when a later-accepted group becomes Seated while an earlier entry remains active. | FEAT-030 | Defines meaningful bypass. |
| BR-113 | A later group becoming Cancelled or No-show does not create a pass-over. | FEAT-030 | Only successful seating represents priority. |
| BR-114 | Pass-over count must be recalculated when a qualifying outcome is corrected. | FEAT-030, FEAT-054 | Preserves historical truth. |
| BR-115 | An entry becomes long-wait protected when its elapsed Waiting time reaches the configured threshold. | FEAT-031 | Defines warning trigger. |
| BR-116 | Long-wait protection applies while the entry remains Waiting. | FEAT-031 | Limits the warning to the relevant state. |
| BR-117 | Long-wait protection must be visually understandable without relying only on color. | FEAT-031, NFR | Supports accessibility. |
| BR-118 | Long-wait protection does not prevent Staff from acting. | FEAT-031 | Avoids rigid automation. |
| BR-119 | When Staff seats a later group while bypassing a protected earlier group, a quick reason is required. | FEAT-032 | Creates accountability. |
| BR-120 | Approved protected-bypass reasons are table incompatibility, zone preference, accessibility, operational decision and Other. | FEAT-032 | Structures learning while preserving exceptions. |
| BR-121 | A protected-bypass reason must retain actor and time. | FEAT-032, FEAT-055 | Supports audit. |
| BR-122 | After a valid reason is supplied, the product must allow the seating decision. | FEAT-032 | Preserves Staff control. |
| BR-123 | The customer sees active groups ahead, not a guaranteed absolute place or predicted time. | FEAT-044 | Communicates useful relative position. |
| BR-124 | Customer-facing copy must explain that order may vary with party size and available tables. | FEAT-044 | Sets honest expectations. |
| BR-125 | A group’s incomplete attendance must not automatically block calling or seating. | PRD, PD-023 | Supports real group behavior. |

### 3.8 Calling, countdown and messaging

| Rule ID | Rule | Related scope | Rationale |
|---|---|---|---|
| BR-126 | Calling a Waiting entry changes it to Called. | FEAT-033 | Starts the return workflow. |
| BR-127 | A valid call creates exactly one active countdown for the entry. | FEAT-033–FEAT-034 | Prevents duplicated deadlines. |
| BR-128 | Multiple entries may be Called simultaneously. | FEAT-024, FEAT-034 | Supports multiple table opportunities. |
| BR-129 | Each Called entry has an independent deadline. | FEAT-034 | Prevents shared timer errors. |
| BR-130 | Remaining time must be consistent on Staff and customer views. | FEAT-034, FEAT-043 | Creates one deadline truth. |
| BR-131 | Closing or reopening a page must not reset the deadline. | FEAT-034, FEAT-043 | Preserves timer integrity. |
| BR-132 | Message-delivery delay or customer acknowledgement does not pause the countdown. | FEAT-034, FEAT-040, FEAT-048 | Keeps predictable operation. |
| BR-133 | The final-call event occurs one minute before the original call deadline. | FEAT-035 | Provides a predictable last warning. |
| BR-134 | The final-call event occurs at most once per call cycle. | FEAT-035–FEAT-036 | Prevents repeated extension. |
| BR-135 | The final-call event adds exactly two minutes to the deadline. | FEAT-036 | Creates the approved grace period. |
| BR-136 | The two-minute grace period applies even if the final message fails. | FEAT-035–FEAT-036 | Separates time policy from provider outcome. |
| BR-137 | Retrying a message must not add another grace period. | FEAT-036, FEAT-041 | Prevents timer inflation. |
| BR-138 | Staff may add further time manually to an active Called entry. | FEAT-037 | Supports real exceptions. |
| BR-139 | A manual extension must update the deadline across all active views. | FEAT-027, FEAT-037 | Preserves one timer truth. |
| BR-140 | A manual extension must be audited. | FEAT-037, FEAT-055 | Supports accountability. |
| BR-141 | A manual extension must not restart or reschedule the automatic final call. | FEAT-035–FEAT-037 | Prevents duplicate automation. |
| BR-142 | Timer expiry alone must not automatically mark No-show. | FEAT-034, FEAT-051 | Retains human judgement. |
| BR-143 | WhatsApp is the primary automated operational channel in the MVP. | FEAT-038 | Implements the core value proposition. |
| BR-144 | The approved message purposes are entry confirmation where commercially enabled, table-ready call, final call and cancellation/removal. | FEAT-038 | Defines operational scope. |
| BR-145 | The queue must remain operable when WhatsApp is unavailable. | FEAT-038, FEAT-040 | Avoids provider dependency. |
| BR-146 | No automatic paid SMS or voice fallback exists in the MVP. | FEAT-038, OUT_OF_SCOPE | Controls cost and scope. |
| BR-147 | Message templates must preserve required operational meaning. | FEAT-039 | Prevents unclear communication. |
| BR-148 | Editable template fields may include restaurant identity, greeting and where to report. | FEAT-039 | Allows controlled personalization. |
| BR-149 | The MVP must not provide a free-form campaign or automation builder. | FEAT-039 | Prevents marketing scope. |
| BR-150 | Staff must see only communication states truthfully supported by the provider or product. | FEAT-040 | Avoids invented certainty. |
| BR-151 | No-contact, not attempted, attempted, sent/delivered where supported and failed must be distinguishable. | FEAT-016, FEAT-040 | Supports correct recovery. |
| BR-152 | A messaging failure must not change the queue lifecycle state. | FEAT-040 | Separates communication from operation. |
| BR-153 | A messaging failure must not invalidate or remove the entry. | FEAT-040 | Protects customer position. |
| BR-154 | The Called countdown continues after a messaging failure unless Staff changes the deadline. | FEAT-034, FEAT-040 | Maintains approved timing. |
| BR-155 | Staff may retry an eligible failed message. | FEAT-041 | Supports recovery. |
| BR-156 | A retry is a new message attempt for consumption measurement. | FEAT-041–FEAT-042 | Supports cost truth. |
| BR-157 | A retry must not duplicate call state, countdown, final-call event or grace period. | FEAT-041 | Protects idempotent behavior. |
| BR-158 | Message attempts and outcomes must be measurable by service and establishment. | FEAT-042 | Supports pricing validation. |
| BR-159 | Consumption measurement must not itself define billing, overages or plan packaging. | FEAT-042 | Keeps commercial decisions open. |

### 3.9 Customer status and self-service

| Rule ID | Rule | Related scope | Rationale |
|---|---|---|---|
| BR-160 | Every accepted customer entry receives an unguessable entry-specific private status link. | FEAT-043 | Enables account-free return. |
| BR-161 | The private status URL must not contain the phone number. | FEAT-043 | Protects personal data. |
| BR-162 | A private link may be reopened while the entry remains active. | FEAT-043 | Allows page closing. |
| BR-163 | After terminal outcome or service closure, the private link may show a safe final state. | FEAT-043 | Maintains closure clarity. |
| BR-164 | A private status page must not expose other queue entries or customer data. | FEAT-043, NFR | Protects privacy. |
| BR-165 | While Waiting, the customer may see groups ahead and elapsed wait. | FEAT-043–FEAT-044 | Reduces uncertainty. |
| BR-166 | While Called, the customer may see current call state and remaining time. | FEAT-034, FEAT-043 | Guides return. |
| BR-167 | Customer may edit name directly while the entry is active. | FEAT-045 | Allows harmless correction. |
| BR-168 | Customer may edit approved optional preferences directly while the entry is active. | FEAT-045 | Keeps needs current. |
| BR-169 | Customer may not edit internal notes, lifecycle outcome or audit information. | FEAT-045 | Protects operational control. |
| BR-170 | Customer phone-number changes require Staff intervention. | FEAT-045 | Protects contact identity. |
| BR-171 | Customer may request a party-size change under the approved threshold rules. | FEAT-046 | Supports changing attendance. |
| BR-172 | Leaving the queue requires an explicit confirmation step. | FEAT-047 | Prevents accidental removal. |
| BR-173 | A confirmed customer exit produces Cancelled by customer. | FEAT-047, FEAT-050 | Preserves outcome meaning. |
| BR-174 | An unconfirmed leave action must not alter the entry. | FEAT-047 | Protects from accidental taps. |
| BR-175 | “I’m on my way” is available only while the entry is Called. | FEAT-048 | Matches the intended purpose. |
| BR-176 | “I’m on my way” must create a visible acknowledgement for Staff. | FEAT-048 | Provides useful information. |
| BR-177 | “I’m on my way” must not pause, reset or extend the countdown. | FEAT-048 | Prevents customer-controlled timing. |
| BR-178 | Repeated “I’m on my way” actions must not create repeated operational effects. | FEAT-048 | Protects idempotency. |

### 3.10 Outcomes, corrections and history

| Rule ID | Rule | Related scope | Rationale |
|---|---|---|---|
| BR-179 | Staff may mark a Waiting or Called entry as Seated. | FEAT-049 | Supports direct and called seating. |
| BR-180 | Seated is a terminal outcome for the active queue. | FEAT-049 | Ends waiting demand. |
| BR-181 | Marking Seated frees weighted capacity and recalculates queue-derived values. | FEAT-019, FEAT-030, FEAT-044, FEAT-049 | Keeps current truth. |
| BR-182 | Cancellation must distinguish Cancelled by customer and Cancelled by restaurant. | FEAT-050 | Preserves analytical meaning. |
| BR-183 | No-show is a distinct terminal outcome rather than a cancellation subtype. | FEAT-051 | Preserves operational meaning. |
| BR-184 | Staff must explicitly mark No-show. | FEAT-051 | Retains human judgement. |
| BR-185 | Cancelled and No-show free weighted capacity. | FEAT-019, FEAT-050–FEAT-051 | Ends active load. |
| BR-186 | A current-service No-show may be reactivated by Staff. | FEAT-052 | Allows fair correction. |
| BR-187 | Reactivation returns the entry to Waiting at the end of the current queue. | FEAT-052 | Avoids restoring unfair priority. |
| BR-188 | Reactivation consumes current weighted capacity. | FEAT-019, FEAT-052 | Restores active load. |
| BR-189 | The prior No-show and the reactivation must remain in audit history. | FEAT-052, FEAT-055 | Preserves event truth. |
| BR-190 | Internal notes are visible only to authorized internal users. | FEAT-053 | Supports private context. |
| BR-191 | Internal notes do not create a new lifecycle state. | FEAT-053 | Avoids state proliferation. |
| BR-192 | Internal notes do not pause time, change position or alter capacity. | FEAT-053 | Separates context from rules. |
| BR-193 | Only Administrator may correct a terminal outcome during the active service. | FEAT-005, FEAT-054 | Protects high-impact correction. |
| BR-194 | A correction must preserve previous and new values, actor and time. | FEAT-054–FEAT-055 | Supports audit. |
| BR-195 | A correction must recalculate affected capacity, position, pass-over and metrics. | FEAT-019, FEAT-030, FEAT-044, FEAT-054 | Restores derived truth. |
| BR-196 | No terminal-outcome correction is permitted after service closure through normal product behavior. | FEAT-022, FEAT-054 | Protects closed history. |
| BR-197 | Material actions must retain actor, timestamp, action and relevant before/after context. | FEAT-055 | Creates trustworthy operations. |
| BR-198 | Material actions include configuration changes, service controls, calls, extensions, outcomes, corrections, bypass reasons and QR regeneration. | FEAT-055 | Defines audit scope. |
| BR-199 | Closed-service history must include service date/time, received, seated, cancellations, no-shows, average wait, maximum wait, pass-overs, messages sent and messages failed. | FEAT-056 | Supports pilot evaluation. |
| BR-200 | Closed-service history is read-only. | FEAT-056 | Preserves integrity. |
| BR-201 | History must use consistent documented metric definitions. | FEAT-056 | Supports meaningful comparison. |
| BR-202 | The MVP history must remain a basic operational summary and not become an advanced BI suite. | FEAT-056 | Protects scope. |

### 3.11 Brand, device and trust

| Rule ID | Rule | Related scope | Rationale |
|---|---|---|---|
| BR-203 | Customer-facing welcome and status pages must show discreet MesaFlow branding. | FEAT-057 | Supports organic awareness. |
| BR-204 | Restaurant identity must remain visually primary over MesaFlow branding. | FEAT-057 | Respects restaurant ownership of the experience. |
| BR-205 | Brand removal is not available in the initial plan. | FEAT-057 | Preserves approved commercial boundary. |
| BR-206 | All primary Staff actions must be usable on common tablet and desktop dimensions. | FEAT-058 | Fits restaurant devices. |
| BR-207 | Staff operation must not assume a mouse-only interaction model. | FEAT-058 | Supports touch devices. |
| BR-208 | Public and private customer flows must be mobile-first. | FEAT-059 | Matches QR and WhatsApp behavior. |
| BR-209 | Customer form and status must remain usable when opened from a WhatsApp link. | FEAT-059 | Supports the core return path. |
| BR-210 | Status, warning and outcome meaning must not depend only on color. | FEAT-028–FEAT-031, FEAT-040, FEAT-058–FEAT-059 | Supports accessibility and busy environments. |
| BR-211 | The product must expose failure rather than silently pretending success. | PRODUCT_PHILOSOPHY, FEAT-027, FEAT-040 | Protects trust. |
| BR-212 | The restaurant must not need a parallel paper list to compensate for missing or unreliable product truth. | MVP_SCOPE, US-060 | Defines operational completeness. |

---

## 4. Rule totals and coverage

This specification defines **212 business rules**.

Coverage includes:

- product scope and roles;
- establishment configuration;
- permanent QR and public access;
- service lifecycle;
- queue entry;
- weighted capacity;
- chronological order and fairness;
- call timing and messaging;
- customer status and self-service;
- terminal outcomes and correction;
- audit and history;
- device, brand and trust expectations.

---

## 5. Rule precedence and change control

A rule may be changed only when:

- new evidence is documented;
- the affected feature, story, journey and acceptance criteria are identified;
- capacity, fairness, timing, privacy and historical effects are assessed;
- `PRODUCT_DECISIONS.md` is updated;
- the rule is marked superseded or revised without recycling its ID.

Engineering implementation detail must not redefine a rule.

---

## 6. Business-rule review checklist

Before accepting a product change, confirm:

1. Does it add a lifecycle state?
2. Does it change who consumes capacity?
3. Does it change chronological or customer-facing position?
4. Does it create an automatic action where Staff previously decided?
5. Does it add a paid message or new channel?
6. Does it change a role or permission?
7. Does it weaken audit or closed-history integrity?
8. Does it create a second queue, service or establishment context?
9. Does it require a table map?
10. Does it introduce an out-of-scope product category?

Any “yes” requires explicit Product Management review.
