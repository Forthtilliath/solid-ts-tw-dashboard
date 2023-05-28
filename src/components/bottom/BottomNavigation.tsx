import {
  AiFillDashboard,
  FaSolidUserGroup,
  IoGameControllerSharp,
} from "../Icons";
import { BottomNavItem } from "./BottomNavItem";

export function BottomNavigation() {
  const size = "2em";
  return (
    <div class="block md:hidden w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
      <div class="grid h-full max-w-lg grid-cols-3 mx-auto font-medium">
        <BottomNavItem
          label="Dashboard"
          path="/admin/dashboard"
          icon={
            <AiFillDashboard
              size={size}
              class="text-slate-300 group-hover:text-slate-50"
            />
          }
        />
        <BottomNavItem
          label="Jeux"
          path="/admin/stats/game"
          icon={
            <IoGameControllerSharp
              size={size}
              class="text-slate-300 group-hover:text-slate-50"
            />
          }
        />
        <BottomNavItem
          label="Joueurs"
          path="/admin/stats/player"
          icon={
            <FaSolidUserGroup
              size={size}
              class="text-slate-300 group-hover:text-slate-50"
            />
          }
        />
      </div>
    </div>
  );
}
