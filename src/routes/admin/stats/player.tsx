import { Show, createResource } from "solid-js";
import { ColumnStacked100Chart, RadarBasicChart } from "~/components/charts";


function getNbConnectedPlayers() {
  return {
    lundi: 45,
    mardi: 43,
    mercredi: 80,
    jeudi: 50,
    vendredi: 62,
    samedi: 102,
    dimanche: 124,
  };
}

async function getLastConnexions() {
  const res = await fetch("http://localhost:3000/api/player?q=lastconnexion");
  return res.json();
}

export default function PlayerStats() {
  const [dataLastConnexions] =
    createResource<API.LastConnexion>(getLastConnexions);

  return (
    <div class="grid justify-center grid-cols-[repeat(auto-fit,_minmax(500px,_600px))] grid-flow-row gap-4 p-2">
      <Show when={getNbConnectedPlayers()} fallback={<p>Loading...</p>}>
        {(connectedPlayers) => (
          <RadarBasicChart
            title="Nombre moyen de joueurs connectés"
            labels={Object.keys(connectedPlayers())}
            data={Object.values(connectedPlayers())}
          />
        )}
      </Show>
      <Show when={dataLastConnexions()} fallback={<p>Loading...</p>}>
        {(lastConnexions) => (
          <ColumnStacked100Chart
            title="Dernières connexions"
            data={lastConnexions()}
            colors={"white"}
          />
        )}
      </Show>
    </div>
  );
}
