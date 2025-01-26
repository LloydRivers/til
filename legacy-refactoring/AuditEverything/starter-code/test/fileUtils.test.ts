import { describe, it, expect } from "vitest";
import { sortByIndex } from "../src/helpers/fileUtils";

describe("sortByIndex", () => {
  it("should sort files by their numeric index", () => {
    const files = ["audit_10.txt", "audit_2.txt", "audit_1.txt"];
    const sorted = sortByIndex(files);
    expect(sorted).toEqual(["audit_1.txt", "audit_2.txt", "audit_10.txt"]);
  });

  it("should handle files with no numeric index", () => {
    const files = ["audit.txt", "audit_2.txt", "audit_1.txt"];
    const sorted = sortByIndex(files);
    expect(sorted).toEqual(["audit_1.txt", "audit_2.txt", "audit.txt"]);
  });

  it("should handle empty arrays", () => {
    const files: string[] = [];
    const sorted = sortByIndex(files);
    expect(sorted).toEqual([]);
  });
});
