import { mostPlayed, mostPopular } from "~/lib/api/game";

declare global {
  namespace API {
    type Rate<T extends string = string> = Record<T, number>;
    type FreePremium<T> = Record<"free" | "premium", T>;

    type MostPlayed = Awaited<ReturnType<typeof mostPlayed>>;
    type MostPopular = Awaited<ReturnType<typeof mostPopular>>;
  }
}

export {};
