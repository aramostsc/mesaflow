> **Product:** MesaFlow  
> **Architecture baseline:** MVP / Pilot Release  
> **Status:** Proposed architecture baseline  
> **Owner:** Software Architecture  
> **Date:** 2026-07-10  
> **Source baseline:** repository commit `583167147b626b370246dafc440eb961483bda63`

# ADR-008 — Transactional Outbox for External Messaging

**Status:** Accepted for MVP architecture

## Context

Queue state must commit even if WhatsApp is slow or unavailable, without losing notification intent.

## Decision

Write notification intent to an outbox in the queue transaction and deliver asynchronously with idempotent workers.

## Alternatives considered

- Synchronous provider call: rejected due to latency and failure coupling.
- External broker before database commit: rejected due to dual-write risk.

## Positive consequences

- Reliable, retryable delivery intent and visible failure.
- Provider isolation.

## Negative consequences

- Eventual delivery and worker operations.

## Risks

A worker crash around provider acknowledgement can cause duplicate sends; provider/idempotency controls are required.

## Review condition

Move to a managed broker when throughput, isolation or operational evidence justifies it.

## References

FEAT-033–042; SCN-007; `INTEGRATION_ARCHITECTURE.md`.
