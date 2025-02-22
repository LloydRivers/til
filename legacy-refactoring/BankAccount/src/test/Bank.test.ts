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

  it("should allow deposits", () => {
    const bank = new BankAccount();
    expect(bank.deposit(100));
    expect(bank.getBalance()).toBe(100);
  });

  it("should not allow negative deposits", () => {
    const bank = new BankAccount();
    expect(() => bank.deposit(-100)).toThrow("Cannot deposit a negative ");
  });

  it("should allow withdrawals", () => {
    const bank = new BankAccount();
    bank.deposit(100);
    bank.withdraw(50);
    expect(bank.getBalance()).toBe(50);
  });

  it("should not allow negative withdrawals", () => {
    const bank = new BankAccount();
    expect(() => bank.withdraw(-50)).toThrow(
      "Cannot withdraw a negative amount"
    );
  });

  it("should not allow withdrawals with insufficient funds", () => {
    const bank = new BankAccount();
    bank.deposit(50);
    expect(() => bank.withdraw(100)).toThrow("Insufficient funds");
  });
});
