CREATE TYPE "public"."work_mode" AS ENUM('remote', 'onsite', 'hybrid');--> statement-breakpoint
ALTER TABLE "positions" ADD COLUMN "work_mode" "work_mode" DEFAULT 'hybrid' NOT NULL;--> statement-breakpoint
CREATE INDEX "positions_work_mode_idx" ON "positions" USING btree ("work_mode");