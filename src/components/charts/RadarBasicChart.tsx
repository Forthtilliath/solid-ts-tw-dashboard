import { createStore } from "solid-js/store";
import { SolidApexCharts } from "solid-apexcharts";
import { defaultOptions } from "./chart.options";
import { mergeDeep } from "~/utils/methodes/object";
import { createEffect } from "solid-js";

type ApexChartProps = Parameters<typeof SolidApexCharts>[0];
type ApexChartOptions = ApexChartProps["options"];
type ApexChartSeries = ApexChartProps["series"];

type Props = {
  title: string;
  labels: string[];
  data: Chart.RadarData;
  colors?: string[];
  bgColors?: string[];
  options?: ApexChartOptions;
};

export default function RadarBasicChart(props: Props) {
  const [options] = createStore(
    mergeDeep(
      structuredClone(defaultOptions),
      {
        chart: {
          type: "radar",
        },
        dataLabels: {
          enabled: true,
        },
        title: { text: props.title },
        colors: props.bgColors,
        labels: props.labels,
        xaxis: { categories: props.labels },
        fill: { opacity: 0.8 },
        yaxis: {
          labels: { style: { colors: props.colors } },
        },
      },
      props.options
    )
  );
  // const [series] = createStore<ApexChartSeries>([{ data: props.data }]);
  const [series] = createStore<ApexChartSeries>(props.data);

  createEffect(() => console.log(options));

  return (
    <SolidApexCharts
      width="100%"
      type="radar"
      options={options}
      series={series}
    />
  );
}
