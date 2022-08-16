/*
  Warnings:

  - Added the required column `order` to the `CandidateQuestion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Candidate" ALTER COLUMN "firstName" DROP NOT NULL,
ALTER COLUMN "lastName" DROP NOT NULL;

-- AlterTable
ALTER TABLE "CandidateQuestion" ADD COLUMN     "order" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "CandidateTest" ALTER COLUMN "link" DROP NOT NULL;
