import { createSignal } from "solid-js";
import { Navigation } from "./navigation";
import { Logo } from "./navigation/Logo";

export function Sidebar() {
  return (
    <aside class="hidden sm:flex flex-col items-center w-full h-full overflow-hidden text-gray-400 bg-gray-900 rounded">
      <div class="flex justify-between items-center p-4">
        <Logo />
      </div>
      <Navigation />

      {/* <button class="shadow-xl mb-2 mx-2 text-slate-300">Se déconnecter</button> */}
      <a
        class="bg-gray-800 flex h-16 hover:bg-gray-700 hover:text-gray-300 items-center justify-center mt-auto w-full"
        href="#"
      >
        <svg
          class="w-6 h-6 stroke-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <span class="ml-2 text-sm font-medium">Account</span>
      </a>
    </aside>
  );
}
