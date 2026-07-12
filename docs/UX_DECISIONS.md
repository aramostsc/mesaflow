> **Product:** MesaFlow  
> **Phase:** UX/UI Design  
> **Baseline:** MVP / Pilot Release  
> **Date:** 2026-07-10  
> **Owner:** Principal UX/UI Designer

# UX Decisions

## Documentation audit summary
### Product objective
Replace the paper waiting list with a fast, reliable digital operational flow that requires no customer application.

### Users
Restaurant administrator, manager/shift lead, host/receptionist, authorised staff and walk-in customer.

### Core MVP flows
Open service, accept entries manually or by QR, call, seat, no-show, reactivate, customer status, leave queue, close intake/service, team access and operational history/audit.

### Rules and architectural constraints reflected
- Responsive web experience.
- One restaurant tenant must never see another tenant’s data.
- PostgreSQL/system state is authoritative; concurrent actions use version/conflict handling.
- Live updates reconcile with authoritative state.
- WhatsApp delivery is asynchronous and does not control lifecycle success.
- Material actions are attributable and auditable.
- Public access uses QR/status credentials without account creation.
- Reservations, table inventory, predictive waits, multiple simultaneous queues and native applications are excluded from MVP.

## Decision log
| ID | Decision | Rationale |
|---|---|---|
| UX-001 | Queue is default staff landing page | operational work dominates |
| UX-002 | Separate lifecycle and WhatsApp status | delivery failure must not imply queue failure |
| UX-003 | Call and Seat are direct row actions | highest-frequency tasks require one action |
| UX-004 | No-show requires confirmation | meaningful operational consequence |
| UX-005 | Entry detail opens without leaving queue | preserves context and speed |
| UX-006 | Tablet is primary staff layout | restaurant operating environment |
| UX-007 | Realtime degradation uses persistent banner | staff must know data may be delayed |
| UX-008 | Concurrent changes update silently unless work conflicts | avoid interrupting service |
| UX-009 | Public experience is linear and accountless | minimum customer friction |
| UX-010 | No estimated wait or guaranteed position invented | outside approved capability/accuracy |
| UX-011 | Invalid lifecycle actions are omitted | reduce errors and cognitive load |
| UX-012 | Errors preserve form data and context | recovery must be faster than re-entry |
| UX-013 | Reactivation is limited to current-service No-show entries | Cancelled is a terminal MVP outcome; UX must not expose Cancelled-to-Waiting recovery |

## Conflicts
Lifecycle wording was aligned with the approved product state model: Cancelled is terminal in the MVP, and only current-service No-show entries may be reactivated to Waiting at the queue end. Where wording or exact permission granularity is not explicit in UX documentation, capability checks remain controlled by the approved authorisation model rather than invented here.

## Final validation
- Core frequent actions fit within three actions.
- WhatsApp and realtime failures have degraded but usable states.
- Navigation separates live operations from administration.
- Components are reusable and state terminology is consistent.
- Tablet, desktop, mobile staff fallback and mobile public flows are covered.
- Wireframes cover the MVP operational surface.
- Documentation provides implementation guidance without selecting technology or changing scope.

UX/UI Design Phase Complete

Ready for Tech Lead Phase
