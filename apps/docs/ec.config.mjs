import { defineEcConfig } from "astro-expressive-code";
import ecTwoSlash from "expressive-code-twoslash";

export default defineEcConfig({
  // Example: Using a custom plugin (which makes this `ec.config.mjs` file necessary)
  plugins: [
    ecTwoSlash({
      explicitTrigger: true,
      includeJsDoc: true,
      allowNonStandardJsDocTags: false,
      languages: ["ts", "tsx"],
      twoslashOptions: {},
    }),
  ],
  themes: ["andromeeda", "solarized-light"],

  // ... any other options you want to configure
});
