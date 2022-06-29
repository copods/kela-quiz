/*
  Warnings:

  - You are about to drop the column `marks` on the `CandidateResult` table. All the data in the column will be lost.
  - You are about to drop the column `totalMarks` on the `CandidateResult` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Option` table. All the data in the column will be lost.
  - You are about to drop the column `optionTypeId` on the `Option` table. All the data in the column will be lost.
  - You are about to drop the `OptionType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CandidateToCandidateTest` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `firstName` to the `Candidate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Candidate` table without a default value. This is not possible if the table is not empty.
  - Made the column `sectionInCandidateTestId` on table `CandidateQuestion` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `candidateId` to the `CandidateTest` table without a default value. This is not possible if the table is not empty.
  - Made the column `candidateTestId` on table `SectionInCandidateTest` required. This step will fail if there are existing NULL values in that column.
  - Made the column `testId` on table `SectionInTest` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "CandidateQuestion" DROP CONSTRAINT "CandidateQuestion_sectionInCandidateTestId_fkey";

-- DropForeignKey
ALTER TABLE "Option" DROP CONSTRAINT "Option_optionTypeId_fkey";

-- DropForeignKey
ALTER TABLE "SectionInCandidateTest" DROP CONSTRAINT "SectionInCandidateTest_candidateTestId_fkey";

-- DropForeignKey
ALTER TABLE "SectionInTest" DROP CONSTRAINT "SectionInTest_testId_fkey";

-- DropForeignKey
ALTER TABLE "_CandidateToCandidateTest" DROP CONSTRAINT "_CandidateToCandidateTest_A_fkey";

-- DropForeignKey
ALTER TABLE "_CandidateToCandidateTest" DROP CONSTRAINT "_CandidateToCandidateTest_B_fkey";

-- AlterTable
ALTER TABLE "Candidate" ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "CandidateQuestion" ADD COLUMN     "answeredAt" TIMESTAMP(3),
ADD COLUMN     "status" TEXT NOT NULL DEFAULT E'NOT_VIEWED',
ALTER COLUMN "sectionInCandidateTestId" SET NOT NULL;

-- AlterTable
ALTER TABLE "CandidateResult" DROP COLUMN "marks",
DROP COLUMN "totalMarks";

-- AlterTable
ALTER TABLE "CandidateTest" ADD COLUMN     "candidateId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Option" DROP COLUMN "imageUrl",
DROP COLUMN "optionTypeId";

-- AlterTable
ALTER TABLE "SectionInCandidateTest" ALTER COLUMN "candidateTestId" SET NOT NULL;

-- AlterTable
ALTER TABLE "SectionInTest" ALTER COLUMN "testId" SET NOT NULL;

-- DropTable
DROP TABLE "OptionType";

-- DropTable
DROP TABLE "_CandidateToCandidateTest";

-- CreateTable
CREATE TABLE "TimeInCandidateQuestion" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "sectionId" TEXT NOT NULL,
    "enterAt" TIMESTAMP(3) NOT NULL,
    "exitAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TimeInCandidateQuestion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SectionInTest" ADD CONSTRAINT "SectionInTest_testId_fkey" FOREIGN KEY ("testId") REFERENCES "Test"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CandidateTest" ADD CONSTRAINT "CandidateTest_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SectionInCandidateTest" ADD CONSTRAINT "SectionInCandidateTest_candidateTestId_fkey" FOREIGN KEY ("candidateTestId") REFERENCES "CandidateTest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CandidateQuestion" ADD CONSTRAINT "CandidateQuestion_sectionInCandidateTestId_fkey" FOREIGN KEY ("sectionInCandidateTestId") REFERENCES "SectionInCandidateTest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeInCandidateQuestion" ADD CONSTRAINT "TimeInCandidateQuestion_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "SectionInCandidateTest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeInCandidateQuestion" ADD CONSTRAINT "TimeInCandidateQuestion_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "CandidateQuestion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
