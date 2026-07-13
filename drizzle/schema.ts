import { sql } from "drizzle-orm";
import {
  check,
  index,
  integer,
  pgSchema,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

export const productSchema = pgSchema("mesaflow");
export const membershipRole = productSchema.enum("membership_role", ["Administrator", "Staff"]);
export const membershipStatus = productSchema.enum("membership_status", ["active", "revoked"]);

export const tenants = productSchema.table("tenants", {
  id: uuid("id").primaryKey().defaultRandom(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const establishments = productSchema.table(
  "establishments",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    tenantId: uuid("tenant_id")
      .notNull()
      .references(() => tenants.id),
    name: text("name").notNull(),
    address: text("address").notNull(),
    operationalPhone: text("operational_phone").notNull(),
    primaryLanguage: text("primary_language").notNull(),
    timeZone: text("time_zone").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("establishments_tenant_idx").on(table.tenantId),
    check(
      "establishments_required_profile_check",
      sql`btrim(${table.name}) <> '' and btrim(${table.address}) <> '' and btrim(${table.operationalPhone}) <> '' and btrim(${table.primaryLanguage}) <> '' and btrim(${table.timeZone}) <> ''`,
    ),
  ],
);

export const users = productSchema.table(
  "users",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    email: text("email").notNull().unique(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    check(
      "users_email_canonical_check",
      sql`${table.email} <> '' and ${table.email} = lower(btrim(${table.email}))`,
    ),
  ],
);

export const memberships = productSchema.table(
  "memberships",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    tenantId: uuid("tenant_id")
      .notNull()
      .references(() => tenants.id),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id),
    role: membershipRole("role").notNull(),
    status: membershipStatus("status").notNull().default("active"),
    revokedAt: timestamp("revoked_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("memberships_one_active_tenant_user_idx")
      .on(table.tenantId, table.userId)
      .where(sql`${table.status} = 'active'`),
    index("memberships_tenant_idx").on(table.tenantId),
    index("memberships_user_idx").on(table.userId),
    check(
      "memberships_lifecycle_check",
      sql`(${table.status} = 'active' and ${table.revokedAt} is null) or (${table.status} = 'revoked' and ${table.revokedAt} is not null)`,
    ),
  ],
);

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
