> **Product:** MesaFlow  
> **Phase:** UX/UI Design  
> **Baseline:** MVP / Pilot Release  
> **Date:** 2026-07-10  
> **Owner:** Principal UX/UI Designer

# UX Principles

## Purpose
MesaFlow replaces a paper waiting list during a complete restaurant service. It must remain usable under pressure, noise, interruptions and concurrent operation from tablet, desktop and mobile.

## Principles
1. **Operational speed before visual novelty.** The interface optimises repeated service actions.
2. **Immediate comprehension.** A new employee must identify the next action without training material.
3. **Frequent actions in three actions or fewer.** Add, call, seat, mark no-show and reactivate are directly available from the active queue.
4. **One visible source of truth.** The current queue, current service state and entry state are always explicit.
5. **Prevent before explaining.** Disable invalid transitions, validate phone and party size inline, and hide capabilities the user lacks.
6. **Feedback immediately.** Every command shows pending, success or failure feedback without removing context.
7. **Recoverability.** Risky reversible actions provide Undo; destructive or legally relevant actions require confirmation.
8. **Degraded operation is first-class.** WhatsApp or realtime failure must never block queue operation.
9. **Tablet first.** Controls are touch-friendly, compact and usable one-handed where possible.
10. **Consistency over creativity.** The same state, action and message always looks and behaves the same.

## Experience targets
| Task | Target |
|---|---:|
| Understand current service state | < 2 seconds |
| Add walk-in customer | 15–25 seconds |
| Call next customer | 1 action + result |
| Seat called customer | 1 action |
| Mark no-show | 2 actions including confirmation |
| Recover from stale data | automatic refresh or 1 action |
| Learn core workflow | < 5 minutes |

## Non-negotiable constraints
- Customer uses a mobile browser, without account or installation.
- Staff may operate concurrently.
- WhatsApp delivery is asynchronous and its failure is visible but non-blocking.
- Cross-restaurant data is never exposed.
- Reservations, table inventory, predictive wait time, multiple queues and native apps are outside MVP.
