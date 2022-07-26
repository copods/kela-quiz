/*
  Warnings:

  - Made the column `questionId` on table `CorrectAnswer` required. This step will fail if there are existing NULL values in that column.
  - Made the column `option` on table `Option` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "CorrectAnswer" DROP CONSTRAINT "CorrectAnswer_questionId_fkey";

-- AlterTable
ALTER TABLE "CorrectAnswer" ALTER COLUMN "questionId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Option" ALTER COLUMN "option" SET NOT NULL,
ALTER COLUMN "coInQuestionId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "CorrectAnswer" ADD CONSTRAINT "CorrectAnswer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
