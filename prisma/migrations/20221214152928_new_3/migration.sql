-- AlterTable
ALTER TABLE "CorrectAnswer" ADD COLUMN     "deletedAt" TEXT DEFAULT E'na';

-- AlterTable
ALTER TABLE "Option" ADD COLUMN     "deletedAt" TEXT DEFAULT E'na';
