import { getLastConnexions } from "~/lib/api/player";

declare global {
  namespace API {
    // type Premium = {
    //   premium: boolean;
    //   count: number;
    // };
    type Rate<T extends string = string> = Record<T, number>;
    
    type LastConnexion = Awaited<ReturnType<typeof getLastConnexions>>;
  }
}

export {};
