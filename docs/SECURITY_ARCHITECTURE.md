> **Product:** MesaFlow  
> **Architecture baseline:** MVP / Pilot Release  
> **Status:** Proposed architecture baseline  
> **Owner:** Software Architecture  
> **Date:** 2026-07-10  
> **Source baseline:** repository commit `583167147b626b370246dafc440eb961483bda63`

# Security Architecture

## Security objectives

1. Prevent cross-tenant disclosure or mutation.
2. Protect customer phone numbers and private status links.
3. Attribute privileged actions.
4. Prevent forged provider callbacks.
5. Preserve queue integrity under retries and concurrency.
6. Recover from operational failure.

## Controls

### Identity and access
- Managed authentication with secure session cookies.
- Capability-based authorization at every command.
- Individual staff accounts; no shared PIN.
- Session and membership revocation.
- MFA readiness for administrators.
- Provider SDKs isolated behind an application authentication port.

### Data protection
- TLS in transit.
- Managed encryption at rest.
- Hashed status tokens and secrets.
- Secret manager for provider credentials.
- Redaction of phone numbers, tokens and free-text notes from telemetry.
- PostgreSQL RLS with transaction-local tenant context for tenant-owned data.

### Application security
- Schema validation and output encoding.
- CSRF protection for cookie-authenticated mutations.
- Content Security Policy and secure headers.
- Parameterised database access.
- Rate limiting and abuse controls.
- Signed webhook verification and replay protection.
- File generation isolated from executable content.

### Audit
Material actions record actor, source, reason where required, previous/resulting state and correlation ID.

### Backup and recovery
- Automated encrypted database backups.
- Point-in-time recovery where supported.
- Restore test before pilot and periodically thereafter.
- Documented incident and rollback procedures.

## Privacy

Collect only name, phone, party details, approved preferences and operational notes required by the product. Free-text notes require UI guidance against sensitive information. Data export/deletion procedures must exist before production.

## Security review

A Security Engineer must review tenant isolation, public token design, webhook validation, retention, backup restoration and authorization tests before pilot.

## A0 tenant isolation proof

`ENG-A0-004` validates tenant isolation with a technical RLS probe. The proof confirms own-tenant reads, cross-tenant read denial, no-context denial, blocked cross-tenant inserts/updates/deletes and no tenant-context leakage after transaction commit.

## A0 telemetry safety proof

`ENG-A0-009` adds bounded structured logging with explicit redaction for credentials, authorization/cookie values, database URLs, phone numbers, private tokens and private message content. External correlation/request IDs are length- and format-validated before use. Serialized errors exclude stack traces and custom properties. Security tests under `tests/security` enforce these controls.
