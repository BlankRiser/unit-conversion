/**
 * Constants for unit labels across different measurement domains.
 *
 * Includes abbreviations for:
 * - Time units (year, month, week, day, hour, minute, second, and sub-second units)
 * - Length units (metric units like meter and its derivatives, imperial units like inch, foot)
 * - Mass units (kilogram and derivatives, pound, ounce, etc.)
 * - Amount of substance (mole)
 * - Electric current related units (ampere, coulomb, volt, etc.)
 * - Thermodynamic temperature units (kelvin, celsius, fahrenheit, etc.)
 * - Luminous intensity units (candela, stilb)
 *
 * @constant {Readonly<Record<string, string>>}
 */
export const LABELS = {
  // time
  year: "y",
  month: "mo",
  week: "wk",
  day: "d",
  hour: "h",
  minute: "min",
  second: "s",
  millisecond: "ms",
  microsecond: "µs",
  nanosecond: "ns",
  picosecond: "ps",
  femtosecond: "fs",
  attosecond: "as",
  zeptosecond: "zs",
  yoctosecond: "ys",

  // length
  meter: "m",
  kilometer: "km",
  centimeter: "cm",
  millimeter: "mm",
  micrometer: "µm",
  nanometer: "nm",
  picometer: "pm",
  femtometer: "fm",
  attometer: "am",
  zeptometer: "zm",
  yoctometer: "ym",
  ronnameter: "Rm",
  quettameter: "Qm",
  inch: "in",
  foot: "ft",
  yard: "yd",
  mile: "mi",
  "nautical mile": "nmi",
  link: "link",
  fathom: "ftm",
  chain: "ch",
  league: "lea",

  // mass
  liter: "l",
  milliliter: "ml",
  kilogram: "kg",
  gram: "g",
  milligram: "mg",
  microgram: "µg",
  nanogram: "ng",
  picogram: "pg",
  femtogram: "fg",
  attogram: "ag",
  zeptogram: "zg",
  yoctogram: "yg",
  ronnagram: "Rg",
  quettagram: "Qg",
  tonne: "t",
  "electronvolt per c squared": "eV/c^2",
  pound: "lb",
  ounce: "oz",
  stone: "st",
  dalton: "Da",
  "atomic-mass-unit": "u",
  carat: "ct",
  "us-gallon": "gallon (US)",
  "imperial-gallon": "gallon (UK)",
  "us-legal-cup": "cup (US)",
  "imperial-cup": "cup (UK)",
  "us-liquid-pint": "pt (US)",
  "imperial-pint": "pt (UK)",
  "us-legal-fluid-ounce": "fl oz (US)",
  "imperial-fluid-ounce": "fl oz (UK)",
  "cubic-millimeter": "mm^3",
  "cubic-centimeter": "cm^3",
  "cubic-meter": "m^3",
  "cubic-foot": "ft^3",
  "cubic-inch": "in^3",

  // amount of substance
  mole: "mol",

  // electricCurrent
  ampere: "A",
  coulomb: "C",
  volt: "V",
  ohm: "Ω",
  siemens: "S",
  watt: "W",
  farad: "F",
  henry: "H",
  hertz: "Hz",
  joule: "J",

  // thermodynamic temperature
  kelvin: "K",
  celsius: "°C",
  fahrenheit: "°F",
  rankine: "°R",
  delisle: "°De",
  "newton-degree": "°N",
  réaumur: "°Ré",
  rømer: "°Rø",

  // luminous intensity
  candela: "cd",
  stilb: "sb",

  // Force
  newton: "N",
  dyne: "dyn",
  poundal: "pdl",
  "pound-force": "lbf",
  "kilogram-force": "kgf",


} as const;
