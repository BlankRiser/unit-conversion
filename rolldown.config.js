import { defineConfig } from "rolldown";
import { dts } from 'rolldown-plugin-dts'

export default defineConfig({
	input: "src/index.ts",
	resolve: {
		// This needs to be explicitly set for now because oxc resolver doesn't
		// assume default exports conditions. Rolldown will ship with a default that
		// aligns with Vite in the future.
		conditionNames: ["import"],
	},
	
	output: [
		{
			format: "esm",
			file: "dist/index.mjs",
			minify: true,
			dir: undefined,
			inlineDynamicImports: true,
		},
	],
	debug: {},
	plugins: [
		dts(),
	],
});
