> **Product:** MesaFlow  
> **Phase:** UX/UI Design  
> **Baseline:** MVP / Pilot Release  
> **Date:** 2026-07-10  
> **Owner:** Principal UX/UI Designer

# Design System

## Foundations
### Typography
Use a highly legible system or product sans-serif. Minimum body 16 px on public/mobile, 14–16 px in staff tables. Numerical and status data must remain distinguishable.

### Spacing
4 px base unit. Common values: 4, 8, 12, 16, 24, 32, 48. Operational rows use 12–16 px internal spacing.

### Grid
- Desktop: 12 columns, max content width only where it improves scanning.
- Tablet: 8 columns.
- Mobile: 4 columns.
- Live queue may use full available width.

### Functional colour tokens
`surface`, `surface-raised`, `text-primary`, `text-secondary`, `border`, `focus`, `info`, `success`, `warning`, `danger`, `disabled`. Final values must meet contrast requirements. State always includes text/icon.

### Shape and elevation
Moderate radius, subtle elevation only for overlays and panels. Avoid decorative shadows.

## Core components
Buttons, icon buttons, text fields, phone input, number/party-size control, textarea, select, checkbox, radio, status badge, delivery badge, queue row/card, tabs, filters, search, modal, confirmation sheet, drawer, side panel, toast, inline alert, banner, skeleton, spinner, empty state, pagination/cursor loader, connection indicator and audit event.

## State model
Every interactive component supports default, hover where applicable, focus-visible, active, disabled, loading, error and success when meaningful.
