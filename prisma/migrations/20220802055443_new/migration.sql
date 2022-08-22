/*
  Warnings:

  - You are about to drop the column `createdById` on the `Candidate` table. All the data in the column will be lost.
  - Made the column `firstName` on table `Candidate` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastName` on table `Candidate` required. This step will fail if there are existing NULL values in that column.
  - Made the column `link` on table `CandidateTest` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Candidate" DROP CONSTRAINT "Candidate_createdById_fkey";

-- AlterTable
ALTER TABLE "Candidate" DROP COLUMN "createdById",
ALTER COLUMN "firstName" SET NOT NULL,
ALTER COLUMN "lastName" SET NOT NULL;