> **Product:** MesaFlow  
> **Phase:** UX/UI Design  
> **Baseline:** MVP / Pilot Release  
> **Date:** 2026-07-10  
> **Owner:** Principal UX/UI Designer

# Information Architecture

## Product spaces
1. **Staff operations** — live service and queue.
2. **Administration** — restaurant, users, permissions, QR and configuration supported by MVP.
3. **History and audit** — completed services, entries and attributable actions.
4. **Public customer experience** — join, confirmation, status and leave.
5. **Authentication and account recovery.**

## Staff hierarchy
- Queue
  - Current service
  - Waiting
  - Called
  - Attention / delivery failures
  - Entry detail
- History
  - Services
  - Entries
  - Audit detail where authorised
- Settings
  - Restaurant
  - Team and permissions
  - Public join / QR
  - Notifications or provider status where exposed
- Account
  - Profile
  - Sign out

## Navigation model
Queue is the default landing destination. Administration never competes visually with live operations. Public pages have no staff navigation.

## Content objects
Restaurant → Membership/User → Service → Queue Entry → Lifecycle Event → Notification Attempt → Audit Record. The interface uses user-facing labels and never exposes internal identifiers.
