import { Show, createResource } from "solid-js";
import {
  PieChart,
  RadarBasicChart,
} from "~/components/charts";
import { capitalize } from "~/utils/methodes/string";

async function getConnected() {
  const res = await fetch("http://localhost:3000/api/player?q=connected");
  return res.json();
}

async function getGender() {
  const res = await fetch("http://localhost:3000/api/player?q=gender");
  return res.json();
}

export default function PlayerStats() {
  const [dataConnected] = createResource<Record<string, number>>(getConnected);
  const [dataGender] = createResource<Record<string, number>>(getGender);

  return (
    <div class="grid justify-center grid-cols-[repeat(auto-fit,_minmax(500px,_600px))] grid-flow-row gap-4 p-2">
      <Show when={dataConnected()} fallback={<p>Loading...</p>}>
        {(connected) => (
          <RadarBasicChart
            title="Moyenne de joueurs connectés"
            subTitle="En fonction du jour de la semaine"
            labels={Object.keys(connected()).map(capitalize)}
            colors={"white"}
            bgColors={["#6633ff80"]}
            strokeColors={["#6633ff"]}
            polygonColors={["#111827", "#1e293b"]}
            data={[{ name: "", data: Object.values(connected()) }]}
          />
        )}
      </Show>

      <Show when={dataGender()} fallback={<p>Loading...</p>}>
        {(satisfaction) => (
          <PieChart
            title="Répartition par sexe"
            labels={Object.keys(satisfaction()).map(capitalize)}
            data={Object.values(satisfaction())}
            colors={["white"]}
            bgColors={["#0038a8", "#d60270"]}
            options={{
              chart: { type: "donut" },
            }}
          />
        )}
      </Show>

      {/* BAR : Ages */}
    </div>
  );
}
