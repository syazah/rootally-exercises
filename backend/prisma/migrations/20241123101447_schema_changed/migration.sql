/*
  Warnings:

  - You are about to drop the `Exercise` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ExerciseTocategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ExerciseToprogram` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ExerciseTosubcategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_categoryToprogram` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_categoryTosubcategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_programTosubcategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `program` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `subcategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ExerciseTocategory" DROP CONSTRAINT "_ExerciseTocategory_A_fkey";

-- DropForeignKey
ALTER TABLE "_ExerciseTocategory" DROP CONSTRAINT "_ExerciseTocategory_B_fkey";

-- DropForeignKey
ALTER TABLE "_ExerciseToprogram" DROP CONSTRAINT "_ExerciseToprogram_A_fkey";

-- DropForeignKey
ALTER TABLE "_ExerciseToprogram" DROP CONSTRAINT "_ExerciseToprogram_B_fkey";

-- DropForeignKey
ALTER TABLE "_ExerciseTosubcategory" DROP CONSTRAINT "_ExerciseTosubcategory_A_fkey";

-- DropForeignKey
ALTER TABLE "_ExerciseTosubcategory" DROP CONSTRAINT "_ExerciseTosubcategory_B_fkey";

-- DropForeignKey
ALTER TABLE "_categoryToprogram" DROP CONSTRAINT "_categoryToprogram_A_fkey";

-- DropForeignKey
ALTER TABLE "_categoryToprogram" DROP CONSTRAINT "_categoryToprogram_B_fkey";

-- DropForeignKey
ALTER TABLE "_categoryTosubcategory" DROP CONSTRAINT "_categoryTosubcategory_A_fkey";

-- DropForeignKey
ALTER TABLE "_categoryTosubcategory" DROP CONSTRAINT "_categoryTosubcategory_B_fkey";

-- DropForeignKey
ALTER TABLE "_programTosubcategory" DROP CONSTRAINT "_programTosubcategory_A_fkey";

-- DropForeignKey
ALTER TABLE "_programTosubcategory" DROP CONSTRAINT "_programTosubcategory_B_fkey";

-- DropTable
DROP TABLE "Exercise";

-- DropTable
DROP TABLE "_ExerciseTocategory";

-- DropTable
DROP TABLE "_ExerciseToprogram";

-- DropTable
DROP TABLE "_ExerciseTosubcategory";

-- DropTable
DROP TABLE "_categoryToprogram";

-- DropTable
DROP TABLE "_categoryTosubcategory";

-- DropTable
DROP TABLE "_programTosubcategory";

-- DropTable
DROP TABLE "category";

-- DropTable
DROP TABLE "program";

-- DropTable
DROP TABLE "subcategory";

-- CreateTable
CREATE TABLE "Program" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "sets" INTEGER,
    "reps" INTEGER,
    "holdTime" INTEGER,
    "description" TEXT,

    CONSTRAINT "Program_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subcategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cid" INTEGER NOT NULL,
    "exercises" TEXT[],

    CONSTRAINT "Subcategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CategoryToProgram" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToProgram_AB_unique" ON "_CategoryToProgram"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToProgram_B_index" ON "_CategoryToProgram"("B");

-- AddForeignKey
ALTER TABLE "Subcategory" ADD CONSTRAINT "Subcategory_cid_fkey" FOREIGN KEY ("cid") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToProgram" ADD CONSTRAINT "_CategoryToProgram_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToProgram" ADD CONSTRAINT "_CategoryToProgram_B_fkey" FOREIGN KEY ("B") REFERENCES "Program"("id") ON DELETE CASCADE ON UPDATE CASCADE;
