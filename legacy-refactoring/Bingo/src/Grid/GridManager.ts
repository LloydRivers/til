import { Cell, CellFactory } from "../Cell/Cell";
import { Coordinate } from "../Coordinate/Coordinate";

export class GridManager<T> {
  private cells: Array<Array<Cell<T> | null>>;

  constructor(
    private width: number,
    private height: number,
    private cellFactory: CellFactory<T> = (_row, _col) => new Cell<T>()
  ) {
    this.cells = this.createEmptyCellGrid();
  }

  createEmptyCellGrid(): Array<Array<Cell<T> | null>> {
    return Array.from({ length: this.height }, (_, row) =>
      Array.from({ length: this.width }, (_, col) => this.cellFactory(row, col))
    );
  }

  isValueInGrid(value: T): boolean {
    return this.cells.some((row) =>
      row.some((cell) => cell?.getValue() === value)
    );
  }

  getCells(): ReadonlyArray<ReadonlyArray<Cell<T> | null>> {
    return this.cells;
  }

  defineCell(coordinate: Coordinate, value: T): void {
    if (!this.isWithinBounds(coordinate)) {
      throw new Error(
        `Coordinate (${coordinate.x}, ${coordinate.y}) is out of bounds`
      );
    }
    if (this.isValueInGrid(value)) {
      throw new Error(`${value} already present`);
    }
    const { x, y } = coordinate;
    const cell = this.cells[x][y];
    if (cell?.getValue() !== undefined) {
      throw new Error("Cell already defined");
    }
    cell?.define(value);
  }

  isWithinBounds(coordinate: Coordinate): boolean {
    const { x, y } = coordinate;
    return (
      x >= 0 && x < this.cells.length && y >= 0 && y < this.cells[0].length
    );
  }

  isInitialized(): boolean {
    return this.cells.every((row) => row.every((cell) => cell !== null));
  }

  markCell(coordinate: Coordinate): void {
    const { x, y } = coordinate;

    if (!this.isInitialized()) {
      throw new Error("Board not initialized");
    }

    if (!this.isWithinBounds(coordinate)) {
      throw new Error(`Coordinate (${x}, ${y}) is out of bounds`);
    }

    const cell = this.cells[y][x];
    if (!cell) {
      throw new Error(`Cell at (${x}, ${y}) is null`);
    }

    cell.mark();
  }

  isMarked(coordinate: Coordinate): boolean {
    const { x, y } = coordinate;
    const cell = this.cells[y][x];
    if (!cell) {
      throw new Error(`Cell at (${x}, ${y}) is null`);
    }

    return cell.isMarked();
  }
}
