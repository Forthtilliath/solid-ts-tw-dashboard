import { ParentProps } from "solid-js";
import { Sidebar } from "~/components/sidebar/Sidebar";
import { BottomNavigation } from "~/components/bottom/BottomNavigation";

export function MainLayout(props: ParentProps) {
  return (
    <div class="h-screen grid grid-cols-1 grid-rows-[1fr_4rem] sm:grid-cols-[16rem_1fr] sm:grid-rows-1 gap-0">
      {/* Seulement pour tablet et pc */}
      <Sidebar />
      <main class="flex-grow">{props.children}</main>
      {/* Seulement pour mobile */}
      <BottomNavigation />
    </div>
  );
}
