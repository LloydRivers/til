import { BingoBoard } from "../src/Card/BingoCard";
import { Coordinate } from "../src/Coordinate/Coordinate";

describe("BingoBoard", () => {
  let board: BingoBoard;

  beforeEach(() => {
    board = new BingoBoard(2, 2);
  });

  describe("initialization", () => {
    it("should throw error if cell is already defined", () => {
      board.defineCell(new Coordinate(0, 0), "10");

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

  describe("edge cases", () => {
    it("should throw error if trying to define a cell outside the board bounds", () => {
      expect(() => board.defineCell(new Coordinate(2, 2), "50")).toThrow();
    });

    it("should throw error if trying to mark a cell outside the board bounds", () => {
      expect(() => board.markCell(new Coordinate(10, 10))).toThrow();
    });
  });
});
