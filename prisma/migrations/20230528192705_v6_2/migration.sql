-- CreateTable
CREATE TABLE "Game" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "premium" BOOLEAN NOT NULL,
    "image" TEXT NOT NULL,
    "popularity" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "birthday" DATETIME NOT NULL,
    "premium" BOOLEAN NOT NULL DEFAULT false,
    "premiumDuration" INTEGER NOT NULL DEFAULT 0,
    "endPremiumAt" DATETIME,
    "createdAt" DATETIME NOT NULL,
    "lastConnection" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Gameplay" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "playedAt" DATETIME NOT NULL,
    "duration" INTEGER NOT NULL,
    "idGame" INTEGER NOT NULL,
    CONSTRAINT "Gameplay_idGame_fkey" FOREIGN KEY ("idGame") REFERENCES "Game" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Gamescore" (
    "idHistory" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idUser" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,
    CONSTRAINT "Gamescore_idHistory_fkey" FOREIGN KEY ("idHistory") REFERENCES "Gameplay" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Gamescore_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Game_name_key" ON "Game"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Gamescore_idHistory_idUser_key" ON "Gamescore"("idHistory", "idUser");
