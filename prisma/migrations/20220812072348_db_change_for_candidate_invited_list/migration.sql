/*
  Warnings:

  - Added the required column `createdById` to the `Candidate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order` to the `CandidateQuestion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Candidate" ADD COLUMN     "createdById" TEXT NOT NULL,
ALTER COLUMN "firstName" DROP NOT NULL,
ALTER COLUMN "lastName" DROP NOT NULL;

-- AlterTable
ALTER TABLE "CandidateQuestion" ADD COLUMN     "order" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "CandidateTest" ADD COLUMN     "candidateStep" JSONB NOT NULL DEFAULT '{ "nextRoute": "register", "isSection": false, "currentSectionID": null }',
ALTER COLUMN "link" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Candidate" ADD CONSTRAINT "Candidate_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
