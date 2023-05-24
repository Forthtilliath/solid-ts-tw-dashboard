import { prisma } from "~/utils/prisma/db";

export async function getPlayerPremium() {
  const res = await prisma.player.groupBy({
    by: ["premium"],
    _count: {
      id: true,
    },
  });

  const label = (premium: boolean) => (premium ? "premium" : "free");

  // return res.map(({ premium, _count }) => ({ premium, count: _count.id }));
  return res.reduce(
    (obj, { premium, _count }) =>
      Object.assign(obj, { [label(premium)]: _count.id }),
    {}
  );
}
