import { IFileSystem } from "../types";

export class FileHandler {
  constructor(private readonly fileSystem: IFileSystem) {}

  getSortedFiles(directory: string): string[] {
    const filePaths = this.fileSystem.getFiles(directory);
    return this.sortByIndex(filePaths);
  }

  readFileLines(filePath: string): string[] {
    return this.fileSystem.readAllLines(filePath);
  }

  writeFile(filePath: string, content: string): void {
    this.fileSystem.writeAllText(filePath, content);
  }

  private sortByIndex(filePaths: string[] = []): string[] {
    if (!filePaths) return [];
    return filePaths.sort((fileA, fileB) => {
      const matchA = fileA.match(/audit_(\d+)\.txt$/);
      const matchB = fileB.match(/audit_(\d+)\.txt$/);
      return matchA ? (matchB ? +matchA[1] - +matchB[1] : -1) : 1;
    });
  }
}
