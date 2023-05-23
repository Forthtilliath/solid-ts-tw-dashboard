import { createStore } from "solid-js/store";
import { SolidApexCharts } from "solid-apexcharts";

type ApexChartProps = Parameters<typeof SolidApexCharts>[0];
type ApexChartOptions = ApexChartProps["options"];

export default function PremiumPlayers() {
  const [options] = createStore<ApexChartOptions>({
    chart: {
      width: 380,
      type: "pie",
    },
    labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],

    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  });
  const [series] = createStore([44, 55, 13, 43, 22]);

  return (
    <SolidApexCharts
      width="100%"
      type="pie"
      options={options}
      series={series}
    />
  );
}
