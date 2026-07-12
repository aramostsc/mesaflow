import { spawnSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import { Client } from "pg";

const command = process.argv[2];

const defaultDatabaseUrl = "postgres://mesaflow:mesaflow_local_password@127.0.0.1:5432/mesaflow";
const defaultTestDatabaseUrl =
  "postgres://mesaflow:mesaflow_local_password@127.0.0.1:5432/mesaflow_test";
const defaultAdminUrl = "postgres://mesaflow:mesaflow_local_password@127.0.0.1:5432/postgres";

const databaseUrl = process.env.DATABASE_URL ?? defaultDatabaseUrl;
const testDatabaseUrl = process.env.TEST_DATABASE_URL ?? defaultTestDatabaseUrl;
const adminUrl = process.env.POSTGRES_ADMIN_URL ?? defaultAdminUrl;
const migrationPath = new URL("../db/migrations/0001_technical_smoke.sql", import.meta.url);

function runDockerCompose(args) {
  const result = spawnSync("docker", ["compose", ...args], {
    stdio: "inherit",
    shell: false,
  });

  if (result.error) {
    console.error(`Docker is not available: ${result.error.message}`);
    process.exit(1);
  }

  process.exit(result.status ?? 1);
}

function getDatabaseName(connectionString) {
  const databaseName = new URL(connectionString).pathname.slice(1);

  if (!/^[A-Za-z0-9_]+$/.test(databaseName)) {
    throw new Error(`Unsafe database name: ${databaseName}`);
  }

  return databaseName;
}

async function withClient(connectionString, callback) {
  const client = new Client({ connectionString });
  await client.connect();

  try {
    return await callback(client);
  } finally {
    await client.end();
  }
}

async function migrate(connectionString) {
  const sql = await readFile(migrationPath, "utf8");
  await withClient(connectionString, async (client) => {
    await client.query(sql);
  });
}

async function smokeTest(connectionString, expectedDatabaseName) {
  await withClient(connectionString, async (client) => {
    const result = await client.query("SELECT current_database() AS database_name");
    const databaseName = result.rows[0]?.database_name;

    if (databaseName !== expectedDatabaseName) {
      throw new Error(`Expected ${expectedDatabaseName}, connected to ${databaseName}`);
    }
  });
}

async function resetTestDatabase() {
  const testDatabaseName = getDatabaseName(testDatabaseUrl);
  const quotedName = `"${testDatabaseName}"`;

  await withClient(adminUrl, async (client) => {
    await client.query(
      "SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = $1",
      [testDatabaseName],
    );
    await client.query(`DROP DATABASE IF EXISTS ${quotedName}`);
    await client.query(`CREATE DATABASE ${quotedName}`);
  });

  await migrate(testDatabaseUrl);
}

async function main() {
  switch (command) {
    case "up":
      runDockerCompose(["up", "-d", "postgres"]);
      return;
    case "down":
      runDockerCompose(["down"]);
      return;
    case "status":
      runDockerCompose(["ps", "postgres"]);
      return;
    case "migrate":
      await migrate(databaseUrl);
      await migrate(testDatabaseUrl);
      console.log("Technical database migration completed.");
      return;
    case "reset-test":
      await resetTestDatabase();
      console.log("Test database reset completed.");
      return;
    case "test":
      await smokeTest(databaseUrl, getDatabaseName(databaseUrl));
      await smokeTest(testDatabaseUrl, getDatabaseName(testDatabaseUrl));
      console.log("PostgreSQL development and test databases are reachable.");
      return;
    default:
      console.error("Usage: node scripts/db-command.mjs <up|down|status|migrate|reset-test|test>");
      process.exit(1);
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
