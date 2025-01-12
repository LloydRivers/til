import { Item } from "../class/Item";

export interface ItemStrategy {
  update(item: Item): void;
}

export type TestCase = [string, number, number, number, number];
