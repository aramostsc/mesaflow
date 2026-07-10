> **Product:** MesaFlow  
> **Phase:** UX/UI Design  
> **Baseline:** MVP / Pilot Release  
> **Date:** 2026-07-10  
> **Owner:** Principal UX/UI Designer

# Responsive Strategy

## Priority order
1. Tablet landscape and portrait.
2. Desktop/laptop.
3. Mobile staff fallback.
4. Mobile public customer as a dedicated primary experience.

## Breakpoint behaviour
### Wide desktop
Queue displayed as dense rows with Waiting and Called sections visible together where space permits. Entry detail opens in side panel.

### Tablet
Single operational column or two balanced sections. Sticky service header and Add customer control. Row actions use large touch targets.

### Mobile staff
Queue entries become cards. Only highest-frequency action remains visible; secondary actions move to an action sheet. Entry detail is full-screen. Avoid horizontal tables.

### Mobile customer
Single column, 16 px minimum body text, large status, no unnecessary navigation, keyboard-appropriate input types.

## Content priority
Never hide lifecycle state, customer/party identity, party size or primary next action. Notes, audit detail and timestamps may collapse progressively.

## Orientation and interruption
Support rotation without losing form data, selection or queue scroll position.
