import { Cell } from "./Cell";
import { Coordinate } from "./Coordinate";
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

  defineCell(coordinate: Coordinate, value: string): void {
    const { x, y } = coordinate;
    const cell = this.cells[x][y];
    if (cell?.getValue() !== undefined) {
      throw new Error("cell already defined");
    }

    for (let row = 0; row < this.cells.length; row++) {
      for (let column = 0; column < this.cells[row].length; column++) {
        if (value === this.cells[row][column]?.getValue()) {
          throw new Error(`${value} already present at ${row},${column}`);
        }
      }
    }

    cell?.define(value);
  }

  markCell(coordinate: Coordinate): void {
    const { x, y } = coordinate;
    if (!this.isInitialized()) {
      throw new Error("board not initialized");
    }
    this.marked[x][y] = true;
  }

  isMarked(coordinate: Coordinate): boolean {
    const { x, y } = coordinate;
    return this.marked[x][y];
  }

  isInitialized(): boolean {
    return this.cells.every((row) => row.every((cell) => cell !== null));
  }

  startGame(): void {
    console.log("Starting game");
  }
}
