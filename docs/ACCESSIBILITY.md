> **Product:** MesaFlow  
> **Phase:** UX/UI Design  
> **Baseline:** MVP / Pilot Release  
> **Date:** 2026-07-10  
> **Owner:** Principal UX/UI Designer

# Accessibility

## Baseline
Target WCAG 2.2 AA for staff and public experiences.

## Requirements
- Text contrast at least 4.5:1; large text 3:1.
- Non-text UI and focus indicators at least 3:1.
- Touch targets at least 44×44 CSS px where practical.
- Complete keyboard operation with logical order.
- Visible `:focus-visible` treatment.
- Semantic headings, landmarks, forms, tables/lists and buttons.
- Every input has a persistent label and associated error.
- State changes announced through appropriate live regions without excessive chatter.
- Icons include accessible names when actionable; decorative icons are hidden.
- Colour never carries meaning alone.
- Motion respects reduced-motion preferences.
- Timed customer states do not expire solely because the page is idle.

## Queue accessibility
Use a semantic list or table depending on viewport. Row actions must announce customer/party context, for example “Call Ana, party of 3”. Reordering or realtime changes must not steal focus.

## Testing
Keyboard-only, screen reader smoke tests, 200% zoom, mobile text scaling, contrast, touch target and error recovery checks are required for MVP acceptance.
