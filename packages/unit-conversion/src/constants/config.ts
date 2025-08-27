export interface ConversionConfig {
  isFloat?: boolean;
  includeUnit?: boolean;
  decimals?: number;
}

/**
 * Default configuration for unit conversions.
 * @type {ConversionConfig}
 * @property {boolean} isFloat - Whether the conversion result should be a floating-point number. Default is true.
 * @property {boolean} includeUnit - Whether to include the unit symbol in the conversion output. Default is true.
 * @property {number} decimals - Number of decimal places to round the conversion result to. Default is 2.
 */
export const DEFAULT_CONFIG: ConversionConfig = {
  isFloat: true,
  includeUnit: true,
  decimals: 2,
};
