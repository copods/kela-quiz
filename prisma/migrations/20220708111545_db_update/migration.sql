-- DropForeignKey
ALTER TABLE "CorrectAnswer" DROP CONSTRAINT "CorrectAnswer_questionId_fkey";

-- AlterTable
ALTER TABLE "CorrectAnswer" ALTER COLUMN "questionId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "CorrectAnswer" ADD CONSTRAINT "CorrectAnswer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE SET NULL ON UPDATE CASCADE;
