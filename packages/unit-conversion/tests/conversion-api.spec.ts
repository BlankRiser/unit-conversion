import { describe, expect, test } from "vitest";
import { Conversion } from "../src";
import { isApproximatelyEqual } from "./test-utils";

test("Check conversion config", () => {
  const withFloat = new Conversion({
    isFloat: true,
  });

  const resultWithFloat = withFloat(12).from("celsius").to("kelvin");

  const withoutFloat = new Conversion({
    isFloat: false,
  });

  const resultWithoutFloat = withoutFloat(12).from("celsius").to("kelvin");

  expect(isApproximatelyEqual(+resultWithFloat.value, 285)).toBe(true);
  expect(isApproximatelyEqual(+resultWithoutFloat.value, 285)).toBe(true);
});

describe("Check locale", () => {
  const locales = [
    { locale: "en-US", value: 1234567.89, name: "English (US)", expected: "1,234,567.89" },
    { locale: "en-GB", value: 1234567.89, name: "English (UK)", expected: "1,234,567.89" },
    { locale: "de-DE", value: 1234567.89, name: "German (Germany)", expected: "1.234.567,89" },
    {
      locale: "fr-FR",
      value: 1234567.89,
      name: "French (France)",
      expected: "1\u202f234\u202f567,89", // same as "1 234 567,89"
      // NB: \u202f is a narrow no-break space so that the test works consistently across environments
    },
    { locale: "hi-IN", value: 1234567.89, name: "Hindi (India)", expected: "12,34,567.89" },
    { locale: "ar-EG", value: 1234567.89, name: "Arabic (Egypt)", expected: "١٬٢٣٤٬٥٦٧٫٨٩" },
    {
      locale: "ru-RU",
      value: 1234567.89,
      name: "Russian (Russia)",
      expected: "1\u00a0234\u00a0567,89", // same as "1 234 567,89"
      // NB: \u00a0 is a no-break space so that the test works consistently across environments
    },
    { locale: "ja-JP", value: 1234567.89, name: "Japanese (Japan)", expected: "1,234,567.89" },
    { locale: "zh-CN", value: 1234567.89, name: "Chinese (China)", expected: "1,234,567.89" },
    { locale: "pt-BR", value: 1234567.89, name: "Portuguese (Brazil)", expected: "1.234.567,89" },
  ];

  locales.forEach(({ locale, value, expected }) => {
    test(`Get locale ${value} as ${locale}: ${expected}`, () => {
      const result = new Conversion({ locale })(1234567.89).from("decimal").to("decimal");
      expect(result.value).equal(expected);
    });
  });
});

describe("Callable Conversion API", () => {
  test("should work with callable syntax", () => {
    const conversion = new Conversion();

    const result1 = conversion.value(5).from("meter").to("foot");
    const result2 = conversion(5).from("meter").to("foot");

    expect(result1.value).toBe(result2.value);
  });

  test("should work with string values", () => {
    const conversion = new Conversion();

    const result1 = conversion.value("10").from("decimal").to("binary");
    const result2 = conversion("10").from("decimal").to("binary");

    expect(result1.value).toBe(result2.value);
  });

  test("should work with different configurations", () => {
    const conversion = new Conversion({ decimals: 3 });

    const result = conversion(1).from("meter").to("foot");

    expect(result.unit).toBe("ft");
    expect(typeof result.value).toBe("number");
  });
});
