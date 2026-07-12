# MesaFlow — Authentication Architecture

## Purpose

`ENG-A0-005` defines the authentication boundary for staff/admin identity. It does not implement real login, signup, logout, OAuth, provider SDK calls, product users, memberships, permissions or tenant context resolution.

## Responsibility Split

Authentication answers: who is this signed-in staff user?

Authorization answers: what may this actor do?

Tenant context answers: for which tenant and establishment is this operation running?

The authentication boundary must not return roles, permissions, tenant IDs, establishment IDs or memberships. Those are resolved later from server-owned application data.

## Port

The current TypeScript boundary is in `src/shared/auth`:

- `AuthPort`
- `AuthSession`
- `AuthenticatedUser`
- `AuthProvider`
- `AuthError`
- `getCurrentSession`
- `requireAuthenticatedUser`
- `MockAuthPort`

The mock port is for tests only and requires no external provider connection.

## Provider Spike Summary

| Provider | Classification | Rationale |
|---|---|---|
| Supabase Auth | Recommended | Strong EU-region fit, PostgreSQL/RLS alignment, email/password, password reset, email confirmation, MFA support and session controls. Keep tenant, membership, roles and capabilities app-owned. |
| Clerk | Acceptable fallback | Fastest managed UX path, strong Next.js support, B2B organization features, session management and MFA readiness. EU/data-processing posture needs review; do not use Clerk Organizations as MesaFlow tenant truth. |
| Auth.js / NextAuth | Acceptable if managed providers fail | Flexible, framework-friendly and lower vendor lock-in. Requires more operational ownership for secure email, sessions, account management, revocation and MFA. |
| Custom auth | Rejected for MVP | Too much security and operational burden for A0/MVP; can be reconsidered only if managed providers fail a hard requirement. |

## Recommendation

Use Supabase Auth as the recommended provider for the next implementation spike, subject to final cost confirmation, session-revocation proof and hosting fit. Do not import Supabase SDKs outside a future adapter.

Clerk remains the fallback if the team prioritizes fastest managed B2B UX over EU-region/data-locality fit. Auth.js remains an acceptable lower-lock-in option if the team accepts more implementation and operational responsibility.

## Non-goals

- no customer accounts;
- no product user table;
- no membership persistence;
- no capability model implementation;
- no tenant resolution;
- no UI or middleware rollout;
- no OAuth or email delivery setup.
