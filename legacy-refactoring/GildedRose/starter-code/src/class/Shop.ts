import { createItemStrategy } from "../factory";
import { Item } from "./Item";

export class Shop {
  items: Item[];

  constructor(items: Item[] = []) {
    this.items = items;
  }

  updateQuality() {
    this.items.forEach((item) => {
      const strategy = createItemStrategy(item);
      strategy.update(item);
    });

    return this.items;
  }
}
