import { IBankAccount, Transaction } from "../types";
import { bankConfig } from "../constants";

export class BankAccount implements IBankAccount {
  constructor(private balance: number = 0) {}

  transactions: Transaction[] = [];

  getBalance(): number {
    return this.balance;
  }

  private getFormattedDate(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  deposit(amount: number): void {
    this.validateNonNegativeAmount(
      amount,
      bankConfig.errorMessage.negativeDeposit
    );
    this.balance += amount;
    const formattedDate = this.getFormattedDate();
    const transaction: Transaction = {
      date: formattedDate,
      amount: `+${amount}`,
      balance: this.balance,
    };
    this.transactions.push(transaction);
  }
  withdraw(amount: number): void {
    this.validateNonNegativeAmount(
      amount,
      bankConfig.errorMessage.negativeWithdrawal
    );
    if (amount > this.balance) {
      throw new Error("Insufficient funds");
    }
    this.balance -= amount;
    const formattedDate = this.getFormattedDate();
    const transaction: Transaction = {
      date: formattedDate,
      amount: `-${amount}`,
      balance: this.balance,
    };
    this.transactions.push(transaction);
  }
  printStatement(): void {}

  private validateNonNegativeAmount(
    amount: number,
    errorMessage: string
  ): void {
    if (amount < 0) {
      throw new Error(errorMessage);
    }
  }
}
