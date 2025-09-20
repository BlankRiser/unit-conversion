import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";

import starlightThemeRapide from "starlight-theme-rapide";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "Unit Conversion",
      plugins: [starlightThemeRapide()],
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
          label: "Conversions",
          autogenerate: { directory: "conversions" },
        },
      ],
    }),
  ],
});
