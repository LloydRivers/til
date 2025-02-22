import { IFileSystem } from "../types";

export class InMemoryFileSystem implements IFileSystem {
  private files: Record<string, string> = {};

  private validateDirectory(directory: string): void {
    if (!directory || directory.trim() === "") {
      throw new Error("Invalid directory path");
    }
  }

  getFiles(directory: string): string[] {
    // Directory is still "audit_logs"
    this.validateDirectory(directory);
    return Object.keys(this.files).filter((file) => file.startsWith(directory));
  }

  readAllLines(filePath: string): string[] {
    const file = this.files[filePath];
    if (!file) {
      throw new Error(`File not found: ${filePath}`);
    }
    return file.split("\n");
  }

  writeAllText(filePath: string, content: string): void {
    if (!filePath || filePath.trim() === "") {
      throw new Error("Invalid file path");
    }
    this.files[filePath] = content;
  }
}
