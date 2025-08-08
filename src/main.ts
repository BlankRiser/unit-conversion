import { type ConversionConfig, DEFAULT_CONFIG } from "./constants/config.js";
import { LABELS } from "./constants/labels.js";
import type { AllUnits, UnitCategory } from "./constants/units.js";
import { getUnitCategory } from "./utils/common.js";
import {
	CONVERSION_FACTORS,
	type ConversionFactor,
} from "./utils/conversion-factors.js";

class ValueWithFrom<T extends number> {
	constructor(
		private val: T,
		private config: ConversionConfig,
	) {}

	from<U extends AllUnits>(unit: U): FromUnit<T, U> {
		return new FromUnit(this.val, unit, this.config);
	}
}

class FromUnit<T extends number, F extends AllUnits> {
	constructor(
		private val: T,
		private fromUnit: F,
		private config: ConversionConfig,
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
