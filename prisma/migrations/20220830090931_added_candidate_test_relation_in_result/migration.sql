/*
  Warnings:

  - Added the required column `candidateTestId` to the `SectionWiseResult` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SectionWiseResult" ADD COLUMN     "candidateTestId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "SectionWiseResult" ADD CONSTRAINT "SectionWiseResult_candidateTestId_fkey" FOREIGN KEY ("candidateTestId") REFERENCES "CandidateTest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
