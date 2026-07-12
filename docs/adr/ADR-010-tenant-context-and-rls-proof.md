# ADR-010 — Tenant Context and RLS Proof

**Status:** Accepted
**Date:** 2026-07-11
**Owner:** Database / Security Engineering
**Task:** `ENG-A0-004`

## Context

MesaFlow uses a shared PostgreSQL database. `tenant_id` is the mandatory security boundary, and application repositories must receive server-derived tenant context. `ADR-009` selected Drizzle while requiring an explicit proof that Drizzle does not weaken tenant isolation or PostgreSQL Row Level Security.

## Decision

MesaFlow will use transaction-local PostgreSQL tenant context plus RLS as the database isolation pattern.

The approved pattern is:

- set tenant context inside the database transaction with `set_config('mesaflow.tenant_id', tenantId, true)`;
- keep the context transaction-local so pooled connections do not leak tenant state;
- compare tenant-owned rows with `current_setting('mesaflow.tenant_id', true)` in RLS policies;
- use default-deny behaviour when tenant context is missing;
- enable and force RLS on tenant-owned tables;
- test RLS through a non-owner application role without `BYPASSRLS`;
- keep Drizzle access behind explicit helpers and future module repositories.

## Technical Evidence

`ENG-A0-004` created a technical-only probe under `mesaflow_technical`:

- `rls_probe_tenants`
- `rls_probe_records`
- `mesaflow_rls_probe_app`

The probe validates own-tenant reads, cross-tenant read denial, no-context denial, blocked cross-tenant writes, blocked tenant-changing updates, blocked deletes and no tenant-context leakage after transaction commit.

## Consequences

Positive:

- Tenant context is explicit and transaction-scoped.
- RLS denial is proven against a realistic non-owner role.
- Future repositories have a concrete safety pattern to follow.

Tradeoffs:

- Migrations must include reviewed SQL for roles, grants and RLS policies.
- Local and CI test databases must apply Drizzle migrations after reset.
- Product schemas still need their own reviewed policies and negative tests.

## Follow-up

Future product persistence tasks must adapt this pattern to real MesaFlow tables without reusing the technical probe as product schema.
