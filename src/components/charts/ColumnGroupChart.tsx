import { createStore } from "solid-js/store";
import { SolidApexCharts } from "solid-apexcharts";
import { getTitle, responsive } from "./chart.options";
import { createEffect } from "solid-js";

type ApexChartProps = Parameters<typeof SolidApexCharts>[0];
type ApexChartOptions = ApexChartProps["options"];

type Props = {
  title: string;
  labels?: string[];
  data: API.LastConnexion;
  colors?: string[];
  bgColors?: string[];
  options?: ApexChartOptions;
};

export default function ColumnGroupChart(props: Props) {
  const [options] = createStore(
    Object.assign(
      {
        chart: {
          width: "100%",
          type: "bar",
        },
        title: getTitle(props.title),
        colors: props.bgColors,

        xaxis: {
          type: "category",
          labels: {
            formatter: function (val) {
              return "" + val;
            },
          },
          group: {
            style: {
              fontSize: "10px",
              fontWeight: 700,
              colors: "white",
            },
            groups: [
              { title: "Jour", cols: 3 },
              { title: "Mois", cols: 3 },
              { title: "Année", cols: 3 },
            ],
          },
        },
        yaxis: {
          show: true,
          showAlways: true,
          labels: {
            show: true,
            style: {
              colors: "white",
              fontSize: "12px",
              fontFamily: "Helvetica, Arial, sans-serif",
              fontWeight: 400,
            },
          },
        },
        tooltip: {
          x: {
            formatter: function (val) {
              return "" + val;
              //   return "Q" + dayjs(val).quarter() + " " + dayjs(val).format("YYYY")
            },
          },
        },

        responsive,
      } satisfies ApexChartOptions,
      props.options
    )
  );
  const [series] = createStore([{ data: props.data }]);

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
