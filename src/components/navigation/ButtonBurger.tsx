import { Accessor, Setter } from "solid-js";

type Props = {
  menuOpen: Accessor<boolean>;
  setMenuOpen: Setter<boolean>;
};

export function ButtonBurger(props: Props) {
  return (
    <button
      class="relative w-8 h-6 z-20"
      classList={{ open: props.menuOpen() }}
      type="button"
      aria-label={props.menuOpen() ? "Fermer le menu" : "Ouvrir le menu"}
      onClick={() => props.setMenuOpen(!props.menuOpen())}
    >
      <span
        class="absolute block w-full h-0.5 bg-white rounded-sm transition-all duration-300"
        classList={{
          "rotate-45 top-2.5": props.menuOpen(),
          "top-0": !props.menuOpen(),
        }}
      />
      <span
        class="absolute block w-full h-0.5 bg-white rounded-sm transition-all duration-300 top-2.5"
        classList={{ "opacity-0 translate-x-3": props.menuOpen() }}
      />
      <span
        class="absolute block w-full h-0.5 bg-white rounded-sm transition-all duration-300"
        classList={{
          "-rotate-45 top-2.5": props.menuOpen(),
          "top-5": !props.menuOpen(),
        }}
      />
    </button>
  );
}
