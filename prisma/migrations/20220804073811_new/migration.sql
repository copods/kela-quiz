/*
  Warnings:

  - You are about to drop the column `deleted` on the `Test` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "SectionInTest" DROP CONSTRAINT "SectionInTest_testId_fkey";

-- DropIndex
DROP INDEX "Section_name_createdAt_key";

-- DropIndex
DROP INDEX "Test_name_createdAt_deleted_key";

-- AlterTable
ALTER TABLE "Test" DROP COLUMN "deleted";

-- AddForeignKey
ALTER TABLE "SectionInTest" ADD CONSTRAINT "SectionInTest_testId_fkey" FOREIGN KEY ("testId") REFERENCES "Test"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
