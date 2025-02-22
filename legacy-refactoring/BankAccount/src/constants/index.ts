import { BankAccountConfig } from "../types";

export const bankConfig = {
  errorMessage: {
    negativeDeposit: "Cannot deposit a negative amount",
    negativeWithdrawal: "Cannot withdraw a negative amount",
    insufficientFunds: "Insufficient funds",
  },
} as const satisfies BankAccountConfig;
