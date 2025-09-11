import { UserRepository } from "@/domain/repositories/UserRepository";
import { defineDIConsumer } from "fioc-react";

export const GetBankAccountUseCase = defineDIConsumer({
  dependencies: [UserRepository],
  description: "GetBankAccountUseCase",
  factory: (userRepo) => async (userID: string) => {
    const accountResult = await userRepo.getUserBankAccount(userID);
    if (!accountResult.ok) {
      return accountResult;
    }

    return accountResult.data;
  },
});
