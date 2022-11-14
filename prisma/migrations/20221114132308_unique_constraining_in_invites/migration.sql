/*
  Warnings:

  - A unique constraint covering the columns `[email,deletedAt,deleted]` on the table `Invites` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Invites_email_key";

-- AlterTable
ALTER TABLE "Invites" ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "deletedAt" TEXT DEFAULT E'na';

-- CreateIndex
CREATE UNIQUE INDEX "Invites_email_deletedAt_deleted_key" ON "Invites"("email", "deletedAt", "deleted");
