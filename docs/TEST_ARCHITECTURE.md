> **Product:** MesaFlow  
> **Architecture baseline:** MVP / Pilot Release  
> **Status:** Proposed architecture baseline  
> **Owner:** Software Architecture  
> **Date:** 2026-07-10  
> **Source baseline:** repository commit `583167147b626b370246dafc440eb961483bda63`

# Test Architecture

## Test pyramid

### Unit tests
Domain transitions, slot weight, capacity, groups ahead, pass-over, timer rules, permission mapping and provider-status mapping.

### Integration tests
PostgreSQL repositories, transactions, RLS, outbox, migrations, webhook idempotency and worker retries.

### Contract tests
Authentication provider, WhatsApp provider and email provider adapters using recorded schemas or sandbox environments.

### End-to-end tests
All approved scenarios `SCN-001`–`SCN-013`, covering staff tablet and customer mobile viewport.

## Mandatory special suites

### Authorization
Every protected command is tested for Administrator, Staff, unauthenticated customer and cross-tenant actor.

### Concurrency
- simultaneous seat/no-show;
- duplicate call;
- concurrent entry at capacity boundary;
- closure during active mutation;
- final-call duplicate job;
- party-size approval race.

### Resilience
- WhatsApp timeout and permanent failure;
- duplicate webhook;
- realtime disconnect/reconnect;
- worker crash after provider send but before acknowledgement;
- stale client version;
- database migration rollback safety.

## Provider fakes

Provider interfaces must have deterministic fakes. End-to-end tests must not depend on live WhatsApp delivery.

## Pilot gate

No pilot release is permitted with unresolved critical failures in tenant isolation, state transitions, capacity consistency, service closure, audit, notification visibility or backup restoration.
