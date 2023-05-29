import { Prisma } from "@prisma/client";

declare global {
  namespace DB {
    // Schemas
    type ModalName = Lowercase<Prisma.ModelName>;
    type PlayedGame = Prisma.PlayedGameGetPayload<{}>;
    type Gamescore = Prisma.GamescoreGetPayload<true>;

    // Creations
    type UserCreation = Prisma.UserCreateInput;
    type GameCreation = Prisma.GameCreateInput;
    type PlayedGameCreation = Prisma.PlayedGameCreateInput;
    type GamescoreCreation = Prisma.GamescoreCreateInput;

    type PremiumCreation = {
      subscriptionAt: Date;
      duration: number;
      subscriptionEndAt: Date;
    };
  }
}

export {};
