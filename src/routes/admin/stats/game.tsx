import { Show } from "solid-js";
import { LineBasicChart, PieChart } from "~/components/charts";
import { createResourceAPI } from "~/utils/hooks/createResourceAPI";
import { capitalize } from "~/utils/methodes/string";

export default function GameStats() {
  const [dataGamePremiums] = createResourceAPI<API.Rate>(
    "http://localhost:3000/api/game?q=premiums"
  );
  const [dataPopularGames] = createResourceAPI<
    Pick<DB.Game, "name" | "popularity">[]
  >("http://localhost:3000/api/game?q=most-popular");

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
            labels={popularGames().map(g => g.name)}
            data={popularGames().map(g => g.popularity)}
            colors={"white"}
            bgColors={['#ffffff30', 'transparent']}
            strokeColors={["red"]}
          />
        )}
      </Show>
    </div>
  );
}
