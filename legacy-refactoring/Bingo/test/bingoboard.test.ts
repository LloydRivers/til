import { BingoBoard } from "../src/BingoBoard";
import { Coordinate } from "../src/Coordinate";

describe("BingoBoard", () => {
  let board: BingoBoard;

  beforeEach(() => {
    board = new BingoBoard(2, 2);

    board.defineCell(new Coordinate(0, 0), "10");
    board.defineCell(new Coordinate(0, 1), "20");
    board.defineCell(new Coordinate(1, 0), "30");
    board.defineCell(new Coordinate(1, 1), "40");
  });

  afterEach(() => {
    board = new BingoBoard(2, 2);
  });

  describe("initialization", () => {
    it("should throw error if cell is already defined", () => {
      expect(() => board.defineCell(new Coordinate(0, 0), "10")).toThrow(
        "cell already defined"
      );
    });

    it("should initialize board after all cells are defined", () => {
      expect(board.isInitialized()).toBe(true);
    });
  });

  describe("cell marking", () => {
    it("should mark a cell", () => {
      board.markCell(new Coordinate(0, 0));
      expect(board.isMarked(new Coordinate(0, 0))).toBe(true);
    });
  });
});
