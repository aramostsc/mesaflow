# MesaFlow — Technical Definition of Ready

A task is Ready when all statements are true:

1. It has a unique `ENG-*` ID.
2. Its approved product, architecture or UX origin is identified.
3. The operational or technical outcome is explicit.
4. Scope and non-goals are explicit.
5. Dependencies are available or intentionally mocked behind an approved port.
6. The primary agent and required reviewers are assigned.
7. Likely modules/files are identified.
8. Technical acceptance criteria are testable.
9. Unit, integration, E2E, security and documentation expectations are identified as applicable.
10. Tenant, authorization, audit, concurrency and privacy implications have been considered.
11. No unresolved contradiction exists.
12. Deferred vendor decisions are either closed or isolated behind an interface.
13. Required test data/environment exists.
14. The task is small enough to implement and review independently.

A task failing any item is `Bloqueado` or `Em análise`, not Ready.
