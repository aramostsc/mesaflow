> **Product:** MesaFlow  
> **Architecture baseline:** MVP / Pilot Release  
> **Status:** Proposed architecture baseline  
> **Owner:** Software Architecture  
> **Date:** 2026-07-10  
> **Source baseline:** repository commit `583167147b626b370246dafc440eb961483bda63`

# Realtime and Concurrency

## Realtime approach

The MVP should use server-sent events or managed WebSockets for staff updates. The client must also reconcile through periodic refresh and refetch after reconnect.

Realtime delivery is a notification mechanism, not the source of truth. PostgreSQL remains authoritative.

`ENG-A0-006` proves the SSE-first strategy in `ADR-012` with a technical-only in-memory probe. The proof covers event serialization, heartbeat, replay after `lastEventId`, snapshot reconciliation and version-gap detection. Product waitlist events are still future work.

`ENG-A0-007` proves the separate transactional outbox/worker pattern in `ADR-013`. Outbox processing may publish future events, but clients must still reconcile through authoritative queries because realtime delivery remains non-authoritative.

## Update envelope

Each event includes:

- tenant and establishment channel resolved server-side;
- service identifier;
- aggregate identifier;
- aggregate version;
- event type;
- server timestamp.

Clients discard older versions and refetch when a version gap is detected.

## Concurrent actions

Every queue command validates the current state and expected version in a database transaction.

Example:

1. two staff devices read entry version 4;
2. one seats it, producing version 5;
3. the other attempts no-show with expected version 4;
4. the update affects zero rows and returns `409`;
5. the client displays the current state and removes the invalid action.

## Capacity race

Entry creation must lock the active service capacity boundary or use a serializable/constraint-backed transaction. Public and staff entry use the same server-side capacity function.

## Calling and timers

- Calling commits the state transition and deadline once.
- Scheduled worker jobs are idempotent and check current state/version.
- Final call can apply exactly once.
- Timer expiry never automatically marks No-show.
- Additional time is represented as an explicit audited command.

## Offline/degraded behavior

The MVP is not offline-first. When disconnected:

- existing data may remain visible with a clear stale/offline indicator;
- mutations are disabled or explicitly retried after reconnection;
- the client must not maintain an uncontrolled offline write queue;
- WhatsApp failure does not block staff lifecycle actions;
- realtime failure falls back to polling.
