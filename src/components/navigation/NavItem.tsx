import { Accessor, JSXElement, Show } from "solid-js";
import { A, useLocation } from "solid-start";

type Props = {
  label: string;
  path: string;
  icon?: JSXElement;
};

export function NavItem(props: Props) {
  const location = useLocation();
  const active = () => props.path == location.pathname;

  return (
    <a
      class="flex items-center w-full h-12 px-3 mt-2 rounded "
      classList={{
        "hover:bg-gray-700 hover:text-gray-300": !active(),
        "text-gray-200 bg-gray-700": active(),
      }}
      href={props.path}
    >
      {props.icon}
      <span class="ml-2 text-sm font-medium">{props.label}</span>
    </a>
  );
}
