import { Show } from "solid-js";
import { RadarBasicChart } from "~/components/charts";

function getNbConnectedPlayers() {
  return {
    lundi: 45,
    mardi: 43,
    mercredi: 80,
    jeudi: 50,
    vendredi: 62,
    samedi: 102,
    dimanche: 124
  };
}

export default function PlayerStats() {
  return (
    <div class="grid grid-cols-[repeat(auto-fit,_minmax(500px,_600px))] grid-flow-row gap-4">
      <Show when={getNbConnectedPlayers()} fallback={<p>Loading...</p>}>
        {(connectedPlayers) => (
          <RadarBasicChart
            title="Nombre de joueurs connectés"
            labels={Object.keys(connectedPlayers())}
            data={Object.values(connectedPlayers())}
          />
        )}
      </Show>
    </div>
  );
}
