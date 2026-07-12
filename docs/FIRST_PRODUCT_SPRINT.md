# MesaFlow - First Product Sprint

## Sprint identity

**ID:** S1
**Name:** Accountable Restaurant Context
**Canonical features:** `FEAT-001-005`, `FEAT-020`, `FEAT-055`
**Status:** Conditionally Ready

## Objective and value

Establish the first real accountable restaurant context: authenticated people resolve to server-owned membership/tenant context, capabilities are enforced, one service can open and material actions are attributable.

## First vertical slice

`FEAT-020` Open Service: an authenticated Administrator reaches the correct restaurant, sees the approved No Active Service state, opens exactly one service and reaches the empty queue shell with audit attribution. Team management and queue entries remain outside this first slice.

## Tasks and sequence

1. `ENG-S1-001` - product Tenant/Establishment/User/Membership schema, constraints, RLS and fixtures.
2. `ENG-S1-011` - Supabase Auth adapter/session-cookie/revocation proof behind `AuthPort`.
3. `ENG-S1-002` - server-derived authenticated membership and tenant context.
4. `ENG-S1-009` - append-only audit foundation with correlation attribution.
5. `ENG-S1-003` - capability authorization matrix.
6. `ENG-S1-006` - Service persistence and active-service uniqueness.
7. `ENG-S1-007` - Open Service use case/API/audit.
8. `ENG-S1-008` - no-active-service and empty queue shell.
9. `ENG-S1-004` - team invite/revoke APIs.
10. `ENG-S1-005` - Team & Permissions screen.
11. `ENG-S1-010` - integrated acceptance suite and sprint review evidence.

## Agents and parallel work

Database owns 001/006/009 persistence; Backend/Security own 011/002/003/004/007; Frontend owns 005/008; QA develops evidence incrementally; Reviewer and Documentation Manager close every slice.

After schema contracts stabilize, auth adapter, service/audit persistence and approved UI state work may proceed in parallel. Tenant resolution and authorization must share one reviewed contract and must not be independently invented.

## Dependencies and risks

- Supabase EU project/credentials and managed email configuration have named DevOps/Security/Product ownership.
- Real adapter acceptance is conditional on cookie, session revocation and EU-region validation.
- Product RLS must repeat A0 negative evidence; technical probe success is not product approval.
- S1 remains an XL relative package; calendar commitment requires actual team capacity.

## Tests

Migration/recovery rehearsal, product RLS negatives, invalid/revoked/cross-tenant sessions, complete capability matrix, concurrent Open Service, audit immutability, responsive/accessibility tests and Administrator-to-open-service E2E are mandatory.

## Definition of Ready

- task has one `ENG-S1-*` ID and canonical feature/UX references;
- schema/API/UI boundary and non-goals are explicit;
- external credentials are available or the task explicitly uses the approved fake;
- tests, migration strategy, tenant/auth/audit implications and files are identified;
- no unresolved product or lifecycle contradiction exists.

`ENG-S1-001` is Ready now. Provider-dependent tasks are Conditionally Ready until their environment inputs exist.

## Definition of Done and gate

All repository gates pass; real persistence and migrations are reviewed; tenant/capability negative tests pass; material actions are audited; approved UI states are responsive/accessibile; docs/traceability/risks are current; Reviewer approval is recorded.

**S1 gate:** Administrator signs in, resolves only the correct tenant, invites/revokes Staff, opens the sole active service under concurrent attempt, sees the operational shell and audit evidence; unauthorized/revoked/cross-tenant paths fail.

## Expected demo

Administrator signs in, lands in its restaurant, views the No Active Service state, opens the service, invites a Staff member, shows role-based action differences and displays attributable audit evidence. No queue entry is created in S1.

## Recommended Codex prompts

### Pre-S1 audit

> MESAFLOW - PRE-S1 READINESS AUDIT. Read AGENTS.md, docs/FIRST_PRODUCT_SPRINT.md, docs/S1_S3_REESTIMATION.md and every source referenced by ENG-S1-001. Verify A0 gates, repository state, product traceability, schema/RLS requirements, migration recovery and external dependencies. Do not implement. Report Ready, Conditionally Ready, Not Ready or Blocked with exact evidence. Do not change MVP scope.

### First S1 task

> MESAFLOW - ENG-S1-001 - PERSIST TENANT, ESTABLISHMENT, USER AND MEMBERSHIP. Implement only ENG-S1-001 from docs/FIRST_PRODUCT_SPRINT.md and docs/ENGINEERING_TASKS.md. Create the minimum approved product schema, constraints, SQL-reviewed Drizzle migration, default-deny RLS and explicit fictional fixtures. Do not integrate a real auth provider, implement capabilities/UI/service/queue, or start ENG-S1-002. Run db:ci, verify and all required product RLS negative tests. Update operational documentation and stop.

### First vertical slice

> MESAFLOW - S1 FIRST VERTICAL SLICE - FEAT-020 OPEN SERVICE. Coordinate Database, Backend, Frontend, QA, Security and Reviewer for the approved slice: an authenticated Administrator reaches only its server-derived restaurant context, sees S03 No Active Service, opens exactly one service and reaches the empty S04 shell. Use ENG-S1-001, ENG-S1-011, ENG-S1-002, ENG-S1-003, ENG-S1-006, ENG-S1-009, ENG-S1-007 and ENG-S1-008. Preserve AuthPort, RLS, capability, audit and correlation boundaries. No team management, queue entry, intake toggle, service closure, product SSE or public functionality. Require concurrent-open, invalid/revoked/cross-tenant/capability negatives, persistence-to-UI E2E, accessibility and final scope review.

### Sprint review

> MESAFLOW - S1 REVIEW. Review the completed S1 diff and documentation against AGENTS.md, FEAT-001-005, FEAT-020, FEAT-055, FIRST_PRODUCT_SPRINT.md, acceptance criteria, UX screens and S1 gate. Findings first: scope regressions, tenant/auth/capability defects, migration risks, missing audit attribution, security/privacy issues and missing tests. Run db:ci and verify. Do not rewrite features or begin S2. Approve only if the integrated demo and Definition of Done pass.
