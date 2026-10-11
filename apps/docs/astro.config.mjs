import { fileURLToPath } from "node:url";
import starlight from "@astrojs/starlight";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import starlightThemeRapide from "starlight-theme-rapide";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "Unit Conversion",
      plugins: [starlightThemeRapide()],
      customCss: ["./src/styles/global.css"],
      expressiveCode: {
        // Look at ec.config.mjs instead
      },
      social: [{ icon: "github", label: "GitHub", href: "https://github.com/BlankRiser/unit-conversion" }],
      sidebar: [
        {
          label: "Overview",
          slug: "index",
        },
        {
          label: "Installation",
          slug: "installation",
        },
        {
          label: "API Reference",
          slug: "api-reference",
        },
        {
          label: "Playground",
          slug: "playground",
        },
        {
          label: "Conversions",
          autogenerate: { directory: "conversions" },
        },
      ],
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: ["@devhaven/unit-conversion"],
    },
    resolve: {
      alias: {
        "@devhaven/unit-conversion": fileURLToPath(
          new URL("../../packages/unit-conversion/src/index.ts", import.meta.url),
        ),
      },
    },
  },
});