# MesaFlow - Outbox Architecture

## Purpose

`ENG-A0-007` proves the PostgreSQL-backed transactional outbox and worker strategy without implementing product events, WhatsApp delivery, product APIs, UI or final product schema.

PostgreSQL remains the source of truth. Outbox rows are durable processing intent, not business state.

## Technical Probe

The proof uses `mesaflow_technical.outbox_probe_events`.

The table is intentionally technical-only and contains tenant id, stream key, event type, event version, serialized scalar payload, processing status, attempt counters, availability, lock and processed timestamps, and last processing error.

Valid statuses are `pending`, `processing`, `processed` and `failed`.

## Transactional Write

Future product commands must write domain state, audit records and outbox records in the same PostgreSQL transaction. The `ENG-A0-007` helper proves that an event committed inside a transaction remains visible, and that a rollback removes the event.

The current helper writes only technical probe events and does not create waitlist, notification, restaurant, user or service data.

## Worker Model

The technical worker:

- claims only `pending` events for one server-supplied tenant id;
- uses `FOR UPDATE SKIP LOCKED` while claiming;
- increments `attempt_count` when an event is claimed;
- marks successful events as `processed`;
- returns transient failures to `pending` until attempts are exhausted;
- marks permanent or exhausted failures as `failed`;
- can recover expired `processing` leases back to `pending`;
- preserves predictable processing order by `created_at` and `id`.

The proof is a local worker boundary, not a production daemon.

## Tenant Isolation

The worker requires an explicit tenant id and never processes another tenant's pending events. Future product outbox tables must still use the approved tenant-context and RLS patterns from `ADR-010` where applicable.

## Relation To SSE

`ENG-A0-006` proved SSE transport and reconciliation. `ENG-A0-007` proves durable event intent and worker processing.

They remain separate:

- outbox can become the future source for publishing events;
- SSE remains a delivery transport;
- authoritative queries remain the source of truth;
- clients still reconcile after reconnect, gaps or missed events.

No outbox event is connected to a product SSE route yet.

## Evidence

Integration evidence lives in `tests/integration/outbox-worker.integration.test.ts`.

The tests prove commit, rollback, pending-only claim, processed marking, retry, permanent failure, exhausted failure, lease recovery, duplicate worker safety, tenant separation, predictable ordering and invalid payload rejection.

## Correlation context

`ENG-A0-009` adds logging context for future outbox and worker propagation. Correlation ID remains separate from event, job and idempotency identifiers, and each worker execution must receive a fresh explicit execution context. The A0 outbox probe is intentionally not instrumented or refactored by this task.
