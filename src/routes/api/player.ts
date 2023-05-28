import { APIEvent, json } from "solid-start/api";
import * as player from "~/lib/api/player";
import { setMonth } from "~/utils/methodes/date";
import { getSearchParam } from "~/utils/methodes/string";

export async function GET({ request }: APIEvent) {
  const params = getSearchParam(request.url, "q");
  switch (params) {
    case "premiums": {
      return json({
        premium: await player.getCountPremium(true),
        free: await player.getCountPremium(false),
      });
    }
    // case "lastconnexions": {
    //   const lastconnexion = await player.getLastConnexions();
    //   return json(lastconnexion);
    // }

    case "actives": {
      const premium = await Promise.all([
        player.getCountConnexionFrom(setMonth(-1), true),
        player.getCountConnexionFrom(setMonth(-3), true),
        player.getCountConnexionFrom(setMonth(-6), true),
        player.getCountConnexionFrom(setMonth(-12), true),
      ]);
      const free = await Promise.all([
        player.getCountConnexionFrom(setMonth(-1), false),
        player.getCountConnexionFrom(setMonth(-3), false),
        player.getCountConnexionFrom(setMonth(-6), false),
        player.getCountConnexionFrom(setMonth(-12), false),
      ]);

      return json([
        {
          name: "Gratuit",
          data: free,
        },
        {
          name: "Premium",
          data: premium,
        },
      ]);
    }

    case "inactives": {
      const premium = await Promise.all([
        player.getCountConnexionTo(setMonth(-1), true),
        player.getCountConnexionTo(setMonth(-3), true),
        player.getCountConnexionTo(setMonth(-6), true),
        player.getCountConnexionTo(setMonth(-12), true),
      ]);
      const free = await Promise.all([
        player.getCountConnexionTo(setMonth(-1), false),
        player.getCountConnexionTo(setMonth(-3), false),
        player.getCountConnexionTo(setMonth(-6), false),
        player.getCountConnexionTo(setMonth(-12), false),
      ]);

      return json([
        {
          name: "Gratuit",
          data: free,
        },
        {
          name: "Premium",
          data: premium,
        },
      ]);
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
