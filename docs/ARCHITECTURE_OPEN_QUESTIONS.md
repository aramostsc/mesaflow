> **Product:** MesaFlow  
> **Architecture baseline:** MVP / Pilot Release  
> **Status:** Proposed architecture baseline  
> **Owner:** Software Architecture  
> **Date:** 2026-07-10  
> **Source baseline:** repository commit `583167147b626b370246dafc440eb961483bda63`

# Architecture Open Questions

None of the following blocks UX design. Items marked **implementation gate** must be resolved before the related engineering work begins.

| ID | Question | Recommendation | Decision owner | Gate |
|---|---|---|---|---|
| AOQ-001 | Which WhatsApp Business provider? | Run a short spike comparing Meta direct Cloud API and one managed BSP | Tech Lead / Architect | Messaging implementation |
| AOQ-002 | Which managed authentication provider? | Select based on EU processing, session revocation, invitations and cost | Tech Lead / Security | Identity implementation |
| AOQ-003 | Prisma or Drizzle/Kysely? | Spike migrations, RLS and transaction ergonomics | Tech Lead / Database | Persistence foundation |
| AOQ-004 | SSE hosted directly or managed realtime? | Prefer SSE unless hosting limits or UX tests favour managed WebSockets | Tech Lead / DevOps | Multi-device implementation |
| AOQ-005 | Exact retention periods? | Start with proposed baseline and obtain Product/Legal approval | Product / Legal | Production launch |
| AOQ-006 | Pilot RPO/RTO and budget? | RPO ≤15 min, RTO ≤4 h subject to cost approval | CEO / Project Manager | Production readiness |
| AOQ-007 | Data residency constraints beyond EU? | Use EU region by default | CEO / Legal | Vendor selection |
| AOQ-008 | Are WhatsApp delivery/read receipts contractually available? | Treat status as best-effort and expose Unknown | Product / Architect | Messaging UX copy |

No architectural question currently requires changing `FEAT-001`–`FEAT-059`.
