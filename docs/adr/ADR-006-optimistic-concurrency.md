> **Product:** MesaFlow  
> **Architecture baseline:** MVP / Pilot Release  
> **Status:** Proposed architecture baseline  
> **Owner:** Software Architecture  
> **Date:** 2026-07-10  
> **Source baseline:** repository commit `583167147b626b370246dafc440eb961483bda63`

# ADR-006 — Transactional Commands and Optimistic Concurrency

**Status:** Accepted for MVP architecture

## Context

Two devices may attempt incompatible actions and capacity must remain consistent.

## Decision

Use transactional domain commands, aggregate versions, database constraints and targeted locking for capacity boundaries.

## Alternatives considered

- Last-write-wins: rejected because it loses valid staff actions.
- Global pessimistic locking: rejected due to unnecessary contention.

## Positive consequences

- Explicit conflict handling and no silent overwrites.

## Negative consequences

- Clients must handle `409 Conflict` and refresh.

## Risks

Incorrect lock order or broad locks could reduce throughput.

## Review condition

Review lock strategy after concurrency testing and production metrics.

## References

FEAT-019, FEAT-027; SCN-004, SCN-012.
