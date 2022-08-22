/*
  Warnings:

  - Added the required column `correctQuestion` to the `CandidateResult` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalQuestion` to the `CandidateResult` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unanswered` to the `CandidateResult` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CandidateResult" ADD COLUMN     "correctQuestion" INTEGER NOT NULL,
ADD COLUMN     "totalQuestion" INTEGER NOT NULL,
ADD COLUMN     "unanswered" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "SectionWiseResult" (
    "id" TEXT NOT NULL,
    "sectionInCandidateTestId" TEXT NOT NULL,
    "totalQuestion" INTEGER NOT NULL,
    "correctQuestion" INTEGER NOT NULL,
    "unanswered" INTEGER NOT NULL,
    "testId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SectionWiseResult_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SectionWiseResult" ADD CONSTRAINT "SectionWiseResult_testId_fkey" FOREIGN KEY ("testId") REFERENCES "Test"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SectionWiseResult" ADD CONSTRAINT "SectionWiseResult_sectionInCandidateTestId_fkey" FOREIGN KEY ("sectionInCandidateTestId") REFERENCES "SectionInCandidateTest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
