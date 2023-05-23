import { BsDoorOpenFill } from "../Icons";

export function SignoutButton() {
  return (
    <a
      class="bg-gray-800 flex h-16 hover:bg-gray-700 hover:text-gray-300 items-center justify-center mt-auto w-full"
      href="#"
    >
      <BsDoorOpenFill size={"2em"} />
      <span class="ml-2 text-sm font-medium">Se déconnecter</span>
    </a>
  );
}
