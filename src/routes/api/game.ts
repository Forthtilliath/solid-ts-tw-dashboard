import { APIEvent, json } from "solid-start/api";
import * as game from "~/lib/api/game";
import { getSearchParam } from "~/utils/methodes/string";

export async function GET({ request }: APIEvent) {
  const params = getSearchParam(request.url, "q");
  switch (params) {
    case "premiums": {
      return json({
        free: await game.countPremiums(false),
        premium: await game.countPremiums(true),
      });
    }
    case "most-popular": {
      const popular = (await game.mostPopular(10)).reverse();
      return json(popular);
    }
    // case "premiums": {
    //   const premiums = await game.getGamePremium();
    //   return json(premiums);
    // }
    default:
      return json({ error: "Not found" });
  }
}
