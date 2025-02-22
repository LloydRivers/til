import { BingoBoard } from "../src";

describe("BingoBoard", () => {
  let board: BingoBoard;

  beforeEach(() => {
    board = new BingoBoard(2, 2);
    board.defineCell(0, 0, "10");
    board.defineCell(0, 1, "20");
    board.defineCell(1, 0, "30");
    board.defineCell(1, 1, "40");
  });

  describe("initialization", () => {
    it("should throw error if cell is already defined", () => {
      expect(() => board.defineCell(0, 0, "10")).toThrow(
        "cell already defined"
      );
    });

    it("should initialize board after all cells are defined", () => {
      expect(board.isInitialized()).toBe(true);
    });
  });

  describe("cell marking", () => {
    it("should mark a cell", () => {
      board.markCell(0, 0);
      expect(board.isMarked(0, 0)).toBe(true);
    });
  });
});
