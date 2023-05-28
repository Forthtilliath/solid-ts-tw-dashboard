import { unstable_clientOnly } from "solid-start";

// !window is not defined

export const PieChart = unstable_clientOnly(
  () => import("~/components/charts/PieChart")
);

export const RadarBasicChart = unstable_clientOnly(
  () => import("~/components/charts/RadarBasicChart")
);

export const ColumnGroupChart = unstable_clientOnly(
  () => import("~/components/charts/ColumnGroupChart")
);

export const ColumnStackedChart = unstable_clientOnly(
  () => import("~/components/charts/ColumnStackedChart")
);
