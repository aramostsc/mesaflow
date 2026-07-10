# MesaFlow — Repository Structure

## Proposed baseline

```text
/
├─ AGENTS.md
├─ package.json
├─ pnpm-lock.yaml
├─ next.config.ts
├─ tsconfig.json
├─ eslint.config.mjs
├─ .env.example
├─ .github/
│  └─ workflows/
│     ├─ ci.yml
│     └─ migration-check.yml
├─ docs/
├─ prisma/ or drizzle/
│  ├─ migrations/
│  └─ schema.*
├─ scripts/
│  ├─ seed.ts
│  ├─ check-env.ts
│  └─ verify-migrations.ts
├─ src/
│  ├─ app/
│  │  ├─ (public)/
│  │  ├─ (staff)/
│  │  └─ api/
│  ├─ modules/
│  │  ├─ identity/
│  │  ├─ tenancy/
│  │  ├─ establishments/
│  │  ├─ services/
│  │  ├─ queue/
│  │  ├─ calls/
│  │  ├─ notifications/
│  │  ├─ public-access/
│  │  ├─ history/
│  │  └─ audit/
│  ├─ shared/
│  │  ├─ auth/
│  │  ├─ db/
│  │  ├─ errors/
│  │  ├─ observability/
│  │  ├─ validation/
│  │  ├─ realtime/
│  │  └─ ui/
│  └─ worker/
├─ tests/
│  ├─ unit/
│  ├─ integration/
│  ├─ e2e/
│  ├─ security/
│  ├─ fixtures/
│  └─ helpers/
└─ docker-compose.yml
```

## Boundary rules

- `modules/*/domain` contains domain types, invariants and transitions with no framework imports.
- `modules/*/application` contains use cases and ports.
- `modules/*/infrastructure` contains database/provider adapters.
- Route handlers translate transport input and call application use cases.
- UI components never call the database.
- Modules do not import another module's infrastructure internals.
- Shared code must be genuinely cross-cutting; domain-specific helpers remain in their module.
- A new top-level layer requires Tech Lead approval.

## Naming

- files: `kebab-case.ts`;
- React components: `PascalCase`;
- functions and variables: `camelCase`;
- database tables/columns: `snake_case`;
- domain enums: exact approved English canonical values;
- commands: verb-first, for example `callQueueEntry`;
- queries: `get`, `list` or `find` prefix;
- tests: `*.test.ts`, integration as `*.integration.test.ts`, E2E as `*.spec.ts`.

## Configuration

- Environment variables are parsed once at startup.
- `.env.example` contains names and safe explanations only.
- No module reads `process.env` directly outside the configuration adapter.
