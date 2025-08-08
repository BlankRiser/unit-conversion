export interface ConversionConfig {
	isFloat?: boolean;
	includeUnit?: boolean;
	decimals?: number;
}

export const DEFAULT_CONFIG: ConversionConfig = {
	isFloat: true,
	includeUnit: true,
	decimals: 2,
};
