> **Product:** MesaFlow  
> **Architecture baseline:** MVP / Pilot Release  
> **Status:** Proposed architecture baseline  
> **Owner:** Software Architecture  
> **Date:** 2026-07-10  
> **Source baseline:** repository commit `583167147b626b370246dafc440eb961483bda63`

# Module Boundaries

| Module | Owns | May depend on |
|---|---|---|
| Identity & Access | Users, memberships, invitations, roles, sessions reference | Tenant |
| Tenant & Establishment | Tenant, establishment profile, configuration, QR secret/version | Identity |
| Service Operations | Service lifecycle and intake state | Tenant, Audit |
| Queue | Entries, ordering, capacity, fairness signals, transitions | Service, Tenant, Audit |
| Customer Access | Public QR resolution, status token, approved self-service commands | Queue, Service |
| Calling | Call deadlines, final call, grace period, extra time | Queue, Messaging |
| Messaging | Templates, requests, attempts, provider adapters, webhooks | Calling, Tenant |
| Audit & History | Append-only audit and closed-service projections | All modules through events |
| Metrics | Product and operational counters | Read-only event consumption |
| Subscription | Future plan/entitlement data | Tenant; not required for pilot billing UI |

## Protected rules

- Queue state changes may only occur through Queue commands.
- Capacity is calculated by Queue, never independently in UI or public endpoints.
- Messaging cannot mutate queue lifecycle state.
- Customer Access cannot change phone number.
- History cannot write to closed service data.
- Identity cannot infer tenant access from client-supplied identifiers.
- Provider webhooks cannot be trusted without signature verification and idempotency.

## Cross-module communication

Use in-process application interfaces and domain events. A module must not directly modify another module's tables. Shared database access is permitted only through module repositories and read-only operational projections.
