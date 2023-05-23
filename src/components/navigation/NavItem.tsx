import { JSXElement } from "solid-js";
import { A, useLocation } from "solid-start";

type Props = {
  label: string;
  path: string;
  icon?: JSXElement;
};

export function NavItem(props: Props) {
  const location = useLocation();
  const active = (path: string) =>
    path == location.pathname
      ? "border-sky-600"
      : "border-transparent hover:border-sky-600";

  return (
    <li class={`border-b-2 ${active(props.path)} mx-1.5 sm:mx-6`}>
      <A href={props.path} class="flex items-center gap-2">
        {props.icon} {props.label}
      </A>
    </li>
  );
}
