-- CreateTable
CREATE TABLE "Medicine" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "manufacturer" TEXT
);

-- CreateTable
CREATE TABLE "Composition" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "strength" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Shopkeeper" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "shopName" TEXT NOT NULL,
    "pincode" TEXT NOT NULL,
    "contactNumber" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ShopMedicine" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "shopkeeperId" INTEGER NOT NULL,
    "medicineId" INTEGER NOT NULL,
    "mrp" REAL NOT NULL,
    CONSTRAINT "ShopMedicine_shopkeeperId_fkey" FOREIGN KEY ("shopkeeperId") REFERENCES "Shopkeeper" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ShopMedicine_medicineId_fkey" FOREIGN KEY ("medicineId") REFERENCES "Medicine" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "shopId" INTEGER,
    CONSTRAINT "User_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shopkeeper" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_CompositionToMedicine" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_CompositionToMedicine_A_fkey" FOREIGN KEY ("A") REFERENCES "Composition" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CompositionToMedicine_B_fkey" FOREIGN KEY ("B") REFERENCES "Medicine" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_shopId_key" ON "User"("shopId");

-- CreateIndex
CREATE UNIQUE INDEX "_CompositionToMedicine_AB_unique" ON "_CompositionToMedicine"("A", "B");

-- CreateIndex
CREATE INDEX "_CompositionToMedicine_B_index" ON "_CompositionToMedicine"("B");
