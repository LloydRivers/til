import { BingoBoard } from "../src";

describe("Capture initial logic", () => {
  test("should throw error if cell is already defined", () => {
    const board = new BingoBoard(5, 5);
    board.defineCell(0, 0, "10");
    expect(() => board.defineCell(0, 0, "10")).toThrow("cell already defined");
  });

  it("initialize board", () => {
    const board = new BingoBoard(2, 2);
    expect(board.isInitialized()).toBe(false);

    board.defineCell(0, 0, "10");
    board.defineCell(0, 1, "20");
    board.defineCell(1, 0, "30");
    board.defineCell(1, 1, "40");

    expect(board.isInitialized()).toBe(true);
  });

  it("should mark a cell", () => {
    const board = new BingoBoard(2, 2);
    expect(board.isInitialized()).toBe(false);
    board.defineCell(0, 0, "10");
    board.defineCell(0, 1, "20");
    board.defineCell(1, 0, "30");
    board.defineCell(1, 1, "40");

    board.markCell(0, 0);
    expect(board.isMarked(0, 0)).toBe(true);
  });
});
