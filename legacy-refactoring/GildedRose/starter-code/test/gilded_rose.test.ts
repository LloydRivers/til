import { Shop, Item } from "../src/gilded_rose";
import { writeFileSync } from "fs";
import tests from "../tests.json";

describe("Gilded Rose", function () {
  for (const test of tests) {
    const [name, sellIn, quality, outputSellIn, outputQuality] = test;

    const description = {
      name,
      sellIn,
      quality,
      outputSellIn,
      outputQuality,
    };

    it(`should return ${JSON.stringify(description)}`, function () {
      const gildedRose = new Shop([new Item(name, sellIn, quality)]);
      const items = gildedRose.updateQuality();
      const outputSellIn = items[0].sellIn;
      const outputQuality = items[0].quality;
      expect(outputSellIn).toBe(outputSellIn);
      expect(outputQuality).toBe(outputQuality);
    });
  }
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
    // TODO: Credit to Andrew Burgess in Readme
    const json = JSON.stringify(tests, null, 2);
    writeFileSync("tests.json", json);
  });
});
