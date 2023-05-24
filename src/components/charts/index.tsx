import { unstable_clientOnly } from "solid-start";

// window is not defined
export const SolidApexCharts = unstable_clientOnly(
  () => import("~/components/charts/Chart")
);

export const PieChart = unstable_clientOnly(
  () => import("~/components/charts/PieChart")
);
