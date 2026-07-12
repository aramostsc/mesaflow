import { Client } from "pg";
import { describe, expect, it } from "vitest";

const databaseUrl =
  process.env.TEST_DATABASE_URL ??
  "postgres://mesaflow:mesaflow_local_password@127.0.0.1:5432/mesaflow_test";
const describeIfDatabase = describe;

describeIfDatabase("PostgreSQL test database", () => {
  it("connects to the isolated test database", async () => {
    const client = new Client({ connectionString: databaseUrl });
    await client.connect();

    try {
      const result = await client.query("SELECT current_database() AS database_name");

      expect(result.rows[0]?.database_name).toBe("mesaflow_test");
    } finally {
      await client.end();
    }
  });
});
