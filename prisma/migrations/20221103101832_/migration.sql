/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Invites` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Invites_email_key" ON "Invites"("email");
