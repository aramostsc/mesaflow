> **Product:** MesaFlow  
> **Architecture baseline:** MVP / Pilot Release  
> **Status:** Proposed architecture baseline  
> **Owner:** Software Architecture  
> **Date:** 2026-07-10  
> **Source baseline:** repository commit `583167147b626b370246dafc440eb961483bda63`

# ADR-003 — PostgreSQL as System of Record

**Status:** Accepted for MVP architecture

## Context

Queue state, capacity and audit require transactions, constraints and reliable querying.

## Decision

Use managed PostgreSQL as the authoritative data store.

## Alternatives considered

- Document database: weaker fit for relational invariants and reporting.
- Serverless key-value store: increases transaction and query complexity.

## Positive consequences

- ACID transactions, constraints, mature tooling, RLS and backups.

## Negative consequences

- Schema migrations require discipline.
- Scaling writes remains vertically constrained initially.

## Risks

Poor transaction design could create lock contention.

## Review condition

Review only after measured workload exceeds managed PostgreSQL capabilities.

## References

`DATA_ARCHITECTURE.md`; FEAT-019, FEAT-027, FEAT-056.
