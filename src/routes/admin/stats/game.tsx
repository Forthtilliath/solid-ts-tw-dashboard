import { Show } from "solid-js";
import { PieChart } from "~/components/charts";
import { createResourceAPI } from "~/utils/hooks/createResourceAPI";
import { capitalize } from "~/utils/methodes/string";

export default function GameStats() {
  const [dataGamePremiums] = createResourceAPI<API.Rate>(
    "http://localhost:3000/api/game?q=premiums"
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
    </div>
  );
}
