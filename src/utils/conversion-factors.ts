export interface ConversionFactorGroups {
	[category: string]: {
		[unit: string]: ConversionFactor;
	};
}

export interface ConversionFactor {
	isBaseUnit?: boolean;
	toBase: (v: number) => number;
	fromBase: (v: number) => number;
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
};
