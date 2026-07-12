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
| AOQ-002 | Which managed authentication provider? | `ADR-011` recommends Supabase Auth, with Clerk/Auth.js as fallbacks pending cost/session-revocation validation | Tech Lead / Security | Provider adapter implementation |
| AOQ-003 | Prisma or Drizzle/Kysely? | Resolved by `ADR-009`: use Drizzle and Drizzle Kit; tenant context/RLS proof completed by `ADR-010` | Tech Lead / Database | Resolved in `ENG-A0-003` and `ENG-A0-004` |
| AOQ-004 | SSE hosted directly or managed realtime? | Resolved for A0 by `ADR-012`: SSE-first with reconciliation; validate hosting/runtime behaviour before product rollout | Tech Lead / DevOps | Resolved in `ENG-A0-006` |
| AOQ-005 | Exact retention periods? | Start with proposed baseline and obtain Product/Legal approval | Product / Legal | Production launch |
| AOQ-006 | Pilot RPO/RTO and budget? | RPO ≤15 min, RTO ≤4 h subject to cost approval | CEO / Project Manager | Production readiness |
| AOQ-007 | Data residency constraints beyond EU? | Use EU region by default | CEO / Legal | Vendor selection |
| AOQ-008 | Are WhatsApp delivery/read receipts contractually available? | Treat status as best-effort and expose Unknown | Product / Architect | Messaging UX copy |

No architectural question currently requires changing `FEAT-001`–`FEAT-059`.
