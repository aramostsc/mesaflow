# MesaFlow — AGENTS.md

## 1. Product context

MesaFlow is a responsive B2B SaaS product for small and medium restaurants. Its MVP replaces the paper waiting list with one trustworthy live queue, accountless customer participation and WhatsApp-first communication.

The MVP is not a POS, ERP, CRM, reservation system, table-map product, marketplace, predictive wait-time engine or native mobile application.

## 2. Source of truth and reading order

Before changing code, every agent must read the documents relevant to its task. The minimum reading order is:

1. `docs/MVP_SCOPE.md`
2. `docs/OUT_OF_SCOPE.md`
3. `docs/PRODUCT_DECISIONS.md`
4. `docs/BUSINESS_RULES.md`
5. `docs/ACCEPTANCE_CRITERIA.md`
6. `docs/NON_FUNCTIONAL_REQUIREMENTS.md`
7. `docs/ARCHITECTURE.md`
8. `docs/TECHNOLOGY_STACK.md`
9. `docs/DOMAIN_MODEL.md`
10. `docs/MULTI_TENANCY.md`
11. `docs/AUTHORIZATION_MODEL.md`
12. `docs/USER_FLOWS.md`
13. `docs/SCREEN_MAP.md`
14. `docs/TECH_LEAD_PLAN.md`
15. task-specific documents referenced by the assigned engineering task.

The approved documents in `docs/` outrank assumptions, generic best practices and convenience.

## 3. Non-negotiable rules

- Preserve all existing IDs: `FEAT-*`, `PBI-*`, `US-*`, `EPIC-*`, `ADR-*`, `SCR-*`, `CMP-*`, `SPRINT-*`, `MILESTONE-*`, `UF-*`, `UX-*`.
- Do not create, remove or reinterpret product functionality.
- Do not introduce a new queue lifecycle state.
- Do not conflate queue lifecycle with WhatsApp delivery status.
- Never trust a client-supplied tenant identifier.
- Every tenant-scoped query must receive server-derived tenant context.
- Material actions must be attributable and auditable.
- Queue mutations must validate transitions and concurrency.
- A WhatsApp failure must not roll back a successful queue transition.
- Public customers must not require an account.
- Closed-service records are read-only except where an approved correction flow explicitly permits otherwise.
- Never expose secrets, full phone numbers or private status tokens in logs.
- Avoid abstractions that are not required by the current sprint.

## 4. Architecture baseline

- TypeScript.
- Next.js responsive web application.
- Modular monolith.
- PostgreSQL as system of record.
- Prisma or Drizzle only after the approved A0 spike.
- Managed authentication behind an application adapter.
- Server-Sent Events first for live updates, behind an interface.
- PostgreSQL transactional outbox and background worker.
- External providers behind adapters.
- EU-region managed hosting.
- GitHub Actions for CI/CD.

## 5. Agent hierarchy

### Tech Lead
Owns decomposition, sequencing, integration boundaries and technical gate decisions. Does not alter product or architecture.

### Database Engineer
Owns schema, constraints, migrations, indexes, RLS, fixtures and database-level tests.

### Backend Engineer
Owns application use cases, domain transitions, APIs, authorization checks, idempotency, outbox and provider adapters.

### Frontend Engineer
Owns approved screens, responsive components, accessibility, client state and reconciliation with authoritative server state.

### QA Engineer
Owns test design, acceptance traceability, automated suites, critical edge cases and release evidence.

### Security Engineer
Owns threat review, tenant-isolation review, secret handling, token design and security test coverage.

### DevOps Engineer
Owns reproducible environments, CI, deployment, migrations, health checks, monitoring and rollback.

### Reviewer
Reviews scope, correctness, security, tests, migrations and documentation. The Reviewer must not rewrite the feature unless assigned.

### Documentation Manager
Ensures delivered behaviour, decisions, runbooks and status documents remain accurate.

## 6. Mandatory task workflow

1. Read the assigned task and its origin documents.
2. State the task scope and explicit non-goals.
3. Inspect the current repository before proposing changes.
4. Confirm Definition of Ready.
5. Implement the smallest complete vertical or foundational slice.
6. Run formatting, linting, type checks and relevant tests.
7. Review the diff for unrelated changes.
8. Update required documentation.
9. Produce the final report defined below.
10. Stop. Do not continue into the next task without an explicit assignment.

## 7. Scope control

An agent must stop and escalate when implementation would:

- change an approved product result;
- add an out-of-scope capability;
- weaken tenant isolation, auditability or authorization;
- select a deferred vendor without completing the required spike;
- contradict an ADR;
- require a new primary lifecycle state;
- make paper the operational source of truth;
- bypass a P0 non-functional requirement.

Escalation owner:

- strategy: CEO;
- product behaviour or scope: Product Manager;
- sequence or milestone: Project Manager;
- architecture or technology: Software Architect;
- user experience: UX/UI Designer;
- implementation decomposition: Tech Lead.

## 8. Technical Definition of Ready

A task is Ready only when it has:

- a unique engineering task ID;
- links to approved source IDs/documents;
- clear scope and non-goals;
- technical acceptance criteria;
- known dependencies;
- assigned primary agent;
- expected tests;
- likely files or modules;
- no unresolved contradiction with approved documentation.

## 9. Technical Definition of Done

A task is Done only when:

- the approved scope is implemented;
- no unrequested feature was added;
- formatting, linting and type checks pass;
- required automated tests pass;
- tenant and authorization implications are tested;
- migrations are reversible or have a documented recovery strategy;
- errors and operational signals are handled;
- documentation is updated;
- new risks are registered;
- a Reviewer has approved the result;
- the final report explains exactly what changed.

## 10. Testing rules

- Domain transitions require unit tests.
- Repository/database behaviour requires integration tests against PostgreSQL.
- Tenant isolation requires negative cross-tenant tests.
- Public tokens require invalid, expired and object-substitution tests.
- Queue commands require duplicate submission and stale-version tests.
- Critical staff/customer flows require end-to-end tests.
- Provider interactions use deterministic fakes in CI.
- A failed external notification must be tested independently from queue-state success.
- Tests must not depend on execution order or shared mutable data.

## 11. Documentation rules

Every completed task updates, when applicable:

- `docs/TRACEABILITY_MATRIX.md`;
- `docs/TECHNICAL_BACKLOG.md`;
- `docs/TECHNICAL_RISK_REGISTER.md`;
- architecture ADRs if a binding decision changes;
- runbooks for operational changes;
- `docs/PROJECT_STATUS.md` or `docs/CHANGELOG.md` when present.

Do not duplicate an existing document. Update the authoritative one.

## 12. Branches, commits and review

- Branch format: `type/task-id-short-description`.
- Types: `feat`, `fix`, `test`, `docs`, `chore`, `refactor`, `spike`.
- Commit format: `type(scope): description [TASK-ID]`.
- One task per branch unless the Tech Lead explicitly packages dependent tasks.
- Keep commits reviewable and free from generated noise.
- Never commit `.env`, provider credentials, private tokens or production data.

## 13. Required final report

Every Codex task ends with:

### Scope delivered
### Files changed
### Decisions made
### Tests run and results
### Documentation updated
### Risks or limitations
### Deviations from plan
### Recommended next task

If blocked, report the exact blocking decision and responsible escalation owner.
