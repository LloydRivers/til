export class BingoBoard {
  private cells: string[][];
  private marked: boolean[][];

  constructor(width: number, height: number) {
    this.cells = Array.from({ length: width }, () => Array(height).fill(null));
    this.marked = Array.from({ length: width }, () =>
      Array(height).fill(false)
    );
  }

  defineCell(x: number, y: number, value: string): void {
    if (this.cells[x][y] !== null) {
      throw new Error("cell already defined");
    }
    for (let c = 0; c < this.cells.length; c++) {
      for (let r = 0; r < this.cells[c].length; r++) {
        if (value === this.cells[c][r]) {
          throw new Error(`${value} already present at ${c},${r}`);
        }
      }
    }
    this.cells[x][y] = value;
  }

  /*
  To test this I would also need to make sure that the board is initialized
  */
  markCell(x: number, y: number): void {
    if (!this.isInitialized()) {
      throw new Error("board not initialized");
    }
    this.marked[x][y] = true;
  }

  isMarked(x: number, y: number): boolean {
    return this.marked[x][y];
  }

  /*
  So I woukd like need to stub this out to already return a true boolean to get through the test
  */
  isInitialized(): boolean {
    return this.cells.every((row) => row.every((cell) => cell !== null));
  }
}
