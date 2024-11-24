-- CreateTable
CREATE TABLE "program" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "sets" INTEGER,
    "reps" INTEGER,
    "holdTime" INTEGER,

    CONSTRAINT "program_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exercise" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subcategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "subcategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_programTosubcategory" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_categoryTosubcategory" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_categoryToprogram" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ExerciseToprogram" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ExerciseTocategory" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ExerciseTosubcategory" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_programTosubcategory_AB_unique" ON "_programTosubcategory"("A", "B");

-- CreateIndex
CREATE INDEX "_programTosubcategory_B_index" ON "_programTosubcategory"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_categoryTosubcategory_AB_unique" ON "_categoryTosubcategory"("A", "B");

-- CreateIndex
CREATE INDEX "_categoryTosubcategory_B_index" ON "_categoryTosubcategory"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_categoryToprogram_AB_unique" ON "_categoryToprogram"("A", "B");

-- CreateIndex
CREATE INDEX "_categoryToprogram_B_index" ON "_categoryToprogram"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ExerciseToprogram_AB_unique" ON "_ExerciseToprogram"("A", "B");

-- CreateIndex
CREATE INDEX "_ExerciseToprogram_B_index" ON "_ExerciseToprogram"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ExerciseTocategory_AB_unique" ON "_ExerciseTocategory"("A", "B");

-- CreateIndex
CREATE INDEX "_ExerciseTocategory_B_index" ON "_ExerciseTocategory"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ExerciseTosubcategory_AB_unique" ON "_ExerciseTosubcategory"("A", "B");

-- CreateIndex
CREATE INDEX "_ExerciseTosubcategory_B_index" ON "_ExerciseTosubcategory"("B");

-- AddForeignKey
ALTER TABLE "_programTosubcategory" ADD CONSTRAINT "_programTosubcategory_A_fkey" FOREIGN KEY ("A") REFERENCES "program"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_programTosubcategory" ADD CONSTRAINT "_programTosubcategory_B_fkey" FOREIGN KEY ("B") REFERENCES "subcategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_categoryTosubcategory" ADD CONSTRAINT "_categoryTosubcategory_A_fkey" FOREIGN KEY ("A") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_categoryTosubcategory" ADD CONSTRAINT "_categoryTosubcategory_B_fkey" FOREIGN KEY ("B") REFERENCES "subcategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_categoryToprogram" ADD CONSTRAINT "_categoryToprogram_A_fkey" FOREIGN KEY ("A") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_categoryToprogram" ADD CONSTRAINT "_categoryToprogram_B_fkey" FOREIGN KEY ("B") REFERENCES "program"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseToprogram" ADD CONSTRAINT "_ExerciseToprogram_A_fkey" FOREIGN KEY ("A") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseToprogram" ADD CONSTRAINT "_ExerciseToprogram_B_fkey" FOREIGN KEY ("B") REFERENCES "program"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseTocategory" ADD CONSTRAINT "_ExerciseTocategory_A_fkey" FOREIGN KEY ("A") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseTocategory" ADD CONSTRAINT "_ExerciseTocategory_B_fkey" FOREIGN KEY ("B") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseTosubcategory" ADD CONSTRAINT "_ExerciseTosubcategory_A_fkey" FOREIGN KEY ("A") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseTosubcategory" ADD CONSTRAINT "_ExerciseTosubcategory_B_fkey" FOREIGN KEY ("B") REFERENCES "subcategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
