import { defineConfig } from "astro/config";

import glsl from "vite-plugin-glsl";

// https://astro.build/config
export default defineConfig({
  compressHTML: false,
  server: {
    open: true,
  },
  vite: {
    plugins: [glsl()],
  },
  site: "https://haobinwang-2023.netlify.app",
});
