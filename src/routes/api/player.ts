import { APIEvent, json } from "solid-start/api";
import * as player from "~/lib/api/player";
import { setMonth } from "~/utils/methodes/date";
import { getSearchParam } from "~/utils/methodes/string";

export async function GET({ request }: APIEvent) {
  const params = getSearchParam(request.url, "q");
  switch (params) {
    case "premiums": {
      return json({
        free: await player.countPremiums(false),
        premium: await player.countPremiums(true),
      });
    }
    // case "lastconnexions": {
    //   const lastconnexion = await player.getLastConnexions();
    //   return json(lastconnexion);
    // }

    case "actives": {
      const premium = await Promise.all([
        player.countConnectionsFrom(setMonth(-1), true),
        player.countConnectionsFrom(setMonth(-3), true),
        player.countConnectionsFrom(setMonth(-6), true),
        player.countConnectionsFrom(setMonth(-12), true),
      ]);
      const free = await Promise.all([
        player.countConnectionsFrom(setMonth(-1), false),
        player.countConnectionsFrom(setMonth(-3), false),
        player.countConnectionsFrom(setMonth(-6), false),
        player.countConnectionsFrom(setMonth(-12), false),
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
        player.countConnectionsTo(setMonth(-1), true),
        player.countConnectionsTo(setMonth(-3), true),
        player.countConnectionsTo(setMonth(-6), true),
        player.countConnectionsTo(setMonth(-12), true),
      ]);
      const free = await Promise.all([
        player.countConnectionsTo(setMonth(-1), false),
        player.countConnectionsTo(setMonth(-3), false),
        player.countConnectionsTo(setMonth(-6), false),
        player.countConnectionsTo(setMonth(-12), false),
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

    case "gender": {
      return json({
        homme: 245,
        femme: 26,
      });
    }

    case "age": {
      return json({
        "18-24": Math.floor((26.85 * 500) / 100),
        "25-34": Math.floor((32.56 * 500) / 100),
        "35-44": Math.floor((18.3 * 500) / 100),
        "45-54": Math.floor((10.9 * 500) / 100),
        "55-64": Math.floor((7.03 * 500) / 100),
        "65+": Math.floor((4.36 * 500) / 100),
      });
    }

    default:
      return json({ error: "Not found" });
  }
}
