import { createStore } from "solid-js/store";
import { SolidApexCharts } from "solid-apexcharts";

type ApexChartProps = Parameters<typeof SolidApexCharts>[0];
type ApexChartOptions = ApexChartProps["options"];

type Props = {
  labels: string[];
  data: number[];
};

export default function PieChart(props: Props) {
  const [options] = createStore<ApexChartOptions>({
    chart: {
      width: 380,
      type: "pie",
    },
    labels: props.labels,

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
  const [series] = createStore(props.data);

  return (
    <SolidApexCharts
      width="100%"
      type="pie"
      options={options}
      series={series}
    />
  );
}
