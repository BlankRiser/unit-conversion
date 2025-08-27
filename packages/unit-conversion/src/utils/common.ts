import { type AllUnits, UNITS } from "../constants/units.js";
import type { CONVERSION_FACTORS } from "./conversion-factors.js";

/**
 * Determines the category of a given unit.
 *
 * @param unit - The unit to categorize
 * @returns The category of the unit as a key of the CONVERSION_FACTORS object
 * @throws Error when the provided unit does not belong to any known category
 *
 * @example
 * // Returns "length"
 * getUnitCategory("meter");
 *
 * @example
 * // Returns "temperature"
 * getUnitCategory("celsius");
 *
 * @example
 * // Throws an Error
 * getUnitCategory("unknown_unit");
 */
export function getUnitCategory(unit: AllUnits): keyof typeof CONVERSION_FACTORS {
  if (isUnitInCategory(unit, "temperature")) return "temperature";
  if (isUnitInCategory(unit, "length")) return "length";
  if (isUnitInCategory(unit, "weight")) return "weight";
  if (isUnitInCategory(unit, "volume")) return "volume";
  if (isUnitInCategory(unit, "time")) return "time";
  if (isUnitInCategory(unit, "number")) return "number";

  throw new Error(`Unknown unit: ${unit}`);
}

// Narrowing helper: checks if a unit belongs to a given category and narrows its type accordingly
function isUnitInCategory<T extends keyof typeof UNITS>(
  unit: AllUnits,
  category: T,
): unit is (typeof UNITS)[T][number] {
  // We deliberately widen the array element type to AllUnits for the includes check,
  // then use the type predicate to expose the precise narrowed type to callers.
  return (UNITS[category] as ReadonlyArray<AllUnits>).includes(unit);
}
