# MesaFlow — Module Implementation Map

| Module ID | Module | Responsibility | Related UX | Dependencies | Primary agent |
|---|---|---|---|---|---|
| MOD-001 | Identity | Authentication session and user identity | S01, S02 | managed auth adapter | Backend |
| MOD-002 | Tenancy | Tenant context, establishment selection and isolation | all staff screens | Identity, DB/RLS | Database + Backend |
| MOD-003 | Memberships | Invitations, revocation and capabilities | S12, S18 | Identity, Tenancy, Audit | Backend |
| MOD-004 | Establishments | Supported restaurant configuration | S11, S13 | Tenancy, Authorization | Backend |
| MOD-005 | Services | Open service, intake lifecycle and closure | S03, S04, S08 | Establishments, Audit | Backend |
| MOD-006 | Queue | Entry creation, ordering, state transitions and capacity | S04–S07 | Services, Tenancy, Audit | Backend |
| MOD-007 | Realtime | SSE stream, reconnect and reconciliation | S04, S19 | Queue, Services | Backend + Frontend |
| MOD-008 | Public Access | QR resolution, join and private status credentials | S13–S17, S20 | Queue, Services | Backend |
| MOD-009 | Calls | Call records, deadline, final call and grace | S04, S06 | Queue, Audit | Backend |
| MOD-010 | Notifications | Outbox, worker, provider adapter, webhook and retry | delivery badges | Calls, Queue | Backend |
| MOD-011 | History | Read-only service and entry history | S09, S10 | Services, Queue, Audit | Backend |
| MOD-012 | Audit | Append-only material action evidence | activity panels | all command modules | Database + Backend |
| MOD-013 | Staff Web | Authenticated responsive interface | S01–S13, S18–S19 | all staff APIs | Frontend |
| MOD-014 | Public Web | Accountless mobile interface | S14–S17, S20 | Public Access | Frontend |
| MOD-015 | Operations | CI, deploy, logs, metrics and runbooks | n/a | whole system | DevOps |

## Module contract requirements

Each application command receives:

- authenticated or public principal;
- server-resolved tenant/establishment context where applicable;
- validated input;
- request/correlation ID;
- idempotency key for duplicate-sensitive commands;
- expected entity version for concurrent mutations where applicable.

Each command returns a normalized result and domain-safe error. Provider-specific errors never escape the adapter unchanged.

Post-A0 module sequencing and ownership for S1-S3 are refined in `S1_S3_REESTIMATION.md`. No module boundary or screen ownership changes.
