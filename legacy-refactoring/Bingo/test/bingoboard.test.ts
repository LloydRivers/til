import { BingoBoard } from "../src";

describe("Capture initial logic", () => {
  test("should throw error if cell is already defined", () => {
    const board = new BingoBoard(5, 5);
    board.defineCell(0, 0, "10");
    expect(() => board.defineCell(0, 0, "10")).toThrow("cell already defined");
  });

  it("")
});
