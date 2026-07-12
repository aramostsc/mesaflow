# Database Shared Boundary

This boundary contains foundational database helpers only.

`tenant-context.ts` proves the approved transaction-local tenant context pattern from `ENG-A0-004`. Future product repositories must receive server-derived tenant context and execute tenant-owned database work through explicit boundaries. Direct database access without tenant context is not approved for product modules.
