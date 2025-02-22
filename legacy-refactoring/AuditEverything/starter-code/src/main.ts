import { IFileHandler } from "./types";

export class AuditManager {
  private readonly maxEntriesPerFile: number;
  private readonly directoryName: string;
  private readonly fileHandler: IFileHandler;

  constructor(
    maxEntriesPerFile: number,
    directoryName: string,
    fileHandler: IFileHandler
  ) {
    this.maxEntriesPerFile = maxEntriesPerFile;
    this.directoryName = directoryName;
    this.fileHandler = fileHandler;
  }

  addRecord(visitorName: string, timeOfVisit: Date) {
    const sortedFiles = this.fileHandler.getSortedFiles(this.directoryName);
    const newRecord = `${visitorName};${timeOfVisit.toISOString()}`;

    if (sortedFiles.length === 0) {
      return this.createNewFile(newRecord, 1);
    }

    const currentFilePath = sortedFiles[sortedFiles.length - 1];
    const lines = this.fileHandler.readFileLines(currentFilePath);

    if (lines.length < this.maxEntriesPerFile) {
      console.log("appending to file");
      return this.appendToFile(currentFilePath, lines, newRecord);
    }

    return this.createNewFile(newRecord, sortedFiles.length + 1);
  }

  // Helper function to create a new file and write the first record
  private createNewFile(record: string, fileIndex: number) {
    const newFile = `${this.directoryName}/audit_${fileIndex}.txt`;
    this.fileHandler.writeFile(newFile, record);
  }

  // Helper function to append a new record to an existing file
  private appendToFile(filePath: string, lines: string[], record: string) {
    lines.push(record);
    const newContent = lines.join("\n");
    this.fileHandler.writeFile(filePath, newContent);
  }
}
