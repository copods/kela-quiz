/*
  Warnings:

  - A unique constraint covering the columns `[candidateId,testId]` on the table `CandidateTest` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CandidateTest_candidateId_testId_key" ON "CandidateTest"("candidateId", "testId");
