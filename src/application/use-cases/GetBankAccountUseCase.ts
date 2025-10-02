import { err, ok } from "@/common/Result";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { createDIToken } from "fioc";
import { AuthService } from "../services/AuthService";

export const GetBankAccountUseCaseFactory =
  (userRepo: UserRepository, authService: AuthService) => async () => {
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

    if (!accountResult.data) {
      return err("Bank account not found");
    }

    return ok(accountResult.data);
  };

export const GetBankAccountUseCase = createDIToken<
  ReturnType<typeof GetBankAccountUseCaseFactory>
>().as("GetBankAccountUseCase");
