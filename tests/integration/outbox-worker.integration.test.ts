import { eq, type SQL } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { outboxProbeEvents } from "../../drizzle/schema";
import {
  insertOutboxProbeEvent,
  PermanentOutboxProbeError,
  processOutboxProbeBatch,
  recoverExpiredOutboxProbeLeases,
  validateOutboxProbePayload,
} from "../../src/shared/outbox";

const testDatabaseUrl =
  process.env.TEST_DATABASE_URL ??
  "postgres://mesaflow:mesaflow_local_password@127.0.0.1:5432/mesaflow_test";
const createDatabase = (databaseClient: Client) => drizzle(databaseClient);
const createOutboxDatabaseAdapter = (database: ReturnType<typeof createDatabase>) => ({
  execute: async (query: SQL) => {
    const result = await database.execute(query);

    return { rows: [...result.rows] as unknown[] };
  },
  transaction: async <TResult>(
    callback: (tx: { execute(query: SQL): Promise<{ rows: unknown[] }> }) => Promise<TResult>,
  ) =>
    database.transaction(async (tx) =>
      callback({
        execute: async (query: SQL) => {
          const result = await tx.execute(query);

          return { rows: [...result.rows] as unknown[] };
        },
      }),
    ),
});

const tenantAId = "tenant-outbox-a";
const tenantBId = "tenant-outbox-b";
const streamKey = "technical-stream";
const eventType = "technical.outbox_probe.created";
const now = new Date("2026-01-01T10:00:00.000Z");

describe("transactional outbox worker proof", () => {
  let client: Client;
  let db: ReturnType<typeof createDatabase>;
  let outboxDb: ReturnType<typeof createOutboxDatabaseAdapter>;

  beforeAll(async () => {
    client = new Client({ connectionString: testDatabaseUrl });
    await client.connect();
    db = createDatabase(client);
    outboxDb = createOutboxDatabaseAdapter(db);
  });

  beforeEach(async () => {
    await db.delete(outboxProbeEvents);
  });

  afterAll(async () => {
    await client?.end();
  });

  it("inserts a technical outbox event", async () => {
    const event = await insertOutboxProbeEvent(outboxDb, eventInput("event-001"));

    expect(event).toMatchObject({
      id: "event-001",
      tenantId: tenantAId,
      streamKey,
      eventType,
      eventVersion: 1,
      payload: { probe: "outbox", sequence: 1 },
      status: "pending",
      attemptCount: 0,
      maxAttempts: 3,
    });
  });

  it("commits an event inserted inside a transaction", async () => {
    await outboxDb.transaction(async (tx) => {
      await insertOutboxProbeEvent(tx, eventInput("event-transaction-commit"));
    });

    await expectStoredStatus("event-transaction-commit", "pending");
  });

  it("rolls back a transactional event when the transaction fails", async () => {
    await expect(
      outboxDb.transaction(async (tx) => {
        await insertOutboxProbeEvent(tx, eventInput("event-transaction-rollback"));
        throw new Error("Rollback technical outbox probe transaction.");
      }),
    ).rejects.toThrow("Rollback technical outbox probe transaction.");

    const rows = await db
      .select({ id: outboxProbeEvents.id })
      .from(outboxProbeEvents)
      .where(eq(outboxProbeEvents.id, "event-transaction-rollback"));

    expect(rows).toHaveLength(0);
  });

  it("processes only pending events and marks successful events as processed", async () => {
    await seedEvent("event-pending");
    await seedEvent("event-processed", "processed");
    await seedEvent("event-failed", "failed");
    const handledIds: string[] = [];

    const result = await processOutboxProbeBatch(outboxDb, {
      tenantId: tenantAId,
      now,
      handler: async (event) => {
        handledIds.push(event.id);
      },
    });

    expect(result).toEqual({ claimed: 1, processed: 1, retried: 0, failed: 0 });
    expect(handledIds).toEqual(["event-pending"]);
    await expectStoredStatus("event-pending", "processed");
    await expectStoredStatus("event-processed", "processed");
    await expectStoredStatus("event-failed", "failed");
  });

  it("does not duplicate the normalized result when the worker runs again", async () => {
    await seedEvent("event-idempotent-success");
    const handledIds: string[] = [];

    const firstRun = await processOutboxProbeBatch(outboxDb, {
      tenantId: tenantAId,
      now,
      handler: async (event) => {
        handledIds.push(event.id);
      },
    });
    const secondRun = await processOutboxProbeBatch(outboxDb, {
      tenantId: tenantAId,
      now,
      handler: async (event) => {
        handledIds.push(event.id);
      },
    });

    expect(firstRun).toEqual({ claimed: 1, processed: 1, retried: 0, failed: 0 });
    expect(secondRun).toEqual({ claimed: 0, processed: 0, retried: 0, failed: 0 });
    expect(handledIds).toEqual(["event-idempotent-success"]);
  });

  it("keeps a failed processing attempt pending for retry and updates attempt count", async () => {
    await seedEvent("event-retry");

    const result = await processOutboxProbeBatch(outboxDb, {
      tenantId: tenantAId,
      now,
      handler: async () => {
        throw new Error("Temporary probe failure.");
      },
    });

    const [event] = await selectEvents("event-retry");
    expect(result).toEqual({ claimed: 1, processed: 0, retried: 1, failed: 0 });
    expect(event).toMatchObject({
      status: "pending",
      attemptCount: 1,
      lastError: "Temporary probe failure.",
    });
  });

  it("marks an exhausted event as failed and does not reprocess it indefinitely", async () => {
    await seedEvent("event-terminal-failure", "pending", 1);
    const handledIds: string[] = [];

    const firstRun = await processOutboxProbeBatch(outboxDb, {
      tenantId: tenantAId,
      now,
      handler: async (event) => {
        handledIds.push(event.id);
        throw new Error("Permanent probe failure.");
      },
    });
    const secondRun = await processOutboxProbeBatch(outboxDb, {
      tenantId: tenantAId,
      now,
      handler: async (event) => {
        handledIds.push(event.id);
      },
    });

    const [event] = await selectEvents("event-terminal-failure");
    expect(firstRun).toEqual({ claimed: 1, processed: 0, retried: 0, failed: 1 });
    expect(secondRun).toEqual({ claimed: 0, processed: 0, retried: 0, failed: 0 });
    expect(handledIds).toEqual(["event-terminal-failure"]);
    expect(event).toMatchObject({
      status: "failed",
      attemptCount: 1,
      lastError: "Permanent probe failure.",
    });
  });

  it("marks permanent failures as failed without waiting for retry exhaustion", async () => {
    await seedEvent("event-permanent-failure", "pending", 3);

    const result = await processOutboxProbeBatch(outboxDb, {
      tenantId: tenantAId,
      now,
      handler: async () => {
        throw new PermanentOutboxProbeError("Permanent validation failure.");
      },
    });

    const [event] = await selectEvents("event-permanent-failure");
    expect(result).toEqual({ claimed: 1, processed: 0, retried: 0, failed: 1 });
    expect(event).toMatchObject({
      status: "failed",
      attemptCount: 1,
      lastError: "Permanent validation failure.",
    });
  });

  it("recovers an expired processing lease before retrying as pending", async () => {
    await seedEvent("event-expired-lease");
    const lockedAt = new Date("2026-01-01T09:00:00.000Z");
    await db
      .update(outboxProbeEvents)
      .set({ status: "processing", lockedAt })
      .where(eq(outboxProbeEvents.id, "event-expired-lease"));

    const recovered = await recoverExpiredOutboxProbeLeases(outboxDb, {
      tenantId: tenantAId,
      now,
      leaseTimeoutMs: 30 * 60 * 1000,
    });
    const result = await processOutboxProbeBatch(outboxDb, {
      tenantId: tenantAId,
      now,
      handler: async () => undefined,
    });

    expect(recovered).toBe(1);
    expect(result).toEqual({ claimed: 1, processed: 1, retried: 0, failed: 0 });
  });

  it("processes events in predictable order for the same tenant stream", async () => {
    await seedEvent("event-order-001");
    await seedEvent("event-order-002");
    const handledIds: string[] = [];

    await processOutboxProbeBatch(outboxDb, {
      tenantId: tenantAId,
      now,
      handler: async (event) => {
        handledIds.push(event.id);
      },
    });

    expect(handledIds).toEqual(["event-order-001", "event-order-002"]);
  });

  it("does not process another tenant's pending events", async () => {
    await seedEvent("event-tenant-a", "pending", 3, tenantAId);
    await seedEvent("event-tenant-b", "pending", 3, tenantBId);
    const handledIds: string[] = [];

    await processOutboxProbeBatch(outboxDb, {
      tenantId: tenantAId,
      now,
      handler: async (event) => {
        handledIds.push(event.id);
      },
    });

    expect(handledIds).toEqual(["event-tenant-a"]);
    await expectStoredStatus("event-tenant-a", "processed");
    await expectStoredStatus("event-tenant-b", "pending");
  });

  it("rejects invalid payload safely before persistence", async () => {
    expect(() => validateOutboxProbePayload(null)).toThrow(
      "Outbox probe payload must be a plain object.",
    );
    await expect(
      insertOutboxProbeEvent(outboxDb, {
        ...eventInput("event-invalid-payload"),
        payload: ["no arrays"],
      }),
    ).rejects.toThrow("Outbox probe payload must be a plain object.");

    const rows = await selectEvents("event-invalid-payload");
    expect(rows).toHaveLength(0);
  });

  async function seedEvent(
    id: string,
    status: "pending" | "processed" | "failed" = "pending",
    maxAttempts = 3,
    tenantId = tenantAId,
  ): Promise<void> {
    await insertOutboxProbeEvent(outboxDb, {
      ...eventInput(id, tenantId),
      maxAttempts,
    });

    if (status !== "pending") {
      await db.update(outboxProbeEvents).set({ status }).where(eq(outboxProbeEvents.id, id));
    }
  }

  async function expectStoredStatus(id: string, status: string): Promise<void> {
    const [event] = await selectEvents(id);

    expect(event?.status).toBe(status);
  }

  async function selectEvents(id: string) {
    return db
      .select({
        id: outboxProbeEvents.id,
        status: outboxProbeEvents.status,
        attemptCount: outboxProbeEvents.attemptCount,
        lastError: outboxProbeEvents.lastError,
      })
      .from(outboxProbeEvents)
      .where(eq(outboxProbeEvents.id, id));
  }
});

function eventInput(id: string, tenantId = tenantAId) {
  return {
    id,
    tenantId,
    streamKey,
    eventType,
    eventVersion: 1,
    payload: { probe: "outbox", sequence: 1 },
    availableAt: now,
  };
}
