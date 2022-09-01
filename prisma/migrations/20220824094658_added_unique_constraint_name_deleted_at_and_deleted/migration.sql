/*
  Warnings:

  - A unique constraint covering the columns `[name,deletedAt,deleted]` on the table `Section` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Section_name_deletedAt_deleted_key" ON "Section"("name", "deletedAt", "deleted");
