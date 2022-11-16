/*
  Warnings:

  - A unique constraint covering the columns `[email,deletedAt,deleted,workspaceId]` on the table `Invites` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Invites_email_deletedAt_deleted_key";

-- CreateIndex
CREATE UNIQUE INDEX "Invites_email_deletedAt_deleted_workspaceId_key" ON "Invites"("email", "deletedAt", "deleted", "workspaceId");
