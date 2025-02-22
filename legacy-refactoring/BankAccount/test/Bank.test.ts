import { BankAccount } from "../src/class/Bank";

const result = `Date       || Amount || Balance
2012-01-14 || -500   || 2500
2012-01-13 || 2000   || 3000
2012-01-10 || 1000   || 1000`;

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

  it("should have a balance of 1000 when instantiated", () => {
    const bank = new BankAccount(1000);
    expect(bank.getBalance()).toBe(1000);
  });

  it("should allow deposits", () => {
    const bank = new BankAccount();
    expect(bank.deposit(100));
    expect(bank.getBalance()).toBe(100);
  });

  it("should push deposits to the transactions array", () => {
    const bank = new BankAccount();
    bank.deposit(100);
    expect(bank.transactions.length).toBe(1);
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

  it("should push withdrawals to the transactions array", () => {
    const bank = new BankAccount();
    bank.deposit(100);
    bank.withdraw(50);
    expect(bank.transactions.length).toBe(2);
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

  it("should print a statement", () => {
    const bank = new BankAccount();
    bank.deposit(1000);
    bank.deposit(2000);
    bank.withdraw(1500);
    bank.printStatement();
  });
});
