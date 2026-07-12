# MesaFlow technical outbox proof

This folder contains the `ENG-A0-007` technical probe for transactional outbox and worker processing.

It is not product domain code. It does not define waitlist, notification, WhatsApp, user, restaurant or service events.

The probe proves that a future command can write an outbox event in the same PostgreSQL transaction as its data change, and that a worker can claim pending events, process them once, retry transient failures and stop processing terminal failed events.
