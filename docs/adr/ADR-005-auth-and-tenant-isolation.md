> **Product:** MesaFlow  
> **Architecture baseline:** MVP / Pilot Release  
> **Status:** Proposed architecture baseline  
> **Owner:** Software Architecture  
> **Date:** 2026-07-10  
> **Source baseline:** repository commit `583167147b626b370246dafc440eb961483bda63`

# ADR-005 — Managed Authentication and Layered Tenant Isolation

**Status:** Accepted for MVP architecture

## Context

Individual staff identity and strict restaurant isolation are mandatory.

## Decision

Use managed staff authentication, server-derived tenant context, repository scoping and PostgreSQL RLS as defence in depth.

## Alternatives considered

- Custom authentication: rejected due to security and schedule risk.
- Separate database per tenant: excessive for MVP scale.

## Positive consequences

- Strong baseline security and lower implementation risk.
- Future multi-establishment compatibility.

## Negative consequences

- Provider dependency.
- RLS adds migration and test complexity.

## Risks

Misconfigured tenant context or policies could expose data.

## Review condition

Review database-per-tenant only for regulatory or enterprise isolation needs.

## References

FEAT-001–005; `MULTI_TENANCY.md`; `AUTHORIZATION_MODEL.md`.
