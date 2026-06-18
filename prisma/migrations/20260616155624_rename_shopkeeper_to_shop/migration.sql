/*
  Warnings:

  - You are about to drop the `Pincode` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `pincodeCode` on the `Shop` table. All the data in the column will be lost.
  - Added the required column `pincode` to the `Shop` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Pincode";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Shop" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "shopName" TEXT NOT NULL,
    "contactNumber" TEXT NOT NULL,
    "pincode" TEXT NOT NULL
);
INSERT INTO "new_Shop" ("contactNumber", "id", "shopName") SELECT "contactNumber", "id", "shopName" FROM "Shop";
DROP TABLE "Shop";
ALTER TABLE "new_Shop" RENAME TO "Shop";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
