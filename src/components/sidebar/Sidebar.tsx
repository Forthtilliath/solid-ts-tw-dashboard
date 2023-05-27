import { Navigation } from ".";
import { Logo } from "./Logo";
import { SignoutButton } from "./SignoutButton";

export function Sidebar() {
  return (
    <aside class="hidden md:flex flex-col items-center w-full h-full overflow-hidden text-gray-400 bg-gray-900 rounded">
      <div class="flex justify-between items-center p-4">
        <Logo />
      </div>
      <Navigation />

      <SignoutButton />
    </aside>
  );
}
