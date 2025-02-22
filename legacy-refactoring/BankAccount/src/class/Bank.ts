import { IBankAccount } from "../types";

export class BankAccount implements IBankAccount {
  private balance = 0;
  getBalance(): number {
    return this.balance;
  }
  deposit(amount: number): void {}
  withdraw(amount: number): void {}
  printStatement(): void {}
}
