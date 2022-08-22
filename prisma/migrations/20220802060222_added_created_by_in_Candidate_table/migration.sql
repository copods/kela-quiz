/*
  Warnings:

  - Added the required column `createdById` to the `Candidate` table without a default value. This is not possible if the table is not empty.

*/
-- -- AlterTable
-- ALTER TABLE "Candidate" ADD COLUMN     "createdById" TEXT NOT NULL;

-- -- AddForeignKey
-- ALTER TABLE "Candidate" ADD CONSTRAINT "Candidate_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
