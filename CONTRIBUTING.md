# Contributing to `@devhaven/unit-conversion`

Contributions are welcome! Whether you are fixing a bug, adding new units or categories, or improving the documentation, please read through this guide before opening an issue or pull request.

---

## Monorepo Structure

This repository is a **Bun workspace monorepo** containing the core conversion library and the Astro/Starlight documentation site:

```text
.
├── .github/workflows/
│   ├── pull_requests.yml           # CI code quality checks (Biome)
│   └── release.yml                 # Manual release workflow (npm & JSR)
├── apps/
│   └── docs/                       # Documentation site (Astro + Starlight + Tailwind CSS v4)
│       ├── src/components/         # Interactive Playground & custom Astro components
│       ├── src/content/docs/       # MDX documentation pages & category guides
│       └── astro.config.mjs        # Starlight & Vite configuration
└── packages/
    └── unit-conversion/            # @devhaven/unit-conversion library
        ├── src/
        │   ├── constants/          # Config defaults (config.ts), unit symbols (labels.ts), unit lists & types (units.ts)
        │   ├── utils/              # Category lookup (common.ts) & conversion formulas (conversion-factors.ts)
        │   ├── main.ts             # Callable Conversion class & fluent .from().to() implementation
        │   └── index.ts            # Public package exports
        ├── tests/                  # Vitest test suites (unit conversions, API config, version consistency)
        ├── build.ts                # Bun bundler script (ESM, CJS, and .d.ts output)
        ├── jsr.jsonc               # JSR package metadata
        └── package.json            # npm package metadata
```

---

## Prerequisites & Setup

- **[Bun](https://bun.sh/)** (`>= 1.2.x`)
- **[Node.js](https://nodejs.org/)** (`>= 20.x`)

Clone the repository and install dependencies from the workspace root:

```bash
git clone https://github.com/BlankRiser/unit-conversion.git
cd unit-conversion
bun install
```

---

## Development Commands

You can run commands from the repository root using the workspace helper scripts (`bun run convert <script>` and `bun run docs <script>`):

### Core Library (`packages/unit-conversion`)

| Command | Description |
| :--- | :--- |
| `bun run convert dev` | Run `src/index.ts` in watch mode |
| `bun run convert test:run` | Run all Vitest unit and metadata tests once |
| `bun run convert test` | Run Vitest in interactive watch mode |
| `bun run convert test:ui` | Open the Vitest UI dashboard |
| `bun run convert build` | Build ESM (`dist/index.js`), CJS (`dist/index.cjs`), and type declarations (`dist/index.d.ts`) |
| `bun run convert lint` | Check formatting and lint rules with Biome |
| `bun run convert lint:fix` | Automatically fix lint and formatting issues with Biome |

### Documentation Site (`apps/docs`)

| Command | Description |
| :--- | :--- |
| `bun run docs dev` | Start the local Astro + Starlight dev server at `http://localhost:4321` |
| `bun run docs build` | Build the static documentation site and Pagefind search index |
| `bun run docs preview` | Preview the production documentation build locally |

---

## Adding a New Unit or Category

To add a new unit (or an entire measurement category) to `@devhaven/unit-conversion`:

1. **Register the Unit Type & Constant (`packages/unit-conversion/src/constants/units.ts`)**
   - Add the unit string literal to its category union type (e.g., `LengthUnits`, `PressureUnits`, or a new `*Units` type).
   - Add the unit to the `UNITS` constant array for that category.
   - If creating a new category, include its type in `AllUnits`, `UnitCategory<T>`, and `ALL_UNIT_CATEGORIES`.

2. **Add the Display Symbol (`packages/unit-conversion/src/constants/labels.ts`)**
   - Add the unit's abbreviation/symbol to the `LABELS` object (for example, `pascal: "Pa"`).

3. **Implement Conversion Factors (`packages/unit-conversion/src/utils/conversion-factors.ts`)**
   - Add an entry under the category in `CONVERSION_FACTORS` with `toBase` (converts from the unit to the category's base unit) and `fromBase` (converts from the category's base unit to the unit).

4. **Update Category Resolution & Exports (for new categories)**
   - Add the category check to `getUnitCategory()` in `packages/unit-conversion/src/utils/common.ts`.
   - Export the new category unit type from `packages/unit-conversion/src/index.ts`.

5. **Write Tests (`packages/unit-conversion/tests/conversion.spec.ts`)**
   - Add test cases verifying conversions to and from the new unit(s), including expected values and unit labels.
   - Run `bun run convert test:run` to verify all tests pass.

6. **Update the Documentation (`apps/docs`)**
   - Add or update the category guide in `apps/docs/src/content/docs/conversions/<category>.mdx`.
   - The interactive **Playground** (`/playground`) automatically reads `UNITS`, `LABELS`, and `CONVERSION_FACTORS`, so newly added units appear automatically.

---

## Code Quality & Pull Requests

- **Formatting & Linting**: This project uses [Biome](https://biomejs.dev/). Run `bun run convert lint:fix` before committing. Pull requests touching `apps/**` also run `biome ci .` in GitHub Actions (`.github/workflows/pull_requests.yml`).
- **Tests**: Ensure `bun run convert test:run` and `bun run convert build` succeed locally before submitting a pull request.

---

## Release Process (Manual via GitHub)

Releases are triggered **manually via GitHub**. When you create a new GitHub Release, GitHub Actions automatically updates the version in `packages/unit-conversion/package.json` and `packages/unit-conversion/jsr.jsonc`, commits the version bump back to the repository, and publishes the package to **npm** and **JSR**.

### Creating a Release

1. **Ensure `main` is green**
   Verify tests and builds pass locally before releasing:
   ```bash
   bun run convert test:run
   bun run convert build
   ```

2. **Publish a New Release on GitHub**
   1. Go to the repository's **[Releases](https://github.com/BlankRiser/unit-conversion/releases)** page on GitHub.
   2. Click **Draft a new release**.
   3. Create a new tag following semantic versioning (e.g., `v0.1.2` or `0.1.2`) targeting the `main` branch.
   4. Add release notes and click **Publish release**.

### What Happens Automatically

When a GitHub Release is created, the **Update SDK Version & Publish Release** workflow (`.github/workflows/update-version.yml`) runs in sequence:

1. **Extracts & Validates Version**: Reads the semantic version from the release tag (stripping any leading `v`, e.g., `v0.1.2` → `0.1.2`).
2. **Updates Package Metadata**: Updates `"version"` in both `packages/unit-conversion/package.json` and `packages/unit-conversion/jsr.jsonc`.
3. **Runs Tests**: Installs dependencies (`bun install --frozen-lockfile`) and runs `bun run convert test:run` (including `packages/unit-conversion/tests/version-consistency.spec.ts` to verify both files match).
4. **Commits & Updates Tag**: Commits `chore(release): bump SDK version to <version>` back to the target branch (`main`) and moves the release tag to point to the bumped commit.
5. **Builds & Publishes**: Builds the distribution bundle (`bun run convert build`) and publishes `@devhaven/unit-conversion` to **npm** (`npm publish --provenance --access=public`) and **JSR** (`npx jsr publish`).

*(You can also trigger `.github/workflows/update-version.yml` manually from the **Actions** tab via `workflow_dispatch` by entering a `version` input.)*

### Troubleshooting Release & OIDC Failures

If a release workflow fails when publishing to **npm** or **JSR**, check the **OIDC (OpenID Connect) Trusted Publisher** status and configuration first:

1. **Verify npm Trusted Publisher OIDC Settings (`E404` / `ENEEDAUTH`)**
   - Go to **[npmjs.com → `@devhaven/unit-conversion` → Settings → Publishing access](https://www.npmjs.com/package/@devhaven/unit-conversion/access)**.
   - Confirm that the **Trusted Publisher** connection is active and matches:
     - **Organization or user**: `BlankRiser`
     - **Repository**: `unit-conversion`
     - **Workflow filename**: Must match the exact workflow file being executed (`update-version.yml` or `release.yml`).
   - Ensure the workflow has `permissions: id-token: write`, uses `npm >= 11.5.1` (`npm install -g npm@latest`), and does **not** set `registry-url` on `actions/setup-node` or pass an empty `NODE_AUTH_TOKEN` (which overrides OIDC and causes `ENEEDAUTH`).

2. **Verify JSR OIDC Linking**
   - Go to **[jsr.io/@devhaven/unit-conversion/settings](https://jsr.io/@devhaven/unit-conversion)** and ensure the GitHub repository (`BlankRiser/unit-conversion`) is linked for OIDC publishing.

3. **Verify Branch Ruleset Bypass (`GH013: Repository rule violations`)**
   - If the version-bump commit fails to push to `main`, ensure the `RELEASE_PAT` repository secret is valid (`Contents: Read and write`) and that **Repository admin** is enabled in the `main` branch ruleset's **Bypass list** (`Settings → Rules → Rulesets`).