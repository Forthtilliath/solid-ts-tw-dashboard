import { ParentProps } from "solid-js";
import { Sidebar } from "~/components/sidebar/Sidebar";
import { BottomNavigation } from "~/components/bottom/BottomNavigation";

export function MainLayout(props: ParentProps) {
  return (
    <div class="min-h-screen grid grid-cols-1 grid-rows-[1fr_4rem] md:grid-cols-[16rem_1fr] md:grid-rows-1 gap-0 bg-slate-800">
      {/* Seulement pour tablet et pc */}
      <Sidebar />
      <main class="flex-grow">{props.children}</main>
      {/* Seulement pour mobile */}
      <BottomNavigation />
    </div>
  );
}
