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
