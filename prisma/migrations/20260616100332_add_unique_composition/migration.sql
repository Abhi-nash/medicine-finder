/*
  Warnings:

  - A unique constraint covering the columns `[name,strength]` on the table `Composition` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Composition_name_strength_key" ON "Composition"("name", "strength");
