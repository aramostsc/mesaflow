import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./drizzle/schema.ts",
  out: "./drizzle/migrations",
  dbCredentials: {
    url:
      process.env.TEST_DATABASE_URL ??
      "postgres://mesaflow:mesaflow_local_password@127.0.0.1:5432/mesaflow_test",
  },
  strict: true,
  verbose: true,
});
