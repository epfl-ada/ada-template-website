

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  base: "/ada-template-website/",
  plugins: [react()],
});


