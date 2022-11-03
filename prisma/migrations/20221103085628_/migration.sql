/*
  Warnings:

  - Made the column `invitedOn` on table `Invites` required. This step will fail if there are existing NULL values in that column.
  - Made the column `joinedAt` on table `Invites` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Invites" ALTER COLUMN "invitedOn" SET NOT NULL,
ALTER COLUMN "joinedAt" SET NOT NULL;
