/*
  Warnings:

  - You are about to drop the column `candidateQuestionId` on the `Option` table. All the data in the column will be lost.
  - Added the required column `order` to the `SectionInCandidateTest` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Option" DROP CONSTRAINT "Option_candidateQuestionId_fkey";

-- AlterTable
ALTER TABLE "Option" DROP COLUMN "candidateQuestionId";

-- AlterTable
ALTER TABLE "SectionInCandidateTest" ADD COLUMN     "order" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "_CandidateQuestionToOption" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CandidateQuestionToOption_AB_unique" ON "_CandidateQuestionToOption"("A", "B");

-- CreateIndex
CREATE INDEX "_CandidateQuestionToOption_B_index" ON "_CandidateQuestionToOption"("B");

-- AddForeignKey
ALTER TABLE "_CandidateQuestionToOption" ADD CONSTRAINT "_CandidateQuestionToOption_A_fkey" FOREIGN KEY ("A") REFERENCES "CandidateQuestion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CandidateQuestionToOption" ADD CONSTRAINT "_CandidateQuestionToOption_B_fkey" FOREIGN KEY ("B") REFERENCES "Option"("id") ON DELETE CASCADE ON UPDATE CASCADE;
