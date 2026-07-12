# MesaFlow - S1-S3 Evidence-Based Re-estimation

**Task:** `ENG-A0-010`
**Scale:** XS, S, M, L, XL
**Confidence:** High, Medium, Low

Estimates are relative complexity, not calendar commitments. Canonical sprint feature allocations remain unchanged.

## Readiness summary

| Package | Readiness | Missing condition |
|---|---|---|
| S1 product persistence | Ready | task-level migration review |
| S1 real authentication | Conditionally Ready | Supabase EU project, credentials, cookie/revocation validation |
| S1 authorization/service/audit/UI | Conditionally Ready | persistence and request context first |
| S2 queue truth package | Conditionally Ready | S1 Gate and product schema task start |
| S3 synchronization/control package | Not Ready | stable S2 commands/queries and product event/version contracts |

No S1-S3 item is blocked by a product contradiction. Dependencies are technical sequencing or external environment conditions.

## S1 - Accountable Restaurant Context

**Canonical scope:** `FEAT-001-005`, `FEAT-020`, `FEAT-055`; screens S01-S04, S11, S12, S18.
**Value:** an authenticated, authorized restaurant team can enter the correct context and open one attributable service.
**Package estimate:** XL, Medium confidence. Parallel Database/Backend/Frontend/QA/Security capacity is assumed; otherwise Project Management must split delivery without moving the gate or features silently.

| Order | Task | Outcome | Size | Confidence | Readiness |
|---:|---|---|---|---|---|
| 1 | ENG-S1-001 | Tenant, Establishment, User, Membership schema/RLS/fixtures | L | Medium | Ready |
| 2 | ENG-S1-011 | Supabase Auth adapter, secure cookies and revocation proof behind `AuthPort` | M | Low | Conditionally Ready |
| 3 | ENG-S1-002 | Resolve authenticated user, membership and server-derived tenant context | M | Medium | Conditionally Ready |
| 4 | ENG-S1-009 | Append-only audit foundation with correlation attribution | M | High | Ready after 001 |
| 5 | ENG-S1-003 | Capability authorization and negative matrix | M | High | Ready after 002 |
| 6 | ENG-S1-006 | Service schema and one-active-service constraint | M | High | Ready after 001 |
| 7 | ENG-S1-007 | Open Service command/API/audit/conflict behavior | L | Medium | Ready after 003/006/009 |
| 8 | ENG-S1-008 | Authenticated no-active-service and empty queue shell | M | High | Ready after 002/003/007 |
| 9 | ENG-S1-004 | Team invite/revoke APIs | L | Low | Conditional on managed email/invite behavior |
| 10 | ENG-S1-005 | Team & Permissions screen | L | Medium | Ready after 004 |
| 11 | ENG-S1-010 | Integrated S1 acceptance/security/accessibility suite | L | Medium | Ready incrementally; closes last |

Low-confidence reasons: managed auth cookie/revocation/email behavior is not yet exercised; team invitation may depend on provider email configuration and rate limits.

**Parallel work:** after ENG-S1-001 contracts stabilize, ENG-S1-006/009 can proceed alongside ENG-S1-011. Frontend can build approved states against typed fakes after API contracts are reviewed. QA prepares fixtures and negative matrices throughout.

**Do not parallelize:** tenant/membership schema with request tenant-resolution semantics; capability enforcement before principal/context contracts; Open Service before the database uniqueness and audit transaction contract.

**Gate S1:** real sign-in; correct server-derived tenant; revoked/cross-tenant access denied; one active service enforced under concurrency; material actions attributed; approved responsive states and S1 E2E pass.

## S2 - Integrated Queue Truth

**Canonical scope:** `FEAT-015`, `FEAT-017-019`, `FEAT-023`, `FEAT-025`, `FEAT-049-051`; XP-01/XP-03.
**Value:** one device can create, view and resolve a manual queue while capacity remains authoritative.
**Package estimate:** XL, Medium confidence.

| Order | Task | Outcome | Size | Confidence | Readiness |
|---:|---|---|---|---|---|
| 1 | ENG-S2-001 | Queue Entry schema, exact lifecycle, RLS, versions and constraints | L | Medium | Conditional on S1 Gate |
| 2 | ENG-S2-002 | Authoritative transition policy with exhaustive unit tests | M | High | Conditional on 001 |
| 3 | ENG-S2-007 | Weighted capacity/settings/recalculation policy | L | Medium | Conditional on S1 setup and 001 |
| 4 | ENG-S2-003 | Manual Waiting entry command with idempotency/audit | L | Medium | Conditional on 001/007 |
| 5 | ENG-S2-004 | Authoritative Waiting/recently-completed queries | M | High | Conditional on 001 |
| 6 | ENG-S2-005 | Queue rows/cards/detail/manual-entry UI | L | Medium | Conditional on 003/004 contracts |
| 7 | ENG-S2-006 | Seated/Cancelled/NoShow commands plus transactional capacity/audit | XL | Low | Joint DEP-CYCLE-02 package |
| 8 | ENG-S2-008 | One-device queue-truth acceptance suite | L | Medium | Incremental; closes last |

ENG-S2-006 is low confidence because lifecycle outcomes and capacity form a deliberate cyclic package. It must be implemented as tested vertical transitions, not as separate “capacity complete” and “outcomes complete” phases.

**Gate S2:** exact lifecycle accepted; Cancelled terminal; manual entry idempotent; cross-tenant denial; Waiting/recent sections complete; Seated/Cancelled/NoShow recalculate capacity atomically; one-device service runs without paper for the included scope.

## S3 - Synchronized Manual Service

**Canonical scope:** `FEAT-021`, `FEAT-022`, `FEAT-027`, `FEAT-054`; XP-01/XP-02.
**Value:** two staff devices converge, conflicts are safe, intake is controlled, corrections are attributable and service closure is protected.
**Package estimate:** XL, Low-to-Medium confidence.

| Order | Task | Outcome | Size | Confidence | Readiness |
|---:|---|---|---|---|---|
| 1 | ENG-S3-001 | Product version/stale-write conflict contract | M | Medium | Not Ready until S2 commands stabilize |
| 2 | ENG-S3-002 | Product service event stream and authoritative reconciliation | L | Low | Not Ready until product events/hosting runtime are known |
| 3 | ENG-S3-003 | Intake close/reopen command and synchronized UI | L | Medium | Conditional on 001/002 |
| 4 | ENG-S3-005 | Administrator outcome correction with recalculation/audit | L | Low | Conditional on S2 terminal package |
| 5 | ENG-S3-004 | Safe service closure and immutable boundary | L | Medium | Conditional on S2 outcomes and 003/005 |
| 6 | ENG-S3-006 | Two-device conflict/reconnect/closure E2E suite | XL | Low | Closes last |

The A0 SSE probe reduces protocol risk but not product fan-out, authorization, hosted connection behavior or two-device E2E complexity.

**Gate S3/M2:** two devices converge after accepted changes and reconnect; stale actions return authoritative state; intake toggle is synchronized; corrections are admin-only/audited; closure rejects active entries; the scripted manual-only service completes without paper.

## First product vertical slice

**Slice:** `FEAT-020` Open Service happy path with the minimum accountable-context foundation.

An authenticated, authorized Administrator reaches the correct restaurant, sees S03 No Active Service, opens the sole active service, reaches the empty S04 queue shell and produces append-only audit/correlation evidence. This is the smallest canonical product outcome that proves persistence-to-interface value; supporting `FEAT-001-005` foundations are implemented only to the extent required by the slice and are not declared Done prematurely.

**Dependencies:** ENG-S1-001, ENG-S1-011, ENG-S1-002, ENG-S1-003, ENG-S1-006, ENG-S1-009, ENG-S1-007 and ENG-S1-008.
**Non-goals:** team invite UI, queue entries, intake controls, service closure, product SSE and public/customer behavior.
**Gate:** valid Administrator reaches only its tenant and opens exactly one service; concurrent duplicate open returns authoritative state; missing/revoked/cross-tenant/capability-denied paths fail; audit attribution, responsive/accessibility checks and correlation-safe logs pass.

## Critical path and integration points

`ENG-S1-001 -> ENG-S1-011 -> ENG-S1-002 -> ENG-S1-003 -> ENG-S1-006/009 -> ENG-S1-007 -> S1 Gate -> ENG-S2-001/007 -> ENG-S2-003/004 -> ENG-S2-006 -> S2 Gate -> ENG-S3-001/002 -> ENG-S3-003/005/004 -> ENG-S3-006/M2`.

Key integration reviews occur at schema/context, auth/capability, command/audit, capacity/outcome and event/reconciliation boundaries.

## External dependencies

| Dependency | Sprint/moment | Owner | Blocker? | Alternative/risk |
|---|---|---|---|---|
| Supabase EU project and credentials | S1 before ENG-S1-011 | DevOps/Security | task blocker, not S1-001 blocker | Clerk/Auth.js only through new decision if spike fails |
| Cookie/session/revocation behavior | ENG-S1-011 | Backend/Security | adapter gate | deterministic fake for earlier schema work, not S1 acceptance |
| Managed auth email/invite configuration | before ENG-S1-004 acceptance | Product/DevOps | invite-flow blocker | local fake cannot satisfy integrated gate |
| Secret management for non-local environments | before shared S1 environment | DevOps/Security | environment blocker | local `.env` remains development-only |
| EU hosting/runtime selection | before hosted S3 SSE acceptance | Architect/DevOps | hosted S3 gate | local SSE proof permits development only |
| DNS | not required for S1-S3 local/internal work | DevOps | no | required later for deployed environment |
| WhatsApp/provider/templates | S6, not S1-S3 | Product/Technical owner | no | remains deferred |
| Privacy procedure/device matrix/pilot owner | later M6 gates | named owners in dependencies | no for S1-S3 | remains active release risk |

## Test evolution

| Sprint | Mandatory evidence |
|---|---|
| S1 | schema/migration integration, RLS cross-tenant negatives, auth invalid/revoked sessions, capability positive/negative matrix, concurrent service open, audit immutability, auth/context E2E, S01/S03/S11/S12/S18 accessibility |
| S2 | lifecycle/capacity unit tests, repository/RLS integration, duplicate manual submission, stale version, terminal/capacity transaction tests, one-device operational E2E, queue UI accessibility/regression |
| S3 | concurrency collision tests, SSE authorization/replay/gap/reconnect, two-device E2E, intake/closure races, correction authorization/audit, offline/reconnecting UX and regression |

Outbox provider tests remain later because S1-S3 contain no messaging provider behavior.

## Risk disposition

- TR-001, TR-005, TR-006, TR-013: partially mitigated in A0; transfer proof to product paths.
- TR-002: active and transferred to S2/S3.
- TR-009: active in S1 audit and S3 correction/closure.
- TR-011: active for every product migration.
- TR-012: controlled by traceability/reviewer gate in every task.
- TR-007: active for the real S1 auth adapter.
- TR-008/TR-014: active continuously; final closure later.

No new product risk or scope change was introduced by this re-estimation.
