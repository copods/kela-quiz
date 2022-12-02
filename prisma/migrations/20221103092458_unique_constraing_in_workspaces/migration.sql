/*
  Warnings:

  - A unique constraint covering the columns `[name,deletedAt,deleted,workspaceId]` on the table `Section` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,deletedAt,deleted,workspaceId]` on the table `Test` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Section_name_deletedAt_deleted_key";

-- DropIndex
DROP INDEX "Test_name_deletedAt_deleted_key";

-- CreateIndex
CREATE UNIQUE INDEX "Section_name_deletedAt_deleted_workspaceId_key" ON "Section"("name", "deletedAt", "deleted", "workspaceId");

-- CreateIndex
CREATE UNIQUE INDEX "Test_name_deletedAt_deleted_workspaceId_key" ON "Test"("name", "deletedAt", "deleted", "workspaceId");
