import { vi, Mock } from "vitest";
import { AuditManager } from "../src/main";

type MockIFileHandler = {
  getSortedFiles: Mock<(directory: string) => string[]>;
  readFileLines: Mock<(filePath: string) => string[]>;
  writeFile: Mock<(filePath: string, content: string) => void>;
};

describe("AuditManager", () => {
  let mockFileHandler: MockIFileHandler;
  let auditManager: AuditManager;

  beforeEach(() => {
    mockFileHandler = {
      getSortedFiles: vi.fn(),
      readFileLines: vi.fn(),
      writeFile: vi.fn(),
    };

    auditManager = new AuditManager(3, "/audit", mockFileHandler);
  });

  describe("addRecord", () => {
    it("creates first file when no files exist", () => {
      // Arrange
      mockFileHandler.getSortedFiles.mockReturnValue([]);
      const visitorName = "Alice";
      const timeOfVisit = new Date("2021-01-01T00:00:00Z");

      // Act
      auditManager.addRecord(visitorName, timeOfVisit);

      // Assert
      expect(mockFileHandler.writeFile).toHaveBeenCalledWith(
        "/audit/audit_1.txt",
        "Alice;2021-01-01T00:00:00.000Z"
      );
    });

    it("appends to existing file when not at capacity", () => {
      // Arrange
      console.log(typeof mockFileHandler.getSortedFiles);

      mockFileHandler.getSortedFiles.mockReturnValue(["/audit/audit_1.txt"]);
      mockFileHandler.readFileLines.mockReturnValue([
        "Bob;2021-01-01T00:00:00.000Z",
      ]);

      // Act
      auditManager.addRecord("Alice", new Date("2021-01-01T01:00:00Z"));

      // Assert
      expect(mockFileHandler.writeFile).toHaveBeenCalledWith(
        "/audit/audit_1.txt",
        "Bob;2021-01-01T00:00:00.000Z\nAlice;2021-01-01T01:00:00.000Z"
      );
    });

    it("creates new file when current file is at capacity", () => {
      // Arrange
      mockFileHandler.getSortedFiles.mockReturnValue(["/audit/audit_1.txt"]);
      mockFileHandler.readFileLines.mockReturnValue([
        "Bob;2021-01-01T00:00:00.000Z",
        "Charlie;2021-01-01T01:00:00.000Z",
        "David;2021-01-01T02:00:00.000Z",
      ]);

      // Act
      auditManager.addRecord("Alice", new Date("2021-01-01T03:00:00Z"));

      // Assert
      expect(mockFileHandler.writeFile).toHaveBeenCalledWith(
        "/audit/audit_2.txt",
        "Alice;2021-01-01T03:00:00.000Z"
      );
    });

    it("handles multiple files correctly", () => {
      // Arrange
      mockFileHandler.getSortedFiles.mockReturnValue([
        "/audit/audit_1.txt",
        "/audit/audit_2.txt",
      ]);
      mockFileHandler.readFileLines.mockReturnValue([
        "Eve;2021-01-01T00:00:00.000Z",
        "Frank;2021-01-01T01:00:00.000Z",
      ]);

      // Act
      auditManager.addRecord("Alice", new Date("2021-01-01T02:00:00Z"));

      // Assert
      expect(mockFileHandler.writeFile).toHaveBeenCalledWith(
        "/audit/audit_2.txt",
        "Eve;2021-01-01T00:00:00.000Z\nFrank;2021-01-01T01:00:00.000Z\nAlice;2021-01-01T02:00:00.000Z"
      );
    });
  });
});
