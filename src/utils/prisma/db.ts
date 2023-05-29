import { PrismaClient } from "@prisma/client";
import { createGames, createUsers, generateData } from "./generateData";

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
        return await prisma.user.findMany({ select: { id: true } });
      },
    },
  },
});

prisma.$on("query", (e) => {
  console.log("Query: " + e.query);
  console.log("Params: " + e.params);
  console.log("Duration: " + e.duration + "ms");
});

// generateData({ users: 100, histories: 5000 });
// generateData({ histories: 2500 });

// await createGames();
// await createUsers(1);
