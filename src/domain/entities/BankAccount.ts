import { taxesPercent } from "../const/taxes-percent";

export type BankAccount = {
  userID: string;
  balance: number;
  operationsLog: (`Deposit ${number}$` | `Withdraw ${number}$`)[];
};

export const BankAccount = {
  create: (userID: string, balance: number): BankAccount => ({
    userID,
    balance,
    operationsLog: [],
  }),

  deposit: (account: BankAccount, amount: number): BankAccount => ({
    ...account,
    balance: account.balance + amount - amount * taxesPercent,
    operationsLog: [...account.operationsLog, `Deposit ${amount}$`],
  }),

  withdraw: (account: BankAccount, amount: number): BankAccount => {
    if (amount > account.balance) {
      throw new Error("Amount is greater than balance");
    }

    return {
      ...account,
      balance: account.balance - amount,
      operationsLog: [...account.operationsLog, `Withdraw ${amount}$`],
    };
  },
};
