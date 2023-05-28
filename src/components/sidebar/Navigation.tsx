import {
  AiFillDashboard,
  FaSolidGamepad,
  FaSolidUser,
  FaSolidUserGroup,
  IoGameControllerSharp,
  IoNewspaperSharp,
  RiFinanceMoneyEuroBoxFill,
} from "~/components/Icons";
import { NavItem } from "./NavItem";

export function Navigation() {
  const size = "2em";
  return (
    <div class="w-full px-2">
      <div class="flex flex-col items-center w-full mt-3 border-t border-gray-700">
        <NavItem
          label="Dashboard"
          path="/admin/dashboard"
          icon={<AiFillDashboard size={size} />}
        />
      </div>

      {/* <div class="flex flex-col items-center w-full mt-3 border-t border-gray-700">
        <NavItem
          label="Gestion des actualités"
          path="/admin/management/news"
          icon={<IoNewspaperSharp size={size} />}
        />
        <NavItem
          label="Gestion des jeux"
          path="/admin/management/game"
          icon={<FaSolidGamepad size={size} />}
        />
        <NavItem
          label="Gestion des joueurs"
          path="/admin/management/player"
          icon={<FaSolidUser size={size} />}
        />
      </div> */}

      <div class="flex flex-col items-center w-full mt-3 border-t border-gray-700">
        <NavItem
          label="Stats des jeux"
          path="/admin/stats/game"
          icon={<IoGameControllerSharp size={size} />}
        />
        <NavItem
          label="Stats des joueurs"
          path="/admin/stats/player"
          icon={<FaSolidUserGroup size={size} />}
        />
        <NavItem
          label="Stats des revenus"
          path="/admin/stats/income"
          icon={<RiFinanceMoneyEuroBoxFill size={size} />}
        />
      </div>
    </div>
  );
}
