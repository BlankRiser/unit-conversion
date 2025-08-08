import { type AllUnits, UNITS } from "../constants/units.js";
import type { CONVERSION_FACTORS } from "./conversion-factors.js";

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
