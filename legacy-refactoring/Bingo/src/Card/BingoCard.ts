import { Cell, CellFactory } from "../Cell/Cell";
import { Coordinate } from "../Coordinate/Coordinate";
import { Game } from "../Game/Game";
import { GridManager } from "../Grid/GridManager";
import { BingoNumberPool } from "../Numbers/BingoNumberPool";

export class BingoCard extends Game<number> {
  private cells: Array<Array<Cell<number> | null>>;
  private bingoCardNumberPool: BingoNumberPool;
  gridManager: GridManager<number>;
  constructor(
    private width: number = 9,
    private height: number = 3,
    private cellFactory: CellFactory<number> = (_row, _col) =>
      new Cell<number>()
  ) {
    super();
    this.bingoCardNumberPool = new BingoNumberPool();
    this.gridManager = new GridManager<number>(width, height, cellFactory);
    this.cells = this.gridManager.createEmptyCellGrid();
  }

  defineCell(coordinate: Coordinate, value: number): void {
    this.gridManager.defineCell(coordinate, value);
  }

  markCell(coordinate: Coordinate): void {
    if (!this.gridManager.isInitialized()) {
      throw new Error("Board not initialized");
    }
    this.gridManager.markCell(coordinate);
  }

  isMarked(coordinate: Coordinate): boolean {
    return this.gridManager.isMarked(coordinate);
  }

  private generateBingoCard(): void {
    const selectedNumbers = this.bingoCardNumberPool.getRandomNumbers();
    const blankCellCoordinate = { row: 1, col: 4 };

    let numberIndex = 0;
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        if (
          row === blankCellCoordinate.row &&
          col === blankCellCoordinate.col
        ) {
          continue;
        }

        if (numberIndex < selectedNumbers.length) {
          const coordinate = new Coordinate(row, col);
          this.gridManager.defineCell(coordinate, selectedNumbers[numberIndex]);
          numberIndex++;
        }
      }
    }
  }

  printBingoCard(): void {
    for (let row = 0; row < this.height; row++) {
      let rowOutput = "";
      for (let col = 0; col < this.width; col++) {
        const cellValue = this.cells[row][col]?.getValue();
        rowOutput += cellValue !== undefined ? `[${cellValue}]` : `[ ]`;
        if (col < this.width - 1) {
          rowOutput += " ";
        }
      }
      console.log(rowOutput);
    }
  }

  startGame(): void {
    this.generateBingoCard();
  }
}
