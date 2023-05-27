import { createStore } from "solid-js/store";
import { SolidApexCharts } from "solid-apexcharts";
import { getTitle, responsive } from "./chart.options";
import { createEffect } from "solid-js";

type ApexChartProps = Parameters<typeof SolidApexCharts>[0];
type ApexChartOptions = ApexChartProps["options"];
type ApexChartSeries = ApexChartProps["series"];

type Props = {
  title: string;
  labels?: string[];
  data: API.LastConnexion;
  colors?: string[] | string;
  bgColors?: string[];
  options?: ApexChartOptions;
};

export default function ColumnStacked100Chart(props: Props) {
  const [options] = createStore(
    Object.assign(
      {
        chart: {
          width: "100%",
          type: "bar",
          stacked: true,
          stackType: "normal",
        },
        title: getTitle(props.title),
        colors: props.bgColors,

        xaxis: {
          categories: ["Jours", "Mois", "Années"],
          labels: {
            style: {
              colors: props.colors,
            },
          },
        },
        fill: {
          opacity: 1,
        },
        yaxis: {
          show: true,
          showAlways: true,
          labels: {
            show: true,
            style: {
              colors: props.colors,
              fontSize: "12px",
              fontFamily: "Helvetica, Arial, sans-serif",
              fontWeight: 400,
            },
          },
        },
        legend: {
          fontSize: "16px",
          labels: {
            colors: props.colors,
          },
          fontFamily: "",
        },
        theme: {
          mode: "dark",
        },

        responsive,
      } satisfies ApexChartOptions,
      props.options
    )
  );
  const [series] = createStore<ApexChartSeries>(props.data);

  createEffect(() => {
    console.log(options);
    console.log(series);
  });

  return (
    <SolidApexCharts
      width="100%"
      type="bar"
      options={options}
      series={series}
    />
  );
}
