import logo from "~/assets/logo.webp";

export function Logo() {
  return (
    <a class="flex items-center w-full px-3 mt-3" href="/admin">
      <img class="w-8 h-8" src={logo} alt="logo" />
      <span class="ml-2 text-sm font-bold">Board Game Addiction</span>
    </a>
  );
}
