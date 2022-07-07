/*
  Warnings:

  - Added the required column `order` to the `Option` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order` to the `SectionInTest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Option" ADD COLUMN     "checkOrder" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "order" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "SectionInTest" ADD COLUMN     "order" INTEGER NOT NULL;
