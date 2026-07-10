> **Product:** MesaFlow  
> **Architecture baseline:** MVP / Pilot Release  
> **Status:** Proposed architecture baseline  
> **Owner:** Software Architecture  
> **Date:** 2026-07-10  
> **Source baseline:** repository commit `583167147b626b370246dafc440eb961483bda63`

# Observability

## Logs

Structured logs shall include timestamp, environment, service, severity, correlation ID, tenant pseudonymous ID, actor type, action and result. They must exclude phone numbers, status tokens, authentication tokens and note bodies.

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
