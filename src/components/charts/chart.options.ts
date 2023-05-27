import { SolidApexCharts } from "solid-apexcharts";

type ApexChartProps = Parameters<typeof SolidApexCharts>[0];
type ApexChartOptions = ApexChartProps["options"];
type ApexChartTitle = ApexChartOptions["title"];

export function getTitle(title: string) {
  return {
    text: title,
    align: "center",
    style: {
      fontSize: "24px",
      fontWeight: "bold",
      fontFamily: undefined,
      color: "#e2e8f0",
    },
  } satisfies ApexChartTitle;
}

export const responsive = [
  {
    breakpoint: 640,
    options: {
      chart: {
        height: 500,
      },
      legend: {
        position: "bottom",
      },
    },
  },
];

export const defaultOptions = {
  ...responsive,

  theme: {
    mode: "dark",

  },
};

// https://apexcharts.com/docs/options/theme/
