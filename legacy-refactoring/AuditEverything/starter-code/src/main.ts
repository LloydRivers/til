export interface IFileSystem {
  getFiles(directoryName: string): string[];
  writeAllText(filePath: string, content: string): void;
  readAllLines(filePath: string): string[];
}

export class AuditManager {
  private readonly maxEntriesPerFile: number;
  private readonly directoryName: string;
  private readonly fileSystem: IFileSystem;

  constructor(
    maxEntriesPerFile: number,
    directoryName: string,
    fileSystem: IFileSystem
  ) {
    this.maxEntriesPerFile = maxEntriesPerFile;
    this.directoryName = directoryName;
    this.fileSystem = fileSystem;
  }

  addRecord(visitorName: string, timeOfVisit: Date) {
    const filePaths = this.fileSystem.getFiles(this.directoryName);
    const sorted = this.sortByIndex(filePaths);

    const newRecord = `${visitorName};${timeOfVisit.toISOString()}`;

    if (sorted.length === 0) {
      const newFile = `${this.directoryName}/audit_1.txt`;
      this.fileSystem.writeAllText(newFile, newRecord);
      return;
    }

    const currentFileIndex = sorted.length - 1;
    const currentFilePath = sorted[currentFileIndex];
    const lines = this.fileSystem.readAllLines(currentFilePath);

    if (lines.length < this.maxEntriesPerFile) {
      lines.push(newRecord);
      const newContent = lines.join("\n");
      this.fileSystem.writeAllText(currentFilePath, newContent);
    } else {
      const newName = `audit_${sorted.length + 1}.txt`;
      const newFile = `${this.directoryName}/${newName}`;
      this.fileSystem.writeAllText(newFile, newRecord);
    }
  }

  private sortByIndex(filePaths: string[]): string[] {
    return filePaths.sort((a, b) => {
      const aIndex = parseInt(a.match(/audit_(\d+)\.txt$/)?.[1] || "0", 10);
      const bIndex = parseInt(b.match(/audit_(\d+)\.txt$/)?.[1] || "0", 10);
      return aIndex - bIndex;
    });
  }
}
