# MesaFlow — Tech Lead Plan

**Status:** Engineering execution baseline  
**Owner:** Tech Lead  
**Baseline:** MVP / Pilot Release  
**Date:** 2026-07-10

## 1. Mission

Translate the approved CEO, Product, Project Management, Software Architecture and UX/UI documentation into an implementation system that Codex engineering agents can execute without expanding the MVP.

## 2. Audit conclusion

The five required documentation layers exist and are mutually aligned around the same operational loop:

1. establish an accountable restaurant context;
2. open one active service;
3. accept manual and QR entries;
4. maintain one authoritative concurrent queue;
5. call customers while treating notification delivery separately;
6. resolve every entry;
7. close the service;
8. expose read-only operational history.

No blocking product, execution, architecture or UX contradiction was identified.

## 3. Binding implementation constraints

- Responsive web product; tablet is the primary staff form factor.
- Modular monolith, one deployable application and one worker.
- PostgreSQL is authoritative.
- Shared database with mandatory row-level tenant isolation.
- Explicit capability-based authorization.
- Exact primary entry states: `Waiting`, `Called`, `Seated`, `Cancelled`, `NoShow`.
- Queue transitions are transactional, validated and concurrency-safe.
- Live updates reconcile with authoritative state.
- Notifications use an outbox and provider adapter.
- Delivery status never determines lifecycle success.
- Material actions create append-only audit evidence.
- Customers use QR/private credentials and do not create accounts.

## 4. Stack disposition

| Area | Disposition | Engineering action |
|---|---|---|
| TypeScript | Confirmed for execution | Use strict mode throughout |
| Next.js | Recommended baseline | Adopt unless A0 reveals a blocking limitation |
| Modular monolith | Confirmed | Enforce module boundaries without microservices |
| PostgreSQL | Confirmed | Use transactions, constraints and RLS |
| Prisma vs Drizzle | Drizzle selected by `ADR-009`; tenant context/RLS proved by `ADR-010` | Use SQL-reviewed Drizzle migrations and transaction-local tenant context |
| Managed authentication | `AuthPort` defined; Supabase Auth recommended by `ADR-011` | Validate cost/session revocation/cookie handling before provider adapter rollout |
| SSE | SSE-first proof accepted by `ADR-012` | Validate hosting/runtime behaviour before product rollout |
| PostgreSQL outbox/worker | Confirmed | Implement before WhatsApp provider integration |
| Hosting | Open vendor | Select EU managed platform after deployment spike |
| WhatsApp provider | Open vendor | Select after capability and truthful-status spike |
| Monitoring | Recommended | Add structured logs and error capture from foundation sprint |
| GitHub Actions | Confirmed recommendation | Establish CI in first engineering sprint |

## 5. Delivery governance

The Project Manager sequence A0 and S1–S10 remains controlling. Technical tasks may be split or packaged, but canonical feature outcomes and ordering constraints remain unchanged.

## 6. Gate policy

A sprint cannot close when:

- a relevant S0/S1 defect remains;
- tenant isolation is untested;
- queue state can diverge across devices;
- failed notification delivery incorrectly changes queue state;
- documentation does not match implemented behaviour;
- a feature is only visually present but not integrated.

## 7. Immediate execution

The first Codex implementation is `ENG-A0-001` through `ENG-A0-010`, followed by the S1 foundation slice. The canonical A0 task list is maintained in `TECHNICAL_BACKLOG.md` and summarized by `FIRST_ENGINEERING_SPRINT.md`. The first code-producing slice establishes repository structure, CI, local PostgreSQL, strict TypeScript, test harness, module boundaries and architecture-spike decisions. It does not claim completion of a product feature.
