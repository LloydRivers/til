import { Shop, Item } from "../src/gilded_rose";
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
});
