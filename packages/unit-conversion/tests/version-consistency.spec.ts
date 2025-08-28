import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

// Minimal JSONC parser: strips line/block comments and trailing commas
function parseJsonc(content: string): unknown {
  const withoutBlockComments = content.replace(/\/\*[\s\S]*?\*\//g, "");
  // Remove // comments only when they start a line (avoid stripping URLs)
  const withoutLineComments = withoutBlockComments.replace(/^\s*\/\/.*$/gm, "");
  // Remove trailing commas before } or ]
  const withoutTrailingCommas = withoutLineComments.replace(/,(\s*[}\]])/g, "$1");
  return JSON.parse(withoutTrailingCommas);
}

describe("metadata consistency", () => {
  it("jsr.jsonc and package.json have the same version", async () => {
    // Resolve from this test file to project root
    const pkgUrl = new URL("../package.json", import.meta.url);
    const jsrUrl = new URL("../jsr.jsonc", import.meta.url);

    // Use Bun when available; otherwise fall back to Node fs for Vitest workers
    const readText = async (url: URL) => {
      if (typeof Bun !== "undefined" && Bun?.file) {
        return await Bun.file(url).text();
      }
      return await fs.readFile(fileURLToPath(url), "utf8");
    };

    const pkgText = await readText(pkgUrl);
    const jsrText = await readText(jsrUrl);

    const pkgJson = JSON.parse(pkgText) as { version?: string };
    const jsrJson = parseJsonc(jsrText) as { version?: string };

    expect(pkgJson.version, "package.json version should exist").toBeTruthy();
    expect(jsrJson.version, "jsr.jsonc version should exist").toBeTruthy();
    expect(jsrJson.version).toBe(pkgJson.version);
  });
});
