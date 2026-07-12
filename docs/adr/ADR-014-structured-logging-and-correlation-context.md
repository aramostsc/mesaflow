# ADR-014 - Structured Logging and Correlation Context

**Status:** Accepted
**Date:** 2026-07-12
**Owner:** Backend / DevOps / Security Engineering
**Task:** `ENG-A0-009`

## Context

MesaFlow must correlate future requests, database operations, outbox events, workers, realtime publication and providers without exposing sensitive data or selecting an observability vendor during A0.

## Decision

MesaFlow will use a small provider-independent `LoggerPort` and explicit `ExecutionContext` under `src/shared/observability`.

- correlation and request IDs use RFC 4122 UUID format and `crypto.randomUUID()` generation;
- incoming IDs are preserved only after strict length/format validation;
- independent operations create independent contexts;
- child loggers preserve parent context and may add optional operation identifiers;
- records are JSON-ready and emitted through an injectable sink;
- metadata is recursively sanitized with bounded size/depth and sensitive-key redaction;
- serialized errors expose only bounded `name` and `message`, not stack or custom properties;
- sink failures are contained so telemetry cannot change an operation result;
- logging context never becomes authentication, authorization, tenant, audit or idempotency truth.

The default sink writes one JSON object to `console`. Tests replace it with an in-memory sink. No logging library or external telemetry provider is selected in A0.

## Rationale

The current needs are small and the platform already supplies secure UUID generation and JSON serialization. An internal boundary avoids a new runtime dependency while preserving a narrow adapter point for Pino or a managed provider if production evidence later justifies one.

## Consequences

Future handlers and workers must propagate context explicitly. Tenant/user identifiers may be attached only after trusted server-side resolution. Product audit records remain a separate persistence concern.

The internal logger intentionally does not provide distributed tracing, metrics, dashboards, retention, transport batching or provider delivery. Those require later operational decisions.

## Evidence

Unit tests prove ID generation/isolation, child context, structured levels, error serialization, metadata preservation, fake substitution and worker-compatible use. Security tests prove redaction and rejection of unsafe external IDs.
