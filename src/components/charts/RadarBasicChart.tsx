import { createStore } from "solid-js/store";
import { SolidApexCharts } from "solid-apexcharts";
import { defaultOptions } from "./chart.options";
import { mergeDeep } from "~/utils/methodes/object";
import { createEffect } from "solid-js";
import { isString } from "~/utils/methodes/string";

type ApexChartProps = Parameters<typeof SolidApexCharts>[0];
type ApexChartOptions = ApexChartProps["options"];
type ApexChartSeries = ApexChartProps["series"];

type Props = {
  title: string;
  subTitle?: string;
  labels: string[];
  data: Chart.RadarData;
  colors?: string | string[];
  bgColors?: string[];
  options?: ApexChartOptions;
};

export default function RadarBasicChart(props: Props) {
  let arrColor = isString(props.colors)
    ? Array(props.labels.length).fill(props.colors)
    : props.colors;

  const [options] = createStore(
    mergeDeep(
      structuredClone(defaultOptions),
      {
        chart: {
          type: "radar",
          height: 500,
        },
        dataLabels: {
          enabled: true,
        },
        title: { text: props.title },
        subtitle: { text: props.subTitle },
        colors: props.bgColors,
        labels: props.labels,
        xaxis: {
          categories: props.labels,
          labels: { style: { colors: arrColor } },
        },
        fill: { opacity: 0.8 },
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
