import { index, integer, pgSchema, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";

export const technicalSchema = pgSchema("mesaflow_technical");

export const drizzleSpikeRecords = technicalSchema.table(
  "drizzle_spike_records",
  {
    id: text("id").primaryKey(),
    scopeKey: text("scope_key").notNull(),
    itemKey: text("item_key").notNull(),
    version: integer("version").notNull().default(0),
    checkedAt: timestamp("checked_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [uniqueIndex("drizzle_spike_scope_item_idx").on(table.scopeKey, table.itemKey)],
);

export const rlsProbeTenants = technicalSchema.table("rls_probe_tenants", {
  id: text("id").primaryKey(),
  label: text("label").notNull(),
});

export const rlsProbeRecords = technicalSchema.table("rls_probe_records", {
  id: text("id").primaryKey(),
  tenantId: text("tenant_id")
    .notNull()
    .references(() => rlsProbeTenants.id),
  label: text("label").notNull(),
  version: integer("version").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const outboxProbeEvents = technicalSchema.table(
  "outbox_probe_events",
  {
    id: text("id").primaryKey(),
    tenantId: text("tenant_id").notNull(),
    streamKey: text("stream_key").notNull(),
    eventType: text("event_type").notNull(),
    eventVersion: integer("event_version").notNull(),
    payload: text("payload").notNull(),
    status: text("status").notNull().default("pending"),
    attemptCount: integer("attempt_count").notNull().default(0),
    maxAttempts: integer("max_attempts").notNull().default(3),
    availableAt: timestamp("available_at", { withTimezone: true }).notNull().defaultNow(),
    lockedAt: timestamp("locked_at", { withTimezone: true }),
    processedAt: timestamp("processed_at", { withTimezone: true }),
    lastError: text("last_error"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("outbox_probe_pending_idx").on(table.status, table.availableAt, table.createdAt),
    index("outbox_probe_tenant_stream_idx").on(
      table.tenantId,
      table.streamKey,
      table.createdAt,
      table.id,
    ),
  ],
);
