-- CreateTable
CREATE TABLE "CardImage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "image_url" TEXT NOT NULL,
    "image_url_small" TEXT,
    "cardId" INTEGER NOT NULL,
    CONSTRAINT "CardImage_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CardBanlistInfo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ban_tcg" TEXT NOT NULL,
    "ban_ocg" TEXT,
    "cardId" INTEGER NOT NULL,
    CONSTRAINT "CardBanlistInfo_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Card" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "atk" INTEGER,
    "def" INTEGER,
    "level" INTEGER,
    "race" TEXT,
    "attribute" TEXT,
    "archetype" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "CardBanlistInfo_cardId_key" ON "CardBanlistInfo"("cardId");
