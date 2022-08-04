-- DropIndex
DROP INDEX "Test_name_key";

-- AlterTable
ALTER TABLE "Test" ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false;
