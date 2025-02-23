import { Cell } from "./Cell";
import { Game } from "./Game";

export class BingoBoard extends Game<string> {
  private cells: Array<Array<Cell<string> | null>>;
  private marked: boolean[][];

  constructor(width: number, height: number) {
    super();
    this.cells = Array.from({ length: width }, () =>
      Array(height)
        .fill(null)
        .map(() => new Cell<string>())
    );
    this.marked = Array.from({ length: width }, () =>
      Array(height).fill(false)
    );
  }

  defineCell(x: number, y: number, value: string): void {
    const cell = this.cells[x][y];
    if (cell?.getValue() !== undefined) {
      throw new Error("cell already defined");
    }
    for (let c = 0; c < this.cells.length; c++) {
      for (let r = 0; r < this.cells[c].length; r++) {
        if (value === this.cells[c][r]?.getValue()) {
          throw new Error(`${value} already present at ${c},${r}`);
        }
      }
    }
    cell?.define(value);
  }

  markCell(x: number, y: number): void {
    if (!this.isInitialized()) {
      throw new Error("board not initialized");
    }
    this.marked[x][y] = true;
  }

  isMarked(x: number, y: number): boolean {
    return this.marked[x][y];
  }

  isInitialized(): boolean {
    return this.cells.every((row) => row.every((cell) => cell !== null));
  }

  startGame(): void {
    console.log("Starting game");
  }
}
