> **Product:** MesaFlow  
> **Architecture baseline:** MVP / Pilot Release  
> **Status:** Proposed architecture baseline  
> **Owner:** Software Architecture  
> **Date:** 2026-07-10  
> **Source baseline:** repository commit `583167147b626b370246dafc440eb961483bda63`

# ADR-004 — Realtime Updates with Database Reconciliation

**Status:** Accepted for MVP architecture

## Context

Multiple staff devices require rapid shared state, but network delivery cannot be assumed reliable.

## Decision

Use SSE or managed WebSockets for notifications, with versions, reconnect reconciliation and polling fallback.

## Alternatives considered

- Polling only: simpler but slower and more wasteful.
- Client-side peer synchronization: rejected as unsafe.

## Positive consequences

- Rapid updates without making realtime transport authoritative.
- Tolerates missed messages.

## Negative consequences

- Adds connection and reconnection logic.

## Risks

Stale clients may act on outdated state unless version checks are mandatory.

## Review condition

Review transport after hosting spike and pilot connection metrics.

## References

FEAT-027; SCN-012; `REALTIME_AND_CONCURRENCY.md`.
