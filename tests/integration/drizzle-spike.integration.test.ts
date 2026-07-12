import { eq, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { drizzleSpikeRecords } from "../../drizzle/schema";

const databaseUrl =
  process.env.TEST_DATABASE_URL ??
  "postgres://mesaflow:mesaflow_local_password@127.0.0.1:5432/mesaflow_test";
const describeIfDatabase = describe;
const createDatabase = (databaseClient: Client) => drizzle(databaseClient);

describeIfDatabase("Drizzle spike", () => {
  let client: Client;
  let db: ReturnType<typeof createDatabase>;

  beforeAll(async () => {
    client = new Client({ connectionString: databaseUrl });
    await client.connect();
    db = createDatabase(client);
    await db.execute(sql`CREATE SCHEMA IF NOT EXISTS mesaflow_technical`);
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS mesaflow_technical.drizzle_spike_records (
        id text PRIMARY KEY,
        scope_key text NOT NULL,
        item_key text NOT NULL,
        version integer NOT NULL DEFAULT 0,
        checked_at timestamptz NOT NULL DEFAULT now()
      )
    `);
    await db.execute(sql`
      CREATE UNIQUE INDEX IF NOT EXISTS drizzle_spike_scope_item_idx
      ON mesaflow_technical.drizzle_spike_records (scope_key, item_key)
    `);
  });

  afterAll(async () => {
    await client?.end();
  });

  it("supports typed inserts, transactions, rollback and stale-version checks", async () => {
    await db.delete(drizzleSpikeRecords);

    await expect(
      db.transaction(async (tx) => {
        await tx.insert(drizzleSpikeRecords).values({
          id: "rollback-check",
          scopeKey: "scope-a",
          itemKey: "item-a",
        });

        throw new Error("rollback");
      }),
    ).rejects.toThrow("rollback");

    const rolledBack = await db
      .select({ id: drizzleSpikeRecords.id })
      .from(drizzleSpikeRecords)
      .where(eq(drizzleSpikeRecords.id, "rollback-check"));

    expect(rolledBack).toHaveLength(0);

    await db.insert(drizzleSpikeRecords).values({
      id: "version-check",
      scopeKey: "scope-a",
      itemKey: "item-a",
    });

    const updated = await db
      .update(drizzleSpikeRecords)
      .set({ version: 1 })
      .where(
        sql`${drizzleSpikeRecords.id} = ${"version-check"} AND ${drizzleSpikeRecords.version} = 0`,
      )
      .returning({ version: drizzleSpikeRecords.version });

    expect(updated).toEqual([{ version: 1 }]);

    const stale = await db
      .update(drizzleSpikeRecords)
      .set({ version: 2 })
      .where(
        sql`${drizzleSpikeRecords.id} = ${"version-check"} AND ${drizzleSpikeRecords.version} = 0`,
      )
      .returning({ version: drizzleSpikeRecords.version });

    expect(stale).toHaveLength(0);
  });
});
