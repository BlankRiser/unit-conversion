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
	| "us-legal-cup"
	| "imperial-cup"
	| "us-liquid-pint"
	| "imperial-pint"
	| "us-legal-fluid-ounce"
	| "imperial-fluid-ounce"
	| "cubic-meter"
	| "cubic-foot"
	| "cubic-inch";

export type TimeUnits =
	| "millisecond"
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

export type ALL_UNITS = {
	temperature: TemperatureUnits[];
	length: LengthUnits[];
	weight: WeightUnits[];
	volume: VolumeUnits[];
	time: TimeUnits[];
};

/**
 * Constants for unit conversion.
 * @module UNITS
 * @description
 * This module exports a collection of units organized by measurement category.
 *
 * @property {string[]} temperature - Units for temperature measurements (celsius, fahrenheit, kelvin)
 * @property {string[]} length - Units for length measurements (meter, kilometer, centimeter, millimeter, inch, foot, yard, mile)
 * @property {string[]} weight - Units for weight measurements (gram, kilogram, pound, ounce, ton)
 * @property {string[]} volume - Units for volume measurements (liter, milliliter, gallon, quart, pint, cup, fluid-ounce)
 * @property {string[]} time - Units for time measurements (second, minute, hour, day, week, month, year)
 */
export const UNITS: ALL_UNITS = {
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
		"us-legal-cup",
		"us-legal-cup",
		"imperial-cup",
		"us-liquid-pint",
		"imperial-pint",
		"us-legal-fluid-ounce",
		"imperial-fluid-ounce",
		"cubic-meter",
		"cubic-foot",
		"cubic-inch",
	],
	time: [
		"millisecond",
		"second",
		"minute",
		"hour",
		"day",
		"week",
		"month",
		"year",
	],
};
