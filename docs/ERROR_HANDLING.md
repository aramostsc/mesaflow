> **Product:** MesaFlow  
> **Phase:** UX/UI Design  
> **Baseline:** MVP / Pilot Release  
> **Date:** 2026-07-10  
> **Owner:** Principal UX/UI Designer

# Error Handling

## Error principles
State what happened, what remains safe, and the next action. Preserve entered data. Use stable user-facing wording mapped from machine-readable error codes.

| Scenario | UI behaviour | Primary message |
|---|---|---|
| Invalid field | inline at field + summary if needed | “Check the highlighted information.” |
| Permission denied | omit action or access screen | “You don’t have permission to do this.” |
| Entry changed elsewhere | refresh affected data | “This entry changed on another device. We’ve loaded the latest version.” |
| Invalid transition | retain context | “This action is no longer available for the current status.” |
| Offline | persistent banner; block unsafe commands | “You’re offline. The queue will refresh when the connection returns.” |
| Realtime unavailable | polling/reconciliation | “Live updates are delayed. We’re refreshing automatically.” |
| WhatsApp failure | warning badge, non-blocking | “Customer status updated, but the WhatsApp message wasn’t delivered.” |
| Rate limit | wait and retry guidance | “Too many attempts. Try again shortly.” |
| Service unavailable | retain form/context | “MesaFlow is temporarily unavailable. Your unsent information is still here.” |
| Public token invalid | terminal safe page | “This queue link is invalid or has expired.” |

## Destructive action confirmation
Use explicit labels such as **Mark as no-show**, never generic **Confirm**.

## Logging/privacy
Never expose correlation IDs by default, but make a support reference available where helpful. Do not show internal stack traces, provider credentials or tenant identifiers.
