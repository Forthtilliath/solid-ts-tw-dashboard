import { unstable_clientOnly } from "solid-start";

export const SolidApexCharts = unstable_clientOnly(
    () => import("~/components/charts/Chart")
  );