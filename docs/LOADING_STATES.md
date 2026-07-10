> **Product:** MesaFlow  
> **Phase:** UX/UI Design  
> **Baseline:** MVP / Pilot Release  
> **Date:** 2026-07-10  
> **Owner:** Principal UX/UI Designer

# Loading States

## Initial queue load
Show application shell immediately and skeleton rows. Display service status only after confirmed; never assume open/closed.

## Command pending
Keep the row visible, replace the invoked control with a compact progress state and disable only conflicting actions. Do not block the full queue.

## Background refresh
No global spinner. Use connection indicator and subtle “Updating…” text only when delay is perceptible.

## Public status
Show a compact skeleton for restaurant and status. After 8–10 seconds, replace with actionable retry guidance.

## Long operations
For exports or administrative operations, show progress or background completion only if such operations are approved in MVP. Do not invent progress percentages.

## Anti-patterns
- blank screens;
- full-page spinner for row actions;
- removing an entry before command acknowledgement without rollback;
- indefinite “Processing…” without recovery.
