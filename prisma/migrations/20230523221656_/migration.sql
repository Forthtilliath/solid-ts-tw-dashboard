-- CreateTable
CREATE TABLE "Game" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "premium" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "Player" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "premium" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "History" (
    "idGame" INTEGER NOT NULL,
    "idPlayer" INTEGER NOT NULL,

    PRIMARY KEY ("idGame", "idPlayer"),
    CONSTRAINT "History_idGame_fkey" FOREIGN KEY ("idGame") REFERENCES "Game" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "History_idPlayer_fkey" FOREIGN KEY ("idPlayer") REFERENCES "Player" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
