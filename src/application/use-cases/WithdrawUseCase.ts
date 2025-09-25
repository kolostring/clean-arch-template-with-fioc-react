import { err, Result } from "@/common/Result";
import { BankAccount } from "@/domain/entities/BankAccount";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { createDIToken } from "fioc";

export const WithdrawUseCaseFactory =
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
      const saveResult = await userRepo.saveUserBankAccount(
        BankAccount.withdrawl(account, amount)
      );
      return saveResult;
    } catch (e) {
      return err(e as Error);
    }
  };

export const WithdrawUseCase =
  createDIToken<ReturnType<typeof WithdrawUseCaseFactory>>("WithdrawlUseCase");
