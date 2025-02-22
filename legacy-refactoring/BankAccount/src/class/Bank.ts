import { IBankAccount } from "../types";

export class BankAccount implements IBankAccount {
  private balance = 0;
  getBalance(): number {
    return this.balance;
  }
  deposit(amount: number): void {
    if (amount < 0) {
      throw new Error("Cannot deposit a negative amount");
    }
    this.balance += amount;
  }
  withdraw(amount: number): void {
    if (amount < 0) {
      throw new Error("Cannot withdraw a negative amount");
    }
    if (amount > this.balance) {
      throw new Error("Insufficient funds");
    }
    this.balance -= amount;
  }
  printStatement(): void {}
}
