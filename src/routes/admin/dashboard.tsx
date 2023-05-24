import { Show, createResource } from "solid-js";
import { PieChart } from "~/components/charts";

async function getPremiums() {
  const res = await fetch("http://localhost:3000/api/player?q=premiums");
  return res.json();
}

export default function Dashboard() {
  const [dataPremiums] = createResource<API.Premium>(getPremiums);

  return (
    <div class="max-w-sm">
      <Show when={dataPremiums()} fallback={<p>Loading...</p>}>
        {(premiums) => (
          <PieChart
            labels={Object.keys(premiums())}
            data={Object.values(premiums())}
          />
        )}
      </Show>
    </div>
  );
}
