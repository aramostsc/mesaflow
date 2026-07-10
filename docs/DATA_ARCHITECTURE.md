> **Product:** MesaFlow  
> **Architecture baseline:** MVP / Pilot Release  
> **Status:** Proposed architecture baseline  
> **Owner:** Software Architecture  
> **Date:** 2026-07-10  
> **Source baseline:** repository commit `583167147b626b370246dafc440eb961483bda63`

# Data Architecture

## Database

PostgreSQL is the authoritative store. Relational constraints and transactions match the queue's consistency needs better than document or key-value stores.

## Conceptual entities

- `tenants`
- `establishments`
- `users`
- `memberships`
- `staff_invitations`
- `establishment_settings`
- `qr_credentials`
- `services`
- `queue_entries`
- `queue_entry_events`
- `calls`
- `notification_requests`
- `notification_attempts`
- `customer_status_tokens`
- `audit_events`
- `outbox_events`
- `idempotency_keys`

## Identifiers

Use opaque UUIDv7 or ULID identifiers. Public URLs must never expose sequential IDs. Customer status tokens must be random, unguessable, revocable and stored as hashes.

## Tenant ownership

Every tenant-owned row shall include `tenant_id`. Establishment and service identifiers do not replace this requirement. Foreign keys should include or validate tenant ownership where practical.

## Consistency

All commands that change queue lifecycle, capacity or service state execute in one database transaction. The transaction must:

1. lock or version-check affected records;
2. validate the current state;
3. calculate resulting capacity and ordering signals;
4. persist the change;
5. append audit and outbox records;
6. commit before external delivery.

## Concurrency

Mutable operational rows include a `version` integer. Commands submit the observed version. An update with a stale version returns `409 Conflict` with current state metadata.

High-contention invariants, such as maximum capacity and one active service, additionally use transaction-level locking or database constraints.

## Ordering

Chronological queue sequence is assigned server-side when an entry becomes Waiting. Reactivation assigns a new tail sequence while preserving the original creation timestamp for audit.

## History

Lifecycle changes shall be represented by current-state columns plus append-only event/audit records. Closed service records are immutable at the application layer. Database permissions and tests must protect this rule.

## Retention

Recommended baseline:

- active and closed service operational data: retain according to business/legal policy, initially 24 months;
- phone and customer-identifying fields: minimise and pseudonymise earlier when no longer operationally required;
- audit data: retain at least as long as corresponding service records;
- provider payloads: do not persist unnecessary message bodies;
- logs: 30–90 days with personal data redacted.

Final retention periods require Product/Legal approval before production.
