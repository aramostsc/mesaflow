# ADR-012 — SSE Reconnect and Reconciliation Proof

**Status:** Accepted
**Date:** 2026-07-12
**Owner:** Backend / Frontend Engineering
**Task:** `ENG-A0-006`

## Context

MesaFlow staff screens need near-real-time updates across devices. Architecture recommends SSE first, with refetch/reconciliation after reconnect because PostgreSQL remains the source of truth.

## Decision

MesaFlow will use an SSE-first realtime boundary for the MVP, with versioned event envelopes and safe reconciliation on reconnect.

The approved technical pattern is:

- emit SSE events with `id`, `type`, `version`, `tenantId`, `payload` and `createdAt`;
- keep ids monotonic within the technical stream;
- use heartbeat comments as keepalive frames;
- replay events after a known `lastEventId`;
- require snapshot/reconciliation when `lastEventId` is missing, unknown or a version gap is detected;
- keep transport and product domain events separate;
- derive tenant/channel server-side in future product code.

## Evidence

`ENG-A0-006` created a technical-only in-memory probe in `src/shared/realtime` and unit tests in `tests/unit/realtime-sse.test.ts`.

The tests prove serialization, heartbeat, ordered delivery, replay after reconnect, snapshot reconciliation, gap detection, tenant stream separation, invalid event rejection and absence of waitlist/product-domain dependency.

## Consequences

Positive:

- Staff clients can recover from missed realtime events.
- Realtime delivery does not become the source of truth.
- Future API routes can wrap the boundary without coupling product modules to SSE formatting.

Tradeoffs:

- The proof is in-memory and intentionally not distributed.
- Production fan-out, persistence and cross-process scaling remain future work.
- ENG-A0-007 must still prove durable outbox/worker behaviour separately.

## Follow-up

Future product implementation must connect this boundary to authoritative queries, tenant-scoped authorization and domain version checks. If hosting limitations make SSE unsuitable, a later ADR must justify a managed realtime/WebSocket alternative behind the same reconciliation contract.
