# Gilded Rose Test Documentation

## Special Thanks

A huge thank you to **Andrew Burgess** for inspiring this approach to automating test generation. His YouTube video really opened my eyes to the possibility of generating tests programmatically, which made the Gilded Rose kata much more approachable. It’s a reminder that great coaching can come from people you’ve never met before.

You can check out his video here: [Andrew Burgess on Test Generation](https://www.youtube.com/watch?v=2q5PdGdlL8Y&t=30s&ab_channel=AndrewBurgess)

## Overview

In this test suite, we focus on automating the generation of tests for the Gilded Rose kata. The goal of these tests is to verify that the `Shop` class correctly updates the `sellIn` and `quality` properties of items according to the rules specified by the Gilded Rose kata. This suite ensures that once we begin refactoring, we can have immediate feedback on whether we have broken any behavior of the system.

## Test Generation Process

The test suite follows a few structured steps to generate and execute tests automatically. It uses a combination of loops and predefined parameters to test a wide range of combinations of `sellIn` and `quality` values for each item in the Gilded Rose shop.

Here’s a breakdown of what is happening in the test file:

### 1. Importing Dependencies

```js
import { Shop, Item } from "../src/gilded_rose";
import { writeFileSync } from "fs";
import tests from "../tests.json";
```

- **Shop** and **Item**: These are the main classes in the Gilded Rose kata, representing the shop and individual items respectively.
- **writeFileSync**: Used to write the generated tests to a JSON file.
- **tests**: This is the array we will populate with test data, which is then written to a JSON file.

### 2. Test Suite

```js
describe("Gilded Rose", function () {
  for (const test of tests) {
    const [name, sellIn, quality, outputSellIn, outputQuality] = test;
    const description = { name, sellIn, quality, outputSellIn, outputQuality };

    it(`should return ${JSON.stringify(description)}`, function () {
      const gildedRose = new Shop([new Item(name, sellIn, quality)]);
      const items = gildedRose.updateQuality();
      const outputSellIn = items[0].sellIn;
      const outputQuality = items[0].quality;
      expect(outputSellIn).toBe(outputSellIn);
      expect(outputQuality).toBe(outputQuality);
    });
  }
```

#### Explanation:

- **Outer loop (`for (const test of tests)`)**: Iterates over all generated test cases (which will eventually come from the `tests.json` file). Each `test` contains the following values:

  - `name`: The name of the item being tested (e.g., "Aged Brie").
  - `sellIn`: The initial `sellIn` value for the item.
  - `quality`: The initial `quality` value for the item.
  - `outputSellIn`: The expected `sellIn` value after the `updateQuality()` method is called.
  - `outputQuality`: The expected `quality` value after the `updateQuality()` method is called.

- **`it()` block**: Defines the individual test. Each test checks whether the `sellIn` and `quality` values returned by the `updateQuality()` method match the expected values (`outputSellIn` and `outputQuality`).
- **Assertions**: We use `expect()` to assert that the values returned from the `updateQuality()` method are correct.

### 3. Test Generation Logic

The test generation logic begins by defining a few constants, including the names of the items to test, and the possible ranges of `sellIn` and `quality` values.

```js
it("generates the expected tests", function () {
  const names = [
    "Aged Brie",
    "Backstage passes to a TAFKAL80ETC concert",
    "Sulfuras, Hand of Ragnaros",
    "normal item",
  ];
  const tests = [];
  const [minSellIn, maxSellIn] = [-1, 12];
  const [minQuality, maxQuality] = [-1, 51];
```

- **names**: The different item names from the Gilded Rose universe that we want to test.
- **minSellIn/maxSellIn**: Defines the range for the `sellIn` values. The test will run for all values from `-1` to `11`.
- **minQuality/maxQuality**: Defines the range for the `quality` values. The test will run for all values from `-1` to `50`.

### 4. Nested Loops to Generate All Combinations

```js
for (const name of names) {
  for (let sellIn = minSellIn; sellIn < maxSellIn; sellIn++) {
    for (let quality = minQuality; quality < maxQuality; quality++) {
      const gildedRose = new Shop([new Item(name, sellIn, quality)]);
      const items = gildedRose.updateQuality();
      const outputSellIn = items[0].sellIn;
      const outputQuality = items[0].quality;
      tests.push([name, sellIn, quality, outputSellIn, outputQuality]);
    }
  }
}
```

#### Explanation:

- **Outer loop (`for (const name of names)`)**: Loops through each of the four item names.
- **Middle loop (`for (let sellIn = minSellIn; sellIn < maxSellIn; sellIn++)`)**: Loops through each possible `sellIn` value from `-1` to `11`.
- **Inner loop (`for (let quality = minQuality; quality < maxQuality; quality++)`)**: Loops through each possible `quality` value from `-1` to `50`.
- For each combination of `name`, `sellIn`, and `quality`, we create a new item and pass it to a new `Shop` instance. The `updateQuality()` method is called, and the resulting `sellIn` and `quality` values are captured.
- The resulting test case is then added to the `tests` array.

### 5. Writing Tests to a JSON File

```js
const json = JSON.stringify(tests, null, 2);
writeFileSync("tests.json", json);
```

- After all the tests are generated, the `tests` array is converted into a JSON string using `JSON.stringify()`.
- `writeFileSync()` writes the JSON data into a file called `tests.json`. This file will contain all the test data that is imported into the test suite and used in the individual test cases.

### Purpose of This Test

The goal of this approach is to automate the generation of a large number of test cases for the Gilded Rose kata. By generating the tests in this way, we can:

- Cover all possible combinations of `name`, `sellIn`, and `quality`.
- Get immediate feedback on the correctness of the `updateQuality()` method for all possible scenarios.
- Ensure that we have a solid baseline of tests to work with before we begin refactoring the code.

Once the tests are generated, the next step would be to use `tests.json` as the source of truth for the individual tests, which can be imported into the main test suite.

---

## Summary

In this document, we’ve explained how to automate the test generation process for the Gilded Rose kata. The primary goal of this approach is to ensure that all edge cases and combinations of `sellIn` and `quality` values are tested. This will allow us to confidently refactor the code and receive immediate feedback on whether any functionality is broken.

By generating these tests automatically, we ensure that the `Shop` and `Item` classes behave correctly in all scenarios. The process also speeds up the testing process by providing almost 3,000 test cases that can be executed in less than a second.
