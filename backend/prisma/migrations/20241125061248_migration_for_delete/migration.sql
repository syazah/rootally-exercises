-- DropForeignKey
ALTER TABLE "Exercises" DROP CONSTRAINT "Exercises_pid_fkey";

-- AddForeignKey
ALTER TABLE "Exercises" ADD CONSTRAINT "Exercises_pid_fkey" FOREIGN KEY ("pid") REFERENCES "Program"("id") ON DELETE CASCADE ON UPDATE CASCADE;
