CREATE TABLE "mesaflow_technical"."rls_probe_records" (
	"id" text PRIMARY KEY NOT NULL,
	"tenant_id" text NOT NULL,
	"label" text NOT NULL,
	"version" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "mesaflow_technical"."rls_probe_tenants" (
	"id" text PRIMARY KEY NOT NULL,
	"label" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "mesaflow_technical"."rls_probe_records" ADD CONSTRAINT "rls_probe_records_tenant_id_rls_probe_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "mesaflow_technical"."rls_probe_tenants"("id") ON DELETE no action ON UPDATE no action;
--> statement-breakpoint
DO $$
BEGIN
	IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'mesaflow_rls_probe_app') THEN
		CREATE ROLE mesaflow_rls_probe_app LOGIN PASSWORD 'mesaflow_rls_probe_password';
	END IF;
END
$$;
--> statement-breakpoint
ALTER ROLE mesaflow_rls_probe_app LOGIN PASSWORD 'mesaflow_rls_probe_password' NOBYPASSRLS;
--> statement-breakpoint
GRANT USAGE ON SCHEMA "mesaflow_technical" TO mesaflow_rls_probe_app;
--> statement-breakpoint
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE "mesaflow_technical"."rls_probe_records" TO mesaflow_rls_probe_app;
--> statement-breakpoint
GRANT REFERENCES ("id") ON TABLE "mesaflow_technical"."rls_probe_tenants" TO mesaflow_rls_probe_app;
--> statement-breakpoint
ALTER TABLE "mesaflow_technical"."rls_probe_records" ENABLE ROW LEVEL SECURITY;
--> statement-breakpoint
ALTER TABLE "mesaflow_technical"."rls_probe_records" FORCE ROW LEVEL SECURITY;
--> statement-breakpoint
CREATE POLICY "rls_probe_records_select_by_tenant"
	ON "mesaflow_technical"."rls_probe_records"
	FOR SELECT
	TO mesaflow_rls_probe_app
	USING ("tenant_id" = nullif(current_setting('mesaflow.tenant_id', true), ''));
--> statement-breakpoint
CREATE POLICY "rls_probe_records_insert_by_tenant"
	ON "mesaflow_technical"."rls_probe_records"
	FOR INSERT
	TO mesaflow_rls_probe_app
	WITH CHECK ("tenant_id" = nullif(current_setting('mesaflow.tenant_id', true), ''));
--> statement-breakpoint
CREATE POLICY "rls_probe_records_update_by_tenant"
	ON "mesaflow_technical"."rls_probe_records"
	FOR UPDATE
	TO mesaflow_rls_probe_app
	USING ("tenant_id" = nullif(current_setting('mesaflow.tenant_id', true), ''))
	WITH CHECK ("tenant_id" = nullif(current_setting('mesaflow.tenant_id', true), ''));
--> statement-breakpoint
CREATE POLICY "rls_probe_records_delete_by_tenant"
	ON "mesaflow_technical"."rls_probe_records"
	FOR DELETE
	TO mesaflow_rls_probe_app
	USING ("tenant_id" = nullif(current_setting('mesaflow.tenant_id', true), ''));
