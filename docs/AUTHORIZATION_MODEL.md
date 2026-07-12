> **Product:** MesaFlow  
> **Architecture baseline:** MVP / Pilot Release  
> **Status:** Proposed architecture baseline  
> **Owner:** Software Architecture  
> **Date:** 2026-07-10  
> **Source baseline:** repository commit `583167147b626b370246dafc440eb961483bda63`

# Authentication and Authorization Model

## Authentication

Use a managed authentication provider supporting email-based account creation, secure password reset, email verification, session revocation and MFA readiness.

Session cookies must be `HttpOnly`, `Secure` and `SameSite=Lax` or stricter. Browser tokens must not be stored in local storage.

`ENG-A0-005` defines the provider-independent authentication port in `src/shared/auth` and recommends Supabase Auth for the next provider adapter spike. Authentication must stay separate from authorization and tenant context.

## Roles

### Administrator

May configure the establishment, invite/revoke staff, regenerate QR credentials, open/close service, perform staff operations, correct current-service terminal outcomes and view history.

### Staff

May operate the active service and queue according to approved features. Staff may not manage access, regenerate QR credentials, alter protected configuration or correct restricted outcomes.

## Permission model

Permissions shall be explicit application capabilities, for example:

- `establishment.manage`
- `staff.invite`
- `qr.regenerate`
- `service.open`
- `service.manage_intake`
- `service.close`
- `queue.create_manual`
- `queue.call`
- `queue.resolve`
- `queue.reactivate`
- `queue.correct_outcome`
- `history.read`

Roles map to capabilities; controllers check capabilities, not role names.

## Customer authorization

Customers have no account. A private status token authorizes access to exactly one entry and only approved self-service actions. Token possession does not authorize phone-number changes or staff actions.

## Revocation

Removing a membership invalidates new authorization immediately and should revoke active sessions where supported. QR regeneration affects future public entry resolution but must not invalidate existing customer status links.
