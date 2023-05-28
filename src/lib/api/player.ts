import { prisma } from "~/utils/prisma/db";

export async function getCountPremium(value = true) {
  return prisma.user.count({
    where: {
      premium: value,
    },
  });
}

export async function getCountConnexionFrom(from: Date, isPremium: boolean) {
  return prisma.user.count({
    where: {
      premium: isPremium,
      lastConnexion: {
        gt: from,
      },
    },
  });
}

export async function getCountConnexionTo(to: Date, isPremium: boolean) {
  return prisma.user.count({
    where: {
      premium: isPremium,
      lastConnexion: {
        lt: to,
      },
    },
  });
}