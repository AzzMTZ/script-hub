/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `ConfigItem` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Script` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ConfigItem_name_key" ON "ConfigItem"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Script_name_key" ON "Script"("name");
