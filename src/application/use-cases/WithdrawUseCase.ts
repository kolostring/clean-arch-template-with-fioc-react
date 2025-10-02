import { err, Result } from "@/common/Result";
import { BankAccount } from "@/domain/entities/BankAccount";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { createDIToken } from "fioc";
import { AuthService } from "../services/AuthService";

export const WithdrawUseCaseFactory =
  (userRepo: UserRepository, authService: AuthService) =>
  async (amount: number): Promise<Result<void>> => {
    const logedUserResult = await authService.getLogedUser();
    if (!logedUserResult.ok) {
      return logedUserResult;
    }

    if (!logedUserResult.data) {
      return err("Not authenticated");
    }

    const userID = logedUserResult.data.userID;

    const accountResult = await userRepo.getUserBankAccount(userID);
    if (!accountResult.ok) {
      return accountResult;
    }

    const account = accountResult.data;
    if (!account) {
      return err("User has no account");
    }

    try {
      const saveResult = await userRepo.saveUserBankAccount(
        BankAccount.withdraw(account, amount)
      );
      return saveResult;
    } catch (e) {
      if (e instanceof Error) {
        return err(e.message);
      }
      return err("unknown error");
    }
  };

export const WithdrawUseCase =
  createDIToken<ReturnType<typeof WithdrawUseCaseFactory>>().as(
    "WithdrawlUseCase"
  );
