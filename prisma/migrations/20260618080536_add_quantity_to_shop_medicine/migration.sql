/*
  Warnings:

  - Added the required column `quantity` to the `ShopMedicine` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ShopMedicine" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "shopId" INTEGER NOT NULL,
    "medicineId" INTEGER NOT NULL,
    "mrp" REAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    CONSTRAINT "ShopMedicine_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ShopMedicine_medicineId_fkey" FOREIGN KEY ("medicineId") REFERENCES "Medicine" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ShopMedicine" ("id", "medicineId", "mrp", "shopId") SELECT "id", "medicineId", "mrp", "shopId" FROM "ShopMedicine";
DROP TABLE "ShopMedicine";
ALTER TABLE "new_ShopMedicine" RENAME TO "ShopMedicine";
CREATE UNIQUE INDEX "ShopMedicine_shopId_medicineId_key" ON "ShopMedicine"("shopId", "medicineId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
