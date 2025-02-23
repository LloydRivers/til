import { BingoBoard } from "../src/BingoBoard";
import { Coordinate } from "../src/Coordinate";

describe("BingoBoard", () => {
  let board: BingoBoard;

  beforeEach(() => {
    board = new BingoBoard(2, 2);

    // This makes sese, we are creating a simple board with 4 cells
    board.defineCell(new Coordinate(0, 0), "10");
    board.defineCell(new Coordinate(0, 1), "20");
    board.defineCell(new Coordinate(1, 0), "30");
    board.defineCell(new Coordinate(1, 1), "40");
  });

  afterEach(() => {
    // This also makes sense, we are resetting the board after each test
    board = new BingoBoard(2, 2);
  });

  describe("initialization", () => {
    it("should throw error if cell is already defined", () => {
      //This makes sense, we are trying to define a cell that is already defined
      // It was already set up in the beforeEach
      expect(() => board.defineCell(new Coordinate(0, 0), "10")).toThrow(
        "cell already defined"
      );
    });

    it("should initialize board after all cells are defined", () => {
      // This makes sense, we are checking if the board is initialized
      // It was already set up in the beforeEach
      expect(board.isInitialized()).toBe(true);
    });
  });

  describe("cell marking", () => {
    it("should mark a cell", () => {
      // This makes sense, we are marking a cell
      board.markCell(new Coordinate(0, 0));
      expect(board.isMarked(new Coordinate(0, 0))).toBe(true);
    });
  });
});
