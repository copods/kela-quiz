-- AlterTable
ALTER TABLE "CandidateResult" ADD COLUMN     "incorrect" INTEGER DEFAULT 0,
ADD COLUMN     "skipped" INTEGER DEFAULT 0;

-- AlterTable
ALTER TABLE "SectionWiseResult" ADD COLUMN     "incorrect" INTEGER DEFAULT 0,
ADD COLUMN     "skipped" INTEGER DEFAULT 0;
