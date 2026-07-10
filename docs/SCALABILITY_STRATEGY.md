> **Product:** MesaFlow  
> **Architecture baseline:** MVP / Pilot Release  
> **Status:** Proposed architecture baseline  
> **Owner:** Software Architecture  
> **Date:** 2026-07-10  
> **Source baseline:** repository commit `583167147b626b370246dafc440eb961483bda63`

# Scalability Strategy

## MVP posture

Optimise for correctness and low operational overhead, not speculative scale. One application, one worker pool and one managed PostgreSQL instance are sufficient for initial pilots.

## Progressive measures

1. Index tenant, establishment, service, state and chronological sequence.
2. Keep operational queue queries bounded to the active service.
3. Scale stateless web and worker processes horizontally.
4. Use connection pooling.
5. Isolate slow provider calls through outbox workers.
6. Add read replicas only when history/analytics materially affect primary workload.
7. Partition large audit/event tables only after measured growth.
8. Extract a service only when independent scale or ownership provides clear value.

## Evolution

- **Multiple establishments:** existing tenant/establishment separation; add selection and scoped memberships.
- **Multiple queues:** introduce explicit queue aggregate and queue-scoped configuration after Product approval.
- **Advanced reservations:** separate bounded context; do not overload queue states.
- **Predicted waits:** analytics/model service consuming historical events, never the source of queue truth.
- **Billing:** Subscription module and provider adapter.
- **Internationalisation:** locale-aware templates, time zones and phone validation.
- **Higher volume:** dedicated realtime infrastructure and worker queues by workload.

## Review signals

Revisit architecture when database lock contention, outbox lag, provider throughput, deployment coupling, team ownership or regulatory isolation are demonstrated constraints.
