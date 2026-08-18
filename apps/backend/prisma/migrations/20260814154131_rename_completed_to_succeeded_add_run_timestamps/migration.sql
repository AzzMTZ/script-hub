-- Rename enum value RunStatus.completed -> RunStatus.succeeded
ALTER TYPE "RunStatus" RENAME VALUE 'completed' TO 'succeeded';

-- AlterTable: add createdAt/updatedAt to Run, backfilling existing rows
ALTER TABLE "Run" ADD COLUMN "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "Run" ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
