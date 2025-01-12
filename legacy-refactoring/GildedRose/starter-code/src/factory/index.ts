import { Item } from "../class/Item";
import {
  NormalItemStrategy,
  AgedBrieStrategy,
  SulfurasStrategy,
  BackstagePassStrategy,
  ConjuredItemStrategy,
} from "../strategies";
import { ItemStrategy } from "../types";

export function createItemStrategy(item: Item): ItemStrategy {
  switch (item.name) {
    case "Aged Brie":
      return new AgedBrieStrategy();
    case "Sulfuras":
      return new SulfurasStrategy();
    case "Backstage passes":
      return new BackstagePassStrategy();
    case "Conjured":
      return new ConjuredItemStrategy();
    default:
      return new NormalItemStrategy();
  }
}
