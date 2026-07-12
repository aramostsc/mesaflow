# MesaFlow — Technical Definition of Done

A task is Done only when:

1. Approved scope is implemented and non-goals remain absent.
2. Existing IDs and terminology are preserved.
3. Formatting, linting, build and strict type checks pass.
4. Required unit and integration tests pass.
5. Relevant critical E2E tests pass.
6. Tenant-isolation and authorization negative paths pass.
7. Concurrency/idempotency behaviour is proven where relevant.
8. Errors are normalized and operationally observable.
9. Sensitive information is not logged or exposed.
10. Migrations have been reviewed and rehearsed.
11. Accessibility/responsive acceptance is met for UI changes.
12. Documentation and traceability are updated.
13. New risks are registered.
14. The diff contains no unrelated changes.
15. Reviewer approval is recorded.
16. The final report lists files, tests, decisions, limitations and recommended next task.
17. The GitHub Actions `quality` job and the equivalent local `db:ci` plus `verify` gates pass for merge-ready changes.
18. New operational logs use structured context, validated external IDs and tested redaction through the shared observability boundary.

“Works locally” or “screen exists” is not Done.
