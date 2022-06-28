/*
  Warnings:

  - You are about to drop the column `name` on the `OptionType` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `QuestionType` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[value]` on the table `OptionType` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[value]` on the table `QuestionType` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `displayName` to the `OptionType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `OptionType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `displayName` to the `QuestionType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `QuestionType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Section` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "OptionType_name_key";

-- DropIndex
DROP INDEX "QuestionType_name_key";

-- AlterTable
ALTER TABLE "OptionType" DROP COLUMN "name",
ADD COLUMN     "displayName" TEXT NOT NULL,
ADD COLUMN     "value" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "imageUrl";

-- AlterTable
ALTER TABLE "QuestionType" DROP COLUMN "name",
ADD COLUMN     "displayName" TEXT NOT NULL,
ADD COLUMN     "value" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Section" ADD COLUMN     "description" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "OptionType_value_key" ON "OptionType"("value");

-- CreateIndex
CREATE UNIQUE INDEX "QuestionType_value_key" ON "QuestionType"("value");
