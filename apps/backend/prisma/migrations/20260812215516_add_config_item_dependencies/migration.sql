/*
  Warnings:

  - Added the required column `resultType` to the `Script` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Script" ADD COLUMN     "resultType" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "ConfigItem" (
    "id" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "ConfigItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScriptConfigItemDependency" (
    "scriptId" TEXT NOT NULL,
    "configItemId" TEXT NOT NULL,

    CONSTRAINT "ScriptConfigItemDependency_pkey" PRIMARY KEY ("scriptId","configItemId")
);

-- AddForeignKey
ALTER TABLE "ConfigItem" ADD CONSTRAINT "ConfigItem_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScriptConfigItemDependency" ADD CONSTRAINT "ScriptConfigItemDependency_scriptId_fkey" FOREIGN KEY ("scriptId") REFERENCES "Script"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScriptConfigItemDependency" ADD CONSTRAINT "ScriptConfigItemDependency_configItemId_fkey" FOREIGN KEY ("configItemId") REFERENCES "ConfigItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
