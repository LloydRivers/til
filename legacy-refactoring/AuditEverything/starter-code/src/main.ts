/*
This kata was taken from here: https://sammancoaching.org/kata_descriptions/audit.html

The original was written in Java, and I wanted a chance to refactor it in TypeScript.

I have tried to make it as readable as possible. 
*/

import { FileHandler } from "./class/FileHandler";

export class AuditManager {
  private readonly maxEntriesPerFile: number;
  private readonly directoryName: string;
  private readonly fileHandler: FileHandler;

  constructor(
    maxEntriesPerFile: number,
    directoryName: string,
    fileHandler: FileHandler
  ) {
    this.maxEntriesPerFile = maxEntriesPerFile;
    this.directoryName = directoryName;
    this.fileHandler = fileHandler;
  }

  addRecord(visitorName: string, timeOfVisit: Date) {
    const sortedFiles = this.fileHandler.getSortedFiles(this.directoryName);
    const newRecord = `${visitorName};${timeOfVisit.toISOString()}`;

    // If no files exist, create the first one
    if (sortedFiles.length === 0) {
      return this.createNewFile(newRecord, 1);
    }

    // Get the current file and lines
    const currentFilePath = sortedFiles[sortedFiles.length - 1];
    const lines = this.fileHandler.readFileLines(currentFilePath);

    // If the file is not full, append to it
    if (lines.length < this.maxEntriesPerFile) {
      return this.appendToFile(currentFilePath, lines, newRecord);
    }

    // If the file is full, create a new file
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
