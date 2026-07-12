CREATE TABLE "mesaflow_technical"."outbox_probe_events" (
	"id" text PRIMARY KEY NOT NULL,
	"tenant_id" text NOT NULL,
	"stream_key" text NOT NULL,
	"event_type" text NOT NULL,
	"event_version" integer NOT NULL,
	"payload" text NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"attempt_count" integer DEFAULT 0 NOT NULL,
	"max_attempts" integer DEFAULT 3 NOT NULL,
	"available_at" timestamp with time zone DEFAULT now() NOT NULL,
	"locked_at" timestamp with time zone,
	"processed_at" timestamp with time zone,
	"last_error" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "outbox_probe_pending_idx" ON "mesaflow_technical"."outbox_probe_events" USING btree ("status","available_at","created_at");--> statement-breakpoint
CREATE INDEX "outbox_probe_tenant_stream_idx" ON "mesaflow_technical"."outbox_probe_events" USING btree ("tenant_id","stream_key","created_at","id");--> statement-breakpoint
ALTER TABLE "mesaflow_technical"."outbox_probe_events"
  ADD CONSTRAINT "outbox_probe_status_check"
    CHECK ("status" IN ('pending', 'processing', 'processed', 'failed')),
  ADD CONSTRAINT "outbox_probe_event_version_check"
    CHECK ("event_version" > 0),
  ADD CONSTRAINT "outbox_probe_attempts_check"
    CHECK ("attempt_count" >= 0 AND "max_attempts" > 0 AND "attempt_count" <= "max_attempts");
