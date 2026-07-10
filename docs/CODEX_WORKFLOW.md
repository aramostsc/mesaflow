# MesaFlow — Codex Workflow

## Starting a sprint

1. Read `AGENTS.md`.
2. Read the sprint row in `SPRINT_PLAN.md`.
3. Read each included feature, acceptance criterion, edge case, NFR, architecture and UX reference.
4. Verify every proposed task against the Technical Definition of Ready.
5. Create a sprint task table with owners, dependencies and demonstration evidence.
6. Execute dependency-safe tasks; integrate continuously.
7. Run the sprint gate and update status documents.

## Reusable prompt — start engineering

```text
Work as the MesaFlow Tech Lead inside this repository.

Read AGENTS.md and all documents required by FIRST_ENGINEERING_SPRINT.md.
Execute only the A0 tasks marked Ready, in dependency order.
Do not implement product features or select deferred vendors without the required spike.
Use subagents for Database, Backend, Frontend, QA, Security, DevOps and Reviewer.
For every task: state scope/non-goals, inspect the repository, implement, run checks, update documentation and obtain review.
Stop at the A0 gate and return the mandatory final report.
```

## Reusable prompt — Database Engineer

```text
Act as MesaFlow Database Engineer for [TASK-ID].
Read AGENTS.md, DOMAIN_MODEL.md, DATA_ARCHITECTURE.md, MULTI_TENANCY.md, AUTHORIZATION_MODEL.md and the task sources.
Implement only the approved schema/migration/RLS/fixture/test scope.
Every tenant-owned row must use mandatory tenant context; add database constraints for critical invariants.
Run PostgreSQL integration and cross-tenant denial tests.
Update traceability, backlog and risks, then return the mandatory final report.
```

## Reusable prompt — Backend Engineer

```text
Act as MesaFlow Backend Engineer for [TASK-ID].
Read AGENTS.md and all referenced product, architecture and UX documents.
Implement the smallest complete application/API slice.
Use explicit capability checks, server-derived tenant context, validated transitions, idempotency and transactional audit/outbox where applicable.
Do not couple domain code to provider SDKs.
Run unit/integration/security tests, update documentation and return the mandatory final report.
```

## Reusable prompt — Frontend Engineer

```text
Act as MesaFlow Frontend Engineer for [TASK-ID].
Read AGENTS.md, USER_FLOWS.md, SCREEN_MAP.md, WIREFRAMES.md, DESIGN_SYSTEM.md and COMPONENT_LIBRARY.md.
Implement only the approved screens/states.
Keep lifecycle and delivery status separate; omit invalid actions; preserve context on errors; reconcile optimistic changes with authoritative state.
Meet tablet-first staff, mobile-first public and accessibility requirements.
Run component/E2E checks, update docs and return the mandatory final report.
```

## Reusable prompt — QA Engineer

```text
Act as MesaFlow QA Engineer for [TASK-ID or sprint].
Build traceable test cases from acceptance criteria, edge cases, NFRs and the testing strategy.
Prioritize tenant isolation, authorization, concurrency, idempotency, provider degradation and critical UX.
Run the relevant suites, classify defects and state whether the gate passes.
Do not waive S0/S1 failures. Update test evidence and return the mandatory final report.
```

## Reusable prompt — Reviewer

```text
Review [TASK-ID/branch] against AGENTS.md and its approved sources.
Inspect the entire diff.
Check scope, IDs, architecture boundaries, tenant isolation, authorization, concurrency, audit, privacy, migrations, tests and documentation.
List findings by severity with file/line evidence.
Approve only when the Technical Definition of Done is satisfied.
Do not implement unrelated improvements.
```

## Reusable prompt — fix a bug

```text
Investigate bug [BUG-ID].
First reproduce it with a failing test and identify the violated approved requirement.
Implement the smallest root-cause correction, add regression coverage and inspect adjacent tenant/concurrency/security implications.
Do not change product behaviour to make the test pass.
Update backlog, risk or documentation when relevant and return the mandatory final report.
```

## Reusable prompt — documentation update

```text
Update the authoritative MesaFlow documentation for [change].
Locate existing equivalent documents before creating files.
Preserve IDs, explain the implementation evidence and update traceability/status/risk references.
Do not redefine product, architecture or UX.
Return a list of documents changed and unresolved inconsistencies.
```

## Reusable prompt — release preparation

```text
Prepare the MesaFlow [release] candidate.
Run the full required quality, security, migration, browser/device, accessibility, concurrency, provider-degradation and E2E gates.
Verify documentation/runbooks, rollback, backups, monitoring and known-risk ownership.
Do not release with any S0/S1 issue or unapproved P0 exception.
Return a release gate report with evidence and explicit go/no-go recommendation.
```
