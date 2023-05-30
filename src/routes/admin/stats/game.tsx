import { Show } from "solid-js";
import { LineBasicChart, PieChart } from "~/components/charts";
import { mostPlayed } from "~/lib/api/game";
import { createResourceAPI } from "~/utils/hooks/createResourceAPI";
import { capitalize } from "~/utils/methodes/string";

export default function GameStats() {
  const [dataGamePremiums] = createResourceAPI<API.Rate>(
    "http://localhost:3000/api/game?q=premiums"
  );
  const [dataPopularGames] = createResourceAPI<API.MostPopular>(
    "http://localhost:3000/api/game?q=most-popular"
  );
  const [dataPlayedGames] = createResourceAPI<API.FreePremium<API.MostPlayed>>(
    "http://localhost:3000/api/game?q=most-played"
  );

  return (
    <div class="grid justify-center grid-cols-[repeat(auto-fit,_minmax(500px,_600px))] grid-flow-row gap-4 p-2">
      <Show when={dataGamePremiums()} fallback={<p>Loading...</p>}>
        {(premiums) => (
          <PieChart
            title="Taux de jeux premium"
            labels={Object.keys(premiums()).map(capitalize)}
            data={Object.values(premiums())}
            colors={["white"]}
          />
        )}
      </Show>

      <Show when={dataPopularGames()} fallback={<p>Loading...</p>}>
        {(popularGames) => (
          <LineBasicChart
            title="Jeux les plus populaires"
            labels={popularGames().map((g) => g.name)}
            data={popularGames().map((g) => g.popularity)}
            colors={"white"}
            bgColors={["#ffffff30", "transparent"]}
            strokeColors={["#FF1654"]}
          />
        )}
      </Show>

      {/* Line jeux free/premium les plus joués */}

      <Show when={dataPlayedGames()} fallback={<p>Loading...</p>}>
        {(playedGames) => (
          <LineBasicChart
            title="Jeux gratuit les plus joués"
            labels={playedGames().free.map((g) => g.name)}
            data={playedGames().free.map((g) => g._count.playedList)}
            colors={"white"}
            bgColors={["#ffffff30", "transparent"]}
            strokeColors={["#3f51b5"]}
          />
        )}
      </Show>

      <Show when={dataPlayedGames()} fallback={<p>Loading...</p>}>
        {(playedGames) => (
          <LineBasicChart
            title="Jeux payant les plus joués"
            labels={playedGames().premium.map((g) => g.name)}
            data={playedGames().premium.map((g) => g._count.playedList)}
            colors={"white"}
            bgColors={["#ffffff30", "transparent"]}
            strokeColors={["#007ab3"]}
          />
        )}
      </Show>
    </div>
  );
}
