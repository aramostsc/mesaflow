> **Product:** MesaFlow  
> **Architecture baseline:** MVP / Pilot Release  
> **Status:** Proposed architecture baseline  
> **Owner:** Software Architecture  
> **Date:** 2026-07-10  
> **Source baseline:** repository commit `583167147b626b370246dafc440eb961483bda63`

# Technology Stack

## Recommended baseline

| Element | Recommendation | Status | Alternatives | Review trigger |
|---|---|---|---|---|
| Language | TypeScript | Recommended | C#, Python | Team capability or operational evidence |
| Web framework | Next.js | Recommended | React + Fastify/NestJS | Need for independently deployed frontend/backend |
| Backend structure | Modular application layer inside Next.js or companion Node process | Recommended | NestJS | Complexity of routes/use cases exceeds framework comfort |
| Database | PostgreSQL | Confirmed recommendation | MySQL | No material trigger expected |
| ORM/query | Prisma or Drizzle after spike | Hypothesis to validate | Kysely | RLS, migrations and transaction ergonomics |
| Authentication | Managed provider | Recommended | Self-hosted auth | Cost, data residency or provider constraints |
| Realtime | SSE first; managed WebSockets where platform fit is stronger | Recommended | Polling only | Bidirectional realtime needs |
| Jobs | PostgreSQL-backed outbox and worker | Confirmed recommendation | Managed queue | Throughput or isolation need |
| Hosting | Managed application platform in EU region | Recommended | Major cloud containers | Cost, residency, networking or scale |
| Monitoring | Sentry-compatible errors + managed logs/metrics | Recommended | OpenTelemetry stack | Scale or vendor portability need |
| CI/CD | GitHub Actions | Recommended | Platform CI | Repository workflow needs |

## Rationale

TypeScript enables one language across web, API and worker, supports rapid startup development and is well supported by Codex. PostgreSQL provides transactions, constraints, RLS and mature managed hosting.

Next.js is recommended for fast delivery of public and authenticated web experiences. The domain/application code must remain framework-independent enough to move to a dedicated API process later.

## Provider decisions deferred

The exact authentication, hosting, realtime and WhatsApp vendors require short spikes based on EU data processing, Portuguese support, cost, sandbox quality and operational simplicity. Vendor choice must not change the provider interfaces defined by architecture.

## Lock-in controls

- domain code imports no vendor SDK;
- SQL migrations remain portable PostgreSQL;
- data export is documented;
- provider references are stored alongside normalised statuses;
- deployment configuration is reproducible;
- customer URLs use MesaFlow-owned domains.
