import { type ConversionConfig, DEFAULT_CONFIG } from "./constants/config";
import { LABELS } from "./constants/labels";
import { type AllUnits, NO_UNITS_CATEGORIES, type UnitCategory } from "./constants/units";
import { getUnitCategory } from "./utils/common";
import { CONVERSION_FACTORS, type ConversionFactor } from "./utils/conversion-factors";

type InputValue = number | string;

/**
 * Represents a value with conversion capabilities.
 *
 * This class encapsulates a numeric value along with configuration
 * for unit conversions. It provides the starting point for a fluent API
 * to perform unit conversions.
 *
 * @template T The numeric type of the value, constrained to number
 *
 * @example
 * ```ts
 * // Creating a value and converting from meters to feet
 * const length = new ValueWithFrom(5, config).from('m').to('ft');
 * ```
 */
class ValueWithFrom<T extends InputValue> {
  constructor(
    private val: T,
    private config: ConversionConfig,
  ) {}

  from<U extends AllUnits>(unit: U): FromUnit<T, U> {
    return new FromUnit(this.val, unit, this.config);
  }
}

/**
 * Represents a value with a specific unit of measurement and provides conversion functionality.
 *
 * @template T - The numeric type of the value (extends number)
 * @template F - The unit type of the value (must be one of AllUnits)
 *
 * @example
 * ```ts
 * // Convert 100 kilometers to miles
 * const distance = new FromUnit(100, 'km', { decimals: 2, includeUnit: true });
 * const inMiles = distance.to('mi'); // Returns "62.14mi"
 * ```
 */
class FromUnit<T extends InputValue, F extends AllUnits> {
  constructor(
    private value: T,
    private fromUnit: F,
    private config: ConversionConfig,
  ) {}

  to<U extends UnitCategory<F>>(unit: U): InputValue {
    const category = getUnitCategory(this.fromUnit);
    const categoryFactors = CONVERSION_FACTORS[category];

    const fromUnitFactors = (categoryFactors as Record<F, ConversionFactor>)[this.fromUnit] ?? null;
    const toUnitFactors = (categoryFactors as Record<U, ConversionFactor>)[unit] ?? null;

    if (!fromUnitFactors || !toUnitFactors) {
      throw new Error(`Cannot convert from ${this.fromUnit} to ${unit}`);
    }

    // Handle type conversion properly based on input type
    let baseValue: number | string;
    if (typeof this.value === "number") {
      baseValue = (fromUnitFactors.toBase as (v: number) => InputValue)(this.value);
    } else {
      // Convert string to number for calculations
      const numericValue = parseFloat(this.value as string);
      if (Number.isNaN(numericValue)) {
        throw new Error(`Invalid numeric value: ${this.value}`);
      }
      baseValue = (fromUnitFactors.toBase as (v: number) => InputValue)(numericValue);
    }

    // Convert baseValue to number if it's a string for the final conversion
    const baseNumeric = typeof baseValue === "string" ? parseFloat(baseValue) : baseValue;
    if (Number.isNaN(baseNumeric)) {
      throw new Error(`Invalid base value after conversion: ${baseValue}`);
    }

    const numericResult = (toUnitFactors.fromBase as (v: number) => InputValue)(baseNumeric);

    let finalValue = numericResult;
    if (typeof numericResult === "number") {
      finalValue =
        this.config.isFloat === false
          ? Math.round(numericResult)
          : Number(numericResult.toFixed(this.config.decimals ?? 2));
    }

    // Return with unit label if includeUnit is true (default)
    if (this.config.includeUnit !== false) {
      const unitLabel = LABELS[unit as keyof typeof LABELS] || unit;
      if (NO_UNITS_CATEGORIES.includes(category.toString())) {
        return finalValue;
      }
      return `${finalValue}${unitLabel}`;
    }

    return finalValue;
  }
}

/**
 * Represents a utility class for unit conversions.
 *
 * The Conversion class provides a fluent API for converting values between different units.
 * It allows customization through configuration options passed to the constructor.
 *
 * @example
 * ```ts
 * const conversion = new Conversion();
 * const result = conversion.value(5).from('meters').to('feet');
 * ```
 */
export class Conversion {
  private config: ConversionConfig;

  constructor(config: ConversionConfig = DEFAULT_CONFIG) {
    this.config = {
      ...DEFAULT_CONFIG,
      ...config,
    };
  }

  value<T extends number>(val: T): ValueWithFrom<T> {
    return new ValueWithFrom(val, this.config);
  }
}
