import { err, Result } from "@/common/Result";
import { BankAccount } from "@/domain/entities/BankAccount";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { createDIToken } from "fioc";
import { AuthService } from "../services/AuthService";

export const DepositUseCaseFactory =
  (userRepo: UserRepository, AuthService: AuthService) =>
  async (amount: number): Promise<Result<void>> => {
    const logedUserResult = await AuthService.getLogedUser();
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
      const newState = BankAccount.deposit(account, amount);
      const saveResult = await userRepo.saveUserBankAccount(newState);
      return saveResult;
    } catch (e) {
      if (e instanceof Error) {
        return err(e.message);
      }
      return err("unknown error");
    }
  };

export const DepositUseCase =
  createDIToken<ReturnType<typeof DepositUseCaseFactory>>().as(
    "DepositUseCase"
  );
