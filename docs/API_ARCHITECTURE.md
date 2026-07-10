> **Product:** MesaFlow  
> **Architecture baseline:** MVP / Pilot Release  
> **Status:** Proposed architecture baseline  
> **Owner:** Software Architecture  
> **Date:** 2026-07-10  
> **Source baseline:** repository commit `583167147b626b370246dafc440eb961483bda63`

# API Architecture

## Style

Use versioned JSON HTTP APIs under `/api/v1`. Staff endpoints use authenticated sessions. Public endpoints use QR credentials or entry-specific status tokens.

## Contract rules

- Validate all input with shared schemas.
- Return stable machine-readable error codes.
- Use ISO 8601 UTC timestamps.
- Use opaque identifiers.
- Reject unknown lifecycle transitions.
- Include current resource version in mutable responses.
- Avoid leaking existence of cross-tenant resources.

## Commands

Mutation endpoints represent business intent, for example:

- `POST /services/open`
- `POST /services/{id}/close-intake`
- `POST /queue-entries`
- `POST /queue-entries/{id}/call`
- `POST /queue-entries/{id}/seat`
- `POST /queue-entries/{id}/mark-no-show`
- `POST /queue-entries/{id}/reactivate`
- `POST /public/entries/{token}/leave`

Each command accepts an idempotency key for actions vulnerable to retry or double click.

## Errors

| HTTP | Meaning |
|---|---|
| 400 | Invalid shape or field |
| 401 | Authentication required |
| 403 | Capability denied |
| 404 | Resource unavailable in current security context |
| 409 | Stale version, invalid state or invariant conflict |
| 422 | Valid syntax but business rule prevents action |
| 429 | Rate limit |
| 503 | Temporary dependency degradation |

## Pagination

History and audit endpoints use cursor pagination. Live queue endpoints return the bounded current operational set.

## Rate limiting

Apply stricter limits to public entry creation, token lookup, login, invitation acceptance and webhook endpoints. Limits must be tenant-aware and IP-aware without blocking normal restaurant NAT traffic.

## Observability

Every request receives a correlation ID. Command logs include action, result, latency and non-sensitive identifiers. Phone numbers, tokens and notes must not be logged.
