type ConversionFactorCallback =
  | ((v: string) => string)
  | ((v: number) => number)
  | ((v: number) => string)
  | ((v: string) => number);

export interface ConversionFactor {
  /**
   * Indicates if this unit is the base unit for its category.
   * If true, conversion functions will treat this unit as the reference point.
   * For example, in the length category, "meter" is the base unit.
   */
  isBaseUnit?: boolean;
  /**
   * Converts a value from this unit to the base unit of its category.
   * For example, if this unit is "kilometer", it converts from kilometers to meters.
   * @param v - The value to convert
   * @returns The value in the base unit
   */
  toBase: ConversionFactorCallback;
  /**
   * Converts a value from the base unit of its category to this unit.
   * For example, if this unit is "kilometer", it converts from meters to kilometers.
   * @param v - The value in the base unit
   * @returns The value in this unit
   */
  fromBase: ConversionFactorCallback;
}

/**
 * Represents a group of conversion factors for different units.
 */
interface ConversionFactorGroups {
  [category: string]: {
    [unit: string]: ConversionFactor;
  };
}

/**
 * Comprehensive conversion factors for various unit categories.
 *
 * This object contains conversion factors organized by unit categories (temperature, length, weight, volume, time).
 * Each category defines a base unit and conversion functions to/from that base unit for all supported units
 * in that category.
 *
 * @constant
 * @type {ConversionFactorGroups}
 *
 * @property {Object} temperature - Temperature conversions with Kelvin as base unit
 * @property {Object} length - Length conversions with meter as base unit
 * @property {Object} weight - Weight conversions with gram as base unit
 * @property {Object} volume - Volume conversions with liter as base unit
 * @property {Object} time - Time conversions with second as base unit
 * @property {Object} force - Force conversions with Newton as base unit
 */
export const CONVERSION_FACTORS: ConversionFactorGroups = {
  // Temperature (base: Kelvin)
  temperature: {
    kelvin: {
      isBaseUnit: true,
      toBase: (v: number) => v,
      fromBase: (v: number) => v,
    },
    celsius: {
      toBase: (v: number) => v + 273.15,
      fromBase: (v: number) => v - 273.15,
    },
    fahrenheit: {
      toBase: (v: number) => ((v - 32) * 5) / 9 + 273.15,
      fromBase: (v: number) => ((v - 273.15) * 9) / 5 + 32,
    },
  },

  // Length (base: meter)
  length: {
    meter: {
      isBaseUnit: true,
      toBase: (v: number) => v,
      fromBase: (v: number) => v,
    },
    kilometer: {
      toBase: (v: number) => v * 1000,
      fromBase: (v: number) => v / 1000,
    },
    centimeter: {
      toBase: (v: number) => v / 100,
      fromBase: (v: number) => v * 100,
    },
    millimeter: {
      toBase: (v: number) => v / 1000,
      fromBase: (v: number) => v * 1000,
    },
    inch: {
      toBase: (v: number) => v * 0.0254,
      fromBase: (v: number) => v / 0.0254,
    },
    foot: {
      toBase: (v: number) => v * 0.3048,
      fromBase: (v: number) => v / 0.3048,
    },
    yard: {
      toBase: (v: number) => v * 0.9144,
      fromBase: (v: number) => v / 0.9144,
    },
    mile: {
      toBase: (v: number) => v * 1609.344,
      fromBase: (v: number) => v / 1609.344,
    },
  },

  // Weight (base: gram)
  weight: {
    gram: {
      isBaseUnit: true,
      toBase: (v: number) => v,
      fromBase: (v: number) => v,
    },
    milligram: {
      isBaseUnit: true,
      toBase: (v: number) => v / 1000,
      fromBase: (v: number) => v * 1000,
    },
    kilogram: {
      toBase: (v: number) => v * 1000,
      fromBase: (v: number) => v / 1000,
    },
    pound: {
      toBase: (v: number) => v * 453.592,
      fromBase: (v: number) => v / 453.592,
    },
    ounce: {
      toBase: (v: number) => v * 28.3495,
      fromBase: (v: number) => v / 28.3495,
    },
    ton: {
      toBase: (v: number) => v * 1_000_000,
      fromBase: (v: number) => v / 1_000_000,
    },
  },

  // Volume (base: liter)
  volume: {
    liter: {
      isBaseUnit: true,
      toBase: (v: number) => v,
      fromBase: (v: number) => v,
    },
    milliliter: {
      toBase: (v: number) => v / 1000,
      fromBase: (v: number) => v * 1000,
    },
    "cubic-meter": {
      toBase: (v: number) => v / 0.001,
      fromBase: (v: number) => v * 0.001,
    },
    "cubic-centimeter": {
      toBase: (v: number) => v / 1000,
      fromBase: (v: number) => v * 1000,
    },
    "cubic-foot": {
      toBase: (v: number) => v * 28.31685,
      fromBase: (v: number) => v / 28.31685,
    },
    "cubic-inch": {
      toBase: (v: number) => v / 61.023744095,
      fromBase: (v: number) => v * 61.023744095,
    },
    "imperial-cup": {
      toBase: (v: number) => v / 3.5195079728,
      fromBase: (v: number) => v * 3.5195079728,
    },
    "us-legal-cup": {
      toBase: (v: number) => v / 4.2267528377,
      fromBase: (v: number) => v * 4.2267528377,
    },
    "us-gallon": {
      toBase: (v: number) => v / 0.2641720524,
      fromBase: (v: number) => v * 0.2641720524,
    },
    "imperial-gallon": {
      toBase: (v: number) => v / 0.2199692483,
      fromBase: (v: number) => v * 0.2199692483,
    },
    "us-liquid-pint": {
      toBase: (v: number) => v / 2.1133764189,
      fromBase: (v: number) => v * 2.1133764189,
    },
    "imperial-pint": {
      toBase: (v: number) => v / 1.7597539864,
      fromBase: (v: number) => v * 1.7597539864,
    },
    "imperial-fluid-ounce": {
      toBase: (v: number) => v / 35.195079728,
      fromBase: (v: number) => v * 35.195079728,
    },
  },

  // Time (base: second)
  time: {
    second: {
      isBaseUnit: true,
      toBase: (v: number) => v,
      fromBase: (v: number) => v,
    },
    millisecond: {
      toBase: (v: number) => v / 1000,
      fromBase: (v: number) => v * 1000,
    },
    minute: { toBase: (v: number) => v * 60, fromBase: (v: number) => v / 60 },
    hour: {
      toBase: (v: number) => v * 3600,
      fromBase: (v: number) => v / 3600,
    },
    day: {
      toBase: (v: number) => v * 86_400,
      fromBase: (v: number) => v / 86_400,
    },
    week: {
      toBase: (v: number) => v * 604_800,
      fromBase: (v: number) => v / 604_800,
    },
  },

  // Number (base: base10)
  number: {
    decimal: {
      isBaseUnit: true,
      toBase: (v: number) => v,
      fromBase: (v: number) => v,
    },
    binary: {
      fromBase: (decimalValue: number) => {
        if (decimalValue === 0) return 0;
        if (decimalValue < 0) throw new Error("Negative numbers are not supported");
        if (!Number.isInteger(decimalValue)) throw new Error("Only integers are supported");

        let binary = "";
        let num = decimalValue;

        while (num > 0) {
          binary = (num % 2) + binary;
          num = Math.floor(num / 2);
        }

        return parseInt(binary);
      },
      toBase: (binary: number) => {
        if (binary === 0) return 0;
        if (binary < 0) throw new Error("Negative numbers are not supported");
        if (!Number.isInteger(binary)) throw new Error("Only integers are supported");
        const binaryStr = binary.toString();
        if (!/^[01]+$/.test(binaryStr)) {
          throw new Error("Invalid binary number: must contain only 0s and 1s");
        }

        let decimal = 0;
        let position = 0;
        let num = binary;

        while (num > 0) {
          const digit = num % 10;
          decimal += digit * 2 ** position;
          num = Math.floor(num / 10);
          position++;
        }

        return decimal;
      },
    },
    base8: {
      toBase: (octal: number) => {
        if (octal === 0) return 0;
        if (octal < 0) throw new Error("Negative numbers are not supported");
        if (!Number.isInteger(octal)) throw new Error("Only integers are supported");

        const octalStr = octal.toString();
        if (!/^[0-7]+$/.test(octalStr)) {
          throw new Error("Invalid octal number: must contain only digits 0-7");
        }

        let decimal = 0;
        let position = 0;
        let num = octal;

        while (num > 0) {
          const digit = num % 10;
          decimal += digit * 8 ** position;
          num = Math.floor(num / 10);
          position++;
        }

        return decimal;
      },
      fromBase: (decimal: number): number => {
        if (decimal === 0) return 0;
        if (decimal < 0) throw new Error("Negative numbers are not supported");
        if (!Number.isInteger(decimal)) throw new Error("Input must be an integer");

        let num = Math.abs(decimal);
        let result = "";

        while (num > 0) {
          const remainder = num % 8;
          result = remainder.toString() + result;
          num = Math.floor(num / 8);
        }

        return parseInt(result);
      },
    },
    hexadecimal: {
      toBase: (hex: number | string) => {
        let hexValue = hex.toString().trim();
        // Remove optional 0x/0X prefix if present
        if (/^0x/i.test(hexValue)) hexValue = hexValue.slice(2);
        if (!/^[0-9A-Fa-f]+$/.test(hexValue)) {
          throw new Error("Invalid hexadecimal number: must contain valid hex digits");
        }
        return parseInt(hexValue, 16);
      },
      fromBase: (decimal: number): string => {
        if (decimal === 0) return "0";
        if (decimal < 0) throw new Error("Negative numbers are not supported");
        if (!Number.isInteger(decimal)) throw new Error("Input must be an integer");

        let num = Math.abs(decimal);

        const hexDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];

        let result = "";

        // Convert to base-16 by repeatedly dividing by 16 and collecting remainders
        while (num > 0) {
          const remainder = num % 16;
          result = hexDigits[remainder] + result;
          num = Math.floor(num / 16);
        }

        return result;
      },
    },
  },

  // Pressure (base: pascal)
  pressure: {
    pascal: {
      isBaseUnit: true,
      toBase: (v: number) => v,
      fromBase: (v: number) => v,
    },
    kilopascal: {
      isBaseUnit: true,
      toBase: (v: number) => v * 1000,
      fromBase: (v: number) => v / 1000,
    },
    bar: {
      toBase: (v: number) => v * 100_000,
      fromBase: (v: number) => v / 100_000,
    },
    psi: {
      toBase: (v: number) => v * 6894.76,
      fromBase: (v: number) => v / 6894.76,
    },
    atmosphere: {
      toBase: (v: number) => v * 101325,
      fromBase: (v: number) => v / 101325,
    },
  },

  // Energy (base: joule)
  energy: {
    joule: { toBase: (v: number) => v, fromBase: (v: number) => v },
    kilojoule: { toBase: (v: number) => v * 1000, fromBase: (v: number) => v / 1000 },
    calorie: { toBase: (v: number) => v / 0.0002388459, fromBase: (v: number) => v * 0.0002388459 },
    "calorie-international-table": {
      toBase: (v: number) => v / 0.2388458966,
      fromBase: (v: number) => v * 0.2388458966,
    },
    "calorie-thermochemical": { toBase: (v: number) => v / 0.2390057361, fromBase: (v: number) => v * 0.2390057361 },
    "watt-hour": { toBase: (v: number) => v / 0.0002777778, fromBase: (v: number) => v * 0.0002777778 },
    "kilowatt-hour": {
      toBase: (v: number) => v / (2.777777777 * 10 ** -7),
      fromBase: (v: number) => v * (2.777777777 * 10 ** -7),
    },
    "electron-volt": {
      toBase: (v: number) => v / 6241509074461000000,
      fromBase: (v: number) => v * 6241509074461000000,
    },
  },
  // Angle (base: radian)

  // Force (base: newton)
  force: {
    newton: {
      isBaseUnit: true,
      toBase: (v: number) => v,
      fromBase: (v: number) => v,
    },
    dyne: {
      toBase: (v: number) => v * 1e-5,
      fromBase: (v: number) => v / 1e-5,
    },
    poundal: {
      toBase: (v: number) => v * 0.138255,
      fromBase: (v: number) => v / 0.138255,
    },
    "pound-force": {
      toBase: (v: number) => v * 4.44822,
      fromBase: (v: number) => v / 4.44822,
    },
    "kilogram-force": {
      toBase: (v: number) => v / 0.1019716213,
      fromBase: (v: number) => v * 0.1019716213,
    },
  },
};
