import { Match, Switch } from "solid-js";
import {
  AiFillDollarCircle,
  FaSolidArrowTrendDown,
  FaSolidArrowTrendUp,
  FaSolidUserGroup,
  VsGraph,
} from "../Icons";

type Props = {
  label: string;
  value: number | string;
  growth: number;
  submsg?: string;
  icon?: "graph" | "dollar" | "user";
  bgIcon?: string;
};

export function DashboardCard(props: Props) {
  return (
    <div class="relative flex flex-col w-full break-words bg-white rounded shadow-lg">
      <div class="flex-auto p-4">
        <div class="flex flex-wrap">
          <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
            <h5 class="text-blueGray-400 uppercase font-bold text-xs">
              {props.label}
            </h5>
            <span class="font-semibold text-xl text-blueGray-700">
              {props.value}
            </span>
          </div>
          <div class="relative w-auto pl-4 flex-initial">
            <div
              class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full"
              classList={{ [props.bgIcon as string]: Boolean(props.bgIcon) }}
            >
              <Switch>
                <Match when={props.icon === "graph"}>
                  <VsGraph size="1.5em" />
                </Match>
                <Match when={props.icon === "dollar"}>
                  <AiFillDollarCircle size="1.5em" />
                </Match>
                <Match when={props.icon === "user"}>
                  <FaSolidUserGroup size="1.5em" />
                </Match>
              </Switch>
            </div>
          </div>
        </div>
        <p class="text-sm text-blueGray-400 mt-4 flex items-center">
          <span
            class=" mr-2 flex items-center gap-1"
            classList={{
              "text-red-500": props.growth < 0,
              "text-emerald-500": props.growth > 0,
            }}
          >
            <Switch>
              <Match when={props.growth < 0}>
                <FaSolidArrowTrendDown />
              </Match>
              <Match when={props.growth > 0}>
                <FaSolidArrowTrendUp />
              </Match>
            </Switch>
            {props.growth}%
          </span>
          <span class="whitespace-nowrap text-slate-500">{props.submsg}</span>
        </p>
      </div>
    </div>
  );
}
