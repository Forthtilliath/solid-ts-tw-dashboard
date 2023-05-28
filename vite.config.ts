import solid from "solid-start/vite";
import { defineConfig } from "vite";

export default defineConfig({
  // plugins: [solid()],
  plugins: [solid({adapter: vercel()})],
});
