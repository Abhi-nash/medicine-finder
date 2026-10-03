CREATE TABLE "Purchase" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "buyerId" INTEGER NOT NULL,
    "shopMedicineId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitPrice" REAL NOT NULL,
    "totalPrice" REAL NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'COMPLETED',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Purchase_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Purchase_shopMedicineId_fkey" FOREIGN KEY ("shopMedicineId") REFERENCES "ShopMedicine" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE INDEX "Purchase_buyerId_idx" ON "Purchase"("buyerId");
CREATE INDEX "Purchase_shopMedicineId_idx" ON "Purchase"("shopMedicineId");
