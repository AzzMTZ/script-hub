/*
  Warnings:

  - A unique constraint covering the columns `[authProvider,authProviderId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_authProvider_authProviderId_key" ON "User"("authProvider", "authProviderId");
