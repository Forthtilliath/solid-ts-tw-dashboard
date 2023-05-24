declare global {
  namespace API {
    // type Premium = {
    //   premium: boolean;
    //   count: number;
    // };
    type Premium = Record<"free" | "premium", number>;
  }
}

export {};
