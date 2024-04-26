-- CreateTable
CREATE TABLE "Item" (
    "itemId" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "src" TEXT NOT NULL,
    "describtion" TEXT NOT NULL,
    "sellerId" TEXT NOT NULL,
    CONSTRAINT "Item_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "User" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
    "userId" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "balance" REAL NOT NULL,
    "type" TEXT NOT NULL,
    "userType" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Item_sellerId_key" ON "Item"("sellerId");
