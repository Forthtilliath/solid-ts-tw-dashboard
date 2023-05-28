import { Show } from "solid-js";
import { DashboardCard } from "~/components/cards/DashboardCard";
import { ColumnStackedChart, PieChart } from "~/components/charts";
import { createResourceAPI } from "~/utils/hooks/createResourceAPI";
import { capitalize } from "~/utils/methodes/string";

export default function Dashboard() {
  const [dataPlayerPremiums] = createResourceAPI<API.Rate>(
    "http://localhost:3000/api/player?q=premiums"
  );
  const [dataGamePremiums] = createResourceAPI<API.Rate>(
    "http://localhost:3000/api/game?q=premiums"
  );
  const [dataSatisfaction] = createResourceAPI<API.Rate>(
    "http://localhost:3000/api/player?q=satisfaction"
  );
  const [dataActive] = createResourceAPI<Chart.ColumnData>(
    "http://localhost:3000/api/player?q=actives"
  );
  const [dataInactive] = createResourceAPI<Chart.ColumnData>(
    "http://localhost:3000/api/player?q=inactives"
  );

  return (
    <>
      {/* <div class="flex flex-wrap justify-center gap-2 my-3 max-w-6xl"> */}
      <div class="grid justify-center grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] grid-flow-row gap-4 max-w-7xl mx-auto">
        <DashboardCard
          label="Nombre total de visites"
          value="15.1M"
          growth={-5.77}
          submsg="Par rapport au mois dernier"
          icon="graph"
          bgIcon="bg-cyan-500"
        />
        <DashboardCard
          label="Revenu annuel"
          value="4.7M"
          growth={7.31}
          submsg="Par rapport à l'année dernière"
          icon="dollar"
          bgIcon="bg-green-500"
        />
        <DashboardCard
          label="Nouveau comptes"
          value="13"
          growth={8.33}
          submsg="Par rapport à hier"
          icon="user"
          bgIcon="bg-red-500"
        />
      </div>

      <div class="grid justify-center grid-cols-[repeat(auto-fit,_minmax(500px,_600px))] grid-flow-row gap-4 max-w-7xl mx-auto mt-5">
        <Show when={dataPlayerPremiums()} fallback={<p>Loading...</p>}>
          {(premiums) => (
            <PieChart
              title="Taux de joueurs premium"
              labels={Object.keys(premiums()).map(capitalize)}
              data={Object.values(premiums())}
              colors={["white"]}
            />
          )}
        </Show>

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

        <Show when={dataSatisfaction()} fallback={<p>Loading...</p>}>
          {(satisfaction) => (
            <PieChart
              title="Taux de satisfaction"
              labels={Object.keys(satisfaction()).map(capitalize)}
              data={Object.values(satisfaction())}
              colors={["white"]}
              options={{ chart: { type: "donut" } }}
            />
          )}
        </Show>

        <div></div>

        {/* Line Charts > Line with Data Labels ??? */}
        <Show when={dataActive()} fallback={<p>Loading...</p>}>
          {(active) => (
            <ColumnStackedChart
              title="Part des joueurs gratuit/premium"
              subTitle="Parmis les actifs de moins de..."
              labels={["1 mois", "3 mois", "6 mois", "1 an"]}
              data={active()}
              colors={"white"}
              stackType="100%"
            />
          )}
        </Show>

        <Show when={dataInactive()} fallback={<p>Loading...</p>}>
          {(inactive) => (
            <ColumnStackedChart
              title="Part des joueurs gratuit/premium"
              subTitle="Parmis les inactifs de plus de..."
              labels={["1 mois", "3 mois", "6 mois", "1 an"]}
              data={inactive()}
              colors={"white"}
              stackType="100%"
            />
          )}
        </Show>
      </div>
    </>
  );
}
