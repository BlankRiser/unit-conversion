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