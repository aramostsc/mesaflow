# MesaFlow - CI and Quality Gates

## Purpose

`ENG-A0-008` establishes one baseline for local verification and GitHub Actions. It validates the engineering foundation only and does not implement product behaviour.

## Required gates

Every pull request and push to `main` must pass:

1. deterministic dependency installation from `pnpm-lock.yaml`;
2. PostgreSQL test-database reset and technical migration rehearsal;
3. PostgreSQL development/test connectivity smoke checks;
4. Drizzle migration consistency check;
5. Prettier format check;
6. ESLint with zero warnings;
7. strict TypeScript checks;
8. unit tests;
9. PostgreSQL integration tests;
10. the security-test suite gate;
11. the production Next.js build.

The integration and security configurations fail when no matching tests are discovered. `ENG-A0-009` added the first real security suite for observability redaction and external correlation-ID validation.

## Local verification

Docker/PostgreSQL must be available before running the complete gate:

```bash
corepack pnpm install --frozen-lockfile
corepack pnpm db:up
corepack pnpm db:ci
corepack pnpm verify
```

`db:ci` resets the isolated `mesaflow_test` database, applies the technical SQL and Drizzle migrations, rehearses development/test migrations, checks both database connections and validates Drizzle migration metadata.

`verify` runs `quality`, `test:all` and `build`. The integration suite always uses `TEST_DATABASE_URL` or its documented local default and includes an assertion that the active database is `mesaflow_test`.

## GitHub Actions

The workflow in `.github/workflows/ci.yml` uses Node 24, the repository-pinned pnpm version through Corepack, frozen-lockfile installation and PostgreSQL 16. It grants read-only repository contents permission and cancels obsolete runs for the same branch/ref.

GitHub branch protection must require the `quality` job before merge. Branch-protection configuration is repository administration and is not changed by this task.

## Migration policy

CI applies migrations to a freshly recreated test database and runs `drizzle-kit check`. This validates migration execution and metadata consistency. Migration immutability and destructive-change recovery remain reviewer responsibilities under `CODE_QUALITY_STANDARDS.md` and `TECHNICAL_DEFINITION_OF_DONE.md`.
