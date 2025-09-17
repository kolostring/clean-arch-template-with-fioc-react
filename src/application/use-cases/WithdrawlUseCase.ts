import { err, Result } from "@/common/Result";
import { BankAccount } from "@/domain/entities/BankAccount";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { createDIToken } from "fioc";

export const WithdrawlUseCaseFactory =
  (userRepo: UserRepository) =>
  async (userID: string, amount: number): Promise<Result<void>> => {
    const accountResult = await userRepo.getUserBankAccount(userID);
    if (!accountResult.ok) {
      return accountResult;
    }

    const account = accountResult.data;
    if (!account) {
      return err(new Error("User has no account"));
    }

    try {
      BankAccount.withdrawl(account, amount);
    } catch (e) {
      return err(e as Error);
    }

    const saveResult = await userRepo.saveUserBankAccount(account);
    return saveResult;
  };

export const WithdrawlUseCase =
  createDIToken<ReturnType<typeof WithdrawlUseCaseFactory>>("WithdrawlUseCase");
