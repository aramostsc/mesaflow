import { eq, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { rlsProbeRecords, rlsProbeTenants } from "../../drizzle/schema";
import { withTenantContext } from "../../src/shared/db/tenant-context";

const adminDatabaseUrl =
  process.env.TEST_DATABASE_URL ??
  "postgres://mesaflow:mesaflow_local_password@127.0.0.1:5432/mesaflow_test";
const probeDatabaseUrl =
  process.env.RLS_PROBE_DATABASE_URL ??
  "postgres://mesaflow_rls_probe_app:mesaflow_rls_probe_password@127.0.0.1:5432/mesaflow_test";
const createDatabase = (databaseClient: Client) => drizzle(databaseClient);

const tenantAId = "tenant-rls-a";
const tenantBId = "tenant-rls-b";

describe("tenant context and PostgreSQL RLS proof", () => {
  let adminClient: Client;
  let appClient: Client;
  let adminDb: ReturnType<typeof createDatabase>;
  let appDb: ReturnType<typeof createDatabase>;

  beforeAll(async () => {
    adminClient = new Client({ connectionString: adminDatabaseUrl });
    appClient = new Client({ connectionString: probeDatabaseUrl });
    await adminClient.connect();
    await appClient.connect();
    adminDb = createDatabase(adminClient);
    appDb = createDatabase(appClient);

    await adminDb.delete(rlsProbeRecords);
    await adminDb.delete(rlsProbeTenants);
    await adminDb.insert(rlsProbeTenants).values([
      { id: tenantAId, label: "Technical RLS Tenant A" },
      { id: tenantBId, label: "Technical RLS Tenant B" },
    ]);
    await adminDb.insert(rlsProbeRecords).values([
      { id: "tenant-a-record", tenantId: tenantAId, label: "Tenant A visible record" },
      { id: "tenant-b-record", tenantId: tenantBId, label: "Tenant B visible record" },
    ]);
  });

  afterAll(async () => {
    await appClient?.end();
    await adminClient?.end();
  });

  it("allows Tenant A to read its own records", async () => {
    const tenantARecords = await withTenantContext(appDb, tenantAId, async (tx) =>
      tx.select({ id: rlsProbeRecords.id }).from(rlsProbeRecords).orderBy(rlsProbeRecords.id),
    );

    expect(tenantARecords).toEqual([{ id: "tenant-a-record" }]);
  });

  it("allows Tenant B to read its own records", async () => {
    const tenantBRecords = await withTenantContext(appDb, tenantBId, async (tx) =>
      tx.select({ id: rlsProbeRecords.id }).from(rlsProbeRecords).orderBy(rlsProbeRecords.id),
    );

    expect(tenantBRecords).toEqual([{ id: "tenant-b-record" }]);
  });

  it("prevents Tenant A from reading Tenant B records", async () => {
    const tenantAReadingTenantB = await withTenantContext(appDb, tenantAId, async (tx) =>
      tx
        .select({ id: rlsProbeRecords.id })
        .from(rlsProbeRecords)
        .where(eq(rlsProbeRecords.id, "tenant-b-record")),
    );

    expect(tenantAReadingTenantB).toHaveLength(0);
  });

  it("prevents Tenant B from reading Tenant A records", async () => {
    const tenantBReadingTenantA = await withTenantContext(appDb, tenantBId, async (tx) =>
      tx
        .select({ id: rlsProbeRecords.id })
        .from(rlsProbeRecords)
        .where(eq(rlsProbeRecords.id, "tenant-a-record")),
    );

    expect(tenantBReadingTenantA).toHaveLength(0);
  });

  it("returns no tenant-owned records without tenant context", async () => {
    const records = await appDb
      .select({ id: rlsProbeRecords.id })
      .from(rlsProbeRecords)
      .orderBy(rlsProbeRecords.id);

    expect(records).toHaveLength(0);
  });

  it("blocks writes without tenant context", async () => {
    await expect(
      appDb.insert(rlsProbeRecords).values({
        id: "no-context-insert-attempt",
        tenantId: tenantAId,
        label: "Should be rejected without tenant context",
      }),
    ).rejects.toThrow();
  });

  it("blocks inserting records for another tenant", async () => {
    await expect(
      withTenantContext(appDb, tenantAId, async (tx) =>
        tx.insert(rlsProbeRecords).values({
          id: "tenant-b-insert-attempt",
          tenantId: tenantBId,
          label: "Should be rejected by RLS",
        }),
      ),
    ).rejects.toThrow();

    const tenantBRecords = await withTenantContext(appDb, tenantBId, async (tx) =>
      tx
        .select({ id: rlsProbeRecords.id })
        .from(rlsProbeRecords)
        .where(eq(rlsProbeRecords.id, "tenant-b-insert-attempt")),
    );

    expect(tenantBRecords).toHaveLength(0);
  });

  it("blocks changing an owned record to another tenant", async () => {
    await expect(
      withTenantContext(appDb, tenantAId, async (tx) =>
        tx
          .update(rlsProbeRecords)
          .set({ tenantId: tenantBId })
          .where(eq(rlsProbeRecords.id, "tenant-a-record")),
      ),
    ).rejects.toThrow();

    const tenantARecord = await withTenantContext(appDb, tenantAId, async (tx) =>
      tx
        .select({ tenantId: rlsProbeRecords.tenantId })
        .from(rlsProbeRecords)
        .where(eq(rlsProbeRecords.id, "tenant-a-record")),
    );

    expect(tenantARecord).toEqual([{ tenantId: tenantAId }]);
  });

  it("blocks updating another tenant record", async () => {
    const updated = await withTenantContext(appDb, tenantAId, async (tx) =>
      tx
        .update(rlsProbeRecords)
        .set({ label: "Should not update" })
        .where(eq(rlsProbeRecords.id, "tenant-b-record"))
        .returning({ id: rlsProbeRecords.id }),
    );
    const tenantBRecord = await withTenantContext(appDb, tenantBId, async (tx) =>
      tx
        .select({ label: rlsProbeRecords.label })
        .from(rlsProbeRecords)
        .where(eq(rlsProbeRecords.id, "tenant-b-record")),
    );

    expect(updated).toHaveLength(0);
    expect(tenantBRecord).toEqual([{ label: "Tenant B visible record" }]);
  });

  it("blocks deleting another tenant record", async () => {
    const deleted = await withTenantContext(appDb, tenantBId, async (tx) =>
      tx
        .delete(rlsProbeRecords)
        .where(eq(rlsProbeRecords.id, "tenant-a-record"))
        .returning({ id: rlsProbeRecords.id }),
    );
    const tenantARecord = await withTenantContext(appDb, tenantAId, async (tx) =>
      tx
        .select({ id: rlsProbeRecords.id })
        .from(rlsProbeRecords)
        .where(eq(rlsProbeRecords.id, "tenant-a-record")),
    );

    expect(deleted).toHaveLength(0);
    expect(tenantARecord).toEqual([{ id: "tenant-a-record" }]);
  });

  it("does not leak tenant context between transactions", async () => {
    await withTenantContext(appDb, tenantAId, async (tx) =>
      tx.select({ id: rlsProbeRecords.id }).from(rlsProbeRecords),
    );

    const outsideContext = await appDb
      .select({ id: rlsProbeRecords.id })
      .from(rlsProbeRecords)
      .orderBy(rlsProbeRecords.id);
    const currentSetting = await appDb.execute<{ tenant_id: string | null }>(
      sql`SELECT nullif(current_setting('mesaflow.tenant_id', true), '') AS tenant_id`,
    );

    expect(outsideContext).toHaveLength(0);
    expect(currentSetting.rows[0]?.tenant_id).toBeNull();
  });

  it("runs against the isolated PostgreSQL test database", async () => {
    const result = await appDb.execute<{ database_name: string }>(
      sql`SELECT current_database() AS database_name`,
    );

    expect(result.rows[0]?.database_name).toBe("mesaflow_test");
  });
});
