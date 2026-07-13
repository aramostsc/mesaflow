import { Client } from "pg";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { productIdentityFixtures as fixtures } from "../fixtures/product-identity";
import {
  asTenant,
  seedProductIdentity,
  testDatabaseUrl,
} from "../helpers/product-identity-database";

describe("product identity tenant isolation", () => {
  let client: Client;

  beforeAll(async () => {
    client = new Client({ connectionString: testDatabaseUrl });
    await client.connect();
  });

  beforeEach(async () => seedProductIdentity(client));
  afterAll(async () => client?.end());

  it("denies tenant-owned reads without tenant context", async () => {
    const result = await asTenant(client, undefined, () =>
      client.query("SELECT id FROM mesaflow.memberships"),
    );
    expect(result.rows).toHaveLength(0);
  });

  it("fails safely for malformed tenant context", async () => {
    await expect(
      asTenant(client, "not-a-uuid", () => client.query("SELECT id FROM mesaflow.memberships")),
    ).rejects.toMatchObject({ code: "22P02" });
  });

  it("shows only the tenant selected by transaction-local context", async () => {
    const result = await asTenant(client, fixtures.tenantA.id, () =>
      client.query("SELECT id FROM mesaflow.tenants ORDER BY id"),
    );
    expect(result.rows).toEqual([{ id: fixtures.tenantA.id }]);
    expect(result.rows).not.toContainEqual({ id: fixtures.tenantB.id });
  });

  it("prevents cross-tenant establishment reads and updates", async () => {
    await asTenant(client, fixtures.tenantA.id, async () => {
      const read = await client.query("SELECT id FROM mesaflow.establishments WHERE id = $1", [
        fixtures.establishmentB.id,
      ]);
      const update = await client.query(
        "UPDATE mesaflow.establishments SET name = 'Blocked' WHERE id = $1",
        [fixtures.establishmentB.id],
      );
      expect(read.rows).toHaveLength(0);
      expect(update.rowCount).toBe(0);
    });
  });

  it("denies tenant and establishment physical deletion", async () => {
    await expect(
      asTenant(client, fixtures.tenantA.id, () =>
        client.query("DELETE FROM mesaflow.establishments WHERE id = $1", [
          fixtures.establishmentA.id,
        ]),
      ),
    ).rejects.toMatchObject({ code: "42501" });
    await expect(
      asTenant(client, fixtures.tenantA.id, () =>
        client.query("DELETE FROM mesaflow.tenants WHERE id = $1", [fixtures.tenantA.id]),
      ),
    ).rejects.toMatchObject({ code: "42501" });
  });

  it("prevents cross-tenant establishment inserts", async () => {
    await expect(
      asTenant(client, fixtures.tenantA.id, () =>
        client.query(
          `INSERT INTO mesaflow.establishments
            (tenant_id, name, address, operational_phone, primary_language, time_zone)
           VALUES ($1, 'Blocked', 'Blocked', 'Blocked', 'pt-PT', 'Europe/Lisbon')`,
          [fixtures.tenantB.id],
        ),
      ),
    ).rejects.toMatchObject({ code: "42501" });
  });

  it("prevents cross-tenant membership reads, updates and revocation", async () => {
    await asTenant(client, fixtures.tenantA.id, async () => {
      const read = await client.query("SELECT id FROM mesaflow.memberships WHERE id = $1", [
        fixtures.membershipB.id,
      ]);
      const update = await client.query(
        "UPDATE mesaflow.memberships SET role = 'Administrator' WHERE id = $1",
        [fixtures.membershipB.id],
      );
      const revoke = await client.query(
        `UPDATE mesaflow.memberships SET status = 'revoked', revoked_at = now()
         WHERE id = $1`,
        [fixtures.membershipB.id],
      );
      expect(read.rows).toHaveLength(0);
      expect(update.rowCount).toBe(0);
      expect(revoke.rowCount).toBe(0);
    });
  });

  it("prevents cross-tenant membership inserts", async () => {
    await expect(
      asTenant(client, fixtures.tenantA.id, () =>
        client.query(
          `INSERT INTO mesaflow.memberships (tenant_id, user_id, role)
           VALUES ($1, $2, 'Staff')`,
          [fixtures.tenantB.id, fixtures.userA.id],
        ),
      ),
    ).rejects.toMatchObject({ code: "42501" });
  });

  it("requires application-created membership to start active", async () => {
    const attemptedId = "30000000-0000-4000-8000-00000000003b";
    await expect(
      asTenant(client, fixtures.tenantB.id, () =>
        client.query(
          `INSERT INTO mesaflow.memberships
            (id, tenant_id, user_id, role, status, revoked_at)
           VALUES ($1, $2, $3, 'Staff', 'revoked', now())`,
          [attemptedId, fixtures.tenantB.id, fixtures.userA.id],
        ),
      ),
    ).rejects.toMatchObject({ code: "23514" });

    const rejected = await asTenant(client, fixtures.tenantB.id, () =>
      client.query("SELECT id FROM mesaflow.memberships WHERE id = $1", [attemptedId]),
    );
    expect(rejected.rows).toHaveLength(0);

    const active = await asTenant(client, fixtures.tenantB.id, () =>
      client.query(
        `INSERT INTO mesaflow.memberships (tenant_id, user_id, role)
         VALUES ($1, $2, 'Staff') RETURNING id, status, revoked_at`,
        [fixtures.tenantB.id, fixtures.userA.id],
      ),
    );
    expect(active.rows[0]?.status).toBe("active");
    expect(active.rows[0]?.revoked_at).toBeNull();

    const revoked = await asTenant(client, fixtures.tenantB.id, () =>
      client.query(
        `UPDATE mesaflow.memberships SET status = 'revoked', revoked_at = now()
         WHERE id = $1 RETURNING status, revoked_at`,
        [active.rows[0]?.id],
      ),
    );
    expect(revoked.rows[0]?.status).toBe("revoked");
    expect(revoked.rows[0]?.revoked_at).toBeInstanceOf(Date);
  });

  it("blocks membership tenant and user identity changes", async () => {
    await expect(
      asTenant(client, fixtures.tenantA.id, () =>
        client.query("UPDATE mesaflow.memberships SET tenant_id = $1 WHERE id = $2", [
          fixtures.tenantB.id,
          fixtures.membershipA.id,
        ]),
      ),
    ).rejects.toMatchObject({ code: "23514" });

    await expect(
      asTenant(client, fixtures.tenantA.id, () =>
        client.query("UPDATE mesaflow.memberships SET user_id = $1 WHERE id = $2", [
          fixtures.userB.id,
          fixtures.membershipA.id,
        ]),
      ),
    ).rejects.toMatchObject({ code: "23514" });
  });

  it("denies physical membership deletion", async () => {
    await expect(
      asTenant(client, fixtures.tenantA.id, () =>
        client.query("DELETE FROM mesaflow.memberships WHERE id = $1", [fixtures.membershipA.id]),
      ),
    ).rejects.toMatchObject({ code: "42501" });
  });

  it("blocks revoked membership reactivation", async () => {
    await expect(
      asTenant(client, fixtures.tenantA.id, () =>
        client.query(
          `UPDATE mesaflow.memberships SET status = 'active', revoked_at = null
           WHERE id = $1`,
          [fixtures.revokedMembershipA.id],
        ),
      ),
    ).rejects.toMatchObject({ code: "23514" });
  });

  it("freezes revoked membership history", async () => {
    await expect(
      asTenant(client, fixtures.tenantA.id, () =>
        client.query("UPDATE mesaflow.memberships SET role = 'Staff' WHERE id = $1", [
          fixtures.revokedMembershipA.id,
        ]),
      ),
    ).rejects.toMatchObject({ code: "23514" });
    await expect(
      asTenant(client, fixtures.tenantA.id, () =>
        client.query("UPDATE mesaflow.memberships SET revoked_at = now() WHERE id = $1", [
          fixtures.revokedMembershipA.id,
        ]),
      ),
    ).rejects.toMatchObject({ code: "23514" });
  });

  it("enforces one active membership while permitting readmission", async () => {
    await expect(
      asTenant(client, fixtures.tenantA.id, () =>
        client.query(
          `INSERT INTO mesaflow.memberships (tenant_id, user_id, role)
           VALUES ($1, $2, 'Staff')`,
          [fixtures.tenantA.id, fixtures.userA.id],
        ),
      ),
    ).rejects.toMatchObject({ code: "23505" });

    await asTenant(client, fixtures.tenantA.id, () =>
      client.query(
        `UPDATE mesaflow.memberships SET status = 'revoked', revoked_at = now()
         WHERE id = $1`,
        [fixtures.membershipA.id],
      ),
    );
    const readmission = await asTenant(client, fixtures.tenantA.id, () =>
      client.query(
        `INSERT INTO mesaflow.memberships (tenant_id, user_id, role)
         VALUES ($1, $2, 'Administrator') RETURNING status`,
        [fixtures.tenantA.id, fixtures.userA.id],
      ),
    );
    expect(readmission.rows).toEqual([{ status: "active" }]);
  });

  it("rejects lifecycle and non-canonical email constraint mutations", async () => {
    await expect(
      client.query(
        `UPDATE mesaflow.memberships SET status = 'revoked', revoked_at = null
         WHERE id = $1`,
        [fixtures.membershipA.id],
      ),
    ).rejects.toMatchObject({ code: "23514" });
    await expect(
      client.query("INSERT INTO mesaflow.users (email) VALUES ('Unsafe@Example.invalid')"),
    ).rejects.toMatchObject({ code: "23514" });
  });

  it("does not leak tenant context after a transaction", async () => {
    const inside = await asTenant(client, fixtures.tenantA.id, () =>
      client.query("SELECT id FROM mesaflow.establishments"),
    );
    const after = await asTenant(client, undefined, () =>
      client.query("SELECT id FROM mesaflow.establishments"),
    );
    expect(inside.rows).toHaveLength(1);
    expect(after.rows).toHaveLength(0);
  });

  it("uses enabled forced RLS and a role without BYPASSRLS", async () => {
    const tables = await client.query<{
      relname: string;
      relrowsecurity: boolean;
      relforcerowsecurity: boolean;
    }>(
      `SELECT relname, relrowsecurity, relforcerowsecurity FROM pg_class
       WHERE relnamespace = 'mesaflow'::regnamespace
         AND relname IN ('tenants', 'establishments', 'memberships')
       ORDER BY relname`,
    );
    const role = await client.query<{ rolbypassrls: boolean; rolcanlogin: boolean }>(
      "SELECT rolbypassrls, rolcanlogin FROM pg_roles WHERE rolname = 'mesaflow_app'",
    );
    expect(tables.rows).toHaveLength(3);
    expect(tables.rows.every((table) => table.relrowsecurity && table.relforcerowsecurity)).toBe(
      true,
    );
    expect(role.rows).toEqual([{ rolbypassrls: false, rolcanlogin: false }]);
  });

  it("keeps the partial unique index and lifecycle trigger installed", async () => {
    const index = await client.query<{ indexdef: string }>(
      `SELECT indexdef FROM pg_indexes
       WHERE schemaname = 'mesaflow' AND indexname = 'memberships_one_active_tenant_user_idx'`,
    );
    const trigger = await client.query<{ tgname: string }>(
      `SELECT tgname FROM pg_trigger
       WHERE tgrelid = 'mesaflow.memberships'::regclass
         AND tgname = 'memberships_protect_identity_and_lifecycle'
         AND NOT tgisinternal`,
    );
    expect(index.rows[0]?.indexdef).toContain("CREATE UNIQUE INDEX");
    expect(index.rows[0]?.indexdef).toContain("WHERE (status = 'active'::membership_status)");
    expect(trigger.rows).toEqual([{ tgname: "memberships_protect_identity_and_lifecycle" }]);
  });

  it("does not grant tenant role direct access to global users or credentials", async () => {
    await expect(
      asTenant(client, fixtures.tenantA.id, () => client.query("SELECT email FROM mesaflow.users")),
    ).rejects.toMatchObject({ code: "42501" });
    const columns = await client.query<{ column_name: string }>(
      `SELECT column_name FROM information_schema.columns
       WHERE table_schema = 'mesaflow' AND table_name = 'users'`,
    );
    expect(columns.rows.map((row) => row.column_name).sort()).toEqual([
      "created_at",
      "email",
      "id",
      "updated_at",
    ]);
  });
});
