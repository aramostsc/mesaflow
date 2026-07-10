# MesaFlow — Non-Functional Requirements

**Document ID:** PROD-NFR-001  
**Product:** MesaFlow  
**Release:** MVP / Pilot Release  
**Status:** Approved product-quality specification  
**Owner:** Product Management  
**Version:** 1.0  
**Last updated:** 2026-07-10

---

## 1. Purpose

This document defines the quality attributes required for MesaFlow to function as a trusted live restaurant waiting list.

These requirements specify observable product outcomes. They do not prescribe:

- programming language;
- framework;
- database;
- hosting provider;
- synchronization technology;
- messaging provider;
- infrastructure architecture.

Where this document includes a target, Engineering may choose the implementation that satisfies it.

---

## 2. Interpretation

- **P0** requirements are release gates for live pilot unless Product Management explicitly accepts a controlled exception.
- **P1** requirements should be completed for production hardening and may enter the pilot when needed by observed users.
- “Normal pilot load” must be formalized by Engineering and Product before performance testing using the expected maximum active entries, Staff devices and message volume.
- Availability and performance measurements must exclude the user’s own failed connectivity while still handling that failure honestly.

---

## 3. Requirements


### 3.1 Usability and learnability

| NFR ID | Requirement | Verification | Priority |
|---|---|---|---|
| NFR-001 | A first-time Administrator must be able to complete the approved onboarding without technical training or external documentation. | Moderated onboarding test with a representative owner or manager. | P0 |
| NFR-002 | A trained Staff user must be able to add a normal manual group using only the minimum required data in a short, interruption-tolerant flow. | Observed timed task during realistic service rehearsal. | P0 |
| NFR-003 | A Staff user must be able to call, seat, cancel or mark no-show without navigating away from the operational context unnecessarily. | Task-flow review and usability test. | P0 |
| NFR-004 | Frequent operational actions must prioritize recognition over recall; current state and available actions must be visible. | UX review against live dashboard flows. | P0 |
| NFR-005 | Destructive or hard-to-reverse actions must use confirmation when accidental activation is plausible. | Interaction review for leave queue, QR regeneration and service closure. | P0 |
| NFR-006 | Error messages must identify what happened, what remains true and what the user can do next. | Content review and failure-path testing. | P0 |
| NFR-007 | The product must not require Staff to understand technical concepts such as synchronization, provider callbacks or data models. | Usability and copy review. | P0 |
| NFR-008 | Optional fields and advanced context must not obstruct the primary queue action. | Form and dashboard review. | P1 |

### 3.2 Performance and responsiveness

| NFR ID | Requirement | Verification | Priority |
|---|---|---|---|
| NFR-009 | Under normal pilot load, common Staff actions must provide visible acknowledgement within 1 second of interaction. | Measured client-visible response during performance test. | P0 |
| NFR-010 | Under normal pilot load and healthy connectivity, accepted queue changes should appear on other active Staff devices within 2 seconds. | Two-device propagation test. | P0 |
| NFR-011 | The public welcome and entry flow should become usable within 3 seconds on a typical contemporary mobile connection. | Mobile performance test under representative network profile. | P0 |
| NFR-012 | The customer private status page should become usable within 3 seconds on a typical contemporary mobile connection. | Mobile performance test. | P0 |
| NFR-013 | Queue views must remain operable without full-page refresh after normal actions. | Functional and performance test. | P0 |
| NFR-014 | Countdown displays must not visibly drift between active Staff and customer views beyond a tolerance that changes the perceived remaining minute. | Multi-client timer comparison. | P0 |
| NFR-015 | Performance must remain coherent at the maximum queue size supported during pilot and with multiple simultaneous Staff devices. | Load test using pilot capacity assumptions. | P0 |

### 3.3 Availability, resilience and recovery

| NFR ID | Requirement | Verification | Priority |
|---|---|---|---|
| NFR-016 | The monthly service-availability target for the pilot product is at least 99.5%, excluding announced maintenance windows. | Operational availability reporting. | P0 |
| NFR-017 | A WhatsApp provider outage must not prevent Staff from adding, viewing, calling operationally or resolving queue entries. | Provider-failure simulation. | P0 |
| NFR-018 | A delayed delivery-status update must not block Staff actions. | Delayed-provider-event test. | P0 |
| NFR-019 | Temporary client disconnection must not silently overwrite newer server truth after reconnection. | Offline/reconnection conflict test. | P0 |
| NFR-020 | A failed action must not be presented as successful. | Fault-injection and UI-state verification. | P0 |
| NFR-021 | Retryable actions must clearly remain retryable without duplicating their business effect. | Failure and retry test. | P0 |
| NFR-022 | An interrupted page session must be recoverable by reloading or reopening the valid route without losing accepted queue state. | Browser interruption test. | P0 |
| NFR-023 | Operational incidents must preserve enough information to determine affected service, entry, action and time. | Incident reconstruction exercise. | P0 |

### 3.4 Data integrity and consistency

| NFR ID | Requirement | Verification | Priority |
|---|---|---|---|
| NFR-024 | Every queue entry must have exactly one current primary lifecycle state. | State-invariant automated and exploratory tests. | P0 |
| NFR-025 | Only approved current party size may affect weighted capacity. | Capacity invariant test. | P0 |
| NFR-026 | Capacity shown or enforced by public and Staff flows must derive from the same current truth. | Cross-surface consistency test. | P0 |
| NFR-027 | A business action that is accepted once must not be applied twice because of retry, double tap or concurrent request. | Idempotency and concurrency test. | P0 |
| NFR-028 | Timer deadlines, automatic grace application and manual extensions must produce one authoritative current deadline. | Timer invariant test. | P0 |
| NFR-029 | A message retry must not duplicate lifecycle transition or grace period. | Messaging idempotency test. | P0 |
| NFR-030 | A correction must update all affected derived metrics consistently. | Correction-recalculation test. | P0 |
| NFR-031 | Closed-service metrics must be reproducible from the retained service record and documented metric definitions. | Metric reconciliation test. | P0 |
| NFR-032 | No active entry may be silently omitted from all active Staff sections. | Queue completeness test. | P0 |

### 3.5 Security, authorization and privacy

| NFR ID | Requirement | Verification | Priority |
|---|---|---|---|
| NFR-033 | Administrator-only actions must be enforced regardless of whether a control is hidden in the interface. | Authorization test using direct requests and alternate clients. | P0 |
| NFR-034 | Staff must not be able to change structural settings through any supported route. | Role-enforcement test. | P0 |
| NFR-035 | A private customer status link must be computationally impractical to guess. | Security review of link entropy and access behavior. | P0 |
| NFR-036 | A private status URL must not include phone number, customer name or other direct personal identifier. | URL and log review. | P0 |
| NFR-037 | A customer status link must expose only the linked entry’s approved customer-visible information. | Cross-entry authorization test. | P0 |
| NFR-038 | Internal notes, audit details and other customers’ data must never appear on a customer page. | Privacy boundary test. | P0 |
| NFR-039 | Authentication sessions for internal users must be protected against normal unauthorized reuse. | Security review and session testing. | P0 |
| NFR-040 | Disabling Staff access must prevent future authorized internal actions without erasing prior audit attribution. | Access-revocation test. | P0 |
| NFR-041 | Sensitive data displayed to Staff must be limited to operational need. | Data-minimization review. | P0 |
| NFR-042 | Data retention, deletion and access procedures must be documented before production launch and aligned with applicable European privacy obligations. | Legal/privacy readiness review. | P0 |
| NFR-043 | Logs and analytics must not expose private status tokens or full sensitive contact data unnecessarily. | Logging and analytics privacy review. | P0 |
| NFR-044 | QR regeneration must not create access to another customer’s private status. | Security regression test. | P0 |

### 3.6 Accessibility and inclusive use

| NFR ID | Requirement | Verification | Priority |
|---|---|---|---|
| NFR-045 | Core Staff and customer flows must be usable without relying only on color to communicate state. | Accessibility review and color-independent inspection. | P0 |
| NFR-046 | Interactive controls must have understandable accessible names. | Automated and manual accessibility test. | P0 |
| NFR-047 | Form errors must be associated with the relevant field and understandable in text. | Screen-reader and keyboard form test. | P0 |
| NFR-048 | Customer mobile touch targets must be large enough for practical one-handed use. | Mobile interaction review. | P0 |
| NFR-049 | Core public and Staff flows must support keyboard operation where a physical keyboard is used. | Keyboard-only test. | P1 |
| NFR-050 | Text and critical status indicators must meet appropriate contrast expectations. | Contrast audit. | P0 |
| NFR-051 | Countdown and urgent warning information must be available to assistive technology in a non-disruptive form. | Screen-reader behavior test. | P1 |
| NFR-052 | The assisted-customer path must provide equal queue treatment without requiring the customer to interact digitally. | Journey validation for PER-004. | P0 |

### 3.7 Compatibility and responsive behavior

| NFR ID | Requirement | Verification | Priority |
|---|---|---|---|
| NFR-053 | Primary Staff workflows must be fully usable at common tablet widths in portrait or landscape where practical. | Responsive test matrix. | P0 |
| NFR-054 | Primary Staff workflows must be fully usable on common desktop browser dimensions. | Responsive test matrix. | P0 |
| NFR-055 | Primary customer workflows must be mobile-first and usable on current mainstream mobile browsers. | Mobile browser matrix. | P0 |
| NFR-056 | Opening the private status link from WhatsApp must preserve the intended customer journey. | Deep-link/browser test. | P0 |
| NFR-057 | Responsive adaptation must not hide a critical current state or make an approved action unavailable. | Cross-breakpoint functional review. | P0 |
| NFR-058 | The product should support current mainstream versions of major browsers selected by the technical compatibility policy. | Compatibility test against documented support matrix. | P1 |

### 3.8 Localization and content

| NFR ID | Requirement | Verification | Priority |
|---|---|---|---|
| NFR-059 | Customer-visible content must be structured so additional languages can be introduced without changing business logic. | Localization-readiness review. | P1 |
| NFR-060 | Date, time and countdown presentation must respect the establishment’s configured time zone and clear local conventions. | Time-zone and locale test. | P0 |
| NFR-061 | Product copy must distinguish unavailable, failed, pending and completed states accurately. | Content-design review. | P0 |
| NFR-062 | Operational message templates must preserve mandatory meaning after allowed personalization. | Template validation test. | P0 |
| NFR-063 | Language selection must not change queue rules, state or capacity. | Cross-language consistency test. | P1 |

### 3.9 Auditability, observability and support

| NFR ID | Requirement | Verification | Priority |
|---|---|---|---|
| NFR-064 | Material actions must be attributable to an internal actor or clearly identified system event. | Audit-log review. | P0 |
| NFR-065 | The product must make it possible to reconstruct entry acceptance, calls, timer changes, outcomes, corrections and protected bypasses. | Incident reconstruction test. | P0 |
| NFR-066 | Messaging attempts and available outcomes must be observable by message purpose. | Messaging telemetry review. | P0 |
| NFR-067 | Synchronization failures and rejected stale actions must be diagnosable. | Operational logging review. | P0 |
| NFR-068 | Service opening, intake closure/reopening and service closure must be observable. | Audit and telemetry review. | P0 |
| NFR-069 | Operational monitoring must detect material failure of public entry, Staff queue access and messaging integration. | Monitoring readiness review. | P0 |
| NFR-070 | Support information must identify establishment and service without exposing unnecessary customer data. | Support-tool privacy review. | P1 |

### 3.10 Maintainability of product behavior

| NFR ID | Requirement | Verification | Priority |
|---|---|---|---|
| NFR-071 | Canonical identifiers for features, stories, rules, acceptance criteria and edge cases must remain stable across planning artifacts. | Documentation lint and traceability review. | P0 |
| NFR-072 | Business behavior must be centralized enough that Staff and customer views cannot evolve contradictory rules. | Architecture/product review without prescribing a technology. | P0 |
| NFR-073 | Adding a future queue, establishment or communication channel must require an explicit product decision rather than accidental extension of MVP behavior. | Scope-change review. | P0 |
| NFR-074 | Metric definitions must be documented and versioned when changed. | Product analytics governance review. | P1 |
| NFR-075 | Configuration defaults must be changeable through approved product governance without altering historical service records. | Configuration and history regression test. | P1 |

---

## 4. NFR totals

This document defines **75 non-functional requirements**.

The most critical release qualities are:

- no need for a paper backup;
- one current queue truth across devices;
- truthful messaging failure;
- authorization and private-link isolation;
- usable tablet, desktop and mobile experiences;
- deterministic capacity and timer behavior;
- enough auditability to reconstruct a live-service incident.

---

## 5. Pilot quality gate

Before a live pilot, the team must demonstrate:

1. all P0 security and authorization requirements;
2. all P0 data-integrity invariants;
3. multi-device propagation and conflict behavior;
4. provider-failure degradation;
5. public and private mobile usability;
6. Staff tablet and desktop usability;
7. safe service closure and read-only history;
8. incident reconstruction for at least one scripted failure;
9. documented supported-browser and privacy/retention policies;
10. measured performance under the agreed pilot-load profile.

---

## 6. Exceptions

A temporary exception to a P0 NFR requires:

- affected NFR ID;
- user and operational impact;
- pilot boundary;
- compensating control that does not require paper as the source of truth;
- owner;
- expiry or review date;
- Product Management and technical approval.

An undocumented limitation is not an accepted exception.
