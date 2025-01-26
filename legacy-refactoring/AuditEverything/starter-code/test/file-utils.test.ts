import { describe, it, expect, vi } from "vitest";
import { AuditManager } from "../src/main";
import { FileHandler } from "../src/class/FileHandler";

// Mock the FileHandler methods
const mockGetSortedFiles = vi.fn();
const mockReadFileLines = vi.fn();
const mockWriteFile = vi.fn();
const fileHandler = new FileHandler({
  getFiles: mockGetSortedFiles,
  writeAllText: mockWriteFile,
  readAllLines: mockReadFileLines,
});

describe("AuditManager", () => {
  const directoryName = "audit_logs";
  const maxEntriesPerFile = 3;
  const auditManager = new AuditManager(
    maxEntriesPerFile,
    directoryName,
    fileHandler
  );

  it("should create a new file when no files exist", () => {
    mockGetSortedFiles.mockReturnValueOnce([]);

    auditManager.addRecord("Visitor 1", new Date("2025-01-01T10:00:00Z"));

    expect(mockWriteFile).toHaveBeenCalledWith(
      `${directoryName}/audit_1.txt`,
      "Visitor 1;2025-01-01T10:00:00.000Z"
    );
  });

  it("should append to an existing file when the file is not full", () => {
    mockGetSortedFiles.mockReturnValueOnce(["audit_1.txt"]);
    mockReadFileLines.mockReturnValueOnce(["Visitor 1;2025-01-01T10:00:00Z"]);

    auditManager.addRecord("Visitor 2", new Date("2025-01-01T10:15:00Z"));

    expect(mockWriteFile).toHaveBeenCalledWith(
      "audit_1.txt",
      "Visitor 1;2025-01-01T10:00:00Z\nVisitor 2;2025-01-01T10:15:00.000Z"
    );
  });

  it("should create a new file when the current file is full", () => {
    mockGetSortedFiles.mockReturnValueOnce(["audit_1.txt"]);
    mockReadFileLines.mockReturnValueOnce([
      "Visitor 1;2025-01-01T10:00:00Z",
      "Visitor 2;2025-01-01T10:15:00Z",
      "Visitor 3;2025-01-01T10:30:00Z",
    ]);

    auditManager.addRecord("Visitor 4", new Date("2025-01-01T10:45:00Z"));

    expect(mockWriteFile).toHaveBeenCalledWith(
      `${directoryName}/audit_2.txt`,
      "Visitor 4;2025-01-01T10:45:00.000Z"
    );
  });

  it("should handle adding a record to an empty file", () => {
    mockGetSortedFiles.mockReturnValueOnce([]);

    auditManager.addRecord("Visitor 1", new Date("2025-01-01T10:00:00Z"));

    expect(mockWriteFile).toHaveBeenCalledWith(
      `${directoryName}/audit_1.txt`,
      "Visitor 1;2025-01-01T10:00:00.000Z"
    );
  });

  it("should not exceed the max entries per file", () => {
    mockGetSortedFiles.mockReturnValueOnce(["audit_1.txt"]);
    mockReadFileLines.mockReturnValueOnce([
      "Visitor 1;2025-01-01T10:00:00Z",
      "Visitor 2;2025-01-01T10:15:00Z",
    ]);

    auditManager.addRecord("Visitor 3", new Date("2025-01-01T10:30:00Z"));
    auditManager.addRecord("Visitor 4", new Date("2025-01-01T10:45:00Z"));

    expect(mockWriteFile).toHaveBeenCalledWith(
      "audit_1.txt",
      "Visitor 1;2025-01-01T10:00:00Z\nVisitor 2;2025-01-01T10:15:00Z\nVisitor 3;2025-01-01T10:30:00.000Z"
    );

    expect(mockWriteFile).toHaveBeenCalledWith(
      "audit_logs/audit_2.txt",
      "Visitor 4;2025-01-01T10:45:00.000Z"
    );
  });
});
