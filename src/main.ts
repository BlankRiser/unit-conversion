import { type ConversionConfig, DEFAULT_CONFIG } from "./constants/config";
import { LABELS } from "./constants/labels";
import type { AllUnits, UnitCategory } from "./constants/units";
import { getUnitCategory } from "./utils/common";
import {
  CONVERSION_FACTORS,
  type ConversionFactor,
} from "./utils/conversion-factors";

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
class ValueWithFrom<T extends number> {
  constructor(private val: T, private config: ConversionConfig) {}

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
class FromUnit<T extends number, F extends AllUnits> {
  constructor(
    private val: T,
    private fromUnit: F,
    private config: ConversionConfig
  ) {}

  to<U extends UnitCategory<F>>(unit: U): number | string {
    const category = getUnitCategory(this.fromUnit);
    const categoryFactors = CONVERSION_FACTORS[category];

    const fromUnitFactors =
      (categoryFactors as Record<F, ConversionFactor>)[this.fromUnit] ?? null;
    const toUnitFactors =
      (categoryFactors as Record<U, ConversionFactor>)[unit] ?? null;

    if (!fromUnitFactors || !toUnitFactors) {
      throw new Error(`Cannot convert from ${this.fromUnit} to ${unit}`);
    }

    // Convert from source unit to base unit, then to target unit
    const baseValue = fromUnitFactors.toBase(this.val);
    const numericResult = toUnitFactors.fromBase(baseValue);

    const finalValue =
      this.config.isFloat === false
        ? Math.round(numericResult)
        : Number(numericResult.toFixed(this.config.decimals ?? 2));

    // Return with unit label if includeUnit is true (default)
    if (this.config.includeUnit !== false) {
      const unitLabel = LABELS[unit as keyof typeof LABELS] || unit;
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
