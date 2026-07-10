> **Product:** MesaFlow  
> **Architecture baseline:** MVP / Pilot Release  
> **Status:** Proposed architecture baseline  
> **Owner:** Software Architecture  
> **Date:** 2026-07-10  
> **Source baseline:** repository commit `583167147b626b370246dafc440eb961483bda63`

# ADR-007 — Append-Only Audit and Immutable Closed History

**Status:** Accepted for MVP architecture

## Context

Material actions require traceability and closed-service records must be trustworthy.

## Decision

Persist append-only audit events in the same transaction as material changes and forbid writes after service closure.

## Alternatives considered

- Application logs only: rejected because retention and integrity are insufficient.
- Full event sourcing: rejected as unnecessary complexity.

## Positive consequences

- Reliable attribution and diagnosability.
- Supports history without full event sourcing.

## Negative consequences

- Additional storage and privacy governance.

## Risks

Audit payloads could accidentally contain excess personal data.

## Review condition

Review retention and partitioning after growth and legal review.

## References

FEAT-054–056; SCN-013.
