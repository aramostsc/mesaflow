CREATE SCHEMA IF NOT EXISTS "mesaflow_technical";
--> statement-breakpoint
CREATE TABLE "mesaflow_technical"."drizzle_spike_records" (
	"id" text PRIMARY KEY NOT NULL,
	"scope_key" text NOT NULL,
	"item_key" text NOT NULL,
	"version" integer DEFAULT 0 NOT NULL,
	"checked_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "drizzle_spike_scope_item_idx" ON "mesaflow_technical"."drizzle_spike_records" USING btree ("scope_key","item_key");
