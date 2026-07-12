> **Product:** MesaFlow  
> **Phase:** UX/UI Design  
> **Baseline:** MVP / Pilot Release  
> **Date:** 2026-07-10  
> **Owner:** Principal UX/UI Designer

# Interaction Patterns

## Command execution
1. Validate locally.
2. Lock only the affected action.
3. Show pending state.
4. Submit with idempotency protection.
5. Apply authoritative result.
6. Show concise feedback.
7. Update notification delivery independently.

## Optimistic interaction
Use only when rollback is understandable. Lifecycle actions should feel immediate, but server state remains authoritative. A rejected stale transition restores the row and explains what changed.

## Concurrent changes
When another device updates an entry:
- update the row automatically;
- briefly highlight the changed fields/state;
- do not interrupt unrelated work;
- while an edit form is open, preserve input and present a compare/reload choice.

## Confirmations
Confirm only actions with meaningful cost: no-show, cancellation, closing intake/service, removing access. Do not confirm routine call or seat actions.

## Undo
Prefer Undo for reversible operational mistakes. When Undo cannot be guaranteed, offer only the approved recovery action, such as Reactivate for current-service No-show entries. Cancelled entries are terminal in the MVP.

## Keyboard
Desktop shortcuts may support Add customer and search, but every action remains fully operable without shortcuts. Destructive shortcuts are prohibited.

## Search and filters
Search is secondary to the live queue. Filters show active state and provide Clear all. No hidden persistent filter may make entries appear missing.
