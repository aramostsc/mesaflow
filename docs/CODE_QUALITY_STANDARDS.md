# MesaFlow — Code Quality Standards

## TypeScript

- `strict: true`.
- Avoid `any`; exceptions require a local comment explaining the external boundary.
- Parse untrusted input into explicit schemas.
- Domain functions return typed results or domain errors.
- Exhaustive checks are mandatory for lifecycle states and normalized provider statuses.

## Domain and application design

- Keep state transitions in one authoritative policy per aggregate.
- Do not duplicate business rules in UI, route handlers and repositories.
- Commands are explicit and named after approved actions.
- Separate reads from mutation orchestration where it improves clarity; do not introduce a CQRS framework.
- Use database constraints as defence in depth for critical invariants.

## Database

- Every tenant-owned row has non-null `tenant_id`.
- Tenant-scoped uniqueness includes `tenant_id`.
- Foreign keys and check constraints are mandatory where the database can express the invariant.
- Migrations are immutable after merge.
- Destructive migrations require recovery/backfill strategy and Reviewer approval.
- Use UTC timestamps and retain the restaurant display timezone separately.
- Avoid soft deletion unless approved retention/recovery behaviour requires it.

## APIs

- Validate body, query and path input.
- Never accept authorization context from the request body.
- Use stable normalized error codes.
- Duplicate-sensitive commands require idempotency support.
- Concurrent mutations require expected version or an equivalent safe precondition.
- Do not leak provider payloads or internal stack traces.

## Errors and logs

- Expected domain errors are not logged as crashes.
- Unexpected errors include correlation ID and safe entity identifiers.
- Redact phone numbers, tokens, cookies, provider payload secrets and authentication data.
- Toasts are not the only presentation of important failures.
- Operational degradation must be visible and recoverable.

## UI

- Follow approved screens and components.
- Tablet-first for staff; mobile-first for public flows.
- Lifecycle and delivery badges remain separate.
- Never rely on color alone.
- Invalid definitive lifecycle actions are omitted.
- Loading actions resist double submission and preserve control width.
- Server state remains authoritative; optimistic UI must reconcile.

## Dependencies

- Add a dependency only when it removes material complexity or risk.
- Record purpose and alternatives in the pull request.
- Pin lockfile changes.
- No duplicate libraries for the same purpose without Tech Lead approval.
- Run security/license checks in CI.

## Comments and documentation

Comments explain why, invariants, external constraints or non-obvious safety behaviour. They must not restate readable code.
