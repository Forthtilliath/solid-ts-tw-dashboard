import { PrismaClient } from "@prisma/client";
import {
  createGames,
  createPlayedGames,
  createUsers,
  generateData,
} from "./generateData";

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
    // {
    //   emit: "stdout",
    //   level: "info",
    // },
    // {
    //   emit: "stdout",
    //   level: "warn",
    // },
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
      // getAllIds: async () => {
      //   return await prisma.user.findMany({ select: { id: true } });
      // },
      createMany: async (newUsers: DB.UserCreation[]) => {
        await prisma.$transaction([
          ...newUsers.map((user) => prisma.user.create({ data: user })),
        ]);
      },
      createManyIfNotExists: async (newUsers: DB.UserCreation[]) => {
        await prisma.$transaction([
          ...newUsers.map((user) =>
            prisma.user.upsert({
              where: { username: user.username },
              create: user,
              update: {},
            })
          ),
        ]);
      },
    },
    game: {
      // getAllIds: async () => {
      //   return await prisma.game.findMany({ select: { id: true } });
      // },
      createMany: async (newGames: DB.GameCreation[]) => {
        await prisma.$transaction([
          ...newGames.map((game) => prisma.game.create({ data: game })),
        ]);
      },
      createManyIfNotExists: async (newGames: DB.GameCreation[]) => {
        await prisma.$transaction([
          ...newGames.map((game) =>
            prisma.game.upsert({
              where: { name: game.name },
              update: {},
              create: game,
            })
          ),
        ]);
      },
    },
  },
});

prisma.$on("query", (e) => {
  const params = JSON.parse(e.params);
  const query = e.query.replace(/(\?)/g, () => params.shift());
  console.log("Query: " + query);
});

// generateData({ users: 100, histories: 5000 });
// generateData({ playedGames:5 });

await createGames();
// await createUsers(20);
// await createPlayedGames(2000)
