import { getLastConnexions } from "~/lib/api/player";

declare global {
  namespace API {
    // type Premium = {
    //   premium: boolean;
    //   count: number;
    // };
    type Rate<T extends string = string> = Record<T, number>;
    type Premium = Rate<"free" | "premium">;
    type Satisfaction = Rate<"satisfied" | "unsatisfied">;

    type LastConnexion = Awaited<ReturnType<typeof getLastConnexions>>;
    // type LastConnexion = { name:string, data:number[] }[];
    // type LastConnexion = { x: string; y: number }[];
  }
}

export {};
