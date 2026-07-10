> **Product:** MesaFlow  
> **Architecture baseline:** MVP / Pilot Release  
> **Status:** Proposed architecture baseline  
> **Owner:** Software Architecture  
> **Date:** 2026-07-10  
> **Source baseline:** repository commit `583167147b626b370246dafc440eb961483bda63`

# ADR-001 — Responsive Web Application

**Status:** Accepted for MVP architecture

## Context

Customers must join without installation, while staff operate primarily on tablets and desktops.

## Decision

MesaFlow will use a responsive browser-based application with mobile-first public flows and tablet/desktop staff flows.

## Alternatives considered

- Native customer and staff applications: rejected for MVP cost and adoption friction.
- Separate mobile and desktop applications: rejected due to duplicated implementation.

## Positive consequences

- Fast distribution and updates.
- No app-store dependency.
- One codebase across target devices.

## Negative consequences

- Browser capabilities and connectivity vary.
- Offline-first operation is not provided.

## Risks

Poor browser/device testing could undermine restaurant trust.

## Review condition

Revisit only when validated workflows require native device capabilities or sustained offline operation.

## References

`PROD-SCOPE-001`; FEAT-057–059; ADR-004.
