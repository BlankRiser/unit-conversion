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
export function getUnitCategory(
	unit: AllUnits,
): keyof typeof CONVERSION_FACTORS {
	if (UNITS.temperature.includes(unit)) return "temperature";
	if (UNITS.length.includes(unit)) return "length";
	if (UNITS.weight.includes(unit)) return "weight";
	if (UNITS.volume.includes(unit)) return "volume";
	if (UNITS.time.includes(unit)) return "time";

	throw new Error(`Unknown unit: ${unit}`);
}
