# Auth Shared Boundary

This boundary defines provider-independent authentication contracts for `ENG-A0-005`.

Authentication answers who the signed-in staff user is. Authorization decides capabilities. Tenant context decides which tenant/establishment an operation runs for. Product modules must keep those responsibilities separate.

The current implementation includes only contracts, helpers and a mock port for tests. It does not implement real login, signup, logout, OAuth, product users, memberships or provider SDK integration.
