> **Product:** MesaFlow  
> **Phase:** UX/UI Design  
> **Baseline:** MVP / Pilot Release  
> **Date:** 2026-07-10  
> **Owner:** Principal UX/UI Designer

# Component Library

## ActionButton
**Purpose:** execute one command. **Props:** label, intent, size, icon, loading, disabled. **Rules:** one primary per region; loading preserves width; destructive intent never used for routine transitions.

## QueueEntryRow / QueueEntryCard
Shows name/reference, party size, elapsed time, lifecycle state, notification state and context actions. States: normal, selected, pending, recently changed, conflict, delivery warning. Entire row opens detail; action controls remain separately focusable.

## LifecycleBadge
Allowed labels: Waiting, Called, Seated, No-show, Left/Cancelled and any approved terminal state. Never colour-only.

## DeliveryBadge
Pending, Sent, Delivered, Failed, Unavailable. Separate from queue lifecycle to prevent the false impression that a failed message reversed an action.

## PartySizeControl
Numeric control with direct entry and large increment/decrement targets. Enforces approved limits and announces changes to assistive technology.

## PhoneInput
Country-aware display where approved; validates without blocking legitimate formats prematurely. Never logs or exposes full phone outside authorised contexts.

## EntryActionMenu
Contains lower-frequency actions such as edit, reactivate or cancel. Invalid transitions are omitted rather than disabled when state rules are definitive.

## ConfirmationSheet
Used for no-show, cancel, close intake and close service. Contains action, consequence, primary confirmation and safe cancel.

## Toast
Brief success feedback; never the sole location for important errors. Undo may be included for reversible actions.

## ConnectionBanner
Connected, reconnecting, offline and reconciled. Persistent only while degraded.

## EmptyState
Explains why content is empty and provides one relevant next action.

## SidePanel
Entry detail without losing queue context. On mobile becomes full-screen drawer.
