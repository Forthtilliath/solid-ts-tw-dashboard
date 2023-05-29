/*
  Warnings:

  - The primary key for the `Gamescore` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `idHistory` on the `Gamescore` table. All the data in the column will be lost.
  - Added the required column `idGameplay` to the `Gamescore` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Gamescore" (
    "idGameplay" INTEGER NOT NULL,
    "idUser" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,
    CONSTRAINT "Gamescore_idGameplay_fkey" FOREIGN KEY ("idGameplay") REFERENCES "Gameplay" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Gamescore_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Gamescore" ("idUser", "score") SELECT "idUser", "score" FROM "Gamescore";
DROP TABLE "Gamescore";
ALTER TABLE "new_Gamescore" RENAME TO "Gamescore";
CREATE UNIQUE INDEX "Gamescore_idGameplay_idUser_key" ON "Gamescore"("idGameplay", "idUser");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
