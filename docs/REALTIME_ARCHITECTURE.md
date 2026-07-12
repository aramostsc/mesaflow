# MesaFlow — Realtime Architecture

## Purpose

`ENG-A0-006` proves the SSE-first realtime strategy without implementing waitlist, domain events, APIs, UI or product state.

Realtime is a delivery mechanism. PostgreSQL remains the source of truth, and clients must reconcile after reconnect or version gaps.

`ENG-A0-007` separately proves the technical transactional outbox/worker pattern. The outbox can feed future publication, but no product SSE route or product event stream is connected yet.

## SSE Event Envelope

Technical realtime events use a versioned envelope:

- `id`: monotonic event id;
- `type`: event type;
- `version`: aggregate/probe version;
- `tenantId`: server-derived tenant channel identifier;
- `payload`: event data;
- `createdAt`: ISO 8601 UTC timestamp.

The technical probe serializes this envelope as SSE:

```text
id: <id>
event: <type>
data: <json envelope>
```

## Reconnect and Reconciliation

Clients reconnect with `Last-Event-ID` or an equivalent stored last event id.

The proof uses this behaviour:

- known `lastEventId` with contiguous versions returns replay events after that id;
- missing `lastEventId` returns a snapshot requirement;
- unknown `lastEventId` returns a snapshot requirement;
- detected version gap returns a snapshot requirement;
- heartbeat comments keep the stream alive without changing domain state.

## Tenant Separation

The probe keeps tenant streams separate by `tenantId`. Future product streams must derive tenant/channel from authenticated server context and must never trust client-supplied tenant identifiers.

## Non-goals

- no waitlist events;
- no service or queue aggregate implementation;
- no product SSE route;
- no WebSocket implementation;
- no message broker;
- no product outbox event integration;
- no UI.

## Correlation context

Future realtime publication may attach the `ENG-A0-009` correlation context for operational diagnosis. Correlation metadata does not authorize stream access and must not replace tenant-scoped authorization or authoritative reconciliation.
