<p align="center">
  <h1 align="center">@devhaven/unit-conversion</h1>
  <p align="center">
    An SDK for unit conversion. 
    <br/>
    by <a href="https://x.com/blank_riser">@blank_riser</a>
  </p>
</p>


<p align="center">
<a href="https://github.com/BlankRiser/unit-conversion/actions?query=branch%3Amain"><img src="https://github.com/BlankRiser/unit-conversion/actions/workflows/release.yml/badge.svg?event=push&branch=main" alt="Zod CI status" /></a>
<a href="https://opensource.org/licenses/apache-2-0" rel="nofollow"><img src="https://img.shields.io/github/license/Blankriser/unit-conversion" alt="License"></a>
</p>


## Features

- Zero external dependencies
- Works in Node.js and all modern browsers
- Concise interface
- Works with TypeScript and plain JS

## Installation

```sh
npm install @devhaven/unit-conversion
pnpm add @devhaven/unit-conversion
bun add @devhaven/unit-conversion

deno add jsr:@devhaven/unit-conversion
```

### Basic Usage

```ts
import { Conversion } from "@devhaven/unit-conversion"

const conversion = new Conversion();
const result = conversion.value(10).from("meter").to("foot");
```