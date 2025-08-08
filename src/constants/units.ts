export const UNITS = {
	temperature: ["celsius", "fahrenheit", "kelvin"],
	length: [
		"meter",
		"kilometer",
		"centimeter",
		"millimeter",
		"inch",
		"foot",
		"yard",
		"mile",
	],
	weight: ["gram", "kilogram", "pound", "ounce", "ton"],
	volume: [
		"liter",
		"milliliter",
		"gallon",
		"quart",
		"pint",
		"cup",
		"fluid-ounce",
	],
	time: ["second", "minute", "hour", "day", "week", "month", "year"],
};

export type TemperatureUnits = "celsius" | "fahrenheit" | "kelvin";

export type LengthUnits =
	| "meter"
	| "kilometer"
	| "centimeter"
	| "millimeter"
	| "inch"
	| "foot"
	| "yard"
	| "mile";
export type WeightUnits = "gram" | "kilogram" | "pound" | "ounce" | "ton";

export type VolumeUnits =
	| "liter"
	| "milliliter"
	| "gallon"
	| "quart"
	| "pint"
	| "cup"
	| "fluid-ounce";

export type TimeUnits =
	| "second"
	| "minute"
	| "hour"
	| "day"
	| "week"
	| "month"
	| "year";

export type AllUnits =
	| TemperatureUnits
	| LengthUnits
	| WeightUnits
	| VolumeUnits
	| TimeUnits;

export type UnitCategory<T extends AllUnits> = T extends TemperatureUnits
	? TemperatureUnits
	: T extends LengthUnits
		? LengthUnits
		: T extends WeightUnits
			? WeightUnits
			: T extends VolumeUnits
				? VolumeUnits
				: T extends TimeUnits
					? TimeUnits
					: never;
