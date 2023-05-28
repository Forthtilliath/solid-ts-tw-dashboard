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
  colors?: string;
  bgColors?: string[];
  options?: ApexChartOptions;
};

export default function ColumnChart(props: Props) {
  const [options] = createStore(
    mergeDeep(
      structuredClone(defaultOptions),
      {
        chart: { type: "bar" },
        title: { text: props.title },
        colors: props.bgColors,
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
  const [series] = createStore<ApexChartSeries>([{ data: props.data }]);

  return (
    <SolidApexCharts
      width="100%"
      type="bar"
      options={options}
      series={series}
    />
  );
}
