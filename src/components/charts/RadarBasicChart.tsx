import { createStore } from "solid-js/store";
import { SolidApexCharts } from "solid-apexcharts";
import { getTitle, responsive } from "./options";

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

export default function RadarBasicChart(props: Props) {
  const [options] = createStore(
    Object.assign(
      {
        chart: {
          width: "100%",
          type: "radar",
        },
        dataLabels: {
          enabled: true,
        },
        title: getTitle(props.title),
        colors: props.bgColors,
        labels: props.labels,
        xaxis: {
          categories: props.labels,
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

        responsive,
      } satisfies ApexChartOptions,
      props.options
    )
  );
  const [series] = createStore([{ data: props.data }]);

  return (
    <SolidApexCharts
      width="100%"
      type="radar"
      options={options}
      series={series}
    />
  );
}
