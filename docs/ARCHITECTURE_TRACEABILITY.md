> **Product:** MesaFlow  
> **Architecture baseline:** MVP / Pilot Release  
> **Status:** Proposed architecture baseline  
> **Owner:** Software Architecture  
> **Date:** 2026-07-10  
> **Source baseline:** repository commit `583167147b626b370246dafc440eb961483bda63`

# Architecture Traceability

## Capability groups

| Product scope | Features | Execution | Architecture modules | ADRs |
|---|---|---|---|---|
| Account/access | FEAT-001–005 | PBI-001–005, EPIC-A, M1 | Identity, Tenant | ADR-001, ADR-005 |
| QR/public entry | FEAT-006–014 | PBI-006–014, EPIC-B, M3 | Customer Access, Queue | ADR-002, ADR-005 |
| Assisted entry/capacity | FEAT-015–019 | PBI-015–019, EPIC-C, M2 | Queue | ADR-002, ADR-006 |
| Service operation | FEAT-020–027 | PBI-020–027, EPIC-D, M1–M2 | Service, Queue, Realtime | ADR-004, ADR-006 |
| Fairness | FEAT-028–032 | PBI-028–032, EPIC-E, M5 | Queue, Audit | ADR-002, ADR-007 |
| Calling/messaging | FEAT-033–042 | PBI-033–042, EPIC-F, M4 | Calling, Messaging | ADR-003, ADR-008 |
| Customer status | FEAT-043–048 | PBI-043–048 | Customer Access, Queue | ADR-005, ADR-006 |
| Outcomes/history | FEAT-049–056 | PBI-049–056 | Queue, Audit & History | ADR-002, ADR-007 |
| Responsive/branding | FEAT-057–059 | PBI-057–059 | Web UI | ADR-001 |

## Significant requirements

| Requirement | Source identifier | Architectural response |
|---|---|---|
| Browser-based, no customer app | PROD-SCOPE-001 | Responsive web architecture |
| One establishment and one active service in MVP | PROD-SCOPE-001 | Tenant/establishment/service model with UI restriction |
| Multi-device consistency | FEAT-027 / SCN-012 | Realtime notification + optimistic concurrency |
| WhatsApp failure non-blocking | FEAT-038–042 / SCN-007 | Transactional outbox and provider adapter |
| Exact lifecycle states | PROD-SCOPE-001 §6 | Queue state machine |
| Closed history read-only | FEAT-056 / SCN-013 | Immutable closed-service policy |
| Individual staff identity | PROD-SCOPE-001 rule 15 | Managed auth and memberships |
| No table assignment/reservations | OUT_OF_SCOPE | Separate future contexts; no MVP module |
