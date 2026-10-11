<div align="center">
  <h1>@devhaven/unit-conversion</h1>
  <p>
    <strong>A lightweight, zero-dependency, type-safe TypeScript &amp; JavaScript library for converting physical and numerical units.</strong>
  </p>
  <p>
    Convert <strong>Length</strong>, <strong>Temperature</strong>, <strong>Weight / Mass</strong>, <strong>Volume</strong>, <strong>Time</strong>, <strong>Pressure</strong>, <strong>Energy</strong>, <strong>Force</strong>, and <strong>Number Bases</strong> with a fluent, chainable API.
    <br />
    Created by <a href="https://x.com/blank_riser">@blank_riser</a>
  </p>

  <p>
    <a href="https://github.com/BlankRiser/unit-conversion/actions?query=branch%3Amain"><img src="https://github.com/BlankRiser/unit-conversion/actions/workflows/release.yml/badge.svg?event=push&branch=main" alt="Release CI Status" /></a>
    <a href="https://www.npmjs.com/package/@devhaven/unit-conversion"><img src="https://img.shields.io/npm/v/@devhaven/unit-conversion?label=npm" alt="npm version" /></a>
    <a href="https://jsr.io/@devhaven/unit-conversion"><img src="https://img.shields.io/jsr/v/@devhaven/unit-conversion" alt="JSR version" /></a>
    <a href="https://opensource.org/licenses/apache-2-0"><img src="https://img.shields.io/github/license/BlankRiser/unit-conversion" alt="Apache-2.0 License" /></a>
  </p>
</div>

---

## Table of Contents

- [Why `@devhaven/unit-conversion`?](#why-devhavenunit-conversion)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Configuration Options](#configuration-options)
- [Supported Categories & Units](#supported-categories--units)
- [Category Conversion Examples](#category-conversion-examples)
- [API Reference & Exported Helpers](#api-reference--exported-helpers)
- [Frequently Asked Questions (FAQ)](#frequently-asked-questions-faq)
- [Contributing](#contributing)
- [License](#license)

---

## Why `@devhaven/unit-conversion`?

`@devhaven/unit-conversion` is built for modern TypeScript and JavaScript applications that need accurate, ergonomic unit conversions without bloated dependencies:

- **Compile-Time Type Safety**: When you select a source unit in `.from("meter")`, TypeScript automatically narrows `.to(...)` to valid `LengthUnits`. Attempting to convert `"meter"` to `"celsius"` is caught immediately in your IDE before your code ever runs.
- **Zero External Dependencies**: Pure TypeScript/JavaScript implementation with a tiny bundle size and no third-party runtime dependencies.
- **Fluent, Readable Syntax**: Chain conversions naturally with `convert(100).from("meter").to("kilometer")` or `convert.value(100).from("meter").to("kilometer")`.
- **Precision & Locale Formatting**: Control decimal places (`decimals`), toggle integer rounding (`isFloat`), and format output numbers for any region (`locale`, e.g., `"en-US"`, `"de-DE"`, `"hi-IN"`, `"ja-JP"`).
- **Universal Runtime Compatibility**: Ships dual **ESM** and **CommonJS** builds with full **TypeScript declarations (`.d.ts`)**. Runs seamlessly in **Node.js**, **Bun**, **Deno**, **Cloudflare Workers**, and all **modern browsers**.

---

## Installation

### From npm

```bash
# npm
npm install @devhaven/unit-conversion

# pnpm
pnpm add @devhaven/unit-conversion

# yarn
yarn add @devhaven/unit-conversion

# bun
bun add @devhaven/unit-conversion
```

### From JSR

```bash
# Deno
deno add jsr:@devhaven/unit-conversion

# npm / pnpm / yarn / bun via JSR
npx jsr add @devhaven/unit-conversion
bunx jsr add @devhaven/unit-conversion
```

### Importing

```ts
// ESM / TypeScript
import { Conversion } from "@devhaven/unit-conversion";

// CommonJS
const { Conversion } = require("@devhaven/unit-conversion");

// Deno (JSR)
import { Conversion } from "jsr:@devhaven/unit-conversion";
```

---

## Quick Start

```ts
import { Conversion } from "@devhaven/unit-conversion";

const convert = new Conversion();

// Length: meters to feet
const length = convert(10).from("meter").to("foot");
console.log(length);
// => { value: 32.81, unit: "ft" }

// Temperature: Celsius to Fahrenheit
const temp = convert(100).from("celsius").to("fahrenheit");
console.log(temp);
// => { value: 212, unit: "°F" }

// Weight: kilograms to pounds
const weight = convert(5).from("kilogram").to("pound");
console.log(weight);
// => { value: 11.02, unit: "lb" }

// String inputs are parsed automatically
const fromString = convert("2500").from("milliliter").to("liter");
console.log(fromString);
// => { value: 2.5, unit: "l" }
```

### Compile-Time Type Safety

TypeScript prevents invalid cross-category unit conversions at compile time:

```ts
import { Conversion } from "@devhaven/unit-conversion";

const convert = new Conversion();

// Valid: both units belong to LengthUnits
convert(1).from("mile").to("kilometer");

// TypeScript Error:
// Argument of type '"kelvin"' is not assignable to parameter of type 'LengthUnits'.
convert(1).from("mile").to("kelvin");
```

---

## Configuration Options

Pass a `ConversionConfig` object when instantiating `new Conversion(config)` to customize rounding and number formatting:

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `isFloat` | `boolean` | `true` | Keep floating-point decimals (`true`) or round to the nearest integer via `Math.round()` (`false`). |
| `decimals` | `number` | `2` | Number of decimal places to round floating-point results to (when `isFloat: true`). |
| `locale` | `string \| undefined` | `undefined` | BCP 47 locale tag (e.g., `"en-US"`, `"de-DE"`, `"fr-FR"`, `"hi-IN"`) to format numeric results via `toLocaleString()`. |

```ts
import { Conversion } from "@devhaven/unit-conversion";

// High-precision conversion (4 decimal places)
const precise = new Conversion({ decimals: 4 });
console.log(precise(1).from("kilogram").to("pound"));
// => { value: 2.2046, unit: "lb" }

// Integer rounding (isFloat: false)
const rounded = new Conversion({ isFloat: false });
console.log(rounded(12).from("celsius").to("kelvin"));
// => { value: 285, unit: "K" }

// Locale-aware number formatting
const indianLocale = new Conversion({ locale: "hi-IN", decimals: 2 });
console.log(indianLocale(1234.56).from("kilometer").to("meter"));
// => { value: "12,34,560", unit: "m" }
```

---

## Supported Categories & Units

`@devhaven/unit-conversion` supports **9 unit categories** and **55+ units**:

| Category | Base Unit | Supported Units (`AllUnits`) | Unit Symbols (`LABELS`) |
| :--- | :--- | :--- | :--- |
| **Length** | `meter` | `millimeter`, `centimeter`, `meter`, `kilometer`, `inch`, `foot`, `yard`, `mile` | `mm`, `cm`, `m`, `km`, `in`, `ft`, `yd`, `mi` |
| **Temperature** | `kelvin` | `celsius`, `fahrenheit`, `kelvin` | `°C`, `°F`, `K` |
| **Weight / Mass** | `gram` | `milligram`, `gram`, `kilogram`, `ounce`, `pound`, `ton` | `mg`, `g`, `kg`, `oz`, `lb`, `ton` |
| **Volume** | `liter` | `milliliter`, `liter`, `cubic-meter`, `cubic-foot`, `cubic-inch`, `us-legal-cup`, `imperial-cup`, `us-liquid-pint`, `imperial-pint`, `imperial-fluid-ounce` | `ml`, `l`, `m^3`, `ft^3`, `in^3`, `cup (US)`, `cup (UK)`, `pt (US)`, `pt (UK)`, `fl oz (UK)` |
| **Time** | `second` | `millisecond`, `second`, `minute`, `hour`, `day`, `week` | `ms`, `s`, `min`, `h`, `d`, `wk` |
| **Number Bases** | `decimal` | `decimal`, `binary`, `base8`, `hexadecimal` | `decimal`, `binary`, `base8`, `hexadecimal` |
| **Pressure** | `pascal` | `pascal`, `kilopascal`, `bar`, `psi`, `atmosphere` | `Pa`, `kPa`, `bar`, `psi`, `atm` |
| **Energy** | `joule` | `joule`, `kilojoule`, `calorie`, `calorie-international-table`, `calorie-thermochemical`, `watt-hour`, `kilowatt-hour`, `electron-volt` | `J`, `kJ`, `cal`, `cal (IT)`, `cal (th)`, `Wh`, `kWh`, `eV` |
| **Force** | `newton` | `newton`, `dyne`, `poundal`, `pound-force`, `kilogram-force` | `N`, `dyn`, `pdl`, `lbf`, `kgf` |

---

## Category Conversion Examples

```ts
import { Conversion } from "@devhaven/unit-conversion";

const convert = new Conversion({ decimals: 4 });

// 1. Length (SI Metric & Imperial/US)
convert(1).from("mile").to("kilometer");            // { value: 1.6093, unit: "km" }
convert(12).from("inch").to("centimeter");          // { value: 30.48, unit: "cm" }

// 2. Temperature (Celsius, Fahrenheit, Kelvin)
convert(0).from("celsius").to("kelvin");            // { value: 273.15, unit: "K" }
convert(98.6).from("fahrenheit").to("celsius");     // { value: 37, unit: "°C" }

// 3. Weight / Mass (Metric & Imperial)
convert(1).from("pound").to("gram");                // { value: 453.592, unit: "g" }
convert(16).from("ounce").to("pound");              // { value: 1, unit: "lb" }

// 4. Volume (Liters, Cubic Units, US & Imperial Cups/Pints)
convert(1).from("cubic-foot").to("liter");          // { value: 28.3169, unit: "l" }
convert(1).from("us-legal-cup").to("milliliter");   // { value: 236.5882, unit: "ml" }

// 5. Time (Milliseconds to Weeks)
convert(1).from("day").to("second");                // { value: 86400, unit: "s" }
convert(3600).from("second").to("hour");            // { value: 1, unit: "h" }

// 6. Number Bases (Decimal, Binary, Octal / base8, Hexadecimal)
convert(255).from("decimal").to("hexadecimal");     // { value: "FF", unit: "hexadecimal" }
convert(1010).from("binary").to("decimal");         // { value: 10, unit: "decimal" }
convert(10).from("decimal").to("base8");            // { value: 12, unit: "base8" }

// 7. Pressure (Pascal, Kilopascal, Bar, PSI, Atmosphere)
convert(1).from("atmosphere").to("psi");            // { value: 14.6959, unit: "psi" }
convert(100).from("kilopascal").to("bar");          // { value: 1, unit: "bar" }

// 8. Energy (Joules, Calories, Watt-Hours, Electron-Volts)
convert(1).from("kilowatt-hour").to("kilojoule");   // { value: 3600, unit: "kJ" }
convert(1).from("calorie").to("joule");             // { value: 4186.8, unit: "J" }

// 9. Force (Newton, Dyne, Poundal, Pound-Force, Kilogram-Force)
convert(1).from("pound-force").to("newton");        // { value: 4.4482, unit: "N" }
convert(1).from("kilogram-force").to("newton");     // { value: 9.8067, unit: "N" }
```

---

## API Reference & Exported Helpers

In addition to the `Conversion` class, `@devhaven/unit-conversion` exports its underlying constants, unit maps, and helper utilities for building dynamic UIs, validators, or custom tooling:

```ts
import {
  Conversion,
  UNITS,
  LABELS,
  CONVERSION_FACTORS,
  DEFAULT_CONFIG,
  getUnitCategory,
  type ConversionConfig,
  type AllUnits,
  type UnitCategory,
  type LengthUnits,
  type TemperatureUnits,
  type WeightUnits,
  type VolumeUnits,
  type TimeUnits,
  type NumberUnits,
  type PressureUnits,
  type EnergyUnits,
  type ForceUnits,
} from "@devhaven/unit-conversion";

// Look up all units for a category
console.log(UNITS.pressure);
// => ["pascal", "kilopascal", "bar", "psi", "atmosphere"]

// Get the display abbreviation for any unit
console.log(LABELS["kilowatt-hour"]);
// => "kWh"

// Detect which category a unit belongs to
console.log(getUnitCategory("newton"));
// => "force"
```

---

## Frequently Asked Questions (FAQ)

### Does `@devhaven/unit-conversion` work in the browser and SSR frameworks?
Yes. It has zero external dependencies and uses only standard ECMAScript APIs, making it compatible with React, Next.js, Astro, Vue, Nuxt, SvelteKit, Solid, Angular, Node.js, Bun, Deno, and Cloudflare Workers.

### How do I get only the numeric value or only the unit symbol?
Every `.to()` call returns a `{ value, unit }` object. Use object destructuring to extract what you need:
```ts
const { value, unit } = convert(50).from("kilometer").to("mile");
```

### Can I pass either `convert(val)` or `convert.value(val)`?
Yes. Both the callable syntax `convert(10).from("meter").to("foot")` and the method syntax `convert.value(10).from("meter").to("foot")` are supported and produce identical results.

---

## Contributing

Contributions, bug reports, and feature requests are welcome! Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for details on setting up the Bun monorepo, adding new units or categories, running tests, and triggering releases.

---

## License

Licensed under the [Apache-2.0 License](./LICENSE).