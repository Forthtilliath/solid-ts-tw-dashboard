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
    // case "lastconnexions": {
    //   const lastconnexion = await player.getLastConnexions();
    //   return json(lastconnexion);
    // }
    case "actives": {
      const actives = await player.getActives();
      return json(actives);
    }
    case "inactives": {
      const inactives = await player.getInactives();
      return json(inactives);
    }
    case "connected": {
      return json({
        lundi: 45,
        mardi: 43,
        mercredi: 80,
        jeudi: 50,
        vendredi: 62,
        samedi: 102,
        dimanche: 124,
      });
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
