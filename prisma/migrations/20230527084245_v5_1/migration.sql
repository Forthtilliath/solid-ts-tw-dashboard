/*
  Warnings:

  - Added the required column `lastConnexion` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "premium" BOOLEAN NOT NULL DEFAULT false,
    "endPremiumAt" DATETIME,
    "createdAt" DATETIME NOT NULL,
    "lastConnexion" DATETIME NOT NULL
);
INSERT INTO "new_User" ("createdAt", "endPremiumAt", "id", "password", "premium", "username") SELECT "createdAt", "endPremiumAt", "id", "password", "premium", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
