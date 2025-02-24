import { BingoCard } from "../src/Card/BingoCard";
import { Coordinate } from "../src/Coordinate/Coordinate";

describe("UK BingoCard", () => {
  let bingoCard: BingoCard;

  beforeEach(() => {
    bingoCard = new BingoCard();
  });
  describe("Generating a new board", () => {
    it("should have the center cell empty", () => {
      bingoCard.startGame();
      // Access the cells through gridManager.getCells() instead of bingoCard["cells"]
      const cells = bingoCard.gridManager.getCells();
      expect(cells[1][4]?.getValue()).toBeUndefined();
    });

    it("should have 15 numbers", () => {
      bingoCard.startGame();
      const cells = bingoCard.gridManager.getCells().flat();
      const numberCount = cells.filter(
        (cell) => cell?.getValue() !== undefined
      ).length;

      expect(numberCount).toBe(15);
    });

    it("should have 12 blanks", () => {
      bingoCard.startGame();
      const cells = bingoCard.gridManager.getCells().flat();

      const blankCount = cells.filter(
        (cell) => cell?.getValue() === undefined
      ).length;

      expect(blankCount).toBe(12); // Should log 12, now that you're accessing the correct grid
    });
  });

  describe("Grid Management", () => {
    it("allows defining values in empty cells", () => {
      expect(() => {
        bingoCard.defineCell(new Coordinate(0, 0), 42);
      }).not.toThrow();
    });

    it("prevents defining cells outside the grid", () => {
      expect(() => {
        bingoCard.defineCell(new Coordinate(999, 999), 42);
      }).toThrow("out of bounds");
    });

    it("prevents duplicate values in the grid", () => {
      bingoCard.defineCell(new Coordinate(0, 0), 42);
      expect(() => {
        bingoCard.defineCell(new Coordinate(0, 0), 42);
      }).toThrow("already present");
    });
  });
});
