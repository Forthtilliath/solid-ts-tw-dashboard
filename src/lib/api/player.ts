import { setDay } from "~/utils/methodes/date";
import { prisma } from "~/utils/prisma/db";

export async function getPlayerPremium() {
  const res = await prisma.user.groupBy({
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

async function getLastConnexion(start: number, end: number) {
  return await prisma.user
    .findMany({
      where: {
        lastConnexion: {
          gt: setDay(start),
          lte: setDay(end),
        },
      },
    })
    .then((r) => r.length);
}

export async function getLastConnexions() {
  const current = await Promise.all([
    getLastConnexion(-1, 0),
    getLastConnexion(-30, 0),
    getLastConnexion(-365, 0),
  ]);

  const past1 = await Promise.all([
    getLastConnexion(-1 * 2, -1 * 1),
    getLastConnexion(-30 * 2, -30 * 1),
    getLastConnexion(-365 * 2, -365 * 1),
  ]);

  const past2 = await Promise.all([
    getLastConnexion(-1 * 3, -1 * 2),
    getLastConnexion(-30 * 3, -30 * 2),
    getLastConnexion(-365 * 3, -365 * 2),
  ]);

  return [
    {
      name: "Courant",
      data: current,
    },
    {
      name: "1 avant",
      data: past1,
    },
    {
      name: "2 avant",
      data: past2,
    },
  ];
}

// export async function getLastConnexions() {
//   const day = [
//     { x: "D", y: await getLastConnexion(-1, 0) },
//     { x: "D-1", y: await getLastConnexion(-2, -1) },
//     { x: "D-2", y: await getLastConnexion(-3, -2) },
//   ];
//   const month = [
//     { x: "M", y: await getLastConnexion(-30, 0) },
//     { x: "M-1", y: await getLastConnexion(-60, -30) },
//     { x: "M-2", y: await getLastConnexion(-90, -60) },
//   ];
//   const year = [
//     { x: "Y", y: await getLastConnexion(-365, 0) },
//     { x: "Y-1", y: await getLastConnexion(-365 * 2, -365) },
//     { x: "Y-2", y: await getLastConnexion(-365 * 3, -365 * 2) },
//   ];

//   return [day, month, year].flat();
// }
