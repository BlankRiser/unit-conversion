import { expect, test } from "vitest";
import { Conversion } from "../src/main";

test("Check conversion config", () => {
	const withUnit = new Conversion({
		isFloat: false, 
		includeUnit: true, 
	});
	const withoutUnit = new Conversion({
		isFloat: false, 
		includeUnit: false, 
	});

	expect(withUnit.value(12).from("celsius").to("kelvin")).toBe("285K");
	expect(withoutUnit.value(12).from("celsius").to("kelvin")).toBe(285);
});

test("Test Length conversions", ()=>{
	const convert = new Conversion();
	const lengthValue = 1

	expect(convert.value(lengthValue).from("meter").to("millimeter")).toBe("1000mm");
	expect(convert.value(lengthValue).from("meter").to("centimeter")).toBe("100cm");
	expect(convert.value(lengthValue).from("meter").to("inch")).toBe("39.37in");
	expect(convert.value(lengthValue).from("meter").to("foot")).toBe("3.28ft");
	expect(convert.value(lengthValue).from("meter").to("kilometer")).toBe("0km");
	expect(convert.value(lengthValue).from("meter").to("mile")).toBe("0mi");
	expect(convert.value(lengthValue).from("meter").to("yard")).toBe("1.09yd");
	
	expect(convert.value(lengthValue).from("kilometer").to("millimeter")).toBe("1000000mm");
	expect(convert.value(lengthValue).from("kilometer").to("centimeter")).toBe("100000cm");
	expect(convert.value(lengthValue).from("kilometer").to("inch")).toBe("39370.08in");
	expect(convert.value(lengthValue).from("kilometer").to("foot")).toBe("3280.84ft");
	expect(convert.value(lengthValue).from("kilometer").to("meter")).toBe("1000m");
	expect(convert.value(lengthValue).from("kilometer").to("mile")).toBe("0.62mi");
	expect(convert.value(lengthValue).from("kilometer").to("yard")).toBe("1093.61yd");
	
	expect(convert.value(lengthValue).from("centimeter").to("millimeter")).toBe("10mm");
	expect(convert.value(lengthValue).from("centimeter").to("kilometer")).toBe("0km");
	expect(convert.value(lengthValue).from("centimeter").to("inch")).toBe("0.39in");
	expect(convert.value(lengthValue).from("centimeter").to("foot")).toBe("0.03ft");
	expect(convert.value(lengthValue).from("centimeter").to("meter")).toBe("0.01m");
	expect(convert.value(lengthValue).from("centimeter").to("mile")).toBe("0mi");
	expect(convert.value(lengthValue).from("centimeter").to("yard")).toBe("0.01yd");
	
	expect(convert.value(lengthValue).from("millimeter").to("kilometer")).toBe("0km");
	expect(convert.value(lengthValue).from("millimeter").to("centimeter")).toBe("0.1cm");
	expect(convert.value(lengthValue).from("millimeter").to("inch")).toBe("0.04in");
	expect(convert.value(lengthValue).from("millimeter").to("foot")).toBe("0ft");
	expect(convert.value(lengthValue).from("millimeter").to("meter")).toBe("0m");
	expect(convert.value(lengthValue).from("millimeter").to("mile")).toBe("0mi");
	expect(convert.value(lengthValue).from("millimeter").to("yard")).toBe("0yd");
	
	expect(convert.value(lengthValue).from("inch").to("millimeter")).toBe("25.4mm");
	expect(convert.value(lengthValue).from("inch").to("centimeter")).toBe("2.54cm");
	expect(convert.value(lengthValue).from("inch").to("kilometer")).toBe("0km");
	expect(convert.value(lengthValue).from("inch").to("foot")).toBe("0.08ft");
	expect(convert.value(lengthValue).from("inch").to("meter")).toBe("0.03m");
	expect(convert.value(lengthValue).from("inch").to("mile")).toBe("0mi");
	expect(convert.value(lengthValue).from("inch").to("yard")).toBe("0.03yd");
})

test("Test temperature conversions", ()=>{
	const convert = new Conversion();
	const temperatureValue = 1

	expect(convert.value(temperatureValue).from("celsius").to("kelvin")).toBe("274.15K");
	expect(convert.value(temperatureValue).from("celsius").to("fahrenheit")).toBe("33.8°F");

	expect(convert.value(temperatureValue).from("kelvin").to("celsius")).toBe("-272.15°C");
	expect(convert.value(temperatureValue).from("kelvin").to("fahrenheit")).toBe("-457.87°F");

	expect(convert.value(temperatureValue).from("fahrenheit").to("celsius")).toBe("-17.22°C");
	expect(convert.value(temperatureValue).from("fahrenheit").to("kelvin")).toBe("255.93K");
})

test("Test weight conversions", ()=>{
	const convert = new Conversion({
		decimals: 4
	});
	const weightValue = 1

	expect(convert.value(weightValue).from("gram").to("kilogram")).toBe("0.001kg");
	expect(convert.value(weightValue).from("gram").to("pound")).toBe("0.0022lb");
	expect(convert.value(weightValue).from("gram").to("ounce")).toBe("0.0353oz");
	expect(convert.value(weightValue).from("gram").to("ton")).toBe("0ton");

	expect(convert.value(weightValue).from("kilogram").to("gram")).toBe("1000g");
	expect(convert.value(weightValue).from("kilogram").to("pound")).toBe("2.2046lb");
	expect(convert.value(weightValue).from("kilogram").to("ounce")).toBe("35.274oz");
	expect(convert.value(weightValue).from("kilogram").to("ton")).toBe("0.001ton");

	expect(convert.value(weightValue).from("pound").to("kilogram")).toBe("0.4536kg");
	expect(convert.value(weightValue).from("pound").to("gram")).toBe("453.592g");
	expect(convert.value(weightValue).from("pound").to("ounce")).toBe("16oz");
	expect(convert.value(weightValue).from("pound").to("ton")).toBe("0.0005ton");

	expect(convert.value(weightValue).from("ounce").to("kilogram")).toBe("0.0283kg");
	expect(convert.value(weightValue).from("ounce").to("pound")).toBe("0.0625lb");
	expect(convert.value(weightValue).from("ounce").to("gram")).toBe("28.3495g");
	expect(convert.value(weightValue).from("ounce").to("ton")).toBe("0ton");

	expect(convert.value(weightValue).from("ton").to("kilogram")).toBe("1000kg");
	expect(convert.value(weightValue).from("ton").to("pound")).toBe("2204.6244lb");
	expect(convert.value(weightValue).from("ton").to("ounce")).toBe("35273.9907oz");
	expect(convert.value(weightValue).from("ton").to("gram")).toBe("1000000g");
})

test("Test time conversions", ()=>{
	const convert = new Conversion({
		decimals: 4
	});
	const volumeValue = 1

	expect(convert.value(volumeValue).from("millisecond").to("second")).toBe("0.001s");
	expect(convert.value(volumeValue).from("millisecond").to("minute")).toBe("0min");
	expect(convert.value(volumeValue).from("millisecond").to("hour")).toBe("0h");
	expect(convert.value(volumeValue).from("millisecond").to("day")).toBe("0d");
	expect(convert.value(volumeValue).from("millisecond").to("week")).toBe("0wk");

	expect(convert.value(volumeValue).from("second").to("millisecond")).toBe("1000ms");
	expect(convert.value(volumeValue).from("second").to("minute")).toBe("0.0167min");
	expect(convert.value(volumeValue).from("second").to("hour")).toBe("0.0003h");
	expect(convert.value(volumeValue).from("second").to("day")).toBe("0d");
	expect(convert.value(volumeValue).from("second").to("week")).toBe("0wk");
	
	expect(convert.value(volumeValue).from("minute").to("millisecond")).toBe("60000ms");
	expect(convert.value(volumeValue).from("minute").to("second")).toBe("60s");
	expect(convert.value(volumeValue).from("minute").to("hour")).toBe("0.0167h");
	expect(convert.value(volumeValue).from("minute").to("day")).toBe("0.0007d");
	expect(convert.value(volumeValue).from("minute").to("week")).toBe("0.0001wk");
	
	expect(convert.value(volumeValue).from("hour").to("millisecond")).toBe("3600000ms");
	expect(convert.value(volumeValue).from("hour").to("minute")).toBe("60min");
	expect(convert.value(volumeValue).from("hour").to("second")).toBe("3600s");
	expect(convert.value(volumeValue).from("hour").to("day")).toBe("0.0417d");
	expect(convert.value(volumeValue).from("hour").to("week")).toBe("0.006wk");
	
	expect(convert.value(volumeValue).from("day").to("millisecond")).toBe("86400000ms");
	expect(convert.value(volumeValue).from("day").to("minute")).toBe("1440min");
	expect(convert.value(volumeValue).from("day").to("hour")).toBe("24h");
	expect(convert.value(volumeValue).from("day").to("second")).toBe("86400s");
	expect(convert.value(volumeValue).from("day").to("week")).toBe("0.1429wk");
	
	expect(convert.value(volumeValue).from("week").to("millisecond")).toBe("604800000ms");
	expect(convert.value(volumeValue).from("week").to("minute")).toBe("10080min");
	expect(convert.value(volumeValue).from("week").to("hour")).toBe("168h");
	expect(convert.value(volumeValue).from("week").to("second")).toBe("604800s");
	expect(convert.value(volumeValue).from("week").to("day")).toBe("7d");
	
})

test("Test volumes conversions", ()=>{
	const convert = new Conversion({
		decimals: 4
	});
	const volumeValue = 1

	expect(convert.value(volumeValue).from("liter").to("milliliter")).toBe("1000ml");
	expect(convert.value(volumeValue).from("liter").to("cubic-foot")).toBe("0.0353ft^3");
	expect(convert.value(volumeValue).from("liter").to("cubic-inch")).toBe("61.0237in^3");
	expect(convert.value(volumeValue).from("liter").to("cubic-meter")).toBe("0.001m^3");
	expect(convert.value(volumeValue).from("liter").to("imperial-cup")).toBe("3.5195cup (UK)");
	expect(convert.value(volumeValue).from("liter").to("us-legal-cup")).toBe("4.2268cup (US)");
	expect(convert.value(volumeValue).from("liter").to("imperial-pint")).toBe("1.7598pt (UK)");
	expect(convert.value(volumeValue).from("liter").to("us-liquid-pint")).toBe("2.1134pt (US)");
	expect(convert.value(volumeValue).from("liter").to("imperial-fluid-ounce")).toBe("35.1951fl oz (UK)");
	
	expect(convert.value(volumeValue).from("milliliter").to("liter")).toBe("0.001l");
	expect(convert.value(volumeValue).from("milliliter").to("cubic-foot")).toBe("0ft^3");
	expect(convert.value(volumeValue).from("milliliter").to("cubic-inch")).toBe("0.061in^3");
	expect(convert.value(volumeValue).from("milliliter").to("cubic-meter")).toBe("0m^3");
	expect(convert.value(volumeValue).from("milliliter").to("imperial-cup")).toBe("0.0035cup (UK)");
	expect(convert.value(volumeValue).from("milliliter").to("us-legal-cup")).toBe("0.0042cup (US)");
	expect(convert.value(volumeValue).from("milliliter").to("imperial-pint")).toBe("0.0018pt (UK)");
	expect(convert.value(volumeValue).from("milliliter").to("us-liquid-pint")).toBe("0.0021pt (US)");
	expect(convert.value(volumeValue).from("milliliter").to("imperial-fluid-ounce")).toBe("0.0352fl oz (UK)");
	
	expect(convert.value(volumeValue).from("cubic-foot").to("liter")).toBe("28.3168l");
	expect(convert.value(volumeValue).from("cubic-foot").to("milliliter")).toBe("28316.85ml");
	expect(convert.value(volumeValue).from("cubic-foot").to("cubic-inch")).toBe("1728.0002in^3");
	expect(convert.value(volumeValue).from("cubic-foot").to("cubic-meter")).toBe("0.0283m^3");
	expect(convert.value(volumeValue).from("cubic-foot").to("us-legal-cup")).toBe("119.6883cup (US)");
	expect(convert.value(volumeValue).from("cubic-foot").to("imperial-cup")).toBe("99.6614cup (UK)");
	expect(convert.value(volumeValue).from("cubic-foot").to("imperial-pint")).toBe("49.8307pt (UK)");
	expect(convert.value(volumeValue).from("cubic-foot").to("us-liquid-pint")).toBe("59.8442pt (US)");
	expect(convert.value(volumeValue).from("cubic-foot").to("imperial-fluid-ounce")).toBe("996.6138fl oz (UK)");
	
	expect(convert.value(volumeValue).from("cubic-inch").to("liter")).toBe("0.0164l");
	expect(convert.value(volumeValue).from("cubic-inch").to("cubic-foot")).toBe("0.0006ft^3");
	expect(convert.value(volumeValue).from("cubic-inch").to("milliliter")).toBe("16.3871ml");
	expect(convert.value(volumeValue).from("cubic-inch").to("cubic-meter")).toBe("0m^3");
	expect(convert.value(volumeValue).from("cubic-inch").to("imperial-cup")).toBe("0.0577cup (UK)");
	expect(convert.value(volumeValue).from("cubic-inch").to("us-legal-cup")).toBe("0.0693cup (US)");
	expect(convert.value(volumeValue).from("cubic-inch").to("imperial-pint")).toBe("0.0288pt (UK)");
	expect(convert.value(volumeValue).from("cubic-inch").to("us-liquid-pint")).toBe("0.0346pt (US)");
	expect(convert.value(volumeValue).from("cubic-inch").to("imperial-fluid-ounce")).toBe("0.5767fl oz (UK)");
	
	expect(convert.value(volumeValue).from("cubic-meter").to("liter")).toBe("1000l");
	expect(convert.value(volumeValue).from("cubic-meter").to("cubic-foot")).toBe("35.3147ft^3");
	expect(convert.value(volumeValue).from("cubic-meter").to("cubic-inch")).toBe("61023.7441in^3");
	expect(convert.value(volumeValue).from("cubic-meter").to("milliliter")).toBe("1000000ml");
	expect(convert.value(volumeValue).from("cubic-meter").to("imperial-cup")).toBe("3519.508cup (UK)");
	expect(convert.value(volumeValue).from("cubic-meter").to("us-legal-cup")).toBe("4226.7528cup (US)");
	expect(convert.value(volumeValue).from("cubic-meter").to("imperial-pint")).toBe("1759.754pt (UK)");
	expect(convert.value(volumeValue).from("cubic-meter").to("us-liquid-pint")).toBe("2113.3764pt (US)");
	expect(convert.value(volumeValue).from("cubic-meter").to("imperial-fluid-ounce")).toBe("35195.0797fl oz (UK)");
	
	expect(convert.value(volumeValue).from("imperial-cup").to("liter")).toBe("0.2841l");
	expect(convert.value(volumeValue).from("imperial-cup").to("cubic-foot")).toBe("0.01ft^3");
	expect(convert.value(volumeValue).from("imperial-cup").to("cubic-inch")).toBe("17.3387in^3");
	expect(convert.value(volumeValue).from("imperial-cup").to("cubic-meter")).toBe("0.0003m^3");
	expect(convert.value(volumeValue).from("imperial-cup").to("milliliter")).toBe("284.1306ml");
	expect(convert.value(volumeValue).from("imperial-cup").to("us-legal-cup")).toBe("1.2009cup (US)");
	expect(convert.value(volumeValue).from("imperial-cup").to("imperial-pint")).toBe("0.5pt (UK)");
	expect(convert.value(volumeValue).from("imperial-cup").to("us-liquid-pint")).toBe("0.6005pt (US)");
	expect(convert.value(volumeValue).from("imperial-cup").to("imperial-fluid-ounce")).toBe("10fl oz (UK)");
	
	expect(convert.value(volumeValue).from("us-legal-cup").to("liter")).toBe("0.2366l");
	expect(convert.value(volumeValue).from("us-legal-cup").to("cubic-foot")).toBe("0.0084ft^3");
	expect(convert.value(volumeValue).from("us-legal-cup").to("cubic-inch")).toBe("14.4375in^3");
	expect(convert.value(volumeValue).from("us-legal-cup").to("cubic-meter")).toBe("0.0002m^3");
	expect(convert.value(volumeValue).from("us-legal-cup").to("milliliter")).toBe("236.5882ml");
	expect(convert.value(volumeValue).from("us-legal-cup").to("imperial-cup")).toBe("0.8327cup (UK)");
	expect(convert.value(volumeValue).from("us-legal-cup").to("imperial-pint")).toBe("0.4163pt (UK)");
	expect(convert.value(volumeValue).from("us-legal-cup").to("us-liquid-pint")).toBe("0.5pt (US)");
	expect(convert.value(volumeValue).from("us-legal-cup").to("imperial-fluid-ounce")).toBe("8.3267fl oz (UK)");
	
	expect(convert.value(volumeValue).from("imperial-pint").to("liter")).toBe("0.5683l");
	expect(convert.value(volumeValue).from("imperial-pint").to("cubic-foot")).toBe("0.0201ft^3");
	expect(convert.value(volumeValue).from("imperial-pint").to("cubic-inch")).toBe("34.6774in^3");
	expect(convert.value(volumeValue).from("imperial-pint").to("cubic-meter")).toBe("0.0006m^3");
	expect(convert.value(volumeValue).from("imperial-pint").to("imperial-cup")).toBe("2cup (UK)");
	expect(convert.value(volumeValue).from("imperial-pint").to("us-legal-cup")).toBe("2.4019cup (US)");
	expect(convert.value(volumeValue).from("imperial-pint").to("milliliter")).toBe("568.2612ml");
	expect(convert.value(volumeValue).from("imperial-pint").to("us-liquid-pint")).toBe("1.2009pt (US)");
	expect(convert.value(volumeValue).from("imperial-pint").to("imperial-fluid-ounce")).toBe("20fl oz (UK)");
	
	expect(convert.value(volumeValue).from("us-liquid-pint").to("liter")).toBe("0.4732l");
	expect(convert.value(volumeValue).from("us-liquid-pint").to("cubic-foot")).toBe("0.0167ft^3");
	expect(convert.value(volumeValue).from("us-liquid-pint").to("cubic-inch")).toBe("28.875in^3");
	expect(convert.value(volumeValue).from("us-liquid-pint").to("cubic-meter")).toBe("0.0005m^3");
	expect(convert.value(volumeValue).from("us-liquid-pint").to("imperial-cup")).toBe("1.6653cup (UK)");
	expect(convert.value(volumeValue).from("us-liquid-pint").to("us-legal-cup")).toBe("2cup (US)");
	expect(convert.value(volumeValue).from("us-liquid-pint").to("imperial-pint")).toBe("0.8327pt (UK)");
	expect(convert.value(volumeValue).from("us-liquid-pint").to("milliliter")).toBe("473.1765ml");
	expect(convert.value(volumeValue).from("us-liquid-pint").to("imperial-fluid-ounce")).toBe("16.6535fl oz (UK)");
	
	expect(convert.value(volumeValue).from("imperial-fluid-ounce").to("liter")).toBe("0.0284l");
	expect(convert.value(volumeValue).from("imperial-fluid-ounce").to("cubic-foot")).toBe("0.001ft^3");
	expect(convert.value(volumeValue).from("imperial-fluid-ounce").to("cubic-inch")).toBe("1.7339in^3");
	expect(convert.value(volumeValue).from("imperial-fluid-ounce").to("cubic-meter")).toBe("0m^3");
	expect(convert.value(volumeValue).from("imperial-fluid-ounce").to("imperial-cup")).toBe("0.1cup (UK)");
	expect(convert.value(volumeValue).from("imperial-fluid-ounce").to("us-legal-cup")).toBe("0.1201cup (US)");
	expect(convert.value(volumeValue).from("imperial-fluid-ounce").to("imperial-pint")).toBe("0.05pt (UK)");
	expect(convert.value(volumeValue).from("imperial-fluid-ounce").to("us-liquid-pint")).toBe("0.06pt (US)");
	expect(convert.value(volumeValue).from("imperial-fluid-ounce").to("milliliter")).toBe("28.4131ml");
	
})