import { createStore } from "solid-js/store";
import { SolidApexCharts } from "solid-apexcharts";
import { mergeDeep } from "~/utils/methodes/object";
import { defaultOptions } from "./chart.options";

type ApexChartProps = Parameters<typeof SolidApexCharts>[0];
type ApexChartOptions = ApexChartProps["options"];

type Props = {
  title: string;
  labels: string[];
  data: number[];
  colors?: string[];
  bgColors?: string[];
  options?: ApexChartOptions;
};

export default function PieChart(props: Props) {
  const [options] = createStore(
    mergeDeep(
      structuredClone(defaultOptions),
      {
        chart: {
          type: "pie",
        },
        labels: props.labels,
        // Couleurs de fond dans le diagramme
        fill: { colors: props.bgColors },
        // markers: { colors: props.bgColors },
        // Change la couleur dans la legende
        colors: props.bgColors,
        // Couleurs des textes dans le diagramme
        dataLabels: {
          style: { colors: props.colors },
          formatter: (val: number) => val.toFixed(1) + "%",
        },
        // Couleurs des textes des légendes à coté
        legend: { labels: { colors: "white" } },
      },
      props.options
    )
  );
  const [series] = createStore(props.data);

  return (
    <div>
      <h3 class="text-2xl text-slate-200 text-center pt-2">{props.title}</h3>
      <SolidApexCharts
        width="100%"
        type="pie"
        options={options}
        series={series}
      />
    </div>
  );
}
