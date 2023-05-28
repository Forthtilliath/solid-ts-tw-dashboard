import { SolidApexCharts } from "solid-apexcharts";

type ApexChartProps = Parameters<typeof SolidApexCharts>[0];
type ApexChartOptions = ApexChartProps["options"];
type ApexChartTitle = ApexChartOptions["title"];

export const defaultOptions = {
  responsive: [
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
  ],
  chart: {
    width: "100%",
  },
  title: {
    align: "center",
    style: {
      fontSize: "24px",
      fontWeight: "bold",
      fontFamily: undefined,
      color: "#e2e8f0",
    },
  },
  subtitle: {
    align: "center",
    style: {
      fontSize: "20px",
      fontFamily: undefined,
      color: "#e2e8f0",
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
        fontSize: "12px",
        fontFamily: "Helvetica, Arial, sans-serif",
        fontWeight: 400,
      },
    },
  },
  legend: {
    fontSize: "16px",
    fontFamily: "",
    position: "bottom",
  },

  theme: {
    palette: "palette2",
  } as ApexChartOptions,
};

// https://apexcharts.com/docs/options/theme/
