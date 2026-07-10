> **Product:** MesaFlow  
> **Architecture baseline:** MVP / Pilot Release  
> **Status:** Proposed architecture baseline  
> **Owner:** Software Architecture  
> **Date:** 2026-07-10  
> **Source baseline:** repository commit `583167147b626b370246dafc440eb961483bda63`

# Technical Risks

| ID | Severity | Risk | Mitigation | Owner |
|---|---|---|---|---|
| AR-RISK-001 | Critical | Cross-tenant data exposure | Mandatory tenant context, RLS, adversarial tests | Tech Lead + Security |
| AR-RISK-002 | Critical | Lost or conflicting queue mutations | Transactions, optimistic versioning, conflict UX | Backend + QA |
| AR-RISK-003 | High | WhatsApp approval/delivery constraints | Early provider spike, adapter, visible failure, manual contact | Tech Lead |
| AR-RISK-004 | High | Capacity disagreement between views | Single server-side calculation and integration tests | Backend |
| AR-RISK-005 | High | Timer/final-call duplication | Idempotent jobs and once-only fields | Backend |
| AR-RISK-006 | High | Public status token leakage | High-entropy hashed tokens, no logs, revocation | Security |
| AR-RISK-007 | High | Realtime disconnect creates stale action | Version checking, reconnect reconciliation, polling fallback | Frontend |
| AR-RISK-008 | High | Closed service remains mutable | Application guard, DB/testing defence, immutable history | Backend |
| AR-RISK-009 | Medium | Provider/vendor lock-in | Ports and adapters, normalised statuses | Architect |
| AR-RISK-010 | Medium | Free-text notes collect sensitive data | Guidance, access restriction, retention and redaction | Product + Security |
| AR-RISK-011 | Medium | Managed platform cost grows | Budgets, metrics and progressive scaling | DevOps |
| AR-RISK-012 | Medium | Browser/device incompatibility | Responsive E2E matrix and progressive enhancement | Frontend + QA |

No critical risk is accepted without a named mitigation and verification test before pilot.
