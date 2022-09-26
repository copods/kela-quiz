-- AlterTable
ALTER TABLE "workspace" ALTER COLUMN "name" SET DEFAULT E'copods';

-- CreateTable
CREATE TABLE "_UserToworkspace" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserToworkspace_AB_unique" ON "_UserToworkspace"("A", "B");

-- CreateIndex
CREATE INDEX "_UserToworkspace_B_index" ON "_UserToworkspace"("B");

-- AddForeignKey
ALTER TABLE "_UserToworkspace" ADD CONSTRAINT "_UserToworkspace_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToworkspace" ADD CONSTRAINT "_UserToworkspace_B_fkey" FOREIGN KEY ("B") REFERENCES "workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;
