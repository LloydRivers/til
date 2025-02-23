import { CellError } from "./CellError";

export class Cell<T> {
  private value: T | undefined;
  private marked: boolean;

  constructor() {
    this.value = undefined;
    this.marked = false;
  }

  define(value: T): void {
    if (this.value !== undefined) throw new CellError("Cell already defined");
    this.value = value;
  }

  mark(): void {
    if (this.value === undefined) throw new CellError("Cell not defined");
    this.marked = true;
  }

  isMarked(): boolean {
    return this.marked;
  }

  getValue(): T | undefined {
    return this.value;
  }
}
