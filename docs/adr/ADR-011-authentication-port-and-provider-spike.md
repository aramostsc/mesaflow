# ADR-011 — Authentication Port and Provider Spike

**Status:** Accepted
**Date:** 2026-07-12
**Owner:** Backend / Security Engineering
**Task:** `ENG-A0-005`

## Context

MesaFlow needs managed staff authentication without coupling product code to a vendor. Customers remain accountless and use public/private tokens in later tasks. Authorization and tenant context are separate concerns and must not be folded into provider authentication.

## Decision

MesaFlow will define a provider-independent `AuthPort` in `src/shared/auth`.

The port exposes only current-session identity and typed authentication errors. It does not expose tenant IDs, establishment IDs, memberships, roles or business capabilities.

For the provider spike:

- **Recommended:** Supabase Auth.
- **Acceptable fallback:** Clerk.
- **Acceptable lower-lock-in option if managed providers fail:** Auth.js / NextAuth.
- **Rejected for MVP:** custom auth.

No real provider integration is implemented by this ADR.

## Rationale

Supabase Auth is recommended because it fits the EU-region preference, aligns naturally with PostgreSQL/RLS, supports staff email authentication primitives, has MFA readiness and can remain isolated behind `AuthPort`. MesaFlow must still keep tenant, establishment, membership, role and capability truth in application-owned data.

Clerk is an acceptable fallback because it has excellent Next.js ergonomics, managed user/session features, B2B organization capability for future evaluation, MFA readiness and fast MVP UX. Its data-processing and locality posture needs closer legal/cost review for MesaFlow's EU preference. Auth.js is flexible and portable, but shifts more security and operations work onto the MesaFlow team. Custom auth is not appropriate for the MVP because staff identity, reset, verification, revocation and MFA are security-sensitive commodity functions.

## Guardrails

- Product code imports `AuthPort`, not provider SDKs.
- Authentication must not decide capabilities.
- Authentication must not derive tenant context.
- Browser tokens must not be stored in local storage.
- Staff session revocation must be validated in the provider adapter spike.
- Supabase Auth metadata must not become tenant, membership, role or capability truth.
- Clerk Organizations must not become MesaFlow tenant truth if Clerk is selected later.
- Customer public access remains token-based and accountless.

## Follow-up

Future implementation must create a Supabase Auth adapter behind `AuthPort`, validate session revocation and cookie handling, and then connect authenticated users to server-derived membership/tenant context in S1.
