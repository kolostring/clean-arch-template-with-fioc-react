import { err, ok } from "@/common/Result";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { createDIToken } from "fioc";

export const GetBankAccountUseCaseFactory =
  (userRepo: UserRepository) => async (userID: string) => {
    const accountResult = await userRepo.getUserBankAccount(userID);
    if (!accountResult.ok) {
      return accountResult;
    }

    if (!accountResult.data) {
      return err(new Error("Bank account not found"));
    }

    return ok(accountResult.data);
  };

export const GetBankAccountUseCase = createDIToken<
  ReturnType<typeof GetBankAccountUseCaseFactory>
>("GetBankAccountUseCase");
