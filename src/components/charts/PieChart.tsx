import { createStore } from "solid-js/store";
import { SolidApexCharts } from "solid-apexcharts";

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
    Object.assign(
      {
        chart: {
          width: "100%",
          type: "pie",
        },
        labels: props.labels,
        fill: {
          // Couleurs de fond dans le diagramme
          colors: props.bgColors,
        },
        dataLabels: {
          style: {
            // Couleurs des textes dans le diagramme
            colors: props.colors ?? ["white"],
          },
        },
        legend: {
          fontSize: "20",
          position: "bottom",
          labels: {
            // Couleurs des textes des légendes à coté
            colors: "white",
          },
        },

        responsive: [
          {
            breakpoint: 640,
            options: {
              chart: {
                height: 500,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      } satisfies ApexChartOptions,
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
