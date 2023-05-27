import { Prisma } from "@prisma/client";

declare global {
  namespace DB {
      type History = Prisma.HistoryGetPayload<object>;
      
      
  }
}

export {};
