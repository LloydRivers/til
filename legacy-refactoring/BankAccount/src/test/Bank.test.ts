import { BankAccount } from "../class/Bank";

describe("Bank", () => {
  it("can instantiate a bank account", () => {
    const bank = new BankAccount();
    expect(bank).toBeInstanceOf(BankAccount);
  });

  it("should imlement the BankAccount interface", () => {
    const bank = new BankAccount();
    expect(bank.deposit).toBeDefined();
    expect(bank.withdraw).toBeDefined();
    expect(bank.printStatement).toBeDefined();
  });

  it("should have a balance of 0 when instantiated", () => {
    const bank = new BankAccount();
    expect(bank.getBalance()).toBe(0);
  });
});
