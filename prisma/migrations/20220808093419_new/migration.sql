/*
  Warnings:

  - You are about to drop the column `deleteAt` on the `Test` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Test` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,deletedAt,deleted]` on the table `Test` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Test" DROP COLUMN "deleteAt",
ADD COLUMN     "deletedAt" TEXT DEFAULT E'na';

-- CreateIndex
CREATE UNIQUE INDEX "Test_name_key" ON "Test"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Test_name_deletedAt_deleted_key" ON "Test"("name", "deletedAt", "deleted");
