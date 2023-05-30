import { createStore } from "solid-js/store";
import { SolidApexCharts } from "solid-apexcharts";
import { mergeDeep } from "~/utils/methodes/object";
import { defaultOptions } from "./chart.options";

type ApexChartProps = Parameters<typeof SolidApexCharts>[0];
type ApexChartOptions = ApexChartProps["options"];
type ApexChartSeries = ApexChartProps["series"];

type Props = {
  title: string;
  labels?: string[];
  data: number[];
  colors?: string | string[];
  bgColors?: string[];
  options?: ApexChartOptions;
  strokeColors?: string[];
};

export default function LineBasicChart(props: Props) {
  const [options] = createStore(
    mergeDeep(
      structuredClone(defaultOptions),
      {
        chart: {
          type: "line",
          height: 500,
          zoom: {
            enabled: false,
          },
        },
        stroke: {
          curve: "straight",
        },
        grid: {
          row: {
            colors: props.bgColors,
            opacity: 0.5,
          },
        },
        title: { text: props.title },
        colors: props.strokeColors,
        xaxis: {
          categories: props.labels,
          labels: { style: { colors: props.colors } },
        },
        yaxis: {
          labels: { style: { colors: props.colors } },
        },
      },
      props.options
    )
  );
  const [series] = createStore<ApexChartSeries>([
    { name: "", data: props.data },
  ]);

  return (
    <SolidApexCharts
      width="100%"
      type="line"
      options={options}
      series={series}
    />
  );
}
