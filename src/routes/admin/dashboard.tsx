import { Show, createResource } from "solid-js";
import { PieChart } from "~/components/charts";

async function getPremiums() {
  const res = await fetch("http://localhost:3000/api/player?q=premiums");
  return res.json();
}

export default function Dashboard() {
  const [dataPremiums] = createResource<API.Premium>(getPremiums);

  return (
    <div class="grid grid-cols-[repeat(auto-fit,_minmax(400px,_600px))] grid-flow-row gap-4 border-4 border-red-600">
      <Show when={dataPremiums()} fallback={<p>Loading...</p>}>
        {(premiums) => (
          <PieChart
            title="Taux de joueurs premium"
            labels={Object.keys(premiums())}
            data={Object.values(premiums())}
          />
        )}
      </Show>
    </div>
  );
}
