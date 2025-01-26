import { describe, it, expect, vi } from "vitest";
import { AuditManager } from "../src/main";
import { FileHandler } from "../src/class/FileHandler";
import { IFileSystem } from "../src/types/index";

describe("AuditManager", () => {
  it("should create a new file when no files exist", () => {
    const mockFileSystem: IFileSystem = {
      getFiles: vi.fn().mockReturnValue([]),
      writeAllText: vi.fn(),
      readAllLines: vi.fn(),
    };

    const fileHandler = new FileHandler(mockFileSystem);

    const auditManager = new AuditManager(2, "test_directory", fileHandler);

    auditManager.addRecord("John Doe", new Date("2023-01-01T10:00:00Z"));

    expect(mockFileSystem.writeAllText).toHaveBeenCalledWith(
      "test_directory/audit_1.txt",
      "John Doe;2023-01-01T10:00:00.000Z"
    );
  });
});
