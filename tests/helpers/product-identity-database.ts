import { Client } from "pg";
import { productIdentityFixtures as fixtures } from "../fixtures/product-identity";

export const testDatabaseUrl =
  process.env.TEST_DATABASE_URL ??
  "postgres://mesaflow:mesaflow_local_password@127.0.0.1:5432/mesaflow_test";

export async function seedProductIdentity(client: Client): Promise<void> {
  await client.query(
    "TRUNCATE mesaflow.memberships, mesaflow.establishments, mesaflow.users, mesaflow.tenants",
  );
  await client.query("INSERT INTO mesaflow.tenants (id) VALUES ($1), ($2)", [
    fixtures.tenantA.id,
    fixtures.tenantB.id,
  ]);

  for (const establishment of [fixtures.establishmentA, fixtures.establishmentB]) {
    await client.query(
      `INSERT INTO mesaflow.establishments
        (id, tenant_id, name, address, operational_phone, primary_language, time_zone)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        establishment.id,
        establishment.tenantId,
        establishment.name,
        establishment.address,
        establishment.operationalPhone,
        establishment.primaryLanguage,
        establishment.timeZone,
      ],
    );
  }

  await client.query("INSERT INTO mesaflow.users (id, email) VALUES ($1, $2), ($3, $4)", [
    fixtures.userA.id,
    fixtures.userA.email,
    fixtures.userB.id,
    fixtures.userB.email,
  ]);

  await client.query(
    `INSERT INTO mesaflow.memberships (id, tenant_id, user_id, role)
     VALUES ($1, $2, $3, $4)`,
    [
      fixtures.revokedMembershipA.id,
      fixtures.revokedMembershipA.tenantId,
      fixtures.revokedMembershipA.userId,
      fixtures.revokedMembershipA.role,
    ],
  );
  await client.query(
    `UPDATE mesaflow.memberships SET status = 'revoked', revoked_at = $1
     WHERE id = $2`,
    [fixtures.revokedMembershipA.revokedAt, fixtures.revokedMembershipA.id],
  );

  for (const membership of [fixtures.membershipA, fixtures.membershipB]) {
    await client.query(
      `INSERT INTO mesaflow.memberships
        (id, tenant_id, user_id, role, status, revoked_at)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        membership.id,
        membership.tenantId,
        membership.userId,
        membership.role,
        membership.status,
        membership.revokedAt,
      ],
    );
  }
}

export async function asTenant<T>(
  client: Client,
  tenantId: string | undefined,
  callback: () => Promise<T>,
): Promise<T> {
  await client.query("BEGIN");

  try {
    await client.query("SET LOCAL ROLE mesaflow_app");
    if (tenantId !== undefined) {
      await client.query("SELECT set_config('mesaflow.tenant_id', $1, true)", [tenantId]);
    }
    const result = await callback();
    await client.query("COMMIT");
    return result;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  }
}
