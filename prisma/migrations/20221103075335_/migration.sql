-- DropForeignKey
ALTER TABLE "Invites" DROP CONSTRAINT "Invites_userId_fkey";

-- DropForeignKey
ALTER TABLE "Invites" DROP CONSTRAINT "Invites_workspaceId_fkey";

-- AlterTable
ALTER TABLE "Invites" ALTER COLUMN "userId" DROP NOT NULL,
ALTER COLUMN "workspaceId" DROP NOT NULL,
ALTER COLUMN "invitedOn" DROP NOT NULL,
ALTER COLUMN "joined" DROP NOT NULL,
ALTER COLUMN "joinedAt" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Invites" ADD CONSTRAINT "Invites_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invites" ADD CONSTRAINT "Invites_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
