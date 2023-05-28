import { transposeArrays } from "~/utils/methodes/array";
import { setMonth } from "~/utils/methodes/date";
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

/**
 * @returns [free,premium]
 */
async function getConnexionsBetween(from: Date, to = new Date()) {
  const res = await prisma.user.groupBy({
    by: ["premium"],
    _count: {
      id: true,
    },
    where: {
      lastConnexion: {
        gt: from,
        lte: to,
      },
    },
  });

  return res.map((item) => item._count.id);
}

export async function getActives() {
  const actives = await Promise.all([
    getConnexionsBetween(setMonth(-1)),
    getConnexionsBetween(setMonth(-3)),
    getConnexionsBetween(setMonth(-6)),
    getConnexionsBetween(setMonth(-12)),
  ]);
  const [free, premium] = transposeArrays(actives);

  return [
    {
      name: "Gratuit",
      data: free,
    },
    {
      name: "Premium",
      data: premium,
    },
  ] satisfies Chart.ColumnData;
}

/**
 * @returns [free,premium]
 */
async function getConnexionsBefore(to = new Date()) {
  const res = await prisma.user.groupBy({
    by: ["premium"],
    _count: {
      id: true,
    },
    where: {
      lastConnexion: {
        lt: to,
      },
    },
  });

  return res.map((item) => item._count.id);
}

export async function getInactives() {
  const inactives = await Promise.all([
    getConnexionsBefore(setMonth(-1)),
    getConnexionsBefore(setMonth(-3)),
    getConnexionsBefore(setMonth(-6)),
    getConnexionsBefore(setMonth(-12)),
  ]);
  const [free, premium] = transposeArrays(inactives);

  return [
    {
      name: "Gratuit",
      data: free,
    },
    {
      name: "Premium",
      data: premium,
    },
  ] satisfies Chart.ColumnData;
}