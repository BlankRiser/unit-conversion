import type { BuildConfig } from "bun";

import dts from "bun-plugin-dts";

const buildConfig: BuildConfig = {
  entrypoints: ["./src/index.ts"],
  outdir: "./dist",
  minify: true,
};

await Promise.all([
  Bun.build({
    ...buildConfig,
    plugins: [dts()],
    format: "esm",
    naming: "[dir]/[name].js",
  }),
  Bun.build({
    ...buildConfig,
    format: "cjs",
    naming: "[dir]/[name].cjs",
  }),
]);
