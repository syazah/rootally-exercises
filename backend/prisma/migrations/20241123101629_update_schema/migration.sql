/*
  Warnings:

  - Added the required column `side` to the `Program` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Side" AS ENUM ('LEFT', 'RIGHT', 'BOTH');

-- AlterTable
ALTER TABLE "Program" ADD COLUMN     "side" "Side" NOT NULL;
