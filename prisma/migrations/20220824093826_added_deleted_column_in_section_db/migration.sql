-- AlterTable
ALTER TABLE "Section" ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "deletedAt" TEXT DEFAULT E'na';
