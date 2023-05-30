import { prisma } from "~/utils/prisma/db";

export async function getGamePremium() {
  const res = await prisma.game.groupBy({
    by: ["premium"],
    _count: {
      id: true,
    },
  });

  const label = (premium: boolean) => (premium ? "premium" : "gratuit");

  return res.reduce(
    (obj, { premium, _count }) =>
      Object.assign(obj, { [label(premium)]: _count.id }),
    {}
  );
}

export async function countPremiums(isPremium = true) {
  return prisma.game.count({
    where: {
      premium: isPremium,
    },
  });
}

export async function mostPopular(numberOfResult: number) {
  return await prisma.game.findMany({
    take: numberOfResult,
    orderBy: {
      popularity: "desc",
    },
    select: {
      name: true,
      popularity: true,
    },
  });
}

export async function mostPlayed(numberOfResult: number, isPremium: boolean) {
  return await prisma.game.findMany({
    take: numberOfResult,
    orderBy: {
      playedList: {
        _count: "desc",
      },
    },
    select: {
      name: true,
      _count: true,
    },
    where: {
      premium: isPremium,
    },
  });
}
