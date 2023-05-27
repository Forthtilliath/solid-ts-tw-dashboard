-- CreateTable
CREATE TABLE "Game" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "premium" BOOLEAN NOT NULL,
    "image" TEXT NOT NULL,
    "popularity" INTEGER NOT NULL,
    "minplayers" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "premium" BOOLEAN NOT NULL DEFAULT false,
    "endPremiumAt" DATETIME
);

-- CreateTable
CREATE TABLE "History" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idGame" INTEGER NOT NULL,
    "idUser" INTEGER NOT NULL,
    "playedAt" DATETIME NOT NULL,
    "score" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    CONSTRAINT "History_idGame_fkey" FOREIGN KEY ("idGame") REFERENCES "Game" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "History_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
