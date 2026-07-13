import { Client } from "pg";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { productIdentityFixtures as fixtures } from "../fixtures/product-identity";
import {
  asTenant,
  seedProductIdentity,
  testDatabaseUrl,
} from "../helpers/product-identity-database";

describe("product identity persistence", () => {
  let client: Client;

  beforeAll(async () => {
    client = new Client({ connectionString: testDatabaseUrl });
    await client.connect();
  });

  beforeEach(async () => seedProductIdentity(client));
  afterAll(async () => client?.end());

  it("persists opaque tenant identifiers with timezone-aware timestamps", async () => {
    const result = await client.query("SELECT id, created_at FROM mesaflow.tenants WHERE id = $1", [
      fixtures.tenantA.id,
    ]);
    expect(result.rows).toHaveLength(1);
    expect(result.rows[0]?.id).toBe(fixtures.tenantA.id);
    expect(result.rows[0]?.created_at).toBeInstanceOf(Date);
  });

  it("persists the approved required establishment profile", async () => {
    const result = await asTenant(client, fixtures.tenantA.id, () =>
      client.query(
        "SELECT name, address, operational_phone, primary_language, time_zone FROM mesaflow.establishments",
      ),
    );
    expect(result.rows).toEqual([
      {
        name: fixtures.establishmentA.name,
        address: fixtures.establishmentA.address,
        operational_phone: fixtures.establishmentA.operationalPhone,
        primary_language: fixtures.establishmentA.primaryLanguage,
        time_zone: fixtures.establishmentA.timeZone,
      },
    ]);
  });

  it("rejects whitespace-only required establishment fields", async () => {
    await expect(
      client.query(
        `INSERT INTO mesaflow.establishments
          (tenant_id, name, address, operational_phone, primary_language, time_zone)
         VALUES ($1, '  ', 'Address', 'Phone', 'pt-PT', 'Europe/Lisbon')`,
        [fixtures.tenantA.id],
      ),
    ).rejects.toMatchObject({ code: "23514" });
  });

  it("stores membership at tenant level without establishment_id", async () => {
    const columns = await client.query<{ column_name: string }>(
      `SELECT column_name FROM information_schema.columns
       WHERE table_schema = 'mesaflow' AND table_name = 'memberships'
       ORDER BY column_name`,
    );
    expect(columns.rows.map((row) => row.column_name)).toEqual([
      "created_at",
      "id",
      "revoked_at",
      "role",
      "status",
      "tenant_id",
      "user_id",
    ]);
  });

  it("creates a new membership active with no revoked_at", async () => {
    const userId = "20000000-0000-4000-8000-00000000000c";
    await client.query("INSERT INTO mesaflow.users (id, email) VALUES ($1, $2)", [
      userId,
      "staff-c@example.invalid",
    ]);
    const result = await client.query(
      `INSERT INTO mesaflow.memberships (tenant_id, user_id, role)
       VALUES ($1, $2, 'Staff') RETURNING status, revoked_at`,
      [fixtures.tenantA.id, userId],
    );
    expect(result.rows).toEqual([{ status: "active", revoked_at: null }]);
  });

  it("enforces lifecycle timestamp consistency", async () => {
    await expect(
      client.query(
        `INSERT INTO mesaflow.memberships (tenant_id, user_id, role, status)
         VALUES ($1, $2, 'Staff', 'revoked')`,
        [fixtures.tenantB.id, fixtures.userA.id],
      ),
    ).rejects.toMatchObject({ code: "23514" });

    await expect(
      client.query(
        `INSERT INTO mesaflow.memberships
          (tenant_id, user_id, role, status, revoked_at)
         VALUES ($1, $2, 'Staff', 'active', now())`,
        [fixtures.tenantB.id, fixtures.userA.id],
      ),
    ).rejects.toMatchObject({ code: "23514" });
  });

  it("revokes an active membership in place", async () => {
    const result = await asTenant(client, fixtures.tenantA.id, () =>
      client.query(
        `UPDATE mesaflow.memberships
         SET status = 'revoked', revoked_at = now()
         WHERE id = $1 RETURNING id, status, revoked_at`,
        [fixtures.membershipA.id],
      ),
    );
    expect(result.rows[0]?.id).toBe(fixtures.membershipA.id);
    expect(result.rows[0]?.status).toBe("revoked");
    expect(result.rows[0]?.revoked_at).toBeInstanceOf(Date);
  });

  it("rejects reactivation of the same revoked row", async () => {
    await expect(
      asTenant(client, fixtures.tenantA.id, () =>
        client.query(
          `UPDATE mesaflow.memberships
           SET status = 'active', revoked_at = null
           WHERE id = $1`,
          [fixtures.revokedMembershipA.id],
        ),
      ),
    ).rejects.toMatchObject({ code: "23514" });
  });

  it("allows historical revoked rows and readmission as a new active row", async () => {
    await asTenant(client, fixtures.tenantA.id, () =>
      client.query(
        `UPDATE mesaflow.memberships
         SET status = 'revoked', revoked_at = now()
         WHERE id = $1`,
        [fixtures.membershipA.id],
      ),
    );
    const readmissionId = "30000000-0000-4000-8000-00000000002a";
    await asTenant(client, fixtures.tenantA.id, () =>
      client.query(
        `INSERT INTO mesaflow.memberships (id, tenant_id, user_id, role)
         VALUES ($1, $2, $3, 'Administrator')`,
        [readmissionId, fixtures.tenantA.id, fixtures.userA.id],
      ),
    );
    const rows = await asTenant(client, fixtures.tenantA.id, () =>
      client.query(
        `SELECT id, status FROM mesaflow.memberships
         WHERE user_id = $1 ORDER BY id`,
        [fixtures.userA.id],
      ),
    );
    expect(rows.rows).toEqual([
      { id: fixtures.membershipA.id, status: "revoked" },
      { id: fixtures.revokedMembershipA.id, status: "revoked" },
      { id: readmissionId, status: "active" },
    ]);
  });

  it("rejects a second active membership for the same tenant and user", async () => {
    await expect(
      client.query(
        `INSERT INTO mesaflow.memberships (tenant_id, user_id, role)
         VALUES ($1, $2, 'Staff')`,
        [fixtures.tenantA.id, fixtures.userA.id],
      ),
    ).rejects.toMatchObject({ code: "23505" });
  });

  it("persists canonical lowercase email", async () => {
    const result = await client.query(
      "INSERT INTO mesaflow.users (email) VALUES ($1) RETURNING email",
      ["canonical@example.invalid"],
    );
    expect(result.rows).toEqual([{ email: "canonical@example.invalid" }]);
  });

  it.each(["Uppercase@example.invalid", " spaced@example.invalid ", "", "   "])(
    "rejects non-canonical email %j",
    async (email) => {
      await expect(
        client.query("INSERT INTO mesaflow.users (email) VALUES ($1)", [email]),
      ).rejects.toMatchObject({
        code: "23514",
      });
    },
  );

  it("accepts canonical non-empty email without enforcing syntax", async () => {
    const result = await client.query(
      "INSERT INTO mesaflow.users (email) VALUES ('not-an-email') RETURNING email",
    );
    expect(result.rows).toEqual([{ email: "not-an-email" }]);
  });

  it("rejects a logical email duplicate after canonicalization", async () => {
    await expect(
      client.query("INSERT INTO mesaflow.users (email) VALUES ($1)", [fixtures.userA.email]),
    ).rejects.toMatchObject({ code: "23505" });
  });

  it("stores no credential, token, password or session columns on users", async () => {
    const result = await client.query<{ column_name: string }>(
      `SELECT column_name FROM information_schema.columns
       WHERE table_schema = 'mesaflow' AND table_name = 'users'
       ORDER BY column_name`,
    );
    expect(result.rows.map((row) => row.column_name)).toEqual([
      "created_at",
      "email",
      "id",
      "updated_at",
    ]);
  });

  it("does not use the A0 technical schema for product tables", async () => {
    const result = await client.query<{ table_schema: string; table_name: string }>(
      `SELECT table_schema, table_name FROM information_schema.tables
       WHERE table_name IN ('tenants', 'establishments', 'users', 'memberships')
       ORDER BY table_name`,
    );
    expect(result.rows.every((row) => row.table_schema === "mesaflow")).toBe(true);
    expect(result.rows).toHaveLength(4);
  });
});
