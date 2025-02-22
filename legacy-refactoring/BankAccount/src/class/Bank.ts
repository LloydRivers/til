import { IBankAccount } from "../types";
import { bankConfig } from "../constants";

export class BankAccount implements IBankAccount {
  private balance = 0;
  getBalance(): number {
    return this.balance;
  }
  deposit(amount: number): void {
    this.validateNonNegativeAmount(
      amount,
      bankConfig.errorMessage.negativeDeposit
    );
    this.balance += amount;
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
