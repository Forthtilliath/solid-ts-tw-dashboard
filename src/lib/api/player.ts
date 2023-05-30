import { prisma } from "~/utils/prisma/db";

export async function countPremiums(isPremium = true) {
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

export async function countConnectionsFrom(from: Date, isPremium: boolean) {
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

export async function countConnectionsTo(to: Date, isPremium: boolean) {
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
