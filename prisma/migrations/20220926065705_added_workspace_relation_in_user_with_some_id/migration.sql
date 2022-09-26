/*
  Warnings:

  - You are about to drop the `_UserToworkspace` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `workspace` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `workspace` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_UserToworkspace" DROP CONSTRAINT "_UserToworkspace_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserToworkspace" DROP CONSTRAINT "_UserToworkspace_B_fkey";

-- AlterTable
ALTER TABLE "workspace" ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_UserToworkspace";

-- CreateIndex
CREATE UNIQUE INDEX "workspace_userId_key" ON "workspace"("userId");

-- AddForeignKey
ALTER TABLE "workspace" ADD CONSTRAINT "workspace_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
