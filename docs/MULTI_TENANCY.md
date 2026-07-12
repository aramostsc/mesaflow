> **Product:** MesaFlow  
> **Architecture baseline:** MVP / Pilot Release  
> **Status:** Proposed architecture baseline  
> **Owner:** Software Architecture  
> **Date:** 2026-07-10  
> **Source baseline:** repository commit `583167147b626b370246dafc440eb961483bda63`

# Multi-Tenancy

## Model

MesaFlow uses a shared application and shared PostgreSQL database with row-level tenant isolation.

`tenant_id` is the mandatory security boundary. The MVP presents one establishment, but the model permits a future tenant to own multiple establishments without exposing that feature now.

## Enforcement layers

1. Session resolves authenticated user and selected membership.
2. Request context contains server-derived `tenant_id` and `establishment_id`.
3. Repositories require tenant context and never accept unrestricted queries.
4. PostgreSQL Row-Level Security is recommended as defence in depth.
5. Unique constraints include `tenant_id` where identity is tenant-scoped.
6. Background jobs carry tenant context and validate ownership on load.
7. Logs and metrics include tenant identifiers only in non-sensitive form.

## A0 RLS proof

`ENG-A0-004` proved the tenant context pattern with technical-only tables under `mesaflow_technical`. Tenant context is set inside a transaction using the PostgreSQL setting `mesaflow.tenant_id`, and RLS policies deny access when the setting is missing or mismatched.

The proof uses a non-owner role without `BYPASSRLS`, `FORCE ROW LEVEL SECURITY` and negative integration tests. Product tables must implement their own reviewed policies; the probe tables are not product schema.

## Public access

QR and status endpoints resolve a signed or random public credential to a tenant and establishment. A client-supplied tenant identifier is never trusted.

## Cross-tenant administration

No cross-tenant product role exists in the MVP. Operational support tooling, if later introduced, requires separate authentication, explicit reason capture and enhanced audit.

## Tests

The automated suite must include:

- object-ID substitution across tenants;
- stale status token against another tenant;
- provider webhook mapped to another tenant;
- background job with mismatched tenant payload;
- raw repository query without tenant context;
- RLS denial tests.
