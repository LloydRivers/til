export interface IBankAccount {
  deposit(amount: number): void;
  withdraw(amount: number): void;
  printStatement(): void;
}

export type BankAccountConfig = {
  errorMessage: {
    negativeDeposit: string;
    negativeWithdrawal: string;
    insufficientFunds: string;
  };
};
