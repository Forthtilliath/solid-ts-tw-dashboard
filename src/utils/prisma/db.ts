import { PrismaClient } from "@prisma/client";
import { createGames, createPlayedGames, createUsers, generateData } from "./generateData";

export const prisma = new PrismaClient({
  log: [
    {
      emit: "event",
      level: "query",
    },
    {
      emit: "stdout",
      level: "error",
    },
    {
      emit: "stdout",
      level: "info",
    },
    {
      emit: "stdout",
      level: "warn",
    },
  ],
}).$extends({
  model: {
    user: {
      findById: async (userId: number) => {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
          throw new Error(`User with id ${userId} not found`);
        }
        return user;
      },
      getAllIds: async () => {
        return await prisma.user.findMany({ select: { id: true } });
      },
    },
    game: {
      getAllIds: async () => {
        return await prisma.game.findMany({ select: { id: true } });
      },
    },
  },
});

prisma.$on("query", (e) => {
  const params = JSON.parse(e.params)
  const query = e.query.replace(/(\?)/g, () => params.shift());
  console.log("Query: " + query);
});

// generateData({ users: 100, histories: 5000 });
// generateData({ playedGames:5 });

// await createGames();
// await createUsers(1);
// await createPlayedGames(2000)