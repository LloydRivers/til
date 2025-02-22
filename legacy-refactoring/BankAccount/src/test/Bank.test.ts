import { Bank } from "../class/Bank";

describe("Bank", () => {
  it("can instantiate a bank account", () => {
    const bank = new Bank();
    expect(bank).toBeInstanceOf(Bank);
  });
});
