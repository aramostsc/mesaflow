# MesaFlow — First Engineering Sprint

## Identity

**Iteration:** A0 — Engineering Foundation  
**Goal:** create a runnable, testable and security-safe foundation, resolve deferred implementation choices and make S1 estimable.  
**Feature completion claimed:** none.

## In scope

- `ENG-A0-001` through `ENG-A0-010`.
- Repository scaffold and quality commands.
- PostgreSQL local/test environment.
- ORM decision spike.
- Tenant/RLS proof.
- Authentication adapter/vendor evaluation.
- SSE proof.
- Transactional outbox proof.
- CI, structured logging and correlation IDs.
- Updated estimates/decomposition for S1–S3.

## Out of scope

- production authentication rollout;
- real WhatsApp provider integration;
- finished UI screens;
- queue lifecycle implementation;
- public QR flow;
- deployment to production;
- any canonical feature marked Done.

## Agent order

1. DevOps + Frontend: scaffold.
2. Database + DevOps: PostgreSQL harness.
3. Database + Security: ORM/RLS spike.
4. Backend + Security: auth port/vendor scorecard.
5. Backend + Frontend: SSE spike.
6. Backend + Database: outbox worker spike.
7. QA: automate evidence.
8. Reviewer: gate review.
9. Tech Lead + Project Manager: re-estimate S1–S3.

## Files likely created

- package/configuration files;
- `.github/workflows/ci.yml`;
- `.env.example`;
- `docker-compose.yml`;
- `src/shared/*`;
- `src/worker/*`;
- migration/spike directories;
- `tests/integration/*`;
- `tests/security/*`;
- new ADRs for ORM and any selected provider decision;
- updated backlog/risk/status documents.

## Expected commands

The exact package manager command is established by the scaffold. The repository must expose stable scripts equivalent to:

```bash
pnpm install --frozen-lockfile
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test
pnpm test:integration
pnpm test:security
pnpm build
pnpm db:migrate
pnpm db:reset:test
```

## Exit criteria

- clean clone can be bootstrapped from documented steps;
- all CI checks pass;
- migrations create a clean test database;
- cross-tenant proof is denied at repository and RLS layers;
- selected ORM has an approved ADR;
- auth provider remains behind a port and scorecard is documented;
- SSE reconnects and reconciles after a missed update;
- outbox processing is atomic and idempotent;
- logs are structured and redact sensitive data;
- S1–S3 tasks are Ready and re-estimated;
- Reviewer records no critical/high unresolved finding.

## Recommended Codex prompt

Use the “start engineering” prompt in `CODEX_WORKFLOW.md`.
