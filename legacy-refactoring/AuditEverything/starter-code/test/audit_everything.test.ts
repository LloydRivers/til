import { AuditManager } from "../src/main";
import { IFileSystem } from "../src/types";

class MockFileSystem implements IFileSystem {
  files: string[] = [];
  fileContents: { [key: string]: string[] } = {};

  getFiles(): string[] {
    return this.files;
  }

  writeAllText(filePath: string, content: string): void {
    this.fileContents[filePath] = [content];
    this.files.push(filePath);
  }

  readAllLines(filePath: string): string[] {
    return this.fileContents[filePath] || [];
  }
}

it("adds new visitor to a new file when the last file is full", () => {
  const mockFileSystem = new MockFileSystem();
  mockFileSystem.files = ["audits/audit_2.txt", "audits/audit_1.txt"];

  mockFileSystem.fileContents = {
    "audits/audit_2.txt": [
      "Peter;2019-04-06T16:30:00.000Z",
      "Jane;2019-04-06T16:40:00.000Z",
      "Jack;2019-04-06T17:00:00.000Z",
    ],
  };

  const auditManager = new AuditManager(3, "audits", mockFileSystem);

  auditManager.addRecord("Alice", new Date("2019-04-06T17:00:00.000Z"));
  // [ 'audits/audit_2.txt', 'audits/audit_1.txt' ]
  expect(mockFileSystem.files).toContain("audits/audit_3.txt");
  expect(mockFileSystem.fileContents["audits/audit_3.txt"]).toEqual([
    "Alice;2019-04-06T17:00:00.000Z",
  ]);
});
