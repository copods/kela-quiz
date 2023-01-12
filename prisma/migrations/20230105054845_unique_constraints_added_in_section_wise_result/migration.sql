/*
  Warnings:

  - A unique constraint covering the columns `[sectionInCandidateTestId,testId]` on the table `SectionWiseResult` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "SectionWiseResult_sectionInCandidateTestId_testId_key" ON "SectionWiseResult"("sectionInCandidateTestId", "testId");
