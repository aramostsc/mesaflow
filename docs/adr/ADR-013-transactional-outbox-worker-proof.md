# ADR-013 - Transactional Outbox Worker Proof

**Status:** Accepted
**Date:** 2026-07-12
**Owner:** Backend / Database Engineering
**Task:** `ENG-A0-007`

## Context

`ADR-008` already accepts the transactional outbox pattern for external messaging. MesaFlow needed A0 evidence that PostgreSQL, Drizzle and a worker boundary can persist event intent transactionally and process pending work safely before any product waitlist or WhatsApp integration is implemented.

## Decision

MesaFlow will continue with a PostgreSQL-backed transactional outbox and worker model.

The accepted technical pattern is:

- write outbox rows in the same PostgreSQL transaction as future state changes;
- keep event envelopes tenant-aware and versioned;
- claim only `pending` rows for the server-derived tenant context;
- increment attempts when work is claimed;
- mark successful work as `processed`;
- retry transient failures by returning events to `pending`;
- classify permanent or exhausted failures as `failed`;
- recover expired `processing` leases;
- preserve deterministic processing order within a tenant stream;
- keep product events and external providers out of the A0 proof.

## Evidence

`ENG-A0-007` created:

- `mesaflow_technical.outbox_probe_events` via Drizzle migration;
- technical outbox helper and worker probe in `src/shared/outbox`;
- integration tests in `tests/integration/outbox-worker.integration.test.ts`.

The tests prove transaction commit, transaction rollback, pending-only claim, processed marking, retry count update, exhausted failure, permanent failure, duplicate worker safety, expired lease recovery, tenant separation, predictable ordering and invalid payload rejection.

## Consequences

Positive:

- Future product commands can enqueue durable work without coupling queue success to external delivery.
- Worker retries and failures are explicit and testable.
- The proof aligns with SSE reconciliation: delivery can fail or repeat without making realtime the source of truth.

Tradeoffs:

- The proof is not a production daemon.
- Product outbox schema, provider idempotency keys, audit linkage and RLS policies remain future work.
- Provider acknowledgement edge cases still require dedicated WhatsApp/provider tests.

## Follow-up

Future notification implementation must add product outbox events, provider adapters, idempotency keys, redacted observability, tenant authorization and provider-specific failure classification without changing approved MVP scope.
