import { fileURLToPath, URL } from "node:url";
import preact from "@preact/preset-vite";
import { defineConfig } from "vite";
import { services } from "./src/lib/services";

export default defineConfig({
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  build: { sourcemap: false },
  plugins: [
    preact({
      prerender: {
        enabled: true,
        renderTarget: "#app",
        // rotas que não são alcançadas por links na home
        additionalPrerenderRoutes: [
          "/404",
          "/new_project",
          ...services.map((s) => `/servicos/${s.slug}`),
        ],
      },
    }),
  ],
});
