/*
  Warnings:

  - You are about to drop the column `description` on the `Program` table. All the data in the column will be lost.
  - You are about to drop the column `holdTime` on the `Program` table. All the data in the column will be lost.
  - You are about to drop the column `reps` on the `Program` table. All the data in the column will be lost.
  - You are about to drop the column `sets` on the `Program` table. All the data in the column will be lost.
  - You are about to drop the column `side` on the `Program` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Program" DROP COLUMN "description",
DROP COLUMN "holdTime",
DROP COLUMN "reps",
DROP COLUMN "sets",
DROP COLUMN "side";

-- CreateTable
CREATE TABLE "Exercises" (
    "id" SERIAL NOT NULL,
    "sets" INTEGER,
    "reps" INTEGER,
    "holdTime" INTEGER,
    "description" TEXT,
    "side" "Side" NOT NULL,
    "pid" INTEGER NOT NULL,

    CONSTRAINT "Exercises_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Exercises" ADD CONSTRAINT "Exercises_pid_fkey" FOREIGN KEY ("pid") REFERENCES "Program"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
