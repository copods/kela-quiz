/*
  Warnings:

  - A unique constraint covering the columns `[id,sectionId,testId]` on the table `SectionInTest` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "SectionInTest_id_sectionId_testId_key" ON "SectionInTest"("id", "sectionId", "testId");
