/*
  Warnings:

  - You are about to drop the `_CategoryToProgram` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `combo` to the `Program` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_CategoryToProgram" DROP CONSTRAINT "_CategoryToProgram_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToProgram" DROP CONSTRAINT "_CategoryToProgram_B_fkey";

-- AlterTable
ALTER TABLE "Program" ADD COLUMN     "combo" BOOLEAN NOT NULL;

-- DropTable
DROP TABLE "_CategoryToProgram";
