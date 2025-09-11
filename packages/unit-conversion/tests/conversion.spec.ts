import { describe, expect, test } from "vitest";
import { type AllUnits, Conversion } from "../src";

type TestValues = {
  value: number;
  from: AllUnits;
  to: AllUnits;
  expected: number | string;
  unit?: string;
};

/**
 * Determines if two numbers are approximately equal within a relative tolerance.
 *
 * @param a - First number to compare
 * @param b - Second number to compare
 * @param relativeTolerance - Relative tolerance for comparison (default: 1e-2 or 1%)
 * @returns Boolean indicating if the numbers are approximately equal
 *
 * @remarks
 * This function uses relative tolerance rather than absolute difference, making it suitable
 * for comparing numbers of different magnitudes. The comparison is considered valid when:
 * |a - b| ≤ max(|a|, |b|, 1) × relativeTolerance
 *
 * @example
 * // Returns true (within 1% tolerance)
 * isApproximatelyEqual(100, 101);
 *
 * @example
 * // Using custom tolerance (0.1%)
 * isApproximatelyEqual(100, 100.05, 0.001); // true
 */
function isApproximatelyEqual(a: number, b: number, relativeTolerance: number = 1e-2): boolean {
  const diff = Math.abs(a - b);
  const largest = Math.max(Math.abs(a), Math.abs(b), 1);
  return diff <= largest * relativeTolerance;
}

test("Check conversion config", () => {
  const withFloat = new Conversion({
    isFloat: true,
  });

  const resultWithFloat = withFloat.value(12).from("celsius").to("kelvin");

  const withoutFloat = new Conversion({
    isFloat: false,
  });

  const resultWithoutFloat = withoutFloat.value(12).from("celsius").to("kelvin");

  expect(isApproximatelyEqual(+resultWithFloat.value, 285)).toBe(true);
  expect(isApproximatelyEqual(+resultWithoutFloat.value, 285)).toBe(true);
});

describe("Test Length conversions", () => {
  const lengthTests: Array<TestValues> = [
    { value: 1, from: "meter", to: "millimeter", expected: 1000, unit: "mm" },
    { value: 1, from: "meter", to: "centimeter", expected: 100, unit: "cm" },
    { value: 1, from: "meter", to: "inch", expected: 39.37, unit: "in" },
    { value: 1, from: "meter", to: "foot", expected: 3.28, unit: "ft" },
    { value: 1, from: "meter", to: "kilometer", expected: 0, unit: "km" },
    { value: 1, from: "meter", to: "mile", expected: 0, unit: "mi" },
    { value: 1, from: "meter", to: "yard", expected: 1.09, unit: "yd" },
    { value: 1, from: "kilometer", to: "millimeter", expected: 1000000, unit: "mm" },
    { value: 1, from: "kilometer", to: "centimeter", expected: 100000, unit: "cm" },
    { value: 1, from: "kilometer", to: "inch", expected: 39370.08, unit: "in" },
    { value: 1, from: "kilometer", to: "foot", expected: 3280.84, unit: "ft" },
    { value: 1, from: "kilometer", to: "meter", expected: 1000, unit: "m" },
    { value: 1, from: "kilometer", to: "mile", expected: 0.62, unit: "mi" },
    { value: 1, from: "kilometer", to: "yard", expected: 1093.61, unit: "yd" },
    { value: 1, from: "centimeter", to: "millimeter", expected: 10, unit: "mm" },
    { value: 1, from: "centimeter", to: "kilometer", expected: 0, unit: "km" },
    { value: 1, from: "centimeter", to: "inch", expected: 0.39, unit: "in" },
    { value: 1, from: "centimeter", to: "foot", expected: 0.03, unit: "ft" },
    { value: 1, from: "centimeter", to: "meter", expected: 0.0, unit: "1m" },
    { value: 1, from: "centimeter", to: "mile", expected: 0, unit: "mi" },
    { value: 1, from: "centimeter", to: "yard", expected: 0.01, unit: "yd" },
    { value: 1, from: "millimeter", to: "kilometer", expected: 0, unit: "km" },
    { value: 1, from: "millimeter", to: "centimeter", expected: 0.1, unit: "cm" },
    { value: 1, from: "millimeter", to: "inch", expected: 0.04, unit: "in" },
    { value: 1, from: "millimeter", to: "foot", expected: 0, unit: "ft" },
    { value: 1, from: "millimeter", to: "meter", expected: 0, unit: "m" },
    { value: 1, from: "millimeter", to: "mile", expected: 0, unit: "mi" },
    { value: 1, from: "millimeter", to: "yard", expected: 0, unit: "yd" },
    { value: 1, from: "inch", to: "millimeter", expected: 25.4, unit: "mm" },
    { value: 1, from: "inch", to: "centimeter", expected: 2.54, unit: "cm" },
    { value: 1, from: "inch", to: "kilometer", expected: 0, unit: "km" },
    { value: 1, from: "inch", to: "foot", expected: 0.08, unit: "ft" },
    { value: 1, from: "inch", to: "meter", expected: 0.03, unit: "m" },
    { value: 1, from: "inch", to: "mile", expected: 0, unit: "mi" },
    { value: 1, from: "inch", to: "yard", expected: 0.03, unit: "yd" },
  ];
  const convert = new Conversion();

  lengthTests.forEach(({ value, from, to, expected }) => {
    test(`Converts ${value} ${from} to ${to}`, () => {
      const result = convert.value(value).from(from).to(to);
      // expect(+result.value).toBe(+expected);
      expect(isApproximatelyEqual(+result.value, +expected)).toBe(true);
    });
  });
});

describe("Test temperature conversions", () => {
  const temperatureTests: Array<TestValues> = [
    { value: 1, from: "celsius", to: "kelvin", expected: 274.15, unit: "K" },
    { value: 1, from: "celsius", to: "fahrenheit", expected: 33.8, unit: "°F" },
    { value: 1, from: "kelvin", to: "celsius", expected: -272.15, unit: "°C" },
    { value: 1, from: "kelvin", to: "fahrenheit", expected: -457.87, unit: "°F" },
    { value: 1, from: "fahrenheit", to: "celsius", expected: -17.22, unit: "°C" },
    { value: 1, from: "fahrenheit", to: "kelvin", expected: 255.93, unit: "K" },
  ];
  const convert = new Conversion();

  temperatureTests.forEach(({ value, from, to, expected }) => {
    test(`Converts ${value} ${from} to ${to}`, () => {
      const result = convert.value(value).from(from).to(to);
      expect(isApproximatelyEqual(+result.value, +expected)).toBe(true);
    });
  });
});

describe("Test weight conversions", () => {
  const weightTests: Array<TestValues> = [
    { value: 1, from: "gram", to: "kilogram", expected: 0.001, unit: "kg" },
    { value: 1, from: "gram", to: "pound", expected: 0.0022, unit: "lb" },
    { value: 1, from: "gram", to: "ounce", expected: 0.0353, unit: "oz" },
    { value: 1, from: "gram", to: "ton", expected: 0, unit: "ton" },
    { value: 1, from: "gram", to: "milligram", expected: 1000, unit: "mg" },
    { value: 1, from: "kilogram", to: "gram", expected: 1000, unit: "g" },
    { value: 1, from: "kilogram", to: "pound", expected: 2.2046, unit: "lb" },
    { value: 1, from: "kilogram", to: "ounce", expected: 35.274, unit: "oz" },
    { value: 1, from: "kilogram", to: "ton", expected: 0.001, unit: "ton" },
    { value: 1, from: "pound", to: "kilogram", expected: 0.4536, unit: "kg" },
    { value: 1, from: "pound", to: "gram", expected: 453.592, unit: "g" },
    { value: 1, from: "pound", to: "ounce", expected: 16, unit: "oz" },
    { value: 1, from: "pound", to: "ton", expected: 0.0005, unit: "ton" },
    { value: 1, from: "ounce", to: "kilogram", expected: 0.0283, unit: "kg" },
    { value: 1, from: "ounce", to: "pound", expected: 0.0625, unit: "lb" },
    { value: 1, from: "ounce", to: "gram", expected: 28.3495, unit: "g" },
    { value: 1, from: "ounce", to: "ton", expected: 0, unit: "ton" },
    { value: 1, from: "ton", to: "kilogram", expected: 1000, unit: "kg" },
    { value: 1, from: "ton", to: "pound", expected: 2204.6244, unit: "lb" },
    { value: 1, from: "ton", to: "ounce", expected: 35273.9907, unit: "oz" },
    { value: 1, from: "ton", to: "gram", expected: 1000000, unit: "g" },
  ];
  const convert = new Conversion({
    decimals: 4,
  });

  weightTests.forEach(({ value, from, to, expected }) => {
    test(`Converts ${value} ${from} to ${to}`, () => {
      const result = convert.value(value).from(from).to(to);
      expect(isApproximatelyEqual(+result.value, +expected)).toBe(true);
    });
  });
});

describe("Test time conversions", () => {
  const timeTests: Array<TestValues> = [
    { value: 1, from: "millisecond", to: "second", expected: 0.0, unit: "1s" },
    { value: 1, from: "millisecond", to: "minute", expected: 0, unit: "min" },
    { value: 1, from: "millisecond", to: "hour", expected: 0, unit: "h" },
    { value: 1, from: "millisecond", to: "day", expected: 0, unit: "d" },
    { value: 1, from: "millisecond", to: "week", expected: 0, unit: "wk" },
    { value: 1, from: "second", to: "millisecond", expected: 1000, unit: "ms" },
    { value: 1, from: "second", to: "minute", expected: 0.0167, unit: "min" },
    { value: 1, from: "second", to: "hour", expected: 0.0003, unit: "h" },
    { value: 1, from: "second", to: "day", expected: 0, unit: "d" },
    { value: 1, from: "second", to: "week", expected: 0, unit: "wk" },
    { value: 1, from: "minute", to: "millisecond", expected: 60000, unit: "ms" },
    { value: 1, from: "minute", to: "second", expected: 60, unit: "s" },
    { value: 1, from: "minute", to: "hour", expected: 0.0167, unit: "h" },
    { value: 1, from: "minute", to: "day", expected: 0.0007, unit: "d" },
    { value: 1, from: "minute", to: "week", expected: 0.0001, unit: "wk" },
    { value: 1, from: "hour", to: "millisecond", expected: 3600000, unit: "ms" },
    { value: 1, from: "hour", to: "minute", expected: 60, unit: "min" },
    { value: 1, from: "hour", to: "second", expected: 3600, unit: "s" },
    { value: 1, from: "hour", to: "day", expected: 0.0417, unit: "d" },
    { value: 1, from: "hour", to: "week", expected: 0.006, unit: "wk" },
    { value: 1, from: "day", to: "millisecond", expected: 86400000, unit: "ms" },
    { value: 1, from: "day", to: "minute", expected: 1440, unit: "min" },
    { value: 1, from: "day", to: "hour", expected: 24, unit: "h" },
    { value: 1, from: "day", to: "second", expected: 86400, unit: "s" },
    { value: 1, from: "day", to: "week", expected: 0.1429, unit: "wk" },
    { value: 1, from: "week", to: "millisecond", expected: 604800000, unit: "ms" },
    { value: 1, from: "week", to: "minute", expected: 10080, unit: "min" },
    { value: 1, from: "week", to: "hour", expected: 168, unit: "h" },
    { value: 1, from: "week", to: "second", expected: 604800, unit: "s" },
    { value: 1, from: "week", to: "day", expected: 7, unit: "d" },
  ];
  const convert = new Conversion({
    decimals: 4,
  });

  timeTests.forEach(({ value, from, to, expected }) => {
    test(`Converts ${value} ${from} to ${to}`, () => {
      const result = convert.value(value).from(from).to(to);
      expect(isApproximatelyEqual(+result.value, +expected)).toBe(true);
    });
  });
});

describe("Test volumes conversions", () => {
  const volumeTests: Array<TestValues> = [
    { value: 1, from: "liter", to: "milliliter", expected: 1000, unit: "ml" },
    { value: 1, from: "liter", to: "cubic-foot", expected: 0.0353, unit: "ft^3" },
    { value: 1, from: "liter", to: "cubic-inch", expected: 61.0237, unit: "in^3" },
    { value: 1, from: "liter", to: "cubic-meter", expected: 0.001, unit: "m^3" },
    { value: 1, from: "liter", to: "imperial-cup", expected: 3.5195, unit: "cup (UK)" },
    { value: 1, from: "liter", to: "us-legal-cup", expected: 4.2268, unit: "cup (US)" },
    { value: 1, from: "liter", to: "imperial-pint", expected: 1.7598, unit: "pt (UK)" },
    { value: 1, from: "liter", to: "us-liquid-pint", expected: 2.1134, unit: "pt (US)" },
    { value: 1, from: "liter", to: "imperial-fluid-ounce", expected: 35.1951, unit: "fl oz (UK)" },
    { value: 1, from: "milliliter", to: "liter", expected: 0.001, unit: "l" },
    { value: 1, from: "milliliter", to: "cubic-foot", expected: 0, unit: "ft^3" },
    { value: 1, from: "milliliter", to: "cubic-inch", expected: 0.061, unit: "in^3" },
    { value: 1, from: "milliliter", to: "cubic-meter", expected: 0, unit: "m^3" },
    { value: 1, from: "milliliter", to: "imperial-cup", expected: 0.0035, unit: "cup (UK)" },
    { value: 1, from: "milliliter", to: "us-legal-cup", expected: 0.0042, unit: "cup (US)" },
    { value: 1, from: "milliliter", to: "imperial-pint", expected: 0.0018, unit: "pt (UK)" },
    { value: 1, from: "milliliter", to: "us-liquid-pint", expected: 0.0021, unit: "pt (US)" },
    { value: 1, from: "milliliter", to: "imperial-fluid-ounce", expected: 0.0352, unit: "fl oz (UK)" },
    { value: 1, from: "cubic-foot", to: "liter", expected: 28.3168, unit: "l" },
    { value: 1, from: "cubic-foot", to: "milliliter", expected: 28316.85, unit: "ml" },
    { value: 1, from: "cubic-foot", to: "cubic-inch", expected: 1728.0002, unit: "in^3" },
    { value: 1, from: "cubic-foot", to: "cubic-meter", expected: 0.0283, unit: "m^3" },
    { value: 1, from: "cubic-foot", to: "us-legal-cup", expected: 119.6883, unit: "cup (US)" },
    { value: 1, from: "cubic-foot", to: "imperial-cup", expected: 99.6614, unit: "cup (UK)" },
    { value: 1, from: "cubic-foot", to: "imperial-pint", expected: 49.8307, unit: "pt (UK)" },
    { value: 1, from: "cubic-foot", to: "us-liquid-pint", expected: 59.8442, unit: "pt (US)" },
    { value: 1, from: "cubic-foot", to: "imperial-fluid-ounce", expected: 996.6138, unit: "fl oz (UK)" },
    { value: 1, from: "cubic-inch", to: "liter", expected: 0.0164, unit: "l" },
    { value: 1, from: "cubic-inch", to: "cubic-foot", expected: 0.0006, unit: "ft^3" },
    { value: 1, from: "cubic-inch", to: "milliliter", expected: 16.3871, unit: "ml" },
    { value: 1, from: "cubic-inch", to: "cubic-meter", expected: 0, unit: "m^3" },
    { value: 1, from: "cubic-inch", to: "imperial-cup", expected: 0.0577, unit: "cup (UK)" },
    { value: 1, from: "cubic-inch", to: "us-legal-cup", expected: 0.0693, unit: "cup (US)" },
    { value: 1, from: "cubic-inch", to: "imperial-pint", expected: 0.0288, unit: "pt (UK)" },
    { value: 1, from: "cubic-inch", to: "us-liquid-pint", expected: 0.0346, unit: "pt (US)" },
    { value: 1, from: "cubic-inch", to: "imperial-fluid-ounce", expected: 0.5767, unit: "fl oz (UK)" },
    { value: 1, from: "cubic-meter", to: "liter", expected: 1000, unit: "l" },
    { value: 1, from: "cubic-meter", to: "cubic-foot", expected: 35.3147, unit: "ft^3" },
    { value: 1, from: "cubic-meter", to: "cubic-inch", expected: 61023.7441, unit: "in^3" },
    { value: 1, from: "cubic-meter", to: "milliliter", expected: 1000000, unit: "ml" },
    { value: 1, from: "cubic-meter", to: "imperial-cup", expected: 3519.508, unit: "cup (UK)" },
    { value: 1, from: "cubic-meter", to: "us-legal-cup", expected: 4226.7528, unit: "cup (US)" },
    { value: 1, from: "cubic-meter", to: "imperial-pint", expected: 1759.754, unit: "pt (UK)" },
    { value: 1, from: "cubic-meter", to: "us-liquid-pint", expected: 2113.3764, unit: "pt (US)" },
    { value: 1, from: "cubic-meter", to: "imperial-fluid-ounce", expected: 35195.0797, unit: "fl oz (UK)" },
    { value: 1, from: "imperial-cup", to: "liter", expected: 0.2841, unit: "l" },
    { value: 1, from: "imperial-cup", to: "cubic-foot", expected: 0.01, unit: "ft^3" },
    { value: 1, from: "imperial-cup", to: "cubic-inch", expected: 17.3387, unit: "in^3" },
    { value: 1, from: "imperial-cup", to: "cubic-meter", expected: 0.0003, unit: "m^3" },
    { value: 1, from: "imperial-cup", to: "milliliter", expected: 284.1306, unit: "ml" },
    { value: 1, from: "imperial-cup", to: "us-legal-cup", expected: 1.2009, unit: "cup (US)" },
    { value: 1, from: "imperial-cup", to: "imperial-pint", expected: 0.5, unit: "pt (UK)" },
    { value: 1, from: "imperial-cup", to: "us-liquid-pint", expected: 0.6005, unit: "pt (US)" },
    { value: 1, from: "imperial-cup", to: "imperial-fluid-ounce", expected: 10, unit: "fl oz (UK)" },
    { value: 1, from: "us-legal-cup", to: "liter", expected: 0.2366, unit: "l" },
    { value: 1, from: "us-legal-cup", to: "cubic-foot", expected: 0.0084, unit: "ft^3" },
    { value: 1, from: "us-legal-cup", to: "cubic-inch", expected: 14.4375, unit: "in^3" },
    { value: 1, from: "us-legal-cup", to: "cubic-meter", expected: 0.0002, unit: "m^3" },
    { value: 1, from: "us-legal-cup", to: "milliliter", expected: 236.5882, unit: "ml" },
    { value: 1, from: "us-legal-cup", to: "imperial-cup", expected: 0.8327, unit: "cup (UK)" },
    { value: 1, from: "us-legal-cup", to: "imperial-pint", expected: 0.4163, unit: "pt (UK)" },
    { value: 1, from: "us-legal-cup", to: "us-liquid-pint", expected: 0.5, unit: "pt (US)" },
    { value: 1, from: "us-legal-cup", to: "imperial-fluid-ounce", expected: 8.3267, unit: "fl oz (UK)" },
    { value: 1, from: "imperial-pint", to: "liter", expected: 0.5683, unit: "l" },
    { value: 1, from: "imperial-pint", to: "cubic-foot", expected: 0.0201, unit: "ft^3" },
    { value: 1, from: "imperial-pint", to: "cubic-inch", expected: 34.6774, unit: "in^3" },
    { value: 1, from: "imperial-pint", to: "cubic-meter", expected: 0.0006, unit: "m^3" },
    { value: 1, from: "imperial-pint", to: "imperial-cup", expected: 2, unit: "cup (UK)" },
    { value: 1, from: "imperial-pint", to: "us-legal-cup", expected: 2.4019, unit: "cup (US)" },
    { value: 1, from: "imperial-pint", to: "milliliter", expected: 568.2612, unit: "ml" },
    { value: 1, from: "imperial-pint", to: "us-liquid-pint", expected: 1.2009, unit: "pt (US)" },
    { value: 1, from: "imperial-pint", to: "imperial-fluid-ounce", expected: 20, unit: "fl oz (UK)" },
    { value: 1, from: "us-liquid-pint", to: "liter", expected: 0.4732, unit: "l" },
    { value: 1, from: "us-liquid-pint", to: "cubic-foot", expected: 0.0167, unit: "ft^3" },
    { value: 1, from: "us-liquid-pint", to: "cubic-inch", expected: 28.875, unit: "in^3" },
    { value: 1, from: "us-liquid-pint", to: "cubic-meter", expected: 0.0005, unit: "m^3" },
    { value: 1, from: "us-liquid-pint", to: "imperial-cup", expected: 1.6653, unit: "cup (UK)" },
    { value: 1, from: "us-liquid-pint", to: "us-legal-cup", expected: 2, unit: "cup (US)" },
    { value: 1, from: "us-liquid-pint", to: "imperial-pint", expected: 0.8327, unit: "pt (UK)" },
    { value: 1, from: "us-liquid-pint", to: "milliliter", expected: 473.1765, unit: "ml" },
    { value: 1, from: "us-liquid-pint", to: "imperial-fluid-ounce", expected: 16.6535, unit: "fl oz (UK)" },
    { value: 1, from: "imperial-fluid-ounce", to: "liter", expected: 0.0284, unit: "l" },
    { value: 1, from: "imperial-fluid-ounce", to: "cubic-foot", expected: 0.001, unit: "ft^3" },
    { value: 1, from: "imperial-fluid-ounce", to: "cubic-inch", expected: 1.7339, unit: "in^3" },
    { value: 1, from: "imperial-fluid-ounce", to: "cubic-meter", expected: 0, unit: "m^3" },
    { value: 1, from: "imperial-fluid-ounce", to: "imperial-cup", expected: 0.1, unit: "cup (UK)" },
    { value: 1, from: "imperial-fluid-ounce", to: "us-legal-cup", expected: 0.1201, unit: "cup (US)" },
    { value: 1, from: "imperial-fluid-ounce", to: "imperial-pint", expected: 0.05, unit: "pt (UK)" },
    { value: 1, from: "imperial-fluid-ounce", to: "us-liquid-pint", expected: 0.06, unit: "pt (US)" },
    { value: 1, from: "imperial-fluid-ounce", to: "milliliter", expected: 28.413, unit: "ml" },
  ];
  const convert = new Conversion({
    decimals: 4,
  });

  volumeTests.forEach(({ value, from, to, expected }) => {
    test(`Converts ${value} ${from} to ${to}`, () => {
      const result = convert.value(value).from(from).to(to);
      expect(isApproximatelyEqual(+result.value, +expected)).toBe(true);
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
      const result = convert.value(value).from(from).to(to);
      expect(result.value).toBe(expected);
    });
  });
});

describe("Test pressure conversions", () => {
  const pressureTests: Array<TestValues> = [
    { value: 1, from: "pascal", to: "kilopascal", expected: 0.001, unit: "kPa" },
    { value: 1, from: "pascal", to: "atmosphere", expected: 0.0000098692, unit: "atm" },
    { value: 1, from: "pascal", to: "bar", expected: 0.00001, unit: "bar" },
    { value: 1, from: "pascal", to: "psi", expected: 0.0001450377, unit: "psi" },
    { value: 1, from: "kilopascal", to: "pascal", expected: 1000, unit: "Pa" },
    { value: 1, from: "kilopascal", to: "atmosphere", expected: 0.0098692327, unit: "atm" },
    { value: 1, from: "kilopascal", to: "bar", expected: 0.01, unit: "bar" },
    { value: 1, from: "kilopascal", to: "psi", expected: 0.1450377377, unit: "psi" },
    { value: 1, from: "atmosphere", to: "pascal", expected: 101325, unit: "Pa" },
    { value: 1, from: "atmosphere", to: "kilopascal", expected: 101.325, unit: "kPa" },
    { value: 1, from: "atmosphere", to: "bar", expected: 1.01325, unit: "bar" },
    { value: 1, from: "atmosphere", to: "psi", expected: 14.695948775, unit: "psi" },
    { value: 1, from: "bar", to: "pascal", expected: 100000, unit: "Pa" },
    { value: 1, from: "bar", to: "kilopascal", expected: 100, unit: "kPa" },
    { value: 1, from: "bar", to: "atmosphere", expected: 0.9869232667, unit: "atm" },
    { value: 1, from: "bar", to: "psi", expected: 14.503773773, unit: "psi" },
    { value: 1, from: "psi", to: "pascal", expected: 6894.7572932, unit: "Pa" },
    { value: 1, from: "psi", to: "kilopascal", expected: 6.8947572932, unit: "kPa" },
    { value: 1, from: "psi", to: "bar", expected: 0.0689475729, unit: "bar" },
    { value: 1, from: "psi", to: "atmosphere", expected: 0.0680459639, unit: "atm" },
  ];
  const convert = new Conversion();

  pressureTests.forEach(({ value, from, to, expected, unit }) => {
    test(`Converts ${value} ${from} to ${to}`, () => {
      const result = convert.value(value).from(from).to(to);
      expect(isApproximatelyEqual(+result.value, +expected)).toBe(true);
      expect(result.unit).toBe(unit);
    });
  });
});

describe("Test energy conversions", () => {
  const pressureTests: Array<TestValues> = [
    { value: 1, from: "joule", to: "kilojoule", expected: 0.001, unit: "kJ" },
    { value: 1, from: "joule", to: "calorie", expected: 0.0002388459, unit: "cal" },
    { value: 1, from: "joule", to: "calorie-international-table", expected: 0.2388458966, unit: "cal (IT)" },
    { value: 1, from: "joule", to: "calorie-thermochemical", expected: 0.2390057361, unit: "cal (th)" },
    { value: 1, from: "joule", to: "watt-hour", expected: 0.0002777778, unit: "Wh" },
    { value: 1, from: "joule", to: "kilowatt-hour", expected: 2.777777777 * 10 ** -7, unit: "kWh" },
    { value: 1, from: "joule", to: "electron-volt", expected: 6241509074461000000, unit: "eV" },

    { value: 1, from: "kilojoule", to: "joule", expected: 1000, unit: "J" },
    { value: 1, from: "kilojoule", to: "calorie", expected: 0.2388458966, unit: "cal" },
    { value: 1, from: "kilojoule", to: "calorie-international-table", expected: 238.84589663, unit: "cal (IT)" },
    { value: 1, from: "kilojoule", to: "calorie-thermochemical", expected: 239.00573614, unit: "cal (th)" },
    { value: 1, from: "kilojoule", to: "watt-hour", expected: 0.2777777778, unit: "Wh" },
    { value: 1, from: "kilojoule", to: "kilowatt-hour", expected: 0.0002777778, unit: "kWh" },
    { value: 1, from: "kilojoule", to: "electron-volt", expected: 6.241509074 * 10 ** 21, unit: "eV" },

    { value: 1, from: "calorie", to: "joule", expected: 4186.8, unit: "J" },
    { value: 1, from: "calorie", to: "kilojoule", expected: 4.1868, unit: "kJ" },
    { value: 1, from: "calorie", to: "calorie-international-table", expected: 1000, unit: "cal (IT)" },
    { value: 1, from: "calorie", to: "calorie-thermochemical", expected: 1000.6692161, unit: "cal (th)" },
    { value: 1, from: "calorie", to: "watt-hour", expected: 1.163, unit: "Wh" },
    { value: 1, from: "calorie", to: "kilowatt-hour", expected: 0.001163, unit: "kWh" },
    { value: 1, from: "calorie", to: "electron-volt", expected: 2.613195019 * 10 ** 22, unit: "eV" },

    { value: 1, from: "calorie-international-table", to: "joule", expected: 4.1868, unit: "J" },
    { value: 1, from: "calorie-international-table", to: "calorie", expected: 0.001, unit: "cal" },
    { value: 1, from: "calorie-international-table", to: "kilojoule", expected: 0.0041868, unit: "kJ" },
    {
      value: 1,
      from: "calorie-international-table",
      to: "calorie-thermochemical",
      expected: 1.0006692161,
      unit: "cal (th)",
    },
    { value: 1, from: "calorie-international-table", to: "watt-hour", expected: 0.001163, unit: "Wh" },
    {
      value: 1,
      from: "calorie-international-table",
      to: "kilowatt-hour",
      expected: 0.000001163,
      unit: "kWh",
    },
    { value: 1, from: "calorie-international-table", to: "electron-volt", expected: 26131950192952873000, unit: "eV" },

    { value: 1, from: "calorie-thermochemical", to: "joule", expected: 4.184, unit: "J" },
    { value: 1, from: "calorie-thermochemical", to: "calorie", expected: 0.0009993312, unit: "cal" },
    {
      value: 1,
      from: "calorie-thermochemical",
      to: "calorie-international-table",
      expected: 0.9993312315,
      unit: "cal (IT)",
    },
    { value: 1, from: "calorie-thermochemical", to: "kilojoule", expected: 0.004184, unit: "kJ" },
    { value: 1, from: "calorie-thermochemical", to: "watt-hour", expected: 0.0011622222, unit: "Wh" },
    { value: 1, from: "calorie-thermochemical", to: "kilowatt-hour", expected: 0.0000011622, unit: "kWh" },
    { value: 1, from: "calorie-thermochemical", to: "electron-volt", expected: 26114473967544530000, unit: "eV" },

    { value: 1, from: "watt-hour", to: "joule", expected: 3600, unit: "J" },
    { value: 1, from: "watt-hour", to: "calorie", expected: 0.8598452279, unit: "cal" },
    { value: 1, from: "watt-hour", to: "calorie-international-table", expected: 859.84522786, unit: "cal (IT)" },
    { value: 1, from: "watt-hour", to: "calorie-thermochemical", expected: 860.4206501, unit: "cal (th)" },
    { value: 1, from: "watt-hour", to: "kilojoule", expected: 3.6, unit: "kJ" },
    { value: 1, from: "watt-hour", to: "kilowatt-hour", expected: 0.001, unit: "kWh" },
    { value: 1, from: "watt-hour", to: "electron-volt", expected: 2.246943266 * 10 ** 22, unit: "eV" },

    { value: 1, from: "kilowatt-hour", to: "joule", expected: 3600000, unit: "J" },
    { value: 1, from: "kilowatt-hour", to: "calorie", expected: 859.84522786, unit: "cal" },
    { value: 1, from: "kilowatt-hour", to: "calorie-international-table", expected: 859845.22786, unit: "cal (IT)" },
    { value: 1, from: "kilowatt-hour", to: "calorie-thermochemical", expected: 860420.6501, unit: "cal (th)" },
    { value: 1, from: "kilowatt-hour", to: "watt-hour", expected: 1000, unit: "Wh" },
    { value: 1, from: "kilowatt-hour", to: "kilojoule", expected: 3600, unit: "kJ" },
    { value: 1, from: "kilowatt-hour", to: "electron-volt", expected: 2.246943266 * 10 ** 25, unit: "eV" },

    { value: 1, from: "electron-volt", to: "joule", expected: 1.602176633 * 10 ** -19, unit: "J" },
    { value: 1, from: "electron-volt", to: "calorie", expected: 3.826733147 * 10 ** -23, unit: "cal" },
    {
      value: 1,
      from: "electron-volt",
      to: "calorie-international-table",
      expected: 3.826733147 * 10 ** -20,
      unit: "cal (IT)",
    },
    {
      value: 1,
      from: "electron-volt",
      to: "calorie-thermochemical",
      expected: 3.829294058 * 10 ** -20,
      unit: "cal (th)",
    },
    { value: 1, from: "electron-volt", to: "watt-hour", expected: 4.450490649 * 10 ** -23, unit: "Wh" },
    { value: 1, from: "electron-volt", to: "kilojoule", expected: 1.602176633 * 10 ** -22, unit: "kJ" },
    { value: 1, from: "electron-volt", to: "kilowatt-hour", expected: 4.450490649 * 10 ** -26, unit: "kWh" },
  ];

  const convert = new Conversion();

  pressureTests.forEach(({ value, from, to, expected, unit }) => {
    test(`Converts ${value} ${from} to ${to}`, () => {
      const result = convert.value(value).from(from).to(to);
      expect(isApproximatelyEqual(+result.value, +expected)).toBe(true);
      expect(result.unit).toBe(unit);
    });
  });
});

describe("Test force conversions", () => {
  const forceTests: Array<TestValues> = [
    { value: 1, from: "newton", to: "pound-force", expected: "0.2248lbf" },
    { value: 1, from: "newton", to: "kilogram-force", expected: "0.1019kgf" },
    { value: 1, from: "newton", to: "dyne", expected: "100000dyn" },
    { value: 1, from: "newton", to: "poundal", expected: "7.2330pdl" },
    { value: 1, from: "dyne", to: "newton", expected: "0.00001N" },
    { value: 1, from: "dyne", to: "pound-force", expected: "0lbf" },
    { value: 1, from: "dyne", to: "kilogram-force", expected: "0kgf" },
    { value: 1, from: "dyne", to: "poundal", expected: "0.0001pdl" },
    { value: 1, from: "poundal", to: "newton", expected: "0.1383N" },
    { value: 1, from: "poundal", to: "dyne", expected: "13825.5dyn" },
    { value: 1, from: "poundal", to: "pound-force", expected: "0.03108lbf" },
    { value: 1, from: "poundal", to: "kilogram-force", expected: "0.01409kgf" },
    { value: 1, from: "pound-force", to: "newton", expected: "4.4482N" },
    { value: 1, from: "pound-force", to: "kilogram-force", expected: "0.4536kgf" },
    { value: 1, from: "kilogram-force", to: "newton", expected: "9.8066N" },
    { value: 1, from: "kilogram-force", to: "pound-force", expected: "2.2046lbf" },
  ];
  const convert = new Conversion({
    decimals: 4,
  });

  forceTests.forEach(({ value, from, to, expected }) => {
    test(`Converts ${value} ${from} to ${to}`, () => {
      expect(convert.value(value).from(from).to(to)).toBe(expected);
    });
  });
});
