/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Invites` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Invites" DROP CONSTRAINT "Invites_userId_fkey";

-- DropForeignKey
ALTER TABLE "Invites" DROP CONSTRAINT "Invites_workspaceId_fkey";

-- AlterTable
ALTER TABLE "CandidateTest" ADD COLUMN     "linkSentOn" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Invites" ALTER COLUMN "userId" DROP NOT NULL,
ALTER COLUMN "workspaceId" DROP NOT NULL,
ALTER COLUMN "joined" DROP NOT NULL,
ALTER COLUMN "joinedAt" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Invites_email_key" ON "Invites"("email");

-- AddForeignKey
ALTER TABLE "Invites" ADD CONSTRAINT "Invites_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invites" ADD CONSTRAINT "Invites_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
