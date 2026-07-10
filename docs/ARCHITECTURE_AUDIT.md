> **Product:** MesaFlow  
> **Architecture baseline:** MVP / Pilot Release  
> **Status:** Proposed architecture baseline  
> **Owner:** Software Architecture  
> **Date:** 2026-07-10  
> **Source baseline:** repository commit `583167147b626b370246dafc440eb961483bda63`

# Architecture Document Audit

## Inventory

### CEO — 11 documents
`VISION.md`, `MISSION.md`, `BUSINESS_MODEL.md`, `POSITIONING.md`, `GOALS.md`, `COMPETITIVE_ANALYSIS.md`, `DECISION_PRINCIPLES.md`, `NORTH_STAR.md`, `CEO_BRAIN.md`, `PRIORITIES.md`, `CEO_NOTES.md`.

### Product Manager — 15 documents
`PRODUCT_PHILOSOPHY.md`, `PRD.md`, `PERSONAS.md`, `USER_JOURNEYS.md`, `USER_STORIES.md`, `BUSINESS_RULES.md`, `MVP_SCOPE.md`, `PRODUCT_BACKLOG.md`, `FEATURE_CATALOG.md`, `FEATURE_PRIORITIES.md`, `ACCEPTANCE_CRITERIA.md`, `NON_FUNCTIONAL_REQUIREMENTS.md`, `EDGE_CASES.md`, `OUT_OF_SCOPE.md`, `PRODUCT_DECISIONS.md`.

### Project Manager — 14 documents
`BACKLOG.md`, `DEFINITION_OF_DONE.md`, `DEFINITION_OF_READY.md`, `DELIVERY_SEQUENCE.md`, `DEPENDENCIES.md`, `EPICS.md`, `EXECUTION_PLAN.md`, `FEATURE_EXECUTION_MAP.md`, `MILESTONES.md`, `PROJECT_PLAN.md`, `RISK_REGISTER.md`, `ROADMAP_EXECUTION.md`, `SPRINT_PLAN.md`, `WORKFLOW.md`.

## Significant requirements

| Requirement | Origin | Impact | Decision |
|---|---|---|---|
| No-install customer journey | MVP scope | Responsive web | ADR-001 |
| Full-service paper replacement | Vision/MVP | Correctness and recovery over novelty | ADR-002/003 |
| One active service/queue | MVP scope | Service uniqueness constraint | Data architecture |
| Multi-device operation | FEAT-027 | Realtime + concurrency | ADR-004/006 |
| WhatsApp call and visible failure | FEAT-038–042 | Outbox and adapter | ADR-008 |
| Individual accounts and roles | FEAT-001–005 | Managed auth/capabilities | ADR-005 |
| Read-only closed history | FEAT-056 | Audit and immutable closure | ADR-007 |
| Low operational cost | CEO principles | Managed modular monolith | ADR-002 |

## Ambiguities resolved architecturally

- Future multiple establishments are supported in the data model but not exposed in MVP UI.
- Delivery receipts are best-effort and normalised; unknown remains a valid status.
- Realtime is not the system of record.
- Phone-optional manual entries remain fully operable without automatic messaging.
- Timers are server-authored deadlines; expiry does not produce automatic No-show.

## Conflicts

No direct strategic, product or planning contradiction was found that blocks architecture. Sprint placement remains provisional pending engineering estimates, as stated by Project Management.

## Risks

Critical technical risks are tenant isolation and queue consistency. Both have mandatory defence-in-depth controls and pre-pilot verification in `TECHNICAL_RISKS.md`.
