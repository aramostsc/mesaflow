# MesaFlow Product Management — Complete Final Package

This package contains the complete final Product Management specification.

## Engineering foundation

`ENG-A0-001` adds the initial strict TypeScript and Next.js scaffold. It does not implement any MesaFlow product feature.

### Local commands

Use Corepack so the repository-managed pnpm version is used:

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm dev
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Run the complete repository gate after PostgreSQL is available:

```bash
corepack pnpm db:up
corepack pnpm db:ci
corepack pnpm verify
```

`verify` runs formatting, lint, strict type checking, unit tests, PostgreSQL integration tests, the security-test gate and the production build. See `docs/CI_AND_QUALITY_GATES.md` for the authoritative operational sequence.

### Line endings

Repository text files are stored as LF. `.gitattributes` is the Git authority, while EditorConfig and Prettier enforce the same policy in editors and quality gates. Contributors do not need to change their global `core.autocrlf` setting. Windows-native `.bat` and `.cmd` files retain CRLF; avoid unrelated EOL-only changes.

Database product schema, realtime, outbox and provider adapter setup belong to later A0 tasks. `ENG-A0-003` selected Drizzle for data access tooling, and `ENG-A0-005` defined the authentication boundary.

## PostgreSQL local/test environment

`ENG-A0-002` adds a Docker Compose PostgreSQL service for local development and an isolated test database.

Docker must be installed and available on `PATH` for the local `db:up`, `db:down` and `db:status` commands. If you already have PostgreSQL running, set the URLs in `.env.example` to point at that service before running the migration and smoke-check commands.

```bash
corepack pnpm db:up
corepack pnpm db:status
corepack pnpm db:migrate
corepack pnpm db:reset:test
corepack pnpm db:test
corepack pnpm test:integration
corepack pnpm db:down
```

The initial migration is a technical smoke migration only. Product schema remains out of scope for A0.

## Data access tooling

`ENG-A0-003` selected Drizzle and Drizzle Kit. The current Drizzle schema and migration are technical spike artifacts only:

```bash
corepack pnpm db:generate
corepack pnpm db:drizzle:migrate
```

`ENG-A0-004` adds a technical-only tenant context and RLS proof. Product schema remains out of scope until later engineering tasks.

## Tenant context and RLS proof

`ENG-A0-004` proves transaction-local tenant context and PostgreSQL Row Level Security using only technical probe tables under `mesaflow_technical`. The probe uses a non-owner database role so RLS is exercised realistically.

```bash
corepack pnpm db:reset:test
corepack pnpm test:integration
```

The probe does not create real MesaFlow tenants, users, restaurants, waitlist entries or permissions.

## Authentication boundary

`ENG-A0-005` defines provider-independent authentication contracts in `src/shared/auth` and recommends Supabase Auth for the future provider adapter spike.

The boundary does not implement real login, signup, logout, OAuth, users, memberships, permissions, tenant context or authentication UI.

## Realtime SSE proof

`ENG-A0-006` proves the SSE-first reconnect and reconciliation strategy in `src/shared/realtime`.

The proof covers versioned SSE event serialization, heartbeat keepalive frames, replay after `lastEventId`, snapshot reconciliation and tenant-separated technical streams. It does not implement waitlist events, product realtime APIs, WebSockets, outbox, worker or UI.

## Transactional outbox worker proof

`ENG-A0-007` proves the PostgreSQL-backed transactional outbox and worker strategy in `src/shared/outbox`.

The proof covers technical outbox event insertion, transaction commit/rollback, pending-only worker processing, retry counts, permanent/exhausted failure handling, expired lease recovery, duplicate worker safety, tenant-separated processing and predictable ordering. It does not implement product waitlist events, WhatsApp delivery, product APIs, UI, product SSE publication or a production worker daemon.

## Observability foundation

`ENG-A0-009` adds provider-independent structured logging and explicit correlation/request context under `src/shared/observability`.

The boundary provides JSON-ready records, child loggers, UUID validation/generation, bounded sensitive-field redaction, safe error serialization and injectable sinks. It does not send telemetry externally or implement distributed tracing, product analytics or business audit persistence.

## Documents

- `docs/PRODUCT_PHILOSOPHY.md` — 5,059 words
- `docs/PRD.md` — 11,115 words
- `docs/PERSONAS.md` — 2,955 words
- `docs/USER_JOURNEYS.md` — 3,724 words
- `docs/USER_STORIES.md` — 13,621 words
- `docs/BUSINESS_RULES.md` — 5,217 words
- `docs/MVP_SCOPE.md` — 2,574 words
- `docs/PRODUCT_BACKLOG.md` — 3,581 words
- `docs/FEATURE_CATALOG.md` — 12,211 words
- `docs/FEATURE_PRIORITIES.md` — 1,844 words
- `docs/ACCEPTANCE_CRITERIA.md` — 16,178 words
- `docs/NON_FUNCTIONAL_REQUIREMENTS.md` — 2,417 words
- `docs/EDGE_CASES.md` — 5,251 words
- `docs/OUT_OF_SCOPE.md` — 1,999 words
- `docs/PRODUCT_DECISIONS.md` — 3,602 words

**Total:** 15 documents, approximately 91,348 words.

## Recommended reading order

1. CEO strategy documents already in the repository.
2. `PRODUCT_PHILOSOPHY.md`
3. `PRD.md`
4. `MVP_SCOPE.md`
5. `PRODUCT_DECISIONS.md`
6. `FEATURE_CATALOG.md`
7. `PERSONAS.md`
8. `USER_JOURNEYS.md`
9. `USER_STORIES.md`
10. `BUSINESS_RULES.md`
11. `ACCEPTANCE_CRITERIA.md`
12. `EDGE_CASES.md`
13. `NON_FUNCTIONAL_REQUIREMENTS.md`
14. `FEATURE_PRIORITIES.md`
15. `PRODUCT_BACKLOG.md`
16. `OUT_OF_SCOPE.md`
