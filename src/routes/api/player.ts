import { APIEvent, json } from "solid-start/api";
import * as player from "~/lib/api/player";
import { getSearchParam } from "~/utils/methodes/string";

export async function GET({ request }: APIEvent) {
  const params = getSearchParam(request.url, "q");
  switch (params) {
    case "premiums": {
      const premiums = await player.getPlayerPremium();
      return json(premiums);
    }
    case "lastconnexion": {
      const lastconnexion = await player.getLastConnexions();
      return json(lastconnexion);
    }
    case "satisfaction": {
      return json({
        satisfait: 1831,
        insatisfait: 102,
      });
    }
    default:
      return json({ error: "Not found" });
  }
}
