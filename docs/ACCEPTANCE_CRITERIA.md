# MesaFlow — Acceptance Criteria

**Document ID:** PROD-AC-001  
**Product:** MesaFlow  
**Release:** MVP / Pilot Release  
**Status:** Approved acceptance specification  
**Owner:** Product Management  
**Version:** 1.0  
**Last updated:** 2026-07-10

---

## 1. Purpose

This document defines the acceptance contract for every canonical MVP feature and for the cross-feature integrity of MesaFlow.

Acceptance criteria use Given/When/Then language to specify observable product behavior. They do not prescribe implementation.

A feature is accepted only when:

- all criteria linked to that feature pass;
- its end-to-end journey passes;
- applicable business rules and non-functional requirements pass;
- no out-of-scope behavior has been introduced.

---

## 2. Identifier model

- `FEAT-001`–`FEAT-059`: canonical features.
- `US-001`–`US-059`: primary user stories.
- `AC-001` onward: immutable acceptance criteria.
- Cross-feature criteria are linked to integrity stories `US-060`–`US-068`.

---

## 3. Feature acceptance criteria


### FEAT-001 — Administrator account creation

**Primary story:** `US-001`  

**Required outcome:** A first internal user can create an account and becomes Administrator.  


| AC ID | Given | When | Then |
|---|---|---|---|
| AC-001 | Given a valid internal user is in the account or access flow | When the user completes valid first-account creation | Then the first valid internal account created for a new restaurant context is assigned the Administrator role. |
| AC-002 | Given a valid internal user is in the account or access flow | When the user completes valid first-account creation | Then the user must be able to continue directly into establishment setup. |
| AC-003 | Given a valid internal user is in the account or access flow | When the user completes valid first-account creation | Then account creation must not expose role or permission complexity that does not exist in the MVP. |
| AC-004 | Given the approved MVP scope for `FEAT-001` | When a user looks for or attempts `custom roles` | Then the capability is not available as part of this feature and no hidden equivalent behavior is introduced. |
| AC-005 | Given a valid internal user is in the account or access flow | When an unauthorized or stale user attempts the same action | Then unauthorized users cannot complete the restricted action and the existing valid product state is unchanged. |

### FEAT-002 — Establishment profile

**Primary story:** `US-002`  

**Required outcome:** Administrator stores required restaurant identity, contact, language and time-zone information.  


| AC ID | Given | When | Then |
|---|---|---|---|
| AC-006 | Given a valid internal user is in the account or access flow | When the Administrator saves the establishment profile | Then required establishment data: restaurant name, address, phone, primary language and time zone. |
| AC-007 | Given a valid internal user is in the account or access flow | When the Administrator saves the establishment profile | Then optional identity fields may include logo, website, social links and short description. |
| AC-008 | Given a valid internal user is in the account or access flow | When the Administrator saves the establishment profile | Then the profile supplies restaurant identity to public screens and approved message fields. |
| AC-009 | Given the approved MVP scope for `FEAT-002` | When a user looks for or attempts `custom roles` | Then the capability is not available as part of this feature and no hidden equivalent behavior is introduced. |
| AC-010 | Given a valid internal user is in the account or access flow | When an unauthorized or stale user attempts the same action | Then unauthorized users cannot complete the restricted action and the existing valid product state is unchanged. |

### FEAT-003 — Guided operational setup

**Primary story:** `US-003`  

**Required outcome:** The product provides recommended defaults and collects only approved queue settings.  


| AC ID | Given | When | Then |
|---|---|---|---|
| AC-011 | Given a valid internal user is in the account or access flow | When the Administrator completes or updates guided setup | Then the setup covers only queue rules approved for the MVP. |
| AC-012 | Given a valid internal user is in the account or access flow | When the Administrator completes or updates guided setup | Then recommended values are prefilled and may be accepted without modification. |
| AC-013 | Given a valid internal user is in the account or access flow | When the Administrator completes or updates guided setup | Then the setup includes maximum slots, call duration, long-wait threshold, QR party-size maximum, weighted-capacity cutoff, party-size approval threshold, reporting instruction and displayed restaurant name. |
| AC-014 | Given a valid internal user is in the account or access flow | When the Administrator completes or updates guided setup | Then completion results in a queue that is ready to open. |
| AC-015 | Given the approved MVP scope for `FEAT-003` | When a user looks for or attempts `custom roles` | Then the capability is not available as part of this feature and no hidden equivalent behavior is introduced. |
| AC-016 | Given a valid internal user is in the account or access flow | When an unauthorized or stale user attempts the same action | Then unauthorized users cannot complete the restricted action and the existing valid product state is unchanged. |

### FEAT-004 — Individual staff invitation and access

**Primary story:** `US-004`  

**Required outcome:** Administrator invites individual Staff users.  


| AC ID | Given | When | Then |
|---|---|---|---|
| AC-017 | Given a valid internal user is in the account or access flow | When the Administrator invites or removes a Staff user | Then the Administrator invites each staff member to an individual account. |
| AC-018 | Given a valid internal user is in the account or access flow | When the Administrator invites or removes a Staff user | Then invited staff receive the Staff role for the establishment. |
| AC-019 | Given a valid internal user is in the account or access flow | When the Administrator invites or removes a Staff user | Then shared credentials and a shared operational PIN are not part of the MVP. |
| AC-020 | Given a valid internal user is in the account or access flow | When the Administrator invites or removes a Staff user | Then removing access must not erase historical attribution. |
| AC-021 | Given the approved MVP scope for `FEAT-004` | When a user looks for or attempts `custom roles` | Then the capability is not available as part of this feature and no hidden equivalent behavior is introduced. |
| AC-022 | Given a valid internal user is in the account or access flow | When an unauthorized or stale user attempts the same action | Then unauthorized users cannot complete the restricted action and the existing valid product state is unchanged. |

### FEAT-005 — Permissions

**Primary story:** `US-005`  

**Required outcome:** Administrator and Staff permissions follow Section 11.  


| AC ID | Given | When | Then |
|---|---|---|---|
| AC-023 | Given a valid internal user is in the account or access flow | When an internal user attempts an approved or restricted action | Then administrator can configure structural rules and perform all operational actions. |
| AC-024 | Given a valid internal user is in the account or access flow | When an internal user attempts an approved or restricted action | Then staff can operate services and entries but cannot alter structural settings. |
| AC-025 | Given a valid internal user is in the account or access flow | When an internal user attempts an approved or restricted action | Then permission differences must be reflected in both available actions and enforcement. |
| AC-026 | Given a valid internal user is in the account or access flow | When an internal user attempts an approved or restricted action | Then the MVP has no custom roles or permission builder. |
| AC-027 | Given the approved MVP scope for `FEAT-005` | When a user looks for or attempts `custom roles` | Then the capability is not available as part of this feature and no hidden equivalent behavior is introduced. |
| AC-028 | Given a valid internal user is in the account or access flow | When an unauthorized or stale user attempts the same action | Then unauthorized users cannot complete the restricted action and the existing valid product state is unchanged. |

### FEAT-006 — Permanent establishment QR

**Primary story:** `US-006`  

**Required outcome:** One permanent public QR points to the current establishment queue state.  


| AC ID | Given | When | Then |
|---|---|---|---|
| AC-029 | Given an Administrator has a configured establishment | When the current QR is scanned | Then one public QR entry point is associated with the establishment. |
| AC-030 | Given an Administrator has a configured establishment | When the current QR is scanned | Then the QR remains valid across service openings and closures until explicitly regenerated. |
| AC-031 | Given an Administrator has a configured establishment | When the current QR is scanned | Then scanning always resolves to the current public queue state rather than to a stale service-specific page. |
| AC-032 | Given the approved MVP scope for `FEAT-006` | When a user looks for or attempts `remote marketplace discovery` | Then the capability is not available as part of this feature and no hidden equivalent behavior is introduced. |
| AC-033 | Given an Administrator has a configured establishment | When an unauthorized or stale user attempts the same action | Then unauthorized users cannot complete the restricted action and the existing valid product state is unchanged. |

### FEAT-007 — QR download

**Primary story:** `US-007`  

**Required outcome:** Administrator can obtain a printable asset.  


| AC ID | Given | When | Then |
|---|---|---|---|
| AC-034 | Given an Administrator has a configured establishment | When the Administrator requests the printable QR | Then administrator can obtain the current QR in a form suitable for printing. |
| AC-035 | Given an Administrator has a configured establishment | When the Administrator requests the printable QR | Then the output must preserve scan reliability at normal restaurant display sizes. |
| AC-036 | Given an Administrator has a configured establishment | When the Administrator requests the printable QR | Then downloading the QR does not open or close a service. |
| AC-037 | Given the approved MVP scope for `FEAT-007` | When a user looks for or attempts `remote marketplace discovery` | Then the capability is not available as part of this feature and no hidden equivalent behavior is introduced. |
| AC-038 | Given an Administrator has a configured establishment | When an unauthorized or stale user attempts the same action | Then unauthorized users cannot complete the restricted action and the existing valid product state is unchanged. |

### FEAT-008 — QR regeneration

**Primary story:** `US-008`  

**Required outcome:** Administrator can invalidate the old entry link and issue a new QR after warning and confirmation.  


| AC ID | Given | When | Then |
|---|---|---|---|
| AC-039 | Given an Administrator has a configured establishment | When the Administrator confirms QR regeneration | Then only an Administrator can regenerate the QR. |
| AC-040 | Given an Administrator has a configured establishment | When the Administrator confirms QR regeneration | Then the product warns that previously printed QRs will stop accepting new entries. |
| AC-041 | Given an Administrator has a configured establishment | When the Administrator confirms QR regeneration | Then existing accepted queue entries and their private status links remain valid. |
| AC-042 | Given an Administrator has a configured establishment | When the Administrator confirms QR regeneration | Then regeneration is recorded as a material action. |
| AC-043 | Given the approved MVP scope for `FEAT-008` | When a user looks for or attempts `remote marketplace discovery` | Then the capability is not available as part of this feature and no hidden equivalent behavior is introduced. |
| AC-044 | Given an Administrator has a configured establishment | When an unauthorized or stale user attempts the same action | Then unauthorized users cannot complete the restricted action and the existing valid product state is unchanged. |

### FEAT-009 — Public welcome and state screen

**Primary story:** `US-009`  

**Required outcome:** Show restaurant identity, current queue state and appropriate next action.  


| AC ID | Given | When | Then |
|---|---|---|---|
| AC-045 | Given a customer opens the establishment public queue entry point | When the public page loads | Then the first public screen identifies the restaurant and explains the current queue state. |
| AC-046 | Given a customer opens the establishment public queue entry point | When the public page loads | Then when intake is available, the primary action is to join the queue. |
| AC-047 | Given a customer opens the establishment public queue entry point | When the public page loads | Then when unavailable, the screen distinguishes no active service, intake closed and queue full. |
| AC-048 | Given a customer opens the establishment public queue entry point | When the public page loads | Then the screen does not promise a waiting-time estimate in the MVP. |
| AC-049 | Given the approved MVP scope for `FEAT-009` | When a user looks for or attempts `remote marketplace discovery` | Then the capability is not available as part of this feature and no hidden equivalent behavior is introduced. |
| AC-050 | Given a customer opens the establishment public queue entry point | When the public state changes or validation fails before acceptance | Then no partial or duplicate active entry is created, and the customer receives an understandable current-state response. |

### FEAT-010 — Customer queue-entry form

**Primary story:** `US-010`  

**Required outcome:** Collect name, phone and party size with mobile-friendly validation.  


| AC ID | Given | When | Then |
|---|---|---|---|
| AC-051 | Given a customer opens the establishment public queue entry point | When the customer submits the queue form | Then required fields are name, phone number and party size. |
| AC-052 | Given a customer opens the establishment public queue entry point | When the customer submits the queue form | Then the form is short, mobile-first and uses clear field-level validation. |
| AC-053 | Given a customer opens the establishment public queue entry point | When the customer submits the queue form | Then submission revalidates service and capacity state at the moment of acceptance. |
| AC-054 | Given a customer opens the establishment public queue entry point | When the customer submits the queue form | Then a successful submission immediately creates one active entry and shows confirmation. |
| AC-055 | Given the approved MVP scope for `FEAT-010` | When a user looks for or attempts `remote marketplace discovery` | Then the capability is not available as part of this feature and no hidden equivalent behavior is introduced. |
| AC-056 | Given a customer opens the establishment public queue entry point | When the public state changes or validation fails before acceptance | Then no partial or duplicate active entry is created, and the customer receives an understandable current-state response. |

### FEAT-011 — Optional seating needs

**Primary story:** `US-011`  

**Required outcome:** Capture approved optional preferences without making them mandatory.  


| AC ID | Given | When | Then |
|---|---|---|---|
| AC-057 | Given a customer opens the establishment public queue entry point | When the customer includes or omits optional needs | Then optional fields are interior/terrace preference, baby chair, accessibility requirement and customer note. |
| AC-058 | Given a customer opens the establishment public queue entry point | When the customer includes or omits optional needs | Then optional needs must never block submission merely because they are absent. |
| AC-059 | Given a customer opens the establishment public queue entry point | When the customer includes or omits optional needs | Then preferences are advisory to staff and do not guarantee accommodation. |
| AC-060 | Given a customer opens the establishment public queue entry point | When the customer includes or omits optional needs | Then sensitive or irrelevant profile collection is excluded. |
| AC-061 | Given the approved MVP scope for `FEAT-011` | When a user looks for or attempts `remote marketplace discovery` | Then the capability is not available as part of this feature and no hidden equivalent behavior is introduced. |
| AC-062 | Given a customer opens the establishment public queue entry point | When the public state changes or validation fails before acceptance | Then no partial or duplicate active entry is created, and the customer receives an understandable current-state response. |

### FEAT-012 — Duplicate prevention

**Primary story:** `US-012`  

**Required outcome:** Block a second active entry for the same phone in the same queue.  


| AC ID | Given | When | Then |
|---|---|---|---|
| AC-063 | Given a customer opens the establishment public queue entry point | When a phone with an active entry is submitted again | Then a phone number cannot have two active entries in the same establishment queue. |
| AC-064 | Given a customer opens the establishment public queue entry point | When a phone with an active entry is submitted again | Then the duplicate check applies to Waiting and Called entries. |
| AC-065 | Given a customer opens the establishment public queue entry point | When a phone with an active entry is submitted again | Then terminal historical entries do not permanently block later participation. |
| AC-066 | Given a customer opens the establishment public queue entry point | When a phone with an active entry is submitted again | Then the product must not silently create a duplicate when simultaneous submissions occur. |
| AC-067 | Given the approved MVP scope for `FEAT-012` | When a user looks for or attempts `remote marketplace discovery` | Then the capability is not available as part of this feature and no hidden equivalent behavior is introduced. |
| AC-068 | Given a customer opens the establishment public queue entry point | When the public state changes or validation fails before acceptance | Then no partial or duplicate active entry is created, and the customer receives an understandable current-state response. |

### FEAT-013 — Maximum QR party size

**Primary story:** `US-013`  

**Required outcome:** Block self-entry above the configured size and direct the customer to staff.  


| AC ID | Given | When | Then |
|---|---|---|---|
| AC-069 | Given a customer opens the establishment public queue entry point | When the customer enters a party above the configured self-entry maximum | Then administrator configures the largest party size accepted through self-entry. |
| AC-070 | Given a customer opens the establishment public queue entry point | When the customer enters a party above the configured self-entry maximum | Then a party above that size is directed to speak with staff. |
| AC-071 | Given a customer opens the establishment public queue entry point | When the customer enters a party above the configured self-entry maximum | Then staff may still create or retain the group manually after operational assessment. |
| AC-072 | Given a customer opens the establishment public queue entry point | When the customer enters a party above the configured self-entry maximum | Then the rule controls QR self-entry, not an absolute restaurant ban. |
| AC-073 | Given the approved MVP scope for `FEAT-013` | When a user looks for or attempts `remote marketplace discovery` | Then the capability is not available as part of this feature and no hidden equivalent behavior is introduced. |
| AC-074 | Given a customer opens the establishment public queue entry point | When the public state changes or validation fails before acceptance | Then no partial or duplicate active entry is created, and the customer receives an understandable current-state response. |

### FEAT-014 — Full and closed states

**Primary story:** `US-014`  

**Required outcome:** Show distinct no-service, intake-closed and queue-full states.  


| AC ID | Given | When | Then |
|---|---|---|---|
| AC-075 | Given a customer opens the establishment public queue entry point | When the customer opens or submits while intake is unavailable | Then queue full is based on weighted active capacity, not merely visible group count. |
| AC-076 | Given a customer opens the establishment public queue entry point | When the customer opens or submits while intake is unavailable | Then intake closed means the restaurant deliberately stopped new entries while serving the existing queue. |
| AC-077 | Given a customer opens the establishment public queue entry point | When the customer opens or submits while intake is unavailable | Then no active service means the restaurant has not opened a current operational session. |
| AC-078 | Given a customer opens the establishment public queue entry point | When the customer opens or submits while intake is unavailable | Then opening a form does not reserve capacity; final submission determines acceptance. |
| AC-079 | Given the approved MVP scope for `FEAT-014` | When a user looks for or attempts `remote marketplace discovery` | Then the capability is not available as part of this feature and no hidden equivalent behavior is introduced. |
| AC-080 | Given a customer opens the establishment public queue entry point | When the public state changes or validation fails before acceptance | Then no partial or duplicate active entry is created, and the customer receives an understandable current-state response. |

### FEAT-015 — Manual entry

**Primary story:** `US-015`  

**Required outcome:** Staff can add a group with name and party size; phone is optional.  


| AC ID | Given | When | Then |
|---|---|---|---|
| AC-081 | Given an active service exists and the restaurant is managing queue intake | When Staff submits a manual group | Then staff can create an entry using name and party size as the minimum. |
| AC-082 | Given an active service exists and the restaurant is managing queue intake | When Staff submits a manual group | Then phone and customer preferences are optional. |
| AC-083 | Given an active service exists and the restaurant is managing queue intake | When Staff submits a manual group | Then manual entries enter the same chronological queue and follow the same fairness model. |
| AC-084 | Given an active service exists and the restaurant is managing queue intake | When Staff submits a manual group | Then the interface must support rapid entry during a busy service. |
| AC-085 | Given the approved MVP scope for `FEAT-015` | When a user looks for or attempts `automatic table assignment` | Then the capability is not available as part of this feature and no hidden equivalent behavior is introduced. |
| AC-086 | Given an active service exists and the restaurant is managing queue intake | When the action conflicts with current capacity or approved entry data | Then current queue capacity remains internally consistent and no silent over-capacity state is created. |

### FEAT-016 — No-contact handling

**Primary story:** `US-016`  

**Required outcome:** Clearly label no-contact entries and suppress automated attempts.  


| AC ID | Given | When | Then |
|---|---|---|---|
| AC-087 | Given an active service exists and the restaurant is managing queue intake | When Staff creates or views an entry without phone | Then an entry without a phone number is clearly marked as No contact. |
| AC-088 | Given an active service exists and the restaurant is managing queue intake | When Staff creates or views an entry without phone | Then no WhatsApp attempt is made for a no-contact entry. |
| AC-089 | Given an active service exists and the restaurant is managing queue intake | When Staff creates or views an entry without phone | Then the entry remains fully operable and must be called in person. |
| AC-090 | Given an active service exists and the restaurant is managing queue intake | When Staff creates or views an entry without phone | Then adding a valid phone later enables subsequent operational messaging. |
| AC-091 | Given the approved MVP scope for `FEAT-016` | When a user looks for or attempts `automatic table assignment` | Then the capability is not available as part of this feature and no hidden equivalent behavior is introduced. |
| AC-092 | Given an active service exists and the restaurant is managing queue intake | When the action conflicts with current capacity or approved entry data | Then current queue capacity remains internally consistent and no silent over-capacity state is created. |

### FEAT-017 — Weighted capacity

**Primary story:** `US-017`  

**Required outcome:** Use one- or two-slot weighting with a configurable cutoff.  


| AC ID | Given | When | Then |
|---|---|---|---|
| AC-093 | Given an active service exists and the restaurant is managing queue intake | When party size is evaluated for capacity | Then capacity uses one-slot and two-slot group weights. |
| AC-094 | Given an active service exists and the restaurant is managing queue intake | When party size is evaluated for capacity | Then default: parties up to 6 use one slot; parties of 7 or more use two. |
| AC-095 | Given an active service exists and the restaurant is managing queue intake | When party size is evaluated for capacity | Then administrator can configure the cutoff to match the restaurant. |
| AC-096 | Given an active service exists and the restaurant is managing queue intake | When party size is evaluated for capacity | Then weighting affects intake capacity but does not automatically determine seating order. |
| AC-097 | Given the approved MVP scope for `FEAT-017` | When a user looks for or attempts `automatic table assignment` | Then the capability is not available as part of this feature and no hidden equivalent behavior is introduced. |
| AC-098 | Given an active service exists and the restaurant is managing queue intake | When the action conflicts with current capacity or approved entry data | Then current queue capacity remains internally consistent and no silent over-capacity state is created. |

### FEAT-018 — Maximum slots

**Primary story:** `US-018`  

**Required outcome:** Administrator sets maximum active slots.  


| AC ID | Given | When | Then |
|---|---|---|---|
| AC-099 | Given an active service exists and the restaurant is managing queue intake | When current weighted usage reaches or exceeds the configured limit | Then administrator configures the maximum number of active weighted slots. |
| AC-100 | Given an active service exists and the restaurant is managing queue intake | When current weighted usage reaches or exceeds the configured limit | Then waiting and Called entries consume slots. |
| AC-101 | Given an active service exists and the restaurant is managing queue intake | When current weighted usage reaches or exceeds the configured limit | Then seated, Cancelled and No-show entries do not consume slots. |
| AC-102 | Given an active service exists and the restaurant is managing queue intake | When current weighted usage reaches or exceeds the configured limit | Then existing entries are not removed if the configured limit is reduced below current usage. |
| AC-103 | Given the approved MVP scope for `FEAT-018` | When a user looks for or attempts `automatic table assignment` | Then the capability is not available as part of this feature and no hidden equivalent behavior is introduced. |
| AC-104 | Given an active service exists and the restaurant is managing queue intake | When the action conflicts with current capacity or approved entry data | Then current queue capacity remains internally consistent and no silent over-capacity state is created. |

### FEAT-019 — Capacity recalculation

**Primary story:** `US-019`  

**Required outcome:** Recalculate consistently and update public intake state.  


| AC ID | Given | When | Then |
|---|---|---|---|
| AC-105 | Given an active service exists and the restaurant is managing queue intake | When a capacity-affecting event is accepted | Then capacity recalculates after accepted entry, approved party-size change, seating, cancellation, no-show and reactivation. |
| AC-106 | Given an active service exists and the restaurant is managing queue intake | When a capacity-affecting event is accepted | Then the current public full/available state updates from the recalculated value. |
| AC-107 | Given an active service exists and the restaurant is managing queue intake | When a capacity-affecting event is accepted | Then capacity must use approved current party size, not an unapproved requested size. |
| AC-108 | Given an active service exists and the restaurant is managing queue intake | When a capacity-affecting event is accepted | Then the same rules apply across all staff devices and public submission checks. |
| AC-109 | Given the approved MVP scope for `FEAT-019` | When a user looks for or attempts `automatic table assignment` | Then the capability is not available as part of this feature and no hidden equivalent behavior is introduced. |
| AC-110 | Given an active service exists and the restaurant is managing queue intake | When the action conflicts with current capacity or approved entry data | Then current queue capacity remains internally consistent and no silent over-capacity state is created. |

### FEAT-020 — Open service

**Primary story:** `US-020`  

**Required outcome:** Authorized staff opens a new service.  


| AC ID | Given | When | Then |
|---|---|---|---|
| AC-111 | Given authorized Staff are operating the active service | When Staff opens a new service | Then authorized staff explicitly opens a new service. |
| AC-112 | Given authorized Staff are operating the active service | When Staff opens a new service | Then a service is a bounded operational session such as lunch or dinner. |
| AC-113 | Given authorized Staff are operating the active service | When Staff opens a new service | Then only one active service exists for the establishment in the MVP. |
| AC-114 | Given authorized Staff are operating the active service | When Staff opens a new service | Then opening enables queue intake unless staff immediately closes new entries. |
| AC-115 | Given the approved MVP scope for `FEAT-020` | When a user looks for or attempts `multiple simultaneous queues` | Then the capability is not available as part of this feature and no hidden equivalent behavior is introduced. |
| AC-116 | Given authorized Staff are operating the active service | When another device has already changed the relevant service or entry | Then only one compatible current state is accepted and all active Staff views reconcile to it. |

### FEAT-021 — Close/reopen entries

**Primary story:** `US-021`  

**Required outcome:** Toggle customer self-entry without resolving existing groups.  


| AC ID | Given | When | Then |
|---|---|---|---|
| AC-117 | Given authorized Staff are operating the active service | When Staff closes or reopens new intake | Then staff can close new entries without affecting Waiting or Called groups. |
| AC-118 | Given authorized Staff are operating the active service | When Staff closes or reopens new intake | Then staff can reopen intake during the same active service. |
| AC-119 | Given authorized Staff are operating the active service | When Staff closes or reopens new intake | Then the public state updates immediately to explain whether joining is allowed. |
| AC-120 | Given authorized Staff are operating the active service | When Staff closes or reopens new intake | Then this control is distinct from ending the service. |
| AC-121 | Given the approved MVP scope for `FEAT-021` | When a user looks for or attempts `multiple simultaneous queues` | Then the capability is not available as part of this feature and no hidden equivalent behavior is introduced. |
| AC-122 | Given authorized Staff are operating the active service | When another device has already changed the relevant service or entry | Then only one compatible current state is accepted and all active Staff views reconcile to it. |

### FEAT-022 — Safe service closure

**Primary story:** `US-022`  

**Required outcome:** Block closure until no Waiting or Called entries remain.  


| AC ID | Given | When | Then |
|---|---|---|---|
| AC-123 | Given authorized Staff are operating the active service | When Staff attempts to end the service | Then end service is blocked while Waiting or Called entries remain. |
| AC-124 | Given authorized Staff are operating the active service | When Staff attempts to end the service | Then staff must resolve active entries before closure. |
| AC-125 | Given authorized Staff are operating the active service | When Staff attempts to end the service | Then closure freezes service records and generates the approved history summary. |
| AC-126 | Given authorized Staff are operating the active service | When Staff attempts to end the service | Then ending a service does not invalidate customers’ ability to see their final outcome. |
| AC-127 | Given the approved MVP scope for `FEAT-022` | When a user looks for or attempts `multiple simultaneous queues` | Then the capability is not available as part of this feature and no hidden equivalent behavior is introduced. |
| AC-128 | Given authorized Staff are operating the active service | When another device has already changed the relevant service or entry | Then only one compatible current state is accepted and all active Staff views reconcile to it. |

### FEAT-023 — Waiting section

**Primary story:** `US-023`  

**Required outcome:** Show chronological list and approved operational indicators.  


| AC ID | Given | When | Then |
|---|---|---|---|
| AC-129 | Given authorized Staff are operating the active service | When Staff opens the Waiting section | Then waiting entries are shown in chronological arrival order by default. |
| AC-130 | Given authorized Staff are operating the active service | When Staff opens the Waiting section | Then each row exposes name, party size, entry time, elapsed wait, contact status, relevant preferences, large-group status, pass-over count and warning state. |
| AC-131 | Given authorized Staff are operating the active service | When Staff opens the Waiting section | Then operational filters do not rewrite canonical order. |
| AC-132 | Given authorized Staff are operating the active service | When Staff opens the Waiting section | Then the section must support direct approved actions without opening unnecessary layers. |
| AC-133 | Given the approved MVP scope for `FEAT-023` | When a user looks for or attempts `multiple simultaneous queues` | Then the capability is not available as part of this feature and no hidden equivalent behavior is introduced. |
| AC-134 | Given authorized Staff are operating the active service | When another device has already changed the relevant service or entry | Then only one compatible current state is accepted and all active Staff views reconcile to it. |

### FEAT-024 — Called section

**Primary story:** `US-024`  

**Required outcome:** Show independent timers and call actions.  


| AC ID | Given | When | Then |
|---|---|---|---|
| AC-135 | Given authorized Staff are operating the active service | When Staff opens the Called section | Then called entries are separated from Waiting. |
| AC-136 | Given authorized Staff are operating the active service | When Staff opens the Called section | Then each entry shows remaining time, message state, acknowledgement state and available resolution actions. |
| AC-137 | Given authorized Staff are operating the active service | When Staff opens the Called section | Then multiple entries may be Called concurrently. |
| AC-138 | Given authorized Staff are operating the active service | When Staff opens the Called section | Then expiry does not automatically invent a terminal outcome; staff resolves the entry. |
| AC-139 | Given the approved MVP scope for `FEAT-024` | When a user looks for or attempts `multiple simultaneous queues` | Then the capability is not available as part of this feature and no hidden equivalent behavior is introduced. |
| AC-140 | Given authorized Staff are operating the active service | When another device has already changed the relevant service or entry | Then only one compatible current state is accepted and all active Staff views reconcile to it. |

### FEAT-025 — Recently completed

**Primary story:** `US-025`  

**Required outcome:** Show current-service terminal entries without dominating active work.  


| AC ID | Given | When | Then |
|---|---|---|---|
| AC-141 | Given authorized Staff are operating the active service | When Staff opens Recently completed | Then current-service Seated, Cancelled and No-show entries remain accessible for recent context. |
| AC-142 | Given authorized Staff are operating the active service | When Staff opens Recently completed | Then the section does not dominate active queue work. |
| AC-143 | Given authorized Staff are operating the active service | When Staff opens Recently completed | Then eligible outcome correction is available according to role and service state. |
| AC-144 | Given authorized Staff are operating the active service | When Staff opens Recently completed | Then historical services are accessed through history, not an endlessly growing live list. |
| AC-145 | Given the approved MVP scope for `FEAT-025` | When a user looks for or attempts `multiple simultaneous queues` | Then the capability is not available as part of this feature and no hidden equivalent behavior is introduced. |
| AC-146 | Given authorized Staff are operating the active service | When another device has already changed the relevant service or entry | Then only one compatible current state is accepted and all active Staff views reconcile to it. |

### FEAT-026 — Party-size filtering

**Primary story:** `US-026`  

**Required outcome:** Filter without changing canonical order.  


| AC ID | Given | When | Then |
|---|---|---|---|
| AC-147 | Given authorized Staff are operating the active service | When Staff applies or clears a party-size filter | Then staff can narrow the Waiting view by party size or useful size range. |
| AC-148 | Given authorized Staff are operating the active service | When Staff applies or clears a party-size filter | Then filtering does not change queue position or customer-facing groups-ahead calculation. |
| AC-149 | Given authorized Staff are operating the active service | When Staff applies or clears a party-size filter | Then removing the filter returns the canonical chronological view. |
| AC-150 | Given authorized Staff are operating the active service | When Staff applies or clears a party-size filter | Then the feature supports table compatibility without pretending to manage tables. |
| AC-151 | Given the approved MVP scope for `FEAT-026` | When a user looks for or attempts `multiple simultaneous queues` | Then the capability is not available as part of this feature and no hidden equivalent behavior is introduced. |
| AC-152 | Given authorized Staff are operating the active service | When another device has already changed the relevant service or entry | Then only one compatible current state is accepted and all active Staff views reconcile to it. |

### FEAT-027 — Multi-device synchronization

**Primary story:** `US-027`  

**Required outcome:** Propagate queue changes rapidly and prevent conflicting valid transitions.  


| AC ID | Given | When | Then |
|---|---|---|---|
| AC-153 | Given authorized Staff are operating the active service | When one device accepts a queue action | Then accepted changes propagate across simultaneously open staff devices without manual refresh. |
| AC-154 | Given authorized Staff are operating the active service | When one device accepts a queue action | Then conflicting actions cannot both become valid final transitions. |
| AC-155 | Given authorized Staff are operating the active service | When one device accepts a queue action | Then a device returning from temporary disconnection reconciles with current state. |
| AC-156 | Given authorized Staff are operating the active service | When one device accepts a queue action | Then users receive a clear indication when an attempted action is no longer valid. |
| AC-157 | Given the approved MVP scope for `FEAT-027` | When a user looks for or attempts `multiple simultaneous queues` | Then the capability is not available as part of this feature and no hidden equivalent behavior is introduced. |
| AC-158 | Given authorized Staff are operating the active service | When another device has already changed the relevant service or entry | Then only one compatible current state is accepted and all active Staff views reconcile to it. |

### FEAT-028 — Elapsed wait

**Primary story:** `US-028`  

**Required outcome:** Show continuously understandable elapsed wait.  


| AC ID | Given | When | Then |
|---|---|---|---|
| AC-159 | Given one or more entries are Waiting and Staff are making seating decisions | When Staff views a Waiting entry | Then every active entry displays understandable elapsed waiting time. |
| AC-160 | Given one or more entries are Waiting and Staff are making seating decisions | When Staff views a Waiting entry | Then elapsed wait derives from accepted entry time and continues while Waiting. |
| AC-161 | Given one or more entries are Waiting and Staff are making seating decisions | When Staff views a Waiting entry | Then staff can still see original entry time for context. |
| AC-162 | Given one or more entries are Waiting and Staff are making seating decisions | When Staff views a Waiting entry | Then the display remains readable during long services and across midnight. |
| AC-163 | Given the approved MVP scope for `FEAT-028` | When a user looks for or attempts `algorithmic seating enforcement` | Then the capability is not available as part of this feature and no hidden equivalent behavior is introduced. |
| AC-164 | Given one or more entries are Waiting and Staff are making seating decisions | When operational reality differs from strict chronological seating | Then Staff retains the approved operational choice, but fairness information and required accountability remain visible. |

### FEAT-029 — Large-group label

**Primary story:** `US-029`  

**Required outcome:** Apply label according to configured weighting cutoff or approved large-group rule.  


| AC ID | Given | When | Then |
|---|---|---|---|
| AC-165 | Given one or more entries are Waiting and Staff are making seating decisions | When an approved party size crosses the configured cutoff | Then a visible label identifies groups at or above the configured large-group/weighting cutoff. |
| AC-166 | Given one or more entries are Waiting and Staff are making seating decisions | When an approved party size crosses the configured cutoff | Then the label does not automatically move the group or force priority. |
| AC-167 | Given one or more entries are Waiting and Staff are making seating decisions | When an approved party size crosses the configured cutoff | Then party-size changes update the label after approval. |
| AC-168 | Given one or more entries are Waiting and Staff are making seating decisions | When an approved party size crosses the configured cutoff | Then the visual treatment must not rely only on color. |
| AC-169 | Given the approved MVP scope for `FEAT-029` | When a user looks for or attempts `algorithmic seating enforcement` | Then the capability is not available as part of this feature and no hidden equivalent behavior is introduced. |
| AC-170 | Given one or more entries are Waiting and Staff are making seating decisions | When operational reality differs from strict chronological seating | Then Staff retains the approved operational choice, but fairness information and required accountability remain visible. |

### FEAT-030 — Pass-over count

**Primary story:** `US-030`  

**Required outcome:** Count qualifying later-seated groups.  


| AC ID | Given | When | Then |
|---|---|---|---|
| AC-171 | Given one or more entries are Waiting and Staff are making seating decisions | When a later-arriving group is resolved | Then a pass-over is counted when a later-arriving group reaches Seated while the earlier group remains active. |
| AC-172 | Given one or more entries are Waiting and Staff are making seating decisions | When a later-arriving group is resolved | Then later cancellation or no-show does not count as a pass-over. |
| AC-173 | Given one or more entries are Waiting and Staff are making seating decisions | When a later-arriving group is resolved | Then the counter is visible to staff and retained in service records. |
| AC-174 | Given one or more entries are Waiting and Staff are making seating decisions | When a later-arriving group is resolved | Then corrections must recalculate the counter when the qualifying seating outcome changes. |
| AC-175 | Given the approved MVP scope for `FEAT-030` | When a user looks for or attempts `algorithmic seating enforcement` | Then the capability is not available as part of this feature and no hidden equivalent behavior is introduced. |
| AC-176 | Given one or more entries are Waiting and Staff are making seating decisions | When operational reality differs from strict chronological seating | Then Staff retains the approved operational choice, but fairness information and required accountability remain visible. |

### FEAT-031 — Long-wait warning

**Primary story:** `US-031`  

**Required outcome:** Highlight at one of four configured thresholds.  


| AC ID | Given | When | Then |
|---|---|---|---|
| AC-177 | Given one or more entries are Waiting and Staff are making seating decisions | When a Waiting entry reaches the configured threshold | Then administrator selects 20, 30, 45 or 60 minutes. |
| AC-178 | Given one or more entries are Waiting and Staff are making seating decisions | When a Waiting entry reaches the configured threshold | Then an active Waiting entry is highlighted when it reaches the threshold. |
| AC-179 | Given one or more entries are Waiting and Staff are making seating decisions | When a Waiting entry reaches the configured threshold | Then the warning remains until the entry leaves Waiting. |
| AC-180 | Given one or more entries are Waiting and Staff are making seating decisions | When a Waiting entry reaches the configured threshold | Then the warning indicates attention is required but does not force a specific action. |
| AC-181 | Given the approved MVP scope for `FEAT-031` | When a user looks for or attempts `algorithmic seating enforcement` | Then the capability is not available as part of this feature and no hidden equivalent behavior is introduced. |
| AC-182 | Given one or more entries are Waiting and Staff are making seating decisions | When operational reality differs from strict chronological seating | Then Staff retains the approved operational choice, but fairness information and required accountability remain visible. |

### FEAT-032 — Protected pass-over reason

**Primary story:** `US-032`  

**Required outcome:** Require a quick reason in protected cases without blocking the action.  


| AC ID | Given | When | Then |
|---|---|---|---|
| AC-183 | Given one or more entries are Waiting and Staff are making seating decisions | When Staff bypasses a protected earlier group | Then a quick reason is required when staff seats a later group while bypassing a protected earlier group. |
| AC-184 | Given one or more entries are Waiting and Staff are making seating decisions | When Staff bypasses a protected earlier group | Then approved reasons include table incompatibility, zone preference, accessibility, operational decision and Other. |
| AC-185 | Given one or more entries are Waiting and Staff are making seating decisions | When Staff bypasses a protected earlier group | Then the reason is recorded with actor and time. |
| AC-186 | Given one or more entries are Waiting and Staff are making seating decisions | When Staff bypasses a protected earlier group | Then the product never blocks the seating decision after a reason is supplied. |
| AC-187 | Given the approved MVP scope for `FEAT-032` | When a user looks for or attempts `algorithmic seating enforcement` | Then the capability is not available as part of this feature and no hidden equivalent behavior is introduced. |
| AC-188 | Given one or more entries are Waiting and Staff are making seating decisions | When operational reality differs from strict chronological seating | Then Staff retains the approved operational choice, but fairness information and required accountability remain visible. |

### FEAT-033 — Call group

**Primary story:** `US-033`  

**Required outcome:** Move entry to Called, begin timer and attempt notification.  


| AC ID | Given | When | Then |
|---|---|---|---|
| AC-189 | Given an eligible queue entry is being called or messaged | When Staff calls a Waiting entry | Then calling changes the entry from Waiting to Called. |
| AC-190 | Given an eligible queue entry is being called or messaged | When Staff calls a Waiting entry | Then the action starts the configured timer and attempts the table-ready message when contact exists. |
| AC-191 | Given an eligible queue entry is being called or messaged | When Staff calls a Waiting entry | Then no table number is required. |
| AC-192 | Given an eligible queue entry is being called or messaged | When Staff calls a Waiting entry | Then a concurrent stale call attempt cannot create a second active timer. |
| AC-193 | Given the approved MVP scope for `FEAT-033` | When a user looks for or attempts `automatic paid sms fallback` | Then the capability is not available as part of this feature and no hidden equivalent behavior is introduced. |
| AC-194 | Given an eligible queue entry is being called or messaged | When the external messaging path does not complete normally | Then queue lifecycle and timer truth remain valid even if message delivery is delayed, failed or retried. |

### FEAT-034 — Individual countdown

**Primary story:** `US-034`  

**Required outcome:** Show synchronized remaining time per entry.  


| AC ID | Given | When | Then |
|---|---|---|---|
| AC-195 | Given an eligible queue entry is being called or messaged | When an entry enters or remains Called | Then each Called entry has its own synchronized countdown. |
| AC-196 | Given an eligible queue entry is being called or messaged | When an entry enters or remains Called | Then remaining time is visible on staff and customer views. |
| AC-197 | Given an eligible queue entry is being called or messaged | When an entry enters or remains Called | Then timer state survives normal page closing and reopening. |
| AC-198 | Given an eligible queue entry is being called or messaged | When an entry enters or remains Called | Then the timer is not paused by delivery delay or customer acknowledgement. |
| AC-199 | Given the approved MVP scope for `FEAT-034` | When a user looks for or attempts `automatic paid sms fallback` | Then the capability is not available as part of this feature and no hidden equivalent behavior is introduced. |
| AC-200 | Given an eligible queue entry is being called or messaged | When the external messaging path does not complete normally | Then queue lifecycle and timer truth remain valid even if message delivery is delayed, failed or retried. |

### FEAT-035 — Final call

**Primary story:** `US-035`  

**Required outcome:** Attempt the final-call message one minute before the original deadline.  


| AC ID | Given | When | Then |
|---|---|---|---|
| AC-201 | Given an eligible queue entry is being called or messaged | When the original deadline reaches one minute remaining | Then the final-call event occurs one minute before the original configured call period expires. |
| AC-202 | Given an eligible queue entry is being called or messaged | When the original deadline reaches one minute remaining | Then the message is attempted only when an eligible contact exists. |
| AC-203 | Given an eligible queue entry is being called or messaged | When the original deadline reaches one minute remaining | Then the product records the attempt and outcome. |
| AC-204 | Given an eligible queue entry is being called or messaged | When the original deadline reaches one minute remaining | Then retrying messages does not schedule another final-call event. |
| AC-205 | Given the approved MVP scope for `FEAT-035` | When a user looks for or attempts `automatic paid sms fallback` | Then the capability is not available as part of this feature and no hidden equivalent behavior is introduced. |
| AC-206 | Given an eligible queue entry is being called or messaged | When the external messaging path does not complete normally | Then queue lifecycle and timer truth remain valid even if message delivery is delayed, failed or retried. |

### FEAT-036 — Grace period

**Primary story:** `US-036`  

**Required outcome:** Add two minutes exactly once.  


| AC ID | Given | When | Then |
|---|---|---|---|
| AC-207 | Given an eligible queue entry is being called or messaged | When the final-call event occurs | Then the final-call event adds exactly two minutes to the deadline. |
| AC-208 | Given an eligible queue entry is being called or messaged | When the final-call event occurs | Then the extension occurs once even when message delivery fails. |
| AC-209 | Given an eligible queue entry is being called or messaged | When the final-call event occurs | Then all active views show the revised deadline. |
| AC-210 | Given an eligible queue entry is being called or messaged | When the final-call event occurs | Then the grace period is a product rule, not a customer-controlled action. |
| AC-211 | Given the approved MVP scope for `FEAT-036` | When a user looks for or attempts `automatic paid sms fallback` | Then the capability is not available as part of this feature and no hidden equivalent behavior is introduced. |
| AC-212 | Given an eligible queue entry is being called or messaged | When the external messaging path does not complete normally | Then queue lifecycle and timer truth remain valid even if message delivery is delayed, failed or retried. |

### FEAT-037 — Manual additional time

**Primary story:** `US-037`  

**Required outcome:** Staff extends a timer and all views update.  


| AC ID | Given | When | Then |
|---|---|---|---|
| AC-213 | Given an eligible queue entry is being called or messaged | When Staff grants extra time | Then staff can add further time to an active Called entry. |
| AC-214 | Given an eligible queue entry is being called or messaged | When Staff grants extra time | Then the revised deadline updates for all users. |
| AC-215 | Given an eligible queue entry is being called or messaged | When Staff grants extra time | Then the action is attributed in the audit trail. |
| AC-216 | Given an eligible queue entry is being called or messaged | When Staff grants extra time | Then manual extra time does not reset or repeat the automatic final-call rule. |
| AC-217 | Given the approved MVP scope for `FEAT-037` | When a user looks for or attempts `automatic paid sms fallback` | Then the capability is not available as part of this feature and no hidden equivalent behavior is introduced. |
| AC-218 | Given an eligible queue entry is being called or messaged | When the external messaging path does not complete normally | Then queue lifecycle and timer truth remain valid even if message delivery is delayed, failed or retried. |

### FEAT-038 — WhatsApp messages

**Primary story:** `US-038`  

**Required outcome:** Use WhatsApp for approved operational calls where contact exists.  


| AC ID | Given | When | Then |
|---|---|---|---|
| AC-219 | Given an eligible queue entry is being called or messaged | When an approved operational message event occurs | Then the approved operational message set covers entry confirmation where commercially enabled, table-ready call, final call and cancellation/removal. |
| AC-220 | Given an eligible queue entry is being called or messaged | When an approved operational message event occurs | Then whatsApp is the primary automated channel. |
| AC-221 | Given an eligible queue entry is being called or messaged | When an approved operational message event occurs | Then the queue remains operable when messaging is unavailable. |
| AC-222 | Given an eligible queue entry is being called or messaged | When an approved operational message event occurs | Then no automatic paid SMS or voice fallback is included. |
| AC-223 | Given the approved MVP scope for `FEAT-038` | When a user looks for or attempts `automatic paid sms fallback` | Then the capability is not available as part of this feature and no hidden equivalent behavior is introduced. |
| AC-224 | Given an eligible queue entry is being called or messaged | When the external messaging path does not complete normally | Then queue lifecycle and timer truth remain valid even if message delivery is delayed, failed or retried. |

### FEAT-039 — Template personalization

**Primary story:** `US-039`  

**Required outcome:** Allow constrained approved fields, not unlimited automation.  


| AC ID | Given | When | Then |
|---|---|---|---|
| AC-225 | Given an eligible queue entry is being called or messaged | When the Administrator edits allowed template fields | Then administrator uses product-controlled templates with limited editable fields. |
| AC-226 | Given an eligible queue entry is being called or messaged | When the Administrator edits allowed template fields | Then editable content may include restaurant name, greeting and where to report. |
| AC-227 | Given an eligible queue entry is being called or messaged | When the Administrator edits allowed template fields | Then required operational meaning cannot be removed. |
| AC-228 | Given an eligible queue entry is being called or messaged | When the Administrator edits allowed template fields | Then the MVP does not include a free-form campaign or automation editor. |
| AC-229 | Given the approved MVP scope for `FEAT-039` | When a user looks for or attempts `automatic paid sms fallback` | Then the capability is not available as part of this feature and no hidden equivalent behavior is introduced. |
| AC-230 | Given an eligible queue entry is being called or messaged | When the external messaging path does not complete normally | Then queue lifecycle and timer truth remain valid even if message delivery is delayed, failed or retried. |

### FEAT-040 — Delivery visibility

**Primary story:** `US-040`  

**Required outcome:** Show truthful provider-supported status.  


| AC ID | Given | When | Then |
|---|---|---|---|
| AC-231 | Given an eligible queue entry is being called or messaged | When a message attempt receives or lacks a provider outcome | Then staff sees truthful states supported by the messaging service, such as attempted, sent, delivered or failed. |
| AC-232 | Given an eligible queue entry is being called or messaged | When a message attempt receives or lacks a provider outcome | Then the product does not invent read status. |
| AC-233 | Given an eligible queue entry is being called or messaged | When a message attempt receives or lacks a provider outcome | Then a delayed provider update does not block queue operation. |
| AC-234 | Given an eligible queue entry is being called or messaged | When a message attempt receives or lacks a provider outcome | Then no-contact and not-attempted states are distinguishable from failure. |
| AC-235 | Given the approved MVP scope for `FEAT-040` | When a user looks for or attempts `automatic paid sms fallback` | Then the capability is not available as part of this feature and no hidden equivalent behavior is introduced. |
| AC-236 | Given an eligible queue entry is being called or messaged | When the external messaging path does not complete normally | Then queue lifecycle and timer truth remain valid even if message delivery is delayed, failed or retried. |

### FEAT-041 — Retry

**Primary story:** `US-041`  

**Required outcome:** Staff retries without duplicating grace periods or state transitions.  


| AC ID | Given | When | Then |
|---|---|---|---|
| AC-237 | Given an eligible queue entry is being called or messaged | When Staff retries an eligible failed message | Then staff may retry a failed eligible message. |
| AC-238 | Given an eligible queue entry is being called or messaged | When Staff retries an eligible failed message | Then a retry is recorded as a separate attempt for consumption measurement. |
| AC-239 | Given an eligible queue entry is being called or messaged | When Staff retries an eligible failed message | Then retry does not duplicate state transition, countdown or grace period. |
| AC-240 | Given an eligible queue entry is being called or messaged | When Staff retries an eligible failed message | Then the most recent result and attempt history remain understandable. |
| AC-241 | Given the approved MVP scope for `FEAT-041` | When a user looks for or attempts `automatic paid sms fallback` | Then the capability is not available as part of this feature and no hidden equivalent behavior is introduced. |
| AC-242 | Given an eligible queue entry is being called or messaged | When the external messaging path does not complete normally | Then queue lifecycle and timer truth remain valid even if message delivery is delayed, failed or retried. |

### FEAT-042 — Consumption measurement

**Primary story:** `US-042`  

**Required outcome:** Count message attempts and outcomes per establishment.  


| AC ID | Given | When | Then |
|---|---|---|---|
| AC-243 | Given an eligible queue entry is being called or messaged | When an operational message attempt occurs | Then message attempts and available outcomes are counted per establishment and service. |
| AC-244 | Given an eligible queue entry is being called or messaged | When an operational message attempt occurs | Then counts distinguish message purpose where operationally useful. |
| AC-245 | Given an eligible queue entry is being called or messaged | When an operational message attempt occurs | Then the data supports later pricing and margin validation. |
| AC-246 | Given an eligible queue entry is being called or messaged | When an operational message attempt occurs | Then the feature does not itself define packages, overages or invoices. |
| AC-247 | Given the approved MVP scope for `FEAT-042` | When a user looks for or attempts `automatic paid sms fallback` | Then the capability is not available as part of this feature and no hidden equivalent behavior is introduced. |
| AC-248 | Given an eligible queue entry is being called or messaged | When the external messaging path does not complete normally | Then queue lifecycle and timer truth remain valid even if message delivery is delayed, failed or retried. |

### FEAT-043 — Private status page

**Primary story:** `US-043`  

**Required outcome:** Provide an unguessable entry-specific web link.  


| AC ID | Given | When | Then |
|---|---|---|---|
| AC-249 | Given a customer opens the valid private status page for an active entry | When the customer opens the entry-specific link | Then every accepted customer entry receives an unguessable entry-specific link. |
| AC-250 | Given a customer opens the valid private status page for an active entry | When the customer opens the entry-specific link | Then the link does not expose the phone number. |
| AC-251 | Given a customer opens the valid private status page for an active entry | When the customer opens the entry-specific link | Then the customer can close and reopen the page while the link remains valid. |
| AC-252 | Given a customer opens the valid private status page for an active entry | When the customer opens the entry-specific link | Then after service closure the page shows a safe final or expired state. |
| AC-253 | Given the approved MVP scope for `FEAT-043` | When a user looks for or attempts `customer account` | Then the capability is not available as part of this feature and no hidden equivalent behavior is introduced. |
| AC-254 | Given a customer opens the valid private status page for an active entry | When the customer attempts an unavailable or unauthorized self-service action | Then no other entry, internal note or unauthorized operational field is exposed or changed. |

### FEAT-044 — Groups-ahead position

**Primary story:** `US-044`  

**Required outcome:** Show groups ahead and the order-variation explanation.  


| AC ID | Given | When | Then |
|---|---|---|---|
| AC-255 | Given a customer opens the valid private status page for an active entry | When the Waiting queue changes | Then the customer sees the number of active groups ahead. |
| AC-256 | Given a customer opens the valid private status page for an active entry | When the Waiting queue changes | Then supporting copy explains that order may vary by party size and available tables. |
| AC-257 | Given a customer opens the valid private status page for an active entry | When the Waiting queue changes | Then the MVP does not show a predicted wait time. |
| AC-258 | Given a customer opens the valid private status page for an active entry | When the Waiting queue changes | Then the displayed value recalculates after relevant queue changes. |
| AC-259 | Given the approved MVP scope for `FEAT-044` | When a user looks for or attempts `customer account` | Then the capability is not available as part of this feature and no hidden equivalent behavior is introduced. |
| AC-260 | Given a customer opens the valid private status page for an active entry | When the customer attempts an unavailable or unauthorized self-service action | Then no other entry, internal note or unauthorized operational field is exposed or changed. |

### FEAT-045 — Customer edit

**Primary story:** `US-045`  

**Required outcome:** Allow name and preference edits; phone remains staff-controlled.  


| AC ID | Given | When | Then |
|---|---|---|---|
| AC-261 | Given a customer opens the valid private status page for an active entry | When the customer edits an allowed or restricted field | Then the customer may directly edit name and approved optional preferences. |
| AC-262 | Given a customer opens the valid private status page for an active entry | When the customer edits an allowed or restricted field | Then phone-number changes require staff intervention. |
| AC-263 | Given a customer opens the valid private status page for an active entry | When the customer edits an allowed or restricted field | Then edits update the operational view and are attributable where material. |
| AC-264 | Given a customer opens the valid private status page for an active entry | When the customer edits an allowed or restricted field | Then the customer cannot edit internal notes or outcomes. |
| AC-265 | Given the approved MVP scope for `FEAT-045` | When a user looks for or attempts `customer account` | Then the capability is not available as part of this feature and no hidden equivalent behavior is introduced. |
| AC-266 | Given a customer opens the valid private status page for an active entry | When the customer attempts an unavailable or unauthorized self-service action | Then no other entry, internal note or unauthorized operational field is exposed or changed. |

### FEAT-046 — Party-size change

**Primary story:** `US-046`  

**Required outcome:** Apply reductions and low-risk increases automatically; route larger increases for approval.  


| AC ID | Given | When | Then |
|---|---|---|---|
| AC-267 | Given a customer opens the valid private status page for an active entry | When the customer requests a party-size change | Then party-size reductions apply automatically. |
| AC-268 | Given a customer opens the valid private status page for an active entry | When the customer requests a party-size change | Then increases below the configured approval threshold apply automatically. |
| AC-269 | Given a customer opens the valid private status page for an active entry | When the customer requests a party-size change | Then increases at or above the threshold remain pending until staff approves or rejects. |
| AC-270 | Given a customer opens the valid private status page for an active entry | When the customer requests a party-size change | Then default: +1 automatic; +2 or more requires approval. |
| AC-271 | Given a customer opens the valid private status page for an active entry | When the customer requests a party-size change | Then approved changes recalculate capacity, labels and any capacity conflict. |
| AC-272 | Given the approved MVP scope for `FEAT-046` | When a user looks for or attempts `customer account` | Then the capability is not available as part of this feature and no hidden equivalent behavior is introduced. |
| AC-273 | Given a customer opens the valid private status page for an active entry | When the customer attempts an unavailable or unauthorized self-service action | Then no other entry, internal note or unauthorized operational field is exposed or changed. |

### FEAT-047 — Confirmed leave

**Primary story:** `US-047`  

**Required outcome:** Require explicit confirmation before customer cancellation.  


| AC ID | Given | When | Then |
|---|---|---|---|
| AC-274 | Given a customer opens the valid private status page for an active entry | When the customer selects and confirms or cancels Leave queue | Then leave queue first opens a clear confirmation step. |
| AC-275 | Given a customer opens the valid private status page for an active entry | When the customer selects and confirms or cancels Leave queue | Then confirmation produces Cancelled by customer. |
| AC-276 | Given a customer opens the valid private status page for an active entry | When the customer selects and confirms or cancels Leave queue | Then cancellation frees capacity and updates queue positions. |
| AC-277 | Given a customer opens the valid private status page for an active entry | When the customer selects and confirms or cancels Leave queue | Then the action cannot be reversed by the customer; staff may handle exceptional correction during the active service. |
| AC-278 | Given the approved MVP scope for `FEAT-047` | When a user looks for or attempts `customer account` | Then the capability is not available as part of this feature and no hidden equivalent behavior is introduced. |
| AC-279 | Given a customer opens the valid private status page for an active entry | When the customer attempts an unavailable or unauthorized self-service action | Then no other entry, internal note or unauthorized operational field is exposed or changed. |

### FEAT-048 — “I’m on my way”

**Primary story:** `US-048`  

**Required outcome:** Record acknowledgement without extending time.  


| AC ID | Given | When | Then |
|---|---|---|---|
| AC-280 | Given a customer opens the valid private status page for an active entry | When the Called customer selects the acknowledgement | Then the action is available to a Called customer. |
| AC-281 | Given a customer opens the valid private status page for an active entry | When the Called customer selects the acknowledgement | Then selecting it records a visible acknowledgement for staff. |
| AC-282 | Given a customer opens the valid private status page for an active entry | When the Called customer selects the acknowledgement | Then it does not pause, reset or extend the timer. |
| AC-283 | Given a customer opens the valid private status page for an active entry | When the Called customer selects the acknowledgement | Then repeated selections do not create repeated operational effects. |
| AC-284 | Given the approved MVP scope for `FEAT-048` | When a user looks for or attempts `customer account` | Then the capability is not available as part of this feature and no hidden equivalent behavior is introduced. |
| AC-285 | Given a customer opens the valid private status page for an active entry | When the customer attempts an unavailable or unauthorized self-service action | Then no other entry, internal note or unauthorized operational field is exposed or changed. |

### FEAT-049 — Mark Seated

**Primary story:** `US-049`  

**Required outcome:** Allow from Waiting or Called and update all dependent information.  


| AC ID | Given | When | Then |
|---|---|---|---|
| AC-286 | Given authorized Staff or Administrator are resolving or reviewing the current service | When Staff marks an eligible entry Seated | Then staff can mark a Waiting or Called entry Seated. |
| AC-287 | Given authorized Staff or Administrator are resolving or reviewing the current service | When Staff marks an eligible entry Seated | Then the entry becomes terminal, frees capacity and moves to Recently completed. |
| AC-288 | Given authorized Staff or Administrator are resolving or reviewing the current service | When Staff marks an eligible entry Seated | Then queue positions and pass-over calculations update. |
| AC-289 | Given authorized Staff or Administrator are resolving or reviewing the current service | When Staff marks an eligible entry Seated | Then the action records actor and time. |
| AC-290 | Given the approved MVP scope for `FEAT-049` | When a user looks for or attempts `advanced business intelligence` | Then the capability is not available as part of this feature and no hidden equivalent behavior is introduced. |
| AC-291 | Given authorized Staff or Administrator are resolving or reviewing the current service | When the outcome action is repeated, corrected or conflicts with a newer state | Then one terminal or corrected truth is retained, derived values recalculate, and material action history remains attributable. |

### FEAT-050 — Cancel with actor/reason

**Primary story:** `US-050`  

**Required outcome:** Preserve cancellation source.  


| AC ID | Given | When | Then |
|---|---|---|---|
| AC-292 | Given authorized Staff or Administrator are resolving or reviewing the current service | When Staff cancels an eligible entry | Then staff cancellation distinguishes cancelled by customer and cancelled by restaurant. |
| AC-293 | Given authorized Staff or Administrator are resolving or reviewing the current service | When Staff cancels an eligible entry | Then no-show remains its own terminal outcome. |
| AC-294 | Given authorized Staff or Administrator are resolving or reviewing the current service | When Staff cancels an eligible entry | Then cancellation frees capacity and may trigger an approved customer notice. |
| AC-295 | Given authorized Staff or Administrator are resolving or reviewing the current service | When Staff cancels an eligible entry | Then the source is retained in history and audit. |
| AC-296 | Given the approved MVP scope for `FEAT-050` | When a user looks for or attempts `advanced business intelligence` | Then the capability is not available as part of this feature and no hidden equivalent behavior is introduced. |
| AC-297 | Given authorized Staff or Administrator are resolving or reviewing the current service | When the outcome action is repeated, corrected or conflicts with a newer state | Then one terminal or corrected truth is retained, derived values recalculate, and material action history remains attributable. |

### FEAT-051 — Mark No-show

**Primary story:** `US-051`  

**Required outcome:** Staff explicitly resolves the entry as No-show.  


| AC ID | Given | When | Then |
|---|---|---|---|
| AC-298 | Given authorized Staff or Administrator are resolving or reviewing the current service | When Staff marks an eligible entry No-show | Then staff explicitly marks a group No-show. |
| AC-299 | Given authorized Staff or Administrator are resolving or reviewing the current service | When Staff marks an eligible entry No-show | Then the entry frees capacity and leaves active sections. |
| AC-300 | Given authorized Staff or Administrator are resolving or reviewing the current service | When Staff marks an eligible entry No-show | Then timer expiry alone does not silently mark no-show. |
| AC-301 | Given authorized Staff or Administrator are resolving or reviewing the current service | When Staff marks an eligible entry No-show | Then the outcome is included in service history. |
| AC-302 | Given the approved MVP scope for `FEAT-051` | When a user looks for or attempts `advanced business intelligence` | Then the capability is not available as part of this feature and no hidden equivalent behavior is introduced. |
| AC-303 | Given authorized Staff or Administrator are resolving or reviewing the current service | When the outcome action is repeated, corrected or conflicts with a newer state | Then one terminal or corrected truth is retained, derived values recalculate, and material action history remains attributable. |

### FEAT-052 — Reactivate No-show

**Primary story:** `US-052`  

**Required outcome:** Return it to Waiting at the queue end.  


| AC ID | Given | When | Then |
|---|---|---|---|
| AC-304 | Given authorized Staff or Administrator are resolving or reviewing the current service | When Staff reactivates a current-service No-show | Then staff may reactivate a current-service No-show. |
| AC-305 | Given authorized Staff or Administrator are resolving or reviewing the current service | When Staff reactivates a current-service No-show | Then the group returns to Waiting at the end of the current queue. |
| AC-306 | Given authorized Staff or Administrator are resolving or reviewing the current service | When Staff reactivates a current-service No-show | Then current capacity must permit or clearly surface the operational conflict. |
| AC-307 | Given authorized Staff or Administrator are resolving or reviewing the current service | When Staff reactivates a current-service No-show | Then the original no-show and reactivation remain in audit history. |
| AC-308 | Given the approved MVP scope for `FEAT-052` | When a user looks for or attempts `advanced business intelligence` | Then the capability is not available as part of this feature and no hidden equivalent behavior is introduced. |
| AC-309 | Given authorized Staff or Administrator are resolving or reviewing the current service | When the outcome action is repeated, corrected or conflicts with a newer state | Then one terminal or corrected truth is retained, derived values recalculate, and material action history remains attributable. |

### FEAT-053 — Internal notes

**Primary story:** `US-053`  

**Required outcome:** Staff can add non-customer-visible operational notes.  


| AC ID | Given | When | Then |
|---|---|---|---|
| AC-310 | Given authorized Staff or Administrator are resolving or reviewing the current service | When Staff adds or reads an internal note | Then staff can attach internal operational text to an entry. |
| AC-311 | Given authorized Staff or Administrator are resolving or reviewing the current service | When Staff adds or reads an internal note | Then notes are not visible to the customer. |
| AC-312 | Given authorized Staff or Administrator are resolving or reviewing the current service | When Staff adds or reads an internal note | Then notes do not create new lifecycle states or pause time. |
| AC-313 | Given authorized Staff or Administrator are resolving or reviewing the current service | When Staff adds or reads an internal note | Then the product should keep note entry optional and lightweight. |
| AC-314 | Given the approved MVP scope for `FEAT-053` | When a user looks for or attempts `advanced business intelligence` | Then the capability is not available as part of this feature and no hidden equivalent behavior is introduced. |
| AC-315 | Given authorized Staff or Administrator are resolving or reviewing the current service | When the outcome action is repeated, corrected or conflicts with a newer state | Then one terminal or corrected truth is retained, derived values recalculate, and material action history remains attributable. |

### FEAT-054 — Outcome correction

**Primary story:** `US-054`  

**Required outcome:** Permit an Administrator to correct a completed outcome during the current service, with recalculation and audit.  


| AC ID | Given | When | Then |
|---|---|---|---|
| AC-316 | Given authorized Staff or Administrator are resolving or reviewing the current service | When the Administrator corrects a terminal outcome | Then an Administrator may correct a terminal outcome during the same active service. |
| AC-317 | Given authorized Staff or Administrator are resolving or reviewing the current service | When the Administrator corrects a terminal outcome | Then the correction recalculates capacity, queue-derived values and metrics. |
| AC-318 | Given authorized Staff or Administrator are resolving or reviewing the current service | When the Administrator corrects a terminal outcome | Then the original and corrected values remain in the audit trail. |
| AC-319 | Given authorized Staff or Administrator are resolving or reviewing the current service | When the Administrator corrects a terminal outcome | Then no correction is allowed after service closure. |
| AC-320 | Given the approved MVP scope for `FEAT-054` | When a user looks for or attempts `advanced business intelligence` | Then the capability is not available as part of this feature and no hidden equivalent behavior is introduced. |
| AC-321 | Given authorized Staff or Administrator are resolving or reviewing the current service | When the outcome action is repeated, corrected or conflicts with a newer state | Then one terminal or corrected truth is retained, derived values recalculate, and material action history remains attributable. |

### FEAT-055 — Audit trail

**Primary story:** `US-055`  

**Required outcome:** Preserve material events and actors.  


| AC ID | Given | When | Then |
|---|---|---|---|
| AC-322 | Given authorized Staff or Administrator are resolving or reviewing the current service | When a material product action occurs | Then material actions retain actor, timestamp, action and relevant before/after context. |
| AC-323 | Given authorized Staff or Administrator are resolving or reviewing the current service | When a material product action occurs | Then the trail includes configuration changes, service controls, calls, extensions, outcomes, corrections, pass-over reasons and QR regeneration. |
| AC-324 | Given authorized Staff or Administrator are resolving or reviewing the current service | When a material product action occurs | Then audit supports trust and diagnosis without becoming the primary live interface. |
| AC-325 | Given authorized Staff or Administrator are resolving or reviewing the current service | When a material product action occurs | Then historical attribution survives staff deactivation. |
| AC-326 | Given the approved MVP scope for `FEAT-055` | When a user looks for or attempts `advanced business intelligence` | Then the capability is not available as part of this feature and no hidden equivalent behavior is introduced. |
| AC-327 | Given authorized Staff or Administrator are resolving or reviewing the current service | When the outcome action is repeated, corrected or conflicts with a newer state | Then one terminal or corrected truth is retained, derived values recalculate, and material action history remains attributable. |

### FEAT-056 — Closed-service history

**Primary story:** `US-056`  

**Required outcome:** Provide the approved summary and read-only records.  


| AC ID | Given | When | Then |
|---|---|---|---|
| AC-328 | Given authorized Staff or Administrator are resolving or reviewing the current service | When the Administrator opens a closed service | Then closed services show date/time, received, seated, cancellations, no-shows, average and maximum wait, pass-overs, messages sent and messages failed. |
| AC-329 | Given authorized Staff or Administrator are resolving or reviewing the current service | When the Administrator opens a closed service | Then closed records are read-only. |
| AC-330 | Given authorized Staff or Administrator are resolving or reviewing the current service | When the Administrator opens a closed service | Then the history remains basic and operational rather than an advanced BI suite. |
| AC-331 | Given authorized Staff or Administrator are resolving or reviewing the current service | When the Administrator opens a closed service | Then metrics use consistent definitions documented with the product. |
| AC-332 | Given the approved MVP scope for `FEAT-056` | When a user looks for or attempts `advanced business intelligence` | Then the capability is not available as part of this feature and no hidden equivalent behavior is introduced. |
| AC-333 | Given authorized Staff or Administrator are resolving or reviewing the current service | When the outcome action is repeated, corrected or conflicts with a newer state | Then one terminal or corrected truth is retained, derived values recalculate, and material action history remains attributable. |

### FEAT-057 — Discreet branding

**Primary story:** `US-057`  

**Required outcome:** Show small MesaFlow branding on customer pages in the initial plan.  


| AC ID | Given | When | Then |
|---|---|---|---|
| AC-334 | Given the relevant Staff or customer page is opened on a supported device | When a customer-facing page renders | Then customer-facing public and status pages show a small MesaFlow mark in the footer. |
| AC-335 | Given the relevant Staff or customer page is opened on a supported device | When a customer-facing page renders | Then restaurant identity remains visually primary. |
| AC-336 | Given the relevant Staff or customer page is opened on a supported device | When a customer-facing page renders | Then the initial plan does not allow removal. |
| AC-337 | Given the relevant Staff or customer page is opened on a supported device | When a customer-facing page renders | Then future commercial plans may revisit white-label capability. |
| AC-338 | Given the approved MVP scope for `FEAT-057` | When a user looks for or attempts `white-label removal in initial plan` | Then the capability is not available as part of this feature and no hidden equivalent behavior is introduced. |
| AC-339 | Given the relevant Staff or customer page is opened on a supported device | When the page renders at another supported breakpoint or interaction mode | Then the same approved feature meaning and critical actions remain available without relying only on color or device-specific behavior. |

### FEAT-058 — Tablet and desktop staff experience

**Primary story:** `US-058`  

**Required outcome:** Primary staff workflows are fully usable on both form factors.  


| AC ID | Given | When | Then |
|---|---|---|---|
| AC-340 | Given the relevant Staff or customer page is opened on a supported device | When Staff performs a primary workflow on tablet or desktop | Then all primary staff operations are usable on common tablet and desktop dimensions. |
| AC-341 | Given the relevant Staff or customer page is opened on a supported device | When Staff performs a primary workflow on tablet or desktop | Then the product does not assume a mouse-only workflow. |
| AC-342 | Given the relevant Staff or customer page is opened on a supported device | When Staff performs a primary workflow on tablet or desktop | Then critical information remains readable during a busy service. |
| AC-343 | Given the relevant Staff or customer page is opened on a supported device | When Staff performs a primary workflow on tablet or desktop | Then responsive adaptation must preserve action meaning and current state. |
| AC-344 | Given the approved MVP scope for `FEAT-058` | When a user looks for or attempts `white-label removal in initial plan` | Then the capability is not available as part of this feature and no hidden equivalent behavior is introduced. |
| AC-345 | Given the relevant Staff or customer page is opened on a supported device | When the page renders at another supported breakpoint or interaction mode | Then the same approved feature meaning and critical actions remain available without relying only on color or device-specific behavior. |

### FEAT-059 — Mobile-first customer experience

**Primary story:** `US-059`  

**Required outcome:** All public and status flows are designed for common mobile screens.  


| AC ID | Given | When | Then |
|---|---|---|---|
| AC-346 | Given the relevant Staff or customer page is opened on a supported device | When a customer performs a public or private workflow on mobile | Then public welcome, form, confirmation and status flows are designed primarily for mobile browsers. |
| AC-347 | Given the relevant Staff or customer page is opened on a supported device | When a customer performs a public or private workflow on mobile | Then no app installation or customer account is required. |
| AC-348 | Given the relevant Staff or customer page is opened on a supported device | When a customer performs a public or private workflow on mobile | Then touch targets, validation and content hierarchy support one-handed use. |
| AC-349 | Given the relevant Staff or customer page is opened on a supported device | When a customer performs a public or private workflow on mobile | Then the experience remains usable when reopened from a WhatsApp link. |
| AC-350 | Given the approved MVP scope for `FEAT-059` | When a user looks for or attempts `white-label removal in initial plan` | Then the capability is not available as part of this feature and no hidden equivalent behavior is introduced. |
| AC-351 | Given the relevant Staff or customer page is opened on a supported device | When the page renders at another supported breakpoint or interaction mode | Then the same approved feature meaning and critical actions remain available without relying only on color or device-specific behavior. |

---

## 4. Cross-feature integrity acceptance


### US-060 — Run a complete service without paper

| AC ID | Given | When | Then |
|---|---|---|---|
| AC-352 | Given a configured restaurant and authorized Staff | When the team opens, operates and closes a scripted service | Then the complete queue journey succeeds without a parallel paper source of truth. |
| AC-353 | Given the active service contains QR and manual entries | When the team calls and resolves all groups | Then every accepted entry is represented in exactly one active section or one terminal outcome. |
| AC-354 | Given all active entries are resolved | When Staff ends the service | Then the service becomes read-only and basic history is available. |

### US-061 — Preserve one current entry truth

| AC ID | Given | When | Then |
|---|---|---|---|
| AC-355 | Given two Staff devices display the same entry | When they submit incompatible actions nearly simultaneously | Then only one compatible current lifecycle truth is accepted. |
| AC-356 | Given a Staff device reconnects after missing newer updates | When it synchronizes | Then it receives current truth and does not overwrite it with stale state. |
| AC-357 | Given an action is double-submitted or retried | When the product processes the duplicate attempt | Then the business effect occurs at most once. |

### US-062 — Continue when WhatsApp is unavailable

| AC ID | Given | When | Then |
|---|---|---|---|
| AC-358 | Given the messaging provider is unavailable | When Staff adds, calls and resolves entries | Then the queue remains operational and failure is visible. |
| AC-359 | Given a Called message fails | When the countdown continues | Then Staff can retry or recover manually without losing the entry. |
| AC-360 | Given a retry succeeds or fails | When the result returns | Then no duplicate call state, final-call event or grace period is created. |

### US-063 — Treat assisted and QR customers equally

| AC ID | Given | When | Then |
|---|---|---|---|
| AC-361 | Given one customer joins through QR and another is entered manually | When Staff views the Waiting queue | Then both follow the same chronological, capacity and fairness rules. |
| AC-362 | Given a manual entry has no phone | When the entry waits | Then it remains fully operable and is clearly marked No contact. |
| AC-363 | Given a manual entry becomes long-wait protected | When later groups are seated | Then its pass-over and protection behavior matches a QR entry. |

### US-064 — Protect fairness without blocking judgement

| AC ID | Given | When | Then |
|---|---|---|---|
| AC-364 | Given an earlier Waiting entry is protected | When Staff seats a later group | Then a valid quick reason is required and the action remains possible. |
| AC-365 | Given a later group is Seated | When an earlier entry remains active | Then the qualifying pass-over count increases. |
| AC-366 | Given a later group is Cancelled or No-show | When the earlier entry remains active | Then no pass-over is added. |

### US-065 — Keep capacity consistent across entry paths

| AC ID | Given | When | Then |
|---|---|---|---|
| AC-367 | Given only one weighted slot remains | When competing QR or manual submissions occur | Then only entries fitting committed capacity are accepted. |
| AC-368 | Given a pending party-size increase exists | When capacity is calculated | Then the pending size does not affect usage. |
| AC-369 | Given an entry reaches a terminal outcome | When capacity recalculates | Then public and Staff availability use the same new value. |

### US-066 — Preserve safe private customer access

| AC ID | Given | When | Then |
|---|---|---|---|
| AC-370 | Given a customer has a valid private link | When the link is opened | Then only that entry’s approved customer-visible state is shown. |
| AC-371 | Given a private link is guessed or altered | When access is attempted | Then another customer’s data is not exposed. |
| AC-372 | Given a service is closed | When the customer reopens the link | Then a safe final or expired state is shown without active-edit capability. |

### US-067 — Maintain usability on restaurant devices

| AC ID | Given | When | Then |
|---|---|---|---|
| AC-373 | Given Staff uses a supported tablet | When they add, call and resolve groups | Then all primary actions and critical state remain usable. |
| AC-374 | Given Staff uses a supported desktop | When they operate the same service | Then feature meaning and permissions are equivalent. |
| AC-375 | Given a warning or message state is shown | When the display is viewed without color cues | Then the state remains understandable. |

### US-068 — Measure pilot evidence without advanced BI

| AC ID | Given | When | Then |
|---|---|---|---|
| AC-376 | Given a service closes | When the Administrator opens history | Then all approved service and message metrics are present and read-only. |
| AC-377 | Given a material action occurred | When the team reconstructs the incident | Then actor, time and relevant state transition can be identified. |
| AC-378 | Given message attempts occurred | When usage is reviewed | Then attempts and available outcomes are measurable without defining billing mechanics. |

---

## 5. Acceptance totals

This document defines **378 acceptance criteria**.

Every canonical feature has:

- direct behavior criteria derived from `FEATURE_CATALOG.md`;
- an explicit scope-boundary criterion;
- a permission, failure or consistency criterion;
- linkage to its primary user story.

---

## 6. Release acceptance rule

The MVP is not accepted when:

- a feature passes in isolation but its linked journey fails;
- a UI indicates success but the business state did not change;
- a rule is satisfied on one device and contradicted on another;
- messaging failure is hidden;
- capacity differs across entry paths;
- customer access exposes unauthorized data;
- service history cannot be reconciled;
- Staff requires paper to compensate for missing product truth.

---

## 7. Traceability use

QA and implementation planning should reference:

- feature ID;
- user-story ID;
- acceptance-criterion ID;
- relevant business-rule IDs;
- edge-case IDs;
- applicable NFR IDs.

Do not replace these acceptance criteria with implementation-only unit tasks.
