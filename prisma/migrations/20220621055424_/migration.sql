/*
  Warnings:

  - You are about to drop the column `sectionWiseQuestionForTestId` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the `SectionWiseQuestionForTest` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_sectionWiseQuestionForTestId_fkey";

-- DropForeignKey
ALTER TABLE "SectionWiseQuestionForTest" DROP CONSTRAINT "SectionWiseQuestionForTest_sectionId_fkey";

-- DropForeignKey
ALTER TABLE "SectionWiseQuestionForTest" DROP CONSTRAINT "SectionWiseQuestionForTest_testId_fkey";

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "sectionWiseQuestionForTestId";

-- DropTable
DROP TABLE "SectionWiseQuestionForTest";

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_testId_fkey" FOREIGN KEY ("testId") REFERENCES "Test"("id") ON DELETE SET NULL ON UPDATE CASCADE;
