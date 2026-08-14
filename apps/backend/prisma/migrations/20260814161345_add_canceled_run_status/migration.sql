-- AlterEnum
ALTER TYPE "RunStatus" ADD VALUE 'canceled';

-- AlterTable
ALTER TABLE "Run" ALTER COLUMN "updatedAt" DROP DEFAULT;
