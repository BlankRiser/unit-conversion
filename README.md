# @devhaven/unit-conversion

An SDK for unit conversion. 

### How does it work?

```ts
const conversion = new Conversion();

const result = conversion.value(10).from("meter").to("foot");

console.log(result);
```

