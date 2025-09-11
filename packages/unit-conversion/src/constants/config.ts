export interface ConversionConfig {
  isFloat?: boolean;
  decimals?: number;
}

/**
 * Default configuration for unit conversions.
 * @type {ConversionConfig}
 * @property {boolean} isFloat - Whether the conversion result should be a floating-point number. Default is true.
 * @property {number} decimals - Number of decimal places to round the conversion result to. Default is 2.
 */
export const DEFAULT_CONFIG: ConversionConfig = {
  isFloat: true,
  decimals: 2,
};
