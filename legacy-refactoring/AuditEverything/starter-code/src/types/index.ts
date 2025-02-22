export interface IFileSystem {
  getFiles(directoryName: string): string[];
  writeAllText(filePath: string, content: string): void;
  readAllLines(filePath: string): string[];
}

export interface IFileHandler {
  getSortedFiles(directory: string): string[];
  readFileLines(filePath: string): string[];
  writeFile(filePath: string, content: string): void;
}
