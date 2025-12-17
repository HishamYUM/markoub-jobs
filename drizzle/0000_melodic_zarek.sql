CREATE TABLE "applications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"position_id" uuid,
	"full_name" text NOT NULL,
	"email" text NOT NULL,
	"resume_path" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "positions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"department" text NOT NULL,
	"employment_type" text NOT NULL,
	"location" text NOT NULL,
	"description" text NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "applications" ADD CONSTRAINT "applications_position_id_positions_id_fk" FOREIGN KEY ("position_id") REFERENCES "public"."positions"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
CREATE INDEX "applications_position_id_idx" ON "applications" USING btree ("position_id");--> statement-breakpoint
CREATE INDEX "applications_created_at_idx" ON "applications" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "applications_email_idx" ON "applications" USING btree ("email");--> statement-breakpoint
CREATE INDEX "positions_is_active_idx" ON "positions" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "positions_created_at_idx" ON "positions" USING btree ("created_at");