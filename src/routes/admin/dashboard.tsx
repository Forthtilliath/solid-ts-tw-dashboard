import { Show, createResource } from "solid-js";
import { DashboardCard } from "~/components/cards/DashboardCard";
import { ColumnStacked100Chart, PieChart } from "~/components/charts";
import { capitalize } from "~/utils/methodes/string";

async function getPlayerPremiums() {
  const res = await fetch("http://localhost:3000/api/player?q=premiums");
  return res.json();
}

async function getGamePremiums() {
  const res = await fetch("http://localhost:3000/api/game?q=premiums");
  return res.json();
}

async function getPlayerSatisfaction() {
  const res = await fetch("http://localhost:3000/api/player?q=satisfaction");
  return res.json();
}

export default function Dashboard() {
  const [dataPlayerPremiums] = createResource<API.Rate>(getPlayerPremiums);
  const [dataGamePremiums] = createResource<API.Rate>(getGamePremiums);
  const [dataSatisfaction] = createResource<API.Rate>(getPlayerSatisfaction);

  return (
    <div class="grid grid-cols-[repeat(auto-fit,_minmax(400px,_600px))] grid-flow-row gap-4 my-3">
      <div class="col-span-full flex flex-wrap">
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
      </div>

      <Show when={dataPlayerPremiums()} fallback={<p>Loading...</p>}>
        {(premiums) => (
          <PieChart
            title="Taux de joueurs premium"
            labels={Object.keys(premiums()).map(capitalize)}
            data={Object.values(premiums())}
          />
        )}
      </Show>

      <Show when={dataGamePremiums()} fallback={<p>Loading...</p>}>
        {(premiums) => (
          <PieChart
            title="Taux de jeux premium"
            labels={Object.keys(premiums()).map(capitalize)}
            data={Object.values(premiums())}
          />
        )}
      </Show>

      <Show when={dataSatisfaction()} fallback={<p>Loading...</p>}>
        {(satisfaction) => (
          <PieChart
            title="Taux de satisfaction"
            labels={Object.keys(satisfaction()).map(capitalize)}
            data={Object.values(satisfaction())}
          />
        )}
      </Show>

      {/* <Show when={dataLastConnexions()} fallback={<p>Loading...</p>}>
        {(lastConnexions) => (
          <ColumnStacked100Chart
            title="Part de premium sur actifs/inactifs"
            data={lastConnexions()}
            colors={"white"}
          />
        )}
      </Show> */}

      {/* BAR: Nombre de comptes actif (dernière connexion 1 mois) */}
      {/* Nombre de comptes inactifs (3mois, 6mois, 1mois) */}
      {/* Part premium/non premium */}

      {/* AREA BASIC : CA */}
    </div>
  );
}
