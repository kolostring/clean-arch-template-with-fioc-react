import { err, Result } from "@/common/Result";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { createDIToken } from "fioc-react";

export const DeleteUserUseCaseFactory =
  (userRepo: UserRepository) =>
  async (userID: string): Promise<Result<void>> => {
    const findUserResult = await userRepo.getUser(userID);
    if (!findUserResult.ok) {
      return findUserResult;
    }

    if (!findUserResult.data) {
      return err(new Error("User not found"));
    }

    const findAccountResult = await userRepo.getUserBankAccount(userID);
    if (!findAccountResult.ok) {
      return findAccountResult;
    }

    if (!findAccountResult.data) {
      return err(new Error("User has no account"));
    }

    const deleteAccountResult = await userRepo.deleteUserBankAccount(userID);
    if (!deleteAccountResult.ok) {
      return deleteAccountResult;
    }

    const deleteUserResult = await userRepo.deleteUser(userID);
    if (!deleteUserResult.ok) {
      userRepo.saveUserBankAccount(findAccountResult.data);
      return deleteUserResult;
    }

    return deleteUserResult;
  };

export const DeleteUserUseCase =
  createDIToken<ReturnType<typeof DeleteUserUseCaseFactory>>(
    "DeleteUserUseCase"
  );
