/*
  Warnings:

  - A unique constraint covering the columns `[name,deletedAt,deleted]` on the table `Test` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Test" ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "deletedAt" TEXT DEFAULT E'na';

-- CreateIndex
CREATE UNIQUE INDEX "Test_name_deletedAt_deleted_key" ON "Test"("name", "deletedAt", "deleted");
