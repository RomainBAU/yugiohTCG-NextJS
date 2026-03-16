/*
  Warnings:

  - You are about to drop the `CardBanlistInfo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CardImage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `archetype` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `atk` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `attribute` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `def` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `desc` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `level` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `race` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Card` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "CardBanlistInfo_cardId_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "CardBanlistInfo";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "CardImage";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Deck" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT
);

-- CreateTable
CREATE TABLE "_CardToDeck" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_CardToDeck_A_fkey" FOREIGN KEY ("A") REFERENCES "Card" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CardToDeck_B_fkey" FOREIGN KEY ("B") REFERENCES "Deck" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Card" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
);
INSERT INTO "new_Card" ("id") SELECT "id" FROM "Card";
DROP TABLE "Card";
ALTER TABLE "new_Card" RENAME TO "Card";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "_CardToDeck_AB_unique" ON "_CardToDeck"("A", "B");

-- CreateIndex
CREATE INDEX "_CardToDeck_B_index" ON "_CardToDeck"("B");
