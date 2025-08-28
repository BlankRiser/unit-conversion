import { describe, expect, test } from "vitest";
import type { AllUnits } from "../src";
import { Conversion } from "../src/main";

type TestValues = {
  value: number;
  from: AllUnits;
  to: AllUnits;
  expected: number | string;
};

test("Check conversion config", () => {
  const withUnit = new Conversion({
    isFloat: false,
    includeUnit: true,
  });
  const withoutUnit = new Conversion({
    isFloat: false,
    includeUnit: false,
  });

  expect(withUnit.value(12).from("celsius").to("kelvin")).toBe("285K");
  expect(withoutUnit.value(12).from("celsius").to("kelvin")).toBe(285);
});

describe("Test Length conversions", () => {
  const lengthTests: Array<TestValues> = [
    { value: 1, from: "meter", to: "millimeter", expected: "1000mm" },
    { value: 1, from: "meter", to: "centimeter", expected: "100cm" },
    { value: 1, from: "meter", to: "inch", expected: "39.37in" },
    { value: 1, from: "meter", to: "foot", expected: "3.28ft" },
    { value: 1, from: "meter", to: "kilometer", expected: "0km" },
    { value: 1, from: "meter", to: "mile", expected: "0mi" },
    { value: 1, from: "meter", to: "yard", expected: "1.09yd" },
    { value: 1, from: "kilometer", to: "millimeter", expected: "1000000mm" },
    { value: 1, from: "kilometer", to: "centimeter", expected: "100000cm" },
    { value: 1, from: "kilometer", to: "inch", expected: "39370.08in" },
    { value: 1, from: "kilometer", to: "foot", expected: "3280.84ft" },
    { value: 1, from: "kilometer", to: "meter", expected: "1000m" },
    { value: 1, from: "kilometer", to: "mile", expected: "0.62mi" },
    { value: 1, from: "kilometer", to: "yard", expected: "1093.61yd" },
    { value: 1, from: "centimeter", to: "millimeter", expected: "10mm" },
    { value: 1, from: "centimeter", to: "kilometer", expected: "0km" },
    { value: 1, from: "centimeter", to: "inch", expected: "0.39in" },
    { value: 1, from: "centimeter", to: "foot", expected: "0.03ft" },
    { value: 1, from: "centimeter", to: "meter", expected: "0.01m" },
    { value: 1, from: "centimeter", to: "mile", expected: "0mi" },
    { value: 1, from: "centimeter", to: "yard", expected: "0.01yd" },
    { value: 1, from: "millimeter", to: "kilometer", expected: "0km" },
    { value: 1, from: "millimeter", to: "centimeter", expected: "0.1cm" },
    { value: 1, from: "millimeter", to: "inch", expected: "0.04in" },
    { value: 1, from: "millimeter", to: "foot", expected: "0ft" },
    { value: 1, from: "millimeter", to: "meter", expected: "0m" },
    { value: 1, from: "millimeter", to: "mile", expected: "0mi" },
    { value: 1, from: "millimeter", to: "yard", expected: "0yd" },
    { value: 1, from: "inch", to: "millimeter", expected: "25.4mm" },
    { value: 1, from: "inch", to: "centimeter", expected: "2.54cm" },
    { value: 1, from: "inch", to: "kilometer", expected: "0km" },
    { value: 1, from: "inch", to: "foot", expected: "0.08ft" },
    { value: 1, from: "inch", to: "meter", expected: "0.03m" },
    { value: 1, from: "inch", to: "mile", expected: "0mi" },
    { value: 1, from: "inch", to: "yard", expected: "0.03yd" },
  ];
  const convert = new Conversion();

  lengthTests.forEach(({ value, from, to, expected }) => {
    test(`Converts ${value} ${from} to ${to}`, () => {
      expect(convert.value(value).from(from).to(to)).toBe(expected);
    });
  });
});

describe("Test temperature conversions", () => {
  const temperatureTests: Array<TestValues> = [
    { value: 1, from: "celsius", to: "kelvin", expected: "274.15K" },
    { value: 1, from: "celsius", to: "fahrenheit", expected: "33.8°F" },
    { value: 1, from: "kelvin", to: "celsius", expected: "-272.15°C" },
    { value: 1, from: "kelvin", to: "fahrenheit", expected: "-457.87°F" },
    { value: 1, from: "fahrenheit", to: "celsius", expected: "-17.22°C" },
    { value: 1, from: "fahrenheit", to: "kelvin", expected: "255.93K" },
  ];
  const convert = new Conversion();

  temperatureTests.forEach(({ value, from, to, expected }) => {
    test(`Converts ${value} ${from} to ${to}`, () => {
      expect(convert.value(value).from(from).to(to)).toBe(expected);
    });
  });
});

describe("Test weight conversions", () => {
  const weightTests: Array<TestValues> = [
    { value: 1, from: "gram", to: "kilogram", expected: "0.001kg" },
    { value: 1, from: "gram", to: "pound", expected: "0.0022lb" },
    { value: 1, from: "gram", to: "ounce", expected: "0.0353oz" },
    { value: 1, from: "gram", to: "ton", expected: "0ton" },
    { value: 1, from: "gram", to: "milligram", expected: "1000mg" },
    { value: 1, from: "kilogram", to: "gram", expected: "1000g" },
    { value: 1, from: "kilogram", to: "pound", expected: "2.2046lb" },
    { value: 1, from: "kilogram", to: "ounce", expected: "35.274oz" },
    { value: 1, from: "kilogram", to: "ton", expected: "0.001ton" },
    { value: 1, from: "pound", to: "kilogram", expected: "0.4536kg" },
    { value: 1, from: "pound", to: "gram", expected: "453.592g" },
    { value: 1, from: "pound", to: "ounce", expected: "16oz" },
    { value: 1, from: "pound", to: "ton", expected: "0.0005ton" },
    { value: 1, from: "ounce", to: "kilogram", expected: "0.0283kg" },
    { value: 1, from: "ounce", to: "pound", expected: "0.0625lb" },
    { value: 1, from: "ounce", to: "gram", expected: "28.3495g" },
    { value: 1, from: "ounce", to: "ton", expected: "0ton" },
    { value: 1, from: "ton", to: "kilogram", expected: "1000kg" },
    { value: 1, from: "ton", to: "pound", expected: "2204.6244lb" },
    { value: 1, from: "ton", to: "ounce", expected: "35273.9907oz" },
    { value: 1, from: "ton", to: "gram", expected: "1000000g" },
  ];
  const convert = new Conversion({
    decimals: 4,
  });

  weightTests.forEach(({ value, from, to, expected }) => {
    test(`Converts ${value} ${from} to ${to}`, () => {
      expect(convert.value(value).from(from).to(to)).toBe(expected);
    });
  });
});

describe("Test time conversions", () => {
  const timeTests: Array<TestValues> = [
    { value: 1, from: "millisecond", to: "second", expected: "0.001s" },
    { value: 1, from: "millisecond", to: "minute", expected: "0min" },
    { value: 1, from: "millisecond", to: "hour", expected: "0h" },
    { value: 1, from: "millisecond", to: "day", expected: "0d" },
    { value: 1, from: "millisecond", to: "week", expected: "0wk" },
    { value: 1, from: "second", to: "millisecond", expected: "1000ms" },
    { value: 1, from: "second", to: "minute", expected: "0.0167min" },
    { value: 1, from: "second", to: "hour", expected: "0.0003h" },
    { value: 1, from: "second", to: "day", expected: "0d" },
    { value: 1, from: "second", to: "week", expected: "0wk" },
    { value: 1, from: "minute", to: "millisecond", expected: "60000ms" },
    { value: 1, from: "minute", to: "second", expected: "60s" },
    { value: 1, from: "minute", to: "hour", expected: "0.0167h" },
    { value: 1, from: "minute", to: "day", expected: "0.0007d" },
    { value: 1, from: "minute", to: "week", expected: "0.0001wk" },
    { value: 1, from: "hour", to: "millisecond", expected: "3600000ms" },
    { value: 1, from: "hour", to: "minute", expected: "60min" },
    { value: 1, from: "hour", to: "second", expected: "3600s" },
    { value: 1, from: "hour", to: "day", expected: "0.0417d" },
    { value: 1, from: "hour", to: "week", expected: "0.006wk" },
    { value: 1, from: "day", to: "millisecond", expected: "86400000ms" },
    { value: 1, from: "day", to: "minute", expected: "1440min" },
    { value: 1, from: "day", to: "hour", expected: "24h" },
    { value: 1, from: "day", to: "second", expected: "86400s" },
    { value: 1, from: "day", to: "week", expected: "0.1429wk" },
    { value: 1, from: "week", to: "millisecond", expected: "604800000ms" },
    { value: 1, from: "week", to: "minute", expected: "10080min" },
    { value: 1, from: "week", to: "hour", expected: "168h" },
    { value: 1, from: "week", to: "second", expected: "604800s" },
    { value: 1, from: "week", to: "day", expected: "7d" },
  ];
  const convert = new Conversion({
    decimals: 4,
  });

  timeTests.forEach(({ value, from, to, expected }) => {
    test(`Converts ${value} ${from} to ${to}`, () => {
      expect(convert.value(value).from(from).to(to)).toBe(expected);
    });
  });
});

describe("Test volumes conversions", () => {
  const volumeTests: Array<TestValues> = [
    { value: 1, from: "liter", to: "milliliter", expected: "1000ml" },
    { value: 1, from: "liter", to: "cubic-foot", expected: "0.0353ft^3" },
    { value: 1, from: "liter", to: "cubic-inch", expected: "61.0237in^3" },
    { value: 1, from: "liter", to: "cubic-meter", expected: "0.001m^3" },
    { value: 1, from: "liter", to: "imperial-cup", expected: "3.5195cup (UK)" },
    { value: 1, from: "liter", to: "us-legal-cup", expected: "4.2268cup (US)" },
    { value: 1, from: "liter", to: "imperial-pint", expected: "1.7598pt (UK)" },
    { value: 1, from: "liter", to: "us-liquid-pint", expected: "2.1134pt (US)" },
    { value: 1, from: "liter", to: "imperial-fluid-ounce", expected: "35.1951fl oz (UK)" },
    { value: 1, from: "milliliter", to: "liter", expected: "0.001l" },
    { value: 1, from: "milliliter", to: "cubic-foot", expected: "0ft^3" },
    { value: 1, from: "milliliter", to: "cubic-inch", expected: "0.061in^3" },
    { value: 1, from: "milliliter", to: "cubic-meter", expected: "0m^3" },
    { value: 1, from: "milliliter", to: "imperial-cup", expected: "0.0035cup (UK)" },
    { value: 1, from: "milliliter", to: "us-legal-cup", expected: "0.0042cup (US)" },
    { value: 1, from: "milliliter", to: "imperial-pint", expected: "0.0018pt (UK)" },
    { value: 1, from: "milliliter", to: "us-liquid-pint", expected: "0.0021pt (US)" },
    { value: 1, from: "milliliter", to: "imperial-fluid-ounce", expected: "0.0352fl oz (UK)" },
    { value: 1, from: "cubic-foot", to: "liter", expected: "28.3168l" },
    { value: 1, from: "cubic-foot", to: "milliliter", expected: "28316.85ml" },
    { value: 1, from: "cubic-foot", to: "cubic-inch", expected: "1728.0002in^3" },
    { value: 1, from: "cubic-foot", to: "cubic-meter", expected: "0.0283m^3" },
    { value: 1, from: "cubic-foot", to: "us-legal-cup", expected: "119.6883cup (US)" },
    { value: 1, from: "cubic-foot", to: "imperial-cup", expected: "99.6614cup (UK)" },
    { value: 1, from: "cubic-foot", to: "imperial-pint", expected: "49.8307pt (UK)" },
    { value: 1, from: "cubic-foot", to: "us-liquid-pint", expected: "59.8442pt (US)" },
    { value: 1, from: "cubic-foot", to: "imperial-fluid-ounce", expected: "996.6138fl oz (UK)" },
    { value: 1, from: "cubic-inch", to: "liter", expected: "0.0164l" },
    { value: 1, from: "cubic-inch", to: "cubic-foot", expected: "0.0006ft^3" },
    { value: 1, from: "cubic-inch", to: "milliliter", expected: "16.3871ml" },
    { value: 1, from: "cubic-inch", to: "cubic-meter", expected: "0m^3" },
    { value: 1, from: "cubic-inch", to: "imperial-cup", expected: "0.0577cup (UK)" },
    { value: 1, from: "cubic-inch", to: "us-legal-cup", expected: "0.0693cup (US)" },
    { value: 1, from: "cubic-inch", to: "imperial-pint", expected: "0.0288pt (UK)" },
    { value: 1, from: "cubic-inch", to: "us-liquid-pint", expected: "0.0346pt (US)" },
    { value: 1, from: "cubic-inch", to: "imperial-fluid-ounce", expected: "0.5767fl oz (UK)" },
    { value: 1, from: "cubic-meter", to: "liter", expected: "1000l" },
    { value: 1, from: "cubic-meter", to: "cubic-foot", expected: "35.3147ft^3" },
    { value: 1, from: "cubic-meter", to: "cubic-inch", expected: "61023.7441in^3" },
    { value: 1, from: "cubic-meter", to: "milliliter", expected: "1000000ml" },
    { value: 1, from: "cubic-meter", to: "imperial-cup", expected: "3519.508cup (UK)" },
    { value: 1, from: "cubic-meter", to: "us-legal-cup", expected: "4226.7528cup (US)" },
    { value: 1, from: "cubic-meter", to: "imperial-pint", expected: "1759.754pt (UK)" },
    { value: 1, from: "cubic-meter", to: "us-liquid-pint", expected: "2113.3764pt (US)" },
    { value: 1, from: "cubic-meter", to: "imperial-fluid-ounce", expected: "35195.0797fl oz (UK)" },
    { value: 1, from: "imperial-cup", to: "liter", expected: "0.2841l" },
    { value: 1, from: "imperial-cup", to: "cubic-foot", expected: "0.01ft^3" },
    { value: 1, from: "imperial-cup", to: "cubic-inch", expected: "17.3387in^3" },
    { value: 1, from: "imperial-cup", to: "cubic-meter", expected: "0.0003m^3" },
    { value: 1, from: "imperial-cup", to: "milliliter", expected: "284.1306ml" },
    { value: 1, from: "imperial-cup", to: "us-legal-cup", expected: "1.2009cup (US)" },
    { value: 1, from: "imperial-cup", to: "imperial-pint", expected: "0.5pt (UK)" },
    { value: 1, from: "imperial-cup", to: "us-liquid-pint", expected: "0.6005pt (US)" },
    { value: 1, from: "imperial-cup", to: "imperial-fluid-ounce", expected: "10fl oz (UK)" },
    { value: 1, from: "us-legal-cup", to: "liter", expected: "0.2366l" },
    { value: 1, from: "us-legal-cup", to: "cubic-foot", expected: "0.0084ft^3" },
    { value: 1, from: "us-legal-cup", to: "cubic-inch", expected: "14.4375in^3" },
    { value: 1, from: "us-legal-cup", to: "cubic-meter", expected: "0.0002m^3" },
    { value: 1, from: "us-legal-cup", to: "milliliter", expected: "236.5882ml" },
    { value: 1, from: "us-legal-cup", to: "imperial-cup", expected: "0.8327cup (UK)" },
    { value: 1, from: "us-legal-cup", to: "imperial-pint", expected: "0.4163pt (UK)" },
    { value: 1, from: "us-legal-cup", to: "us-liquid-pint", expected: "0.5pt (US)" },
    { value: 1, from: "us-legal-cup", to: "imperial-fluid-ounce", expected: "8.3267fl oz (UK)" },
    { value: 1, from: "imperial-pint", to: "liter", expected: "0.5683l" },
    { value: 1, from: "imperial-pint", to: "cubic-foot", expected: "0.0201ft^3" },
    { value: 1, from: "imperial-pint", to: "cubic-inch", expected: "34.6774in^3" },
    { value: 1, from: "imperial-pint", to: "cubic-meter", expected: "0.0006m^3" },
    { value: 1, from: "imperial-pint", to: "imperial-cup", expected: "2cup (UK)" },
    { value: 1, from: "imperial-pint", to: "us-legal-cup", expected: "2.4019cup (US)" },
    { value: 1, from: "imperial-pint", to: "milliliter", expected: "568.2612ml" },
    { value: 1, from: "imperial-pint", to: "us-liquid-pint", expected: "1.2009pt (US)" },
    { value: 1, from: "imperial-pint", to: "imperial-fluid-ounce", expected: "20fl oz (UK)" },
    { value: 1, from: "us-liquid-pint", to: "liter", expected: "0.4732l" },
    { value: 1, from: "us-liquid-pint", to: "cubic-foot", expected: "0.0167ft^3" },
    { value: 1, from: "us-liquid-pint", to: "cubic-inch", expected: "28.875in^3" },
    { value: 1, from: "us-liquid-pint", to: "cubic-meter", expected: "0.0005m^3" },
    { value: 1, from: "us-liquid-pint", to: "imperial-cup", expected: "1.6653cup (UK)" },
    { value: 1, from: "us-liquid-pint", to: "us-legal-cup", expected: "2cup (US)" },
    { value: 1, from: "us-liquid-pint", to: "imperial-pint", expected: "0.8327pt (UK)" },
    { value: 1, from: "us-liquid-pint", to: "milliliter", expected: "473.1765ml" },
    { value: 1, from: "us-liquid-pint", to: "imperial-fluid-ounce", expected: "16.6535fl oz (UK)" },
    { value: 1, from: "imperial-fluid-ounce", to: "liter", expected: "0.0284l" },
    { value: 1, from: "imperial-fluid-ounce", to: "cubic-foot", expected: "0.001ft^3" },
    { value: 1, from: "imperial-fluid-ounce", to: "cubic-inch", expected: "1.7339in^3" },
    { value: 1, from: "imperial-fluid-ounce", to: "cubic-meter", expected: "0m^3" },
    { value: 1, from: "imperial-fluid-ounce", to: "imperial-cup", expected: "0.1cup (UK)" },
    { value: 1, from: "imperial-fluid-ounce", to: "us-legal-cup", expected: "0.1201cup (US)" },
    { value: 1, from: "imperial-fluid-ounce", to: "imperial-pint", expected: "0.05pt (UK)" },
    { value: 1, from: "imperial-fluid-ounce", to: "us-liquid-pint", expected: "0.06pt (US)" },
    { value: 1, from: "imperial-fluid-ounce", to: "milliliter", expected: "28.4131ml" },
  ];
  const convert = new Conversion({
    decimals: 4,
  });

  volumeTests.forEach(({ value, from, to, expected }) => {
    test(`Converts ${value} ${from} to ${to}`, () => {
      expect(convert.value(value).from(from).to(to)).toBe(expected);
    });
  });
});

describe("Test number conversions", () => {
  const numberTests: Array<TestValues> = [
    { value: 10, from: "decimal", to: "binary", expected: 1010 },
    { value: 10, from: "decimal", to: "base8", expected: 12 },
    { value: 10, from: "decimal", to: "hexadecimal", expected: "A" },
    { value: 10, from: "binary", to: "decimal", expected: 2 },
    { value: 10, from: "binary", to: "base8", expected: 2 },
    { value: 10, from: "binary", to: "hexadecimal", expected: "2" },
    { value: 10, from: "base8", to: "binary", expected: 1000 },
    { value: 10, from: "base8", to: "decimal", expected: 8 },
    { value: 10, from: "base8", to: "hexadecimal", expected: "8" },
    { value: 10, from: "hexadecimal", to: "binary", expected: 10000 },
    { value: 10, from: "hexadecimal", to: "base8", expected: 20 },
    { value: 10, from: "hexadecimal", to: "decimal", expected: 16 },
  ];
  const convert = new Conversion();

  numberTests.forEach(({ value, from, to, expected }) => {
    test(`Converts ${value} ${from} to ${to}`, () => {
      expect(convert.value(value).from(from).to(to)).toBe(expected);
    });
  });
});
