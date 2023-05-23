import IoGameControllerSharp from "../Icons";
import { NavItem } from "./NavItem";

export function Navigation() {
  return (
    <nav class="flex-grow">
      <ul class="flex flex-col gap-2 p-3 text-gray-200">
        <NavItem
          label="Dashboard"
          path="/admin/dashboard"
          icon={<IoGameControllerSharp size={"1.5em"} />}
        />
        <NavItem
          label="Liste des jeux"
          path="/"
          icon={<IoGameControllerSharp size={"1.5em"} />}
        />
        <NavItem
          label="About"
          path="/about"
          icon={<IoGameControllerSharp size={"1.5em"} />}
        />
      </ul>
    </nav>
  );
}
