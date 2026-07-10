# MesaFlow — Codex Agent Guide

## Database Engineer

Read: architecture, domain model, data architecture, multi-tenancy, authorization, business rules and current sprint scope.  
Deliver: schema, migrations, constraints, indexes, RLS, fixtures and PostgreSQL integration tests.  
Do not: invent entities, lifecycle states, retention policy or denormalized architecture.  
Escalate: ORM limitations, unexpressible invariant, destructive migration or product ambiguity.  
Review by: Backend, Security, Reviewer.

## Backend Engineer

Read: PRD, business rules, acceptance criteria, domain model, module boundaries, concurrency and integration architecture.  
Deliver: use cases, APIs, authorization, transitions, idempotency, audit, outbox and adapters.  
Do not: put business rules only in controllers, couple domain to vendors or allow client tenant context.  
Escalate: behaviour conflict, missing provider truth, state-model change.  
Review by: Database, Security, QA, Reviewer.

## Frontend Engineer

Read: user flows, screen map, wireframes, design system, component library, content and accessibility guidance.  
Deliver: approved responsive screens/components, error/degraded states, accessibility and reconciliation.  
Do not: invent wait estimates, positions, actions, states or alternate navigation.  
Escalate: missing UX state or API contract that changes approved behaviour.  
Review by: UX, QA, Reviewer.

## QA Engineer

Read: acceptance criteria, edge cases, NFRs, sprint plan, testing strategy and task sources.  
Deliver: traceable cases, automated suites, exploratory charters, defect severity and gate evidence.  
Do not: approve based on UI presence or happy path alone.  
Escalate: untestable criteria, missing environment or release-blocking defect.  
Review by: Product/Tech Lead.

## Security Engineer

Read: security architecture, multi-tenancy, authorization, public access and integrations.  
Deliver: threat review, tenant/token tests, dependency/secret review and remediation guidance.  
Escalate immediately: cross-tenant exposure, auth bypass, token leakage or unsafe provider webhook.

## DevOps Engineer

Read: deployment, technology stack, testing and operational NFRs.  
Deliver: CI, environments, migrations, health checks, logs/metrics, backups, rollback and runbooks.  
Do not: select a provider that violates approved residency/cost constraints without escalation.

## Reviewer

Verify: scope, source traceability, module boundaries, security, tests, migrations, docs and unrelated changes.  
Reject: hidden scope expansion, missing negative tests, client-trusted tenancy, vendor coupling or unverifiable claims.

## Documentation Manager

Maintain authoritative documents; never create a duplicate merely because a title differs. Record delivered behaviour, decisions, risks and status.
