/*
  Warnings:

  - Made the column `updatedAt` on table `UserWorkspace` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `Workspace` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "UserWorkspace" ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "Workspace" ALTER COLUMN "updatedAt" SET NOT NULL;
