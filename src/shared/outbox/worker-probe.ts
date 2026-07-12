import { sql } from "drizzle-orm";
import { mapOutboxProbeRow, type OutboxQueryExecutor } from "./probe";
import type { OutboxProbeBatchResult, OutboxProbeEvent } from "./types";

export interface OutboxTransactionRunner<
  TTransaction extends OutboxQueryExecutor = OutboxQueryExecutor,
> {
  transaction<TResult>(callback: (tx: TTransaction) => Promise<TResult>): Promise<TResult>;
}

export interface ProcessOutboxProbeBatchOptions {
  tenantId: string;
  limit?: number;
  now?: Date;
  handler: (event: OutboxProbeEvent) => Promise<void>;
}

export interface RecoverOutboxProbeLeasesOptions {
  tenantId: string;
  now?: Date;
  leaseTimeoutMs: number;
}

export class PermanentOutboxProbeError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PermanentOutboxProbeError";
  }
}

export async function processOutboxProbeBatch<TTransaction extends OutboxQueryExecutor>(
  db: OutboxTransactionRunner<TTransaction>,
  options: ProcessOutboxProbeBatchOptions,
): Promise<OutboxProbeBatchResult> {
  const tenantId = options.tenantId.trim();
  const limit = options.limit ?? 25;
  const now = options.now ?? new Date();

  if (tenantId.length === 0) {
    throw new Error("Outbox probe worker tenant id is required.");
  }

  if (!Number.isInteger(limit) || limit <= 0) {
    throw new Error("Outbox probe worker limit must be positive.");
  }

  const claimedEvents = await claimPendingEvents(db, tenantId, limit, now);
  const result: OutboxProbeBatchResult = {
    claimed: claimedEvents.length,
    processed: 0,
    retried: 0,
    failed: 0,
  };

  for (const event of claimedEvents) {
    try {
      await options.handler(event);
      await markEventProcessed(db, event.id, now);
      result.processed += 1;
    } catch (error) {
      const nextStatus = shouldFailPermanently(error, event) ? "failed" : "pending";
      await markEventFailedOrRetrying(db, event.id, nextStatus, normalizeWorkerError(error), now);

      if (nextStatus === "failed") {
        result.failed += 1;
      } else {
        result.retried += 1;
      }
    }
  }

  return result;
}

export async function recoverExpiredOutboxProbeLeases<TTransaction extends OutboxQueryExecutor>(
  db: OutboxTransactionRunner<TTransaction>,
  options: RecoverOutboxProbeLeasesOptions,
): Promise<number> {
  const tenantId = options.tenantId.trim();
  const now = options.now ?? new Date();

  if (tenantId.length === 0) {
    throw new Error("Outbox probe worker tenant id is required.");
  }

  if (!Number.isInteger(options.leaseTimeoutMs) || options.leaseTimeoutMs <= 0) {
    throw new Error("Outbox probe lease timeout must be positive.");
  }

  const lockedBefore = new Date(now.getTime() - options.leaseTimeoutMs);

  return db.transaction(async (tx) => {
    const result = await tx.execute(sql`
      UPDATE mesaflow_technical.outbox_probe_events
      SET
        status = 'pending',
        locked_at = NULL,
        last_error = 'Expired outbox probe lease.'
      WHERE tenant_id = ${tenantId}
        AND status = 'processing'
        AND locked_at <= ${lockedBefore}
      RETURNING id
    `);

    return result.rows.length;
  });
}

async function claimPendingEvents<TTransaction extends OutboxQueryExecutor>(
  db: OutboxTransactionRunner<TTransaction>,
  tenantId: string,
  limit: number,
  now: Date,
): Promise<OutboxProbeEvent[]> {
  return db.transaction(async (tx) => {
    const result = await tx.execute(sql`
      WITH next_events AS (
        SELECT id
        FROM mesaflow_technical.outbox_probe_events
        WHERE tenant_id = ${tenantId}
          AND status = 'pending'
          AND available_at <= ${now}
        ORDER BY created_at ASC, id ASC
        LIMIT ${limit}
        FOR UPDATE SKIP LOCKED
      )
      UPDATE mesaflow_technical.outbox_probe_events
      SET
        status = 'processing',
        attempt_count = attempt_count + 1,
        locked_at = ${now},
        last_error = NULL
      FROM next_events
      WHERE mesaflow_technical.outbox_probe_events.id = next_events.id
      RETURNING mesaflow_technical.outbox_probe_events.*
    `);

    return result.rows.map(mapOutboxProbeRow).sort(compareOutboxProbeEvents);
  });
}

async function markEventProcessed<TTransaction extends OutboxQueryExecutor>(
  db: OutboxTransactionRunner<TTransaction>,
  eventId: string,
  now: Date,
): Promise<void> {
  await db.transaction(async (tx) => {
    await tx.execute(sql`
      UPDATE mesaflow_technical.outbox_probe_events
      SET
        status = 'processed',
        processed_at = ${now},
        locked_at = NULL,
        last_error = NULL
      WHERE id = ${eventId}
        AND status = 'processing'
    `);
  });
}

async function markEventFailedOrRetrying<TTransaction extends OutboxQueryExecutor>(
  db: OutboxTransactionRunner<TTransaction>,
  eventId: string,
  nextStatus: "pending" | "failed",
  errorMessage: string,
  now: Date,
): Promise<void> {
  await db.transaction(async (tx) => {
    await tx.execute(sql`
      UPDATE mesaflow_technical.outbox_probe_events
      SET
        status = ${nextStatus},
        available_at = ${now},
        locked_at = NULL,
        last_error = ${errorMessage}
      WHERE id = ${eventId}
        AND status = 'processing'
    `);
  });
}

function normalizeWorkerError(error: unknown): string {
  if (error instanceof Error && error.message.trim().length > 0) {
    return error.message.slice(0, 500);
  }

  return "Unknown outbox probe worker error.";
}

function shouldFailPermanently(error: unknown, event: OutboxProbeEvent): boolean {
  return error instanceof PermanentOutboxProbeError || event.attemptCount >= event.maxAttempts;
}

function compareOutboxProbeEvents(first: OutboxProbeEvent, second: OutboxProbeEvent): number {
  const createdAtComparison = first.createdAt.getTime() - second.createdAt.getTime();

  if (createdAtComparison !== 0) {
    return createdAtComparison;
  }

  return first.id.localeCompare(second.id);
}
