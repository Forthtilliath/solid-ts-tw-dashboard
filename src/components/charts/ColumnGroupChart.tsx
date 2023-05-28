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
  data: API.LastConnexion;
  colors?: string | string[];
  bgColors?: string[];
  options?: ApexChartOptions;
};

export default function ColumnGroupChart(props: Props) {
  const [options] = createStore(
    mergeDeep(
      structuredClone(defaultOptions),
      {
        chart: { type: "bar" },
        title: { text: props.title },
        colors: props.bgColors,

        xaxis: {
          type: "category",
          labels: {
            formatter: (val) => "" + val,
          },
          group: {
            style: {
              fontSize: "10px",
              fontWeight: 700,
              colors: props.colors,
            },
            groups: [
              { title: "Jour", cols: 3 },
              { title: "Mois", cols: 3 },
              { title: "Année", cols: 3 },
            ],
          },
        },
        tooltip: {
          x: {
            formatter: (val) => "" + val,
          },
        },
      },
      props.options
    )
  );
  const [series] = createStore<ApexChartSeries>(props.data);

  return (
    <SolidApexCharts
      width="100%"
      type="bar"
      options={options}
      series={series}
    />
  );
}
