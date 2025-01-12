import { Item } from "../class/Item";
import { ItemStrategy } from "../types";

class NormalItemStrategy implements ItemStrategy {
  update(item: Item): void {
    item.sellIn--;
    item.quality = item.quality > 0 ? item.quality - 1 : 0;
    if (item.sellIn < 0) {
      item.quality = item.quality > 0 ? item.quality - 1 : 0;
    }
  }
}

class AgedBrieStrategy implements ItemStrategy {
  update(item: Item): void {
    item.sellIn--;
    item.quality = item.quality < 50 ? item.quality + 1 : 50;
  }
}

class SulfurasStrategy implements ItemStrategy {
  update(_item: Item): void {}
}

class BackstagePassStrategy implements ItemStrategy {
  update(item: Item): void {
    item.sellIn--;
    if (item.sellIn < 0) {
      item.quality = 0;
    } else if (item.sellIn <= 5) {
      item.quality = item.quality < 50 ? item.quality + 3 : 50;
    } else if (item.sellIn <= 10) {
      item.quality = item.quality < 50 ? item.quality + 2 : 50;
    } else {
      item.quality = item.quality < 50 ? item.quality + 1 : 50;
    }
  }
}

class ConjuredItemStrategy implements ItemStrategy {
  update(item: Item): void {
    item.sellIn--;
    item.quality = item.quality > 1 ? item.quality - 2 : 0;
    if (item.sellIn < 0) {
      item.quality = item.quality > 1 ? item.quality - 2 : 0;
    }
  }
}

export {
  NormalItemStrategy,
  AgedBrieStrategy,
  SulfurasStrategy,
  BackstagePassStrategy,
  ConjuredItemStrategy,
};
