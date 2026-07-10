> **Product:** MesaFlow  
> **Phase:** UX/UI Design  
> **Baseline:** MVP / Pilot Release  
> **Date:** 2026-07-10  
> **Owner:** Principal UX/UI Designer

# Navigation

## Desktop and tablet
Persistent left rail or compact sidebar:
- **Queue**
- **History**
- **Settings** (capability controlled)

Top bar:
- restaurant identity
- service state
- connection state
- user menu

## Mobile staff
Bottom navigation with Queue, History and More. Queue actions remain inside the queue context; the **Add customer** action is sticky.

## Public customer
Linear navigation only. Browser back is supported, but final lifecycle states remain authoritative.

## Rules
- Preserve filters and scroll position when opening entry detail.
- Deep links require authentication and tenant authorisation.
- Never show inaccessible sections as disabled navigation; omit them.
- Unsaved form changes trigger a leave warning only when data would be lost.
- Service status remains visible on every operational screen.
