CREATE SCHEMA "mesaflow";
--> statement-breakpoint
CREATE TYPE "mesaflow"."membership_role" AS ENUM('Administrator', 'Staff');--> statement-breakpoint
CREATE TYPE "mesaflow"."membership_status" AS ENUM('active', 'revoked');--> statement-breakpoint
CREATE TABLE "mesaflow"."establishments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"name" text NOT NULL,
	"address" text NOT NULL,
	"operational_phone" text NOT NULL,
	"primary_language" text NOT NULL,
	"time_zone" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "establishments_required_profile_check" CHECK (btrim("mesaflow"."establishments"."name") <> '' and btrim("mesaflow"."establishments"."address") <> '' and btrim("mesaflow"."establishments"."operational_phone") <> '' and btrim("mesaflow"."establishments"."primary_language") <> '' and btrim("mesaflow"."establishments"."time_zone") <> '')
);
--> statement-breakpoint
CREATE TABLE "mesaflow"."memberships" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"role" "mesaflow"."membership_role" NOT NULL,
	"status" "mesaflow"."membership_status" DEFAULT 'active' NOT NULL,
	"revoked_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "memberships_lifecycle_check" CHECK (("mesaflow"."memberships"."status" = 'active' and "mesaflow"."memberships"."revoked_at" is null) or ("mesaflow"."memberships"."status" = 'revoked' and "mesaflow"."memberships"."revoked_at" is not null))
);
--> statement-breakpoint
CREATE TABLE "mesaflow"."tenants" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "mesaflow"."users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_email_canonical_check" CHECK ("mesaflow"."users"."email" <> '' and "mesaflow"."users"."email" = lower(btrim("mesaflow"."users"."email")))
);
--> statement-breakpoint
ALTER TABLE "mesaflow"."establishments" ADD CONSTRAINT "establishments_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "mesaflow"."tenants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mesaflow"."memberships" ADD CONSTRAINT "memberships_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "mesaflow"."tenants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mesaflow"."memberships" ADD CONSTRAINT "memberships_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "mesaflow"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "establishments_tenant_idx" ON "mesaflow"."establishments" USING btree ("tenant_id");--> statement-breakpoint
CREATE UNIQUE INDEX "memberships_one_active_tenant_user_idx" ON "mesaflow"."memberships" USING btree ("tenant_id","user_id") WHERE "mesaflow"."memberships"."status" = 'active';--> statement-breakpoint
CREATE INDEX "memberships_tenant_idx" ON "mesaflow"."memberships" USING btree ("tenant_id");--> statement-breakpoint
CREATE INDEX "memberships_user_idx" ON "mesaflow"."memberships" USING btree ("user_id");--> statement-breakpoint
DO $$
BEGIN
	IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'mesaflow_app') THEN
		CREATE ROLE mesaflow_app NOLOGIN NOBYPASSRLS;
	END IF;
END
$$;--> statement-breakpoint
ALTER ROLE mesaflow_app NOLOGIN NOBYPASSRLS;--> statement-breakpoint
GRANT USAGE ON SCHEMA "mesaflow" TO mesaflow_app;--> statement-breakpoint
GRANT SELECT, INSERT, UPDATE ON TABLE
	"mesaflow"."tenants",
	"mesaflow"."establishments"
	TO mesaflow_app;--> statement-breakpoint
GRANT SELECT, INSERT, UPDATE ON TABLE "mesaflow"."memberships" TO mesaflow_app;--> statement-breakpoint
GRANT REFERENCES ON TABLE
	"mesaflow"."tenants",
	"mesaflow"."users"
	TO mesaflow_app;--> statement-breakpoint
CREATE FUNCTION "mesaflow"."protect_membership_identity_and_lifecycle"()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
	IF TG_OP = 'INSERT' THEN
		IF NEW.status <> 'active' OR NEW.revoked_at IS NOT NULL THEN
			RAISE EXCEPTION 'new membership must be active' USING ERRCODE = 'check_violation';
		END IF;

		RETURN NEW;
	END IF;

	IF NEW.tenant_id IS DISTINCT FROM OLD.tenant_id OR NEW.user_id IS DISTINCT FROM OLD.user_id THEN
		RAISE EXCEPTION 'membership identity cannot be changed' USING ERRCODE = 'check_violation';
	END IF;

	IF OLD.status = 'revoked' AND NEW.status = 'active' THEN
		RAISE EXCEPTION 'revoked membership cannot be reactivated' USING ERRCODE = 'check_violation';
	END IF;

	IF OLD.status = 'revoked' AND NEW IS DISTINCT FROM OLD THEN
		RAISE EXCEPTION 'revoked membership history cannot be changed' USING ERRCODE = 'check_violation';
	END IF;

	RETURN NEW;
END;
$$;--> statement-breakpoint
CREATE TRIGGER "memberships_protect_identity_and_lifecycle"
	BEFORE INSERT OR UPDATE ON "mesaflow"."memberships"
	FOR EACH ROW
	EXECUTE FUNCTION "mesaflow"."protect_membership_identity_and_lifecycle"();--> statement-breakpoint
ALTER TABLE "mesaflow"."tenants" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "mesaflow"."tenants" FORCE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "mesaflow"."establishments" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "mesaflow"."establishments" FORCE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "mesaflow"."memberships" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "mesaflow"."memberships" FORCE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE POLICY "tenants_select_by_tenant" ON "mesaflow"."tenants"
	FOR SELECT TO mesaflow_app
	USING ("id" = nullif(current_setting('mesaflow.tenant_id', true), '')::uuid);--> statement-breakpoint
CREATE POLICY "tenants_insert_by_tenant" ON "mesaflow"."tenants"
	FOR INSERT TO mesaflow_app
	WITH CHECK ("id" = nullif(current_setting('mesaflow.tenant_id', true), '')::uuid);--> statement-breakpoint
CREATE POLICY "tenants_update_by_tenant" ON "mesaflow"."tenants"
	FOR UPDATE TO mesaflow_app
	USING ("id" = nullif(current_setting('mesaflow.tenant_id', true), '')::uuid)
	WITH CHECK ("id" = nullif(current_setting('mesaflow.tenant_id', true), '')::uuid);--> statement-breakpoint
CREATE POLICY "establishments_select_by_tenant" ON "mesaflow"."establishments"
	FOR SELECT TO mesaflow_app
	USING ("tenant_id" = nullif(current_setting('mesaflow.tenant_id', true), '')::uuid);--> statement-breakpoint
CREATE POLICY "establishments_insert_by_tenant" ON "mesaflow"."establishments"
	FOR INSERT TO mesaflow_app
	WITH CHECK ("tenant_id" = nullif(current_setting('mesaflow.tenant_id', true), '')::uuid);--> statement-breakpoint
CREATE POLICY "establishments_update_by_tenant" ON "mesaflow"."establishments"
	FOR UPDATE TO mesaflow_app
	USING ("tenant_id" = nullif(current_setting('mesaflow.tenant_id', true), '')::uuid)
	WITH CHECK ("tenant_id" = nullif(current_setting('mesaflow.tenant_id', true), '')::uuid);--> statement-breakpoint
CREATE POLICY "memberships_select_by_tenant" ON "mesaflow"."memberships"
	FOR SELECT TO mesaflow_app
	USING ("tenant_id" = nullif(current_setting('mesaflow.tenant_id', true), '')::uuid);--> statement-breakpoint
CREATE POLICY "memberships_insert_by_tenant" ON "mesaflow"."memberships"
	FOR INSERT TO mesaflow_app
	WITH CHECK ("tenant_id" = nullif(current_setting('mesaflow.tenant_id', true), '')::uuid);--> statement-breakpoint
CREATE POLICY "memberships_update_by_tenant" ON "mesaflow"."memberships"
	FOR UPDATE TO mesaflow_app
	USING ("tenant_id" = nullif(current_setting('mesaflow.tenant_id', true), '')::uuid)
	WITH CHECK ("tenant_id" = nullif(current_setting('mesaflow.tenant_id', true), '')::uuid);
