export type TemperatureUnits = "celsius" | "fahrenheit" | "kelvin";

export type LengthUnits = "meter" | "kilometer" | "centimeter" | "millimeter" | "inch" | "foot" | "yard" | "mile";
export type WeightUnits = "milligram" | "gram" | "kilogram" | "pound" | "ounce" | "ton";
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
export type TimeUnits = "millisecond" | "second" | "minute" | "hour" | "day" | "week" | "month" | "year";
export type NumberUnits = "binary" | "decimal" | "hexadecimal" | "base8";
export type PressureUnits = "pascal" | "kilopascal" | "bar" | "psi" | "atmosphere";
export type EnergyUnits =
  | "joule"
  | "kilojoule"
  | "calorie"
  | "calorie-international-table"
  | "calorie-thermochemical"
  | "watt-hour"
  | "kilowatt-hour"
  | "electron-volt";
export type AngleUnits = "radian" | "degree" | "gradian" | "arcminute" | "arcsecond";

export type AllUnits =
  | TemperatureUnits
  | LengthUnits
  | WeightUnits
  | VolumeUnits
  | TimeUnits
  | NumberUnits
  | PressureUnits
  | EnergyUnits
  | AngleUnits;
export type ForceUnits = "newton" | "dyne" | "pound-force" | "kilogram-force" | "poundal";

export type AllUnits = TemperatureUnits | LengthUnits | WeightUnits | VolumeUnits | TimeUnits | NumberUnits | ForceUnits;

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
          : T extends NumberUnits
            ? NumberUnits
            : T extends ForceUnits
              ? ForceUnits
              : T extends PressureUnits
                ? PressureUnits
                : T extends EnergyUnits
                  ? EnergyUnits
                  : T extends AngleUnits
                    ? AngleUnits
                    : never;

export type ALL_UNIT_CATEGORIES = {
  temperature: TemperatureUnits[];
  length: LengthUnits[];
  weight: WeightUnits[];
  volume: VolumeUnits[];
  time: TimeUnits[];
  number: NumberUnits[];
  pressure: PressureUnits[];
  energy: EnergyUnits[];
  angle: AngleUnits[];
  force: ForceUnits[];
};

/**
 * Constants for unit conversion.
 * @module UNITS
 * @description
 * This module exports a collection of units organized by measurement category.
 *
 * @property {string[]} temperature - Units for temperature measurements. Base unit is kelvin
 * @property {string[]} length - Units for length measurements. Base unit is meter
 * @property {string[]} weight - Units for weight measurements. Base unit is gram
 * @property {string[]} volume - Units for volume measurements. Base unit is liter
 * @property {string[]} time - Units for time measurements. Base unit is second
 * @property {string[]} number - Units for number measurements. Base unit is base-10
 * @property {string[]} pressure - Units for pressure measurements. Base unit is pascal
 * @property {string[]} energy - Units for energy measurements. Base unit is joule
 * @property {string[]} angle - Units for angle measurements. Base unit is radian
 */
export const UNITS: ALL_UNIT_CATEGORIES = {
  temperature: ["celsius", "fahrenheit", "kelvin"],
  length: ["meter", "kilometer", "centimeter", "millimeter", "inch", "foot", "yard", "mile"],
  weight: ["milligram", "gram", "kilogram", "pound", "ounce", "ton"],
  volume: [
    "liter",
    "milliliter",
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
  time: ["millisecond", "second", "minute", "hour", "day", "week", "month", "year"],
  number: ["decimal", "binary", "hexadecimal", "base8"],
  pressure: ["pascal", "kilopascal", "bar", "psi", "atmosphere"],
  energy: [
    "joule",
    "kilojoule",
    "calorie",
    "calorie-international-table",
    "calorie-thermochemical",
    "watt-hour",
    "kilowatt-hour",
    "electron-volt",
  ],
  angle: ["degree", "radian", "gradian", "arcminute", "arcsecond"],
  force: ["newton", "dyne", "pound-force", "kilogram-force", "poundal"],
};

export const NO_UNITS_CATEGORIES = ["number"];
