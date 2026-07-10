> **Product:** MesaFlow  
> **Architecture baseline:** MVP / Pilot Release  
> **Status:** Proposed architecture baseline  
> **Owner:** Software Architecture  
> **Date:** 2026-07-10  
> **Source baseline:** repository commit `583167147b626b370246dafc440eb961483bda63`

# ADR-002 — Modular Monolith

**Status:** Accepted for MVP architecture

## Context

The queue, service, capacity and audit rules require strong consistency, while the MVP team and traffic are initially small.

## Decision

Implement one modular application codebase and database, with a separate worker process from the same release.

## Alternatives considered

- Microservices: rejected as premature operational and consistency complexity.
- Unstructured monolith: rejected because it impedes future ownership and change.

## Positive consequences

- Simple deployment and transactions.
- Low operational cost.
- Explicit boundaries support later extraction.

## Negative consequences

- Deployments remain coupled.
- Module discipline must be enforced by code review and tests.

## Risks

Boundary erosion could create a tightly coupled codebase.

## Review condition

Review when independent scaling, deployment or team ownership is demonstrated.

## References

`PROD-SCOPE-001`; PM execution baseline; `MODULE_BOUNDARIES.md`.
