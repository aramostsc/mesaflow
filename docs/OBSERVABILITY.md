> **Product:** MesaFlow  
> **Architecture baseline:** MVP / Pilot Release  
> **Status:** Proposed architecture baseline  
> **Owner:** Software Architecture  
> **Date:** 2026-07-10  
> **Source baseline:** repository commit `583167147b626b370246dafc440eb961483bda63`

# Observability

## Logs

Structured logs shall include timestamp, environment, service, severity, correlation ID, tenant pseudonymous ID, actor type, action and result. They must exclude phone numbers, status tokens, authentication tokens and note bodies.

`ENG-A0-009` implements the provider-independent foundation in `src/shared/observability`:

- JSON-ready records with `debug`, `info`, `warn` and `error` levels;
- explicit execution context with correlation/request IDs and optional technical identifiers;
- child loggers that preserve parent context and add operation context;
- bounded recursive metadata sanitization and sensitive-key redaction;
- predictable error serialization without stack traces or custom error properties;
- injectable sinks for tests and future provider adapters.

Sink failures are contained and must not alter the outcome of the observed request or worker operation. Redaction is defense in depth: call sites must still pass minimal operational metadata rather than raw request, provider or domain payloads.

Correlation and request IDs use RFC 4122 UUID format. Externally supplied values are accepted only when their length and format are valid; otherwise a new UUID is generated. Correlation IDs remain distinct from tenant, user, session, audit, idempotency, outbox and job IDs.

Tenant/user identifiers may only be attached after trusted server-side resolution. Logging metadata never promotes client-supplied values into security context.

Sensitive metadata keys include passwords, password hashes, access/refresh/session tokens, authorization headers, cookies, API keys, database URLs, secrets, MFA codes, phone numbers, private status tokens and private message/note bodies. Values are replaced with `[REDACTED]`; metadata depth, entry counts, arrays and strings are bounded.

## Metrics

### Technical
- request rate, error rate and latency;
- database connections, transaction failures and lock waits;
- realtime connections and reconnects;
- outbox lag and worker failures;
- WhatsApp attempts, failures and webhook delay;
- scheduled-job lateness;
- deployment and health status.

### Business/operational
- services opened/closed;
- entries by QR/manual;
- active slot utilisation;
- calls, seated, cancelled and no-show outcomes;
- messaging attempt and failure rates;
- duplicate prevention events;
- pass-over warnings;
- conflicts returned to clients.

## Alerts

Initial alerts:

- elevated command error rate;
- database unavailable or near connection limit;
- outbox oldest-event age above threshold;
- sustained WhatsApp failure rate;
- webhook signature failures;
- backup failure;
- health check failure;
- repeated cross-tenant authorization denial anomaly.

## Tracing

Full distributed tracing is not required initially. Correlation IDs across API, outbox, worker and provider attempts are mandatory. Add OpenTelemetry tracing if production diagnosis requires it.

The A0 implementation uses no telemetry provider and sends no data externally. Future request handlers, outbox rows, workers, realtime publication and provider adapters must propagate explicit context without reusing execution context between independent operations.
