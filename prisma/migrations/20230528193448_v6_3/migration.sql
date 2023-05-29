/*
  Warnings:

  - You are about to drop the column `endPremiumAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `premium` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `premiumDuration` on the `User` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "UserPremium" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "subscriptionAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "duration" INTEGER NOT NULL,
    "subscriptionEndAt" DATETIME NOT NULL,
    "idUser" INTEGER NOT NULL,
    CONSTRAINT "UserPremium_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "birthday" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastConnection" DATETIME NOT NULL
);
INSERT INTO "new_User" ("birthday", "createdAt", "gender", "id", "lastConnection", "password", "username") SELECT "birthday", "createdAt", "gender", "id", "lastConnection", "password", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
