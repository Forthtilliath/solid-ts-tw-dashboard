import { Prisma } from "@prisma/client";

declare global {
  namespace DB {
    type ModalName = Lowercase<Prisma.ModelName>;
    type Gameplay = Prisma.GameplayGetPayload<{}>;
    type Gameplay2 = Prisma.GameplayGetPayload<{
      include: { scoreList: true };
    }>;
    type Gamescore = Prisma.GamescoreGetPayload<true>;

    type UserCreation = Prisma.UserCreateInput;

    type PremiumCreation = {
      subscriptionAt: Date;
      duration: number;
      subscriptionEndAt: Date;
    };
  }
}

export {};
