import { createStore } from "solid-js/store";
import { SolidApexCharts } from "solid-apexcharts";
import { defaultOptions } from "./chart.options";
import { createEffect } from "solid-js";
import { mergeDeep } from "~/utils/methodes/object";

type ApexChartProps = Parameters<typeof SolidApexCharts>[0];
type ApexChartOptions = ApexChartProps["options"];
type ApexChartSeries = ApexChartProps["series"];

type Props = {
  title: string;
  subTitle?: string;
  labels: string[];
  data: Chart.ColumnData;
  colors?: string[] | string;
  bgColors?: string[];
  options?: ApexChartOptions;
  stackType?: "normal" | "100%";
};

export default function ColumnStackedChart(props: Props) {
  const [options] = createStore(
    mergeDeep(
      structuredClone(defaultOptions),
      {
        chart: {
          type: "bar",
          stacked: true,
          stackType: props.stackType,
        },
        title: { text: props.title },
        subtitle: { text: props.subTitle },
        colors: props.bgColors,

        xaxis: {
          categories: props.labels,
          labels: { style: { colors: props.colors } },
        },
        yaxis: {
          labels: { style: { colors: props.colors } },
        },
        legend: {
          labels: { colors: props.colors },
        },
      },
      props.options
    )
  );
  const [series] = createStore<ApexChartSeries>(props.data);

  createEffect(() => console.log(options));

  return (
    <SolidApexCharts
      width="100%"
      type="bar"
      options={options}
      series={series}
    />
  );
}
