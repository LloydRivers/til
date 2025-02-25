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
  printStatement(): void {
    const titleColumnWidth = 30;
    const priceColumnWidth = 10;
    const balanceColumnWidth = 10;

    console.log("Date       || Amount || Balance");
    console.log("-------------------------------");
    /*
If anyone is reading this, the solution below came from:
https://medium.com/@onlinemsr/javascript-string-format-the-best-3-ways-to-do-it-c6a12b4b94ed#:~:text=String%20format%20table%20structure,values%20in%20a%20table%20structure.
*/
    this.transactions.forEach((transaction) => {
      const { date, amount, balance } = transaction;
      const title = date.padEnd(titleColumnWidth, "");
      const price = amount.padEnd(priceColumnWidth, "");
      const balanceStr = balance.toString().padStart(balanceColumnWidth, "");

      console.log(`${title} || ${price}  || ${balanceStr}`);
    });
  }

  private validateNonNegativeAmount(
    amount: number,
    errorMessage: string
  ): void {
    if (amount < 0) {
      throw new Error(errorMessage);
    }
  }
}
