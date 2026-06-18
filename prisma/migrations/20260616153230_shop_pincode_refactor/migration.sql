/*
  Warnings:

  - You are about to drop the `Shopkeeper` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `shopkeeperId` on the `ShopMedicine` table. All the data in the column will be lost.
  - Added the required column `shopId` to the `ShopMedicine` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Shopkeeper";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Pincode" (
    "code" TEXT NOT NULL PRIMARY KEY
);

-- CreateTable
CREATE TABLE "Shop" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "shopName" TEXT NOT NULL,
    "contactNumber" TEXT NOT NULL,
    "pincodeCode" TEXT NOT NULL,
    CONSTRAINT "Shop_pincodeCode_fkey" FOREIGN KEY ("pincodeCode") REFERENCES "Pincode" ("code") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ShopMedicine" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "shopId" INTEGER NOT NULL,
    "medicineId" INTEGER NOT NULL,
    "mrp" REAL NOT NULL,
    CONSTRAINT "ShopMedicine_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ShopMedicine_medicineId_fkey" FOREIGN KEY ("medicineId") REFERENCES "Medicine" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ShopMedicine" ("id", "medicineId", "mrp") SELECT "id", "medicineId", "mrp" FROM "ShopMedicine";
DROP TABLE "ShopMedicine";
ALTER TABLE "new_ShopMedicine" RENAME TO "ShopMedicine";
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "shopId" INTEGER,
    CONSTRAINT "User_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_User" ("id", "name", "password", "shopId", "username") SELECT "id", "name", "password", "shopId", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX "User_shopId_key" ON "User"("shopId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
