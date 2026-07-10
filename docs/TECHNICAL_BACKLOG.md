# MesaFlow — Technical Backlog

## Status vocabulary

`Não iniciado` · `Em análise` · `Em desenvolvimento` · `Em revisão` · `Em testes` · `Concluído` · `Bloqueado`

## A0 backlog

| ID | Title | Origin | Owner | Priority | Dependencies | Completion evidence | Status |
|---|---|---|---|---|---|---|---|
| ENG-A0-001 | Scaffold strict TypeScript/Next.js repository | Architecture, Stack | Frontend/DevOps | P0 | none | build, lint, typecheck and unit command pass | Não iniciado |
| ENG-A0-002 | Establish PostgreSQL local/test environment | Architecture | Database/DevOps | P0 | 001 | isolated test DB and migration command pass | Não iniciado |
| ENG-A0-003 | Decide Prisma versus Drizzle | Technology Stack | Database/Tech Lead | P0 | 002 | spike report and ADR cover RLS, transactions, migrations | Não iniciado |
| ENG-A0-004 | Prove tenant context and RLS | Multi-Tenancy | Database/Security | P0 | 003 | cross-tenant reads/writes denied | Não iniciado |
| ENG-A0-005 | Define authentication port and provider spike | Authorization | Backend/Security | P0 | 001 | session model and vendor scorecard approved | Não iniciado |
| ENG-A0-006 | Prove SSE reconnect and reconciliation | Realtime architecture, UX-007/008 | Backend/Frontend | P0 | 001 | disconnect/reconnect demo uses authoritative state | Não iniciado |
| ENG-A0-007 | Prove transactional outbox worker | Integration architecture | Backend/Database | P0 | 003 | commit + enqueue atomic; duplicate processing safe | Não iniciado |
| ENG-A0-008 | Establish CI and quality gates | Testing architecture | DevOps/QA | P0 | 001–004 | pull request pipeline runs all baseline checks | Não iniciado |
| ENG-A0-009 | Add structured logging and correlation IDs | Security/observability | Backend/DevOps | P0 | 001 | redacted structured log verified | Não iniciado |
| ENG-A0-010 | Re-estimate S1–S3 | Project Plan | Tech Lead/PM | P0 | 003–008 | tasks sized and dependency-safe | Não iniciado |

## S1 backlog

| ID | Title | Origin | Owner | Dependencies | Tests | Status |
|---|---|---|---|---|---|---|
| ENG-S1-001 | Persist Tenant, Establishment, User and Membership | FEAT-001–005 | Database | A0 | constraints, RLS, fixtures | Não iniciado |
| ENG-S1-002 | Resolve authenticated request context | Authorization model | Backend | S1-001, A0-005 | invalid/revoked/cross-tenant sessions | Não iniciado |
| ENG-S1-003 | Implement capability authorization | FEAT-001–005 | Backend | S1-002 | capability matrix negative tests | Não iniciado |
| ENG-S1-004 | Implement team invite/revoke APIs | FEAT-001–005 | Backend | S1-003 | invite/revoke/idempotency | Não iniciado |
| ENG-S1-005 | Implement Team & Permissions screen | S12, S18 | Frontend | S1-004 | component + E2E | Não iniciado |
| ENG-S1-006 | Persist Service and active-service uniqueness | FEAT-020 | Database | S1-001 | concurrent open constraint | Não iniciado |
| ENG-S1-007 | Implement Open Service use case/API | UF-01 | Backend | S1-006 | authorization, conflict, audit | Não iniciado |
| ENG-S1-008 | Implement No Active Service and Queue shell | S03, S04 | Frontend | S1-007 | responsive and accessibility tests | Não iniciado |
| ENG-S1-009 | Implement append-only Audit Event foundation | FEAT-055 | Database/Backend | S1-001 | attribution and immutability | Não iniciado |
| ENG-S1-010 | S1 integrated acceptance suite | Sprint S1 | QA | S1-001–009 | administrator-to-open-service E2E | Não iniciado |

## S2–S3 foundation backlog

| ID | Title | Origin | Owner | Dependencies | Status |
|---|---|---|---|---|---|
| ENG-S2-001 | Queue Entry schema and exact lifecycle enum | Domain model | Database | S1 | Não iniciado |
| ENG-S2-002 | Queue transition policy | Business rules | Backend | S2-001 | Não iniciado |
| ENG-S2-003 | Manual entry command and idempotency | UF-02 | Backend | S2-002 | Não iniciado |
| ENG-S2-004 | Live queue query | S04 | Backend | S2-001 | Não iniciado |
| ENG-S2-005 | Queue rows/cards and detail panel | CMP library, S04/S06 | Frontend | S2-004 | Não iniciado |
| ENG-S2-006 | Resolve entries and update capacity transactionally | S2 scope | Backend | S2-002 | Não iniciado |
| ENG-S3-001 | Entity version and stale-write conflict contract | Realtime/concurrency | Backend/Database | S2 | Não iniciado |
| ENG-S3-002 | Service event stream and reconciliation | UF-11 | Backend/Frontend | A0-006, S2 | Não iniciado |
| ENG-S3-003 | Intake close/reopen | UF-10 | Backend/Frontend | S2 | Não iniciado |
| ENG-S3-004 | Safe service closure | Domain model | Backend | S2-006 | Não iniciado |

Detailed feature-specific tasks for S4–S10 must be generated at the end of S3 using the same template and without changing the approved sprint allocation.
