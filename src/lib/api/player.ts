import { prisma } from "~/utils/prisma/db";

export async function getCountPremium(isPremium = true) {
  return prisma.user.count({
    where: {
      userPremium: {
        [isPremium ? "some" : "none"]: {
          subscriptionEndAt: {
            gt: new Date(),
          },
        },
      },
    },
  });
}

export async function getCountConnexionFrom(from: Date, isPremium: boolean) {
  return prisma.user.count({
    where: {
      userPremium: {
        [isPremium ? "some" : "none"]: {
          subscriptionEndAt: {
            gt: new Date(),
          },
        },
      },
      lastConnection: {
        gt: from,
      },
    },
  });
}

export async function getCountConnexionTo(to: Date, isPremium: boolean) {
  console.log("getCountConnexionTo", { to, isPremium });
  return prisma.user.count({
    where: {
      userPremium: {
        [isPremium ? "some" : "none"]: {
          subscriptionEndAt: {
            gt: new Date(),
          },
        },
      },
      lastConnection: {
        lt: to,
      },
    },
  });
}
