/*
  Warnings:

  - You are about to drop the column `order` on the `Option` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name,createdAt]` on the table `Section` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,createdAt,deleted]` on the table `Test` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "SectionInTest" DROP CONSTRAINT "SectionInTest_testId_fkey";

-- AlterTable
ALTER TABLE "Option" DROP COLUMN "order";

-- AlterTable
ALTER TABLE "Test" ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "Section_name_createdAt_key" ON "Section"("name", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Test_name_createdAt_deleted_key" ON "Test"("name", "createdAt", "deleted");

-- AddForeignKey
ALTER TABLE "SectionInTest" ADD CONSTRAINT "SectionInTest_testId_fkey" FOREIGN KEY ("testId") REFERENCES "Test"("id") ON DELETE CASCADE ON UPDATE CASCADE;
