import { vi } from "vitest";
/*
Rules: 

Your task is to process a sequence of integer numbers to determine the following statistics:

minimum value
maximum value
number of elements in the sequence
average value
For example: [6, 9, 15, -2, 92, 11]

minimum value = -2
maximum value = 92
number of elements in the sequence = 6
average value = 21.833333
If you try to calculate the statistics of an empty sequence, it should throw an exception or otherwise return immediately with the message “sequence is empty”.
*/

import { CalculateStats } from "../src";

describe("CalculateStats", () => {
  let calculator: CalculateStats;
  beforeEach(() => {
    calculator = new CalculateStats([6, 9, 15, -2, 92, 11]);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });
  it("should return the minimum value", () => {
    expect(calculator.getMin()).toBe(-2);
  });
  it("should return the maximum value", () => {
    expect(calculator.getMax()).toBe(92);
  });
  it("should return the number of elements in the sequence", () => {
    expect(calculator.getLength()).toBe(6);
  });
  it("should return the average value", () => {
    expect(calculator.getAvg()).toBe(22);
  });
  it("should throw an exception if the sequence is empty", () => {
    calculator = new CalculateStats([]);
    expect(() => calculator.getAvg()).toThrow();
  });
});
