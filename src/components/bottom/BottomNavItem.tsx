import { JSXElement } from "solid-js";
import { useLocation } from "solid-start";

type Props = {
  label: string;
  path: string;
  icon?: JSXElement;
};

export function BottomNavItem(props: Props) {
  const location = useLocation();
  const active = () => props.path == location.pathname;

  return (
    <a
      href={props.path}
      class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-800 group"
      classList={{ "bg-gray-800": active() }}
    >
      {props.icon}
      <span
        class="text-sm text-gray-400 group-hover:text-blue-500"
        classList={{ "text-slate-100": active() }}
      >
        {props.label}
      </span>
    </a>
  );
}
