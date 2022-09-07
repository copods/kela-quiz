/*
  Warnings:

  - Added the required column `timeInSeconds` to the `SectionWiseResult` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SectionWiseResult" ADD COLUMN     "timeInSeconds" INTEGER NOT NULL;
