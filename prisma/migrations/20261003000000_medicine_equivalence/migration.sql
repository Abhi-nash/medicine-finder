-- Preserve existing medicine and shop records while moving compositions to
-- medicine-owned ingredient rows. Existing rows are marked as legacy so they
-- cannot be incorrectly considered equivalent until they are re-entered.
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;

CREATE TABLE "new_Medicine" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "manufacturer" TEXT,
    "compositionKey" TEXT NOT NULL DEFAULT ''
);
INSERT INTO "new_Medicine" ("id", "name", "manufacturer", "compositionKey")
SELECT "id", "name", "manufacturer", 'legacy:' || "id" FROM "Medicine";
DROP TABLE "Medicine";
ALTER TABLE "new_Medicine" RENAME TO "Medicine";

CREATE TABLE "new_Composition" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "medicineId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "strength" TEXT NOT NULL,
    CONSTRAINT "Composition_medicineId_fkey" FOREIGN KEY ("medicineId") REFERENCES "Medicine" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Composition" ("medicineId", "name", "strength")
SELECT relation."B", composition."name", composition."strength"
FROM "Composition" AS composition
INNER JOIN "_CompositionToMedicine" AS relation ON relation."A" = composition."id";
DROP TABLE "_CompositionToMedicine";
DROP TABLE "Composition";
ALTER TABLE "new_Composition" RENAME TO "Composition";

CREATE INDEX "Medicine_compositionKey_idx" ON "Medicine"("compositionKey");
CREATE UNIQUE INDEX "Composition_medicineId_name_strength_key" ON "Composition"("medicineId", "name", "strength");
CREATE INDEX "Composition_medicineId_idx" ON "Composition"("medicineId");

PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
