/*
  Warnings:

  - Added the required column `count` to the `Test` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Test" ADD COLUMN     "count" INTEGER NOT NULL;
