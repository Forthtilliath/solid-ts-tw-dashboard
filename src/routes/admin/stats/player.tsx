import { Show, createResource } from "solid-js";
import { ColumnStackedChart, RadarBasicChart } from "~/components/charts";

async function getNbConnectedPlayers() {
  // return {
  //   lundi: 45,
  //   mardi: 43,
  //   mercredi: 80,
  //   jeudi: 50,
  //   vendredi: 62,
  //   samedi: 102,
  //   dimanche: 124,
  // };
  const res = await fetch("http://localhost:3000/api/player?q=connected");
  return res.json();
}

async function getLastConnexions() {
  const res = await fetch("http://localhost:3000/api/player?q=lastconnexions");
  return res.json();
}

export default function PlayerStats() {
  const [dataNbConnectedPlayers] = createResource<Record<string, number>>(
    getNbConnectedPlayers
  );
  // const [dataLastConnexions] =
  //   createResource<Chart.ColumnData>(getLastConnexions);

  return (
    <div class="grid justify-center grid-cols-[repeat(auto-fit,_minmax(500px,_600px))] grid-flow-row gap-4 p-2">
      <Show when={dataNbConnectedPlayers()} fallback={<p>Loading...</p>}>
        {(connectedPlayers) => (
          <RadarBasicChart
            title="Nombre moyen de joueurs connectés"
            labels={Object.keys(connectedPlayers())}
            data={[{ name: "", data: Object.values(connectedPlayers()) }]}
          />
        )}
      </Show>
      {/* <Show when={dataLastConnexions()} fallback={<p>Loading...</p>}>
        {(lastConnexions) => (
          <ColumnStackedChart
            title="Dernières connexions"
            labels={["Jours", "Mois", "Années"]}
            data={lastConnexions()}
            colors={"white"}
            stackType="100%"
          />
        )}
      </Show> */}

      {/* PIE : Gender */}

      {/* BAR : Ages */}
    </div>
  );
}
