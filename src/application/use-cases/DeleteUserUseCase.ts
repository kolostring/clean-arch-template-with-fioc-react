import { err, Result } from "@/common/Result";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { createDIToken } from "fioc";
import { AuthService } from "../services/AuthService";

export const DeleteUserUseCaseFactory =
  (userRepo: UserRepository, authService: AuthService) =>
  async (): Promise<Result<void>> => {
    const logedUserResult = await authService.getLogedUser();
    if (!logedUserResult.ok) {
      return logedUserResult;
    }

    if (!logedUserResult.data) {
      return err("Not authenticated");
    }

    const userID = logedUserResult.data.userID;

    const findUserResult = await userRepo.getUser(userID);
    if (!findUserResult.ok) {
      return findUserResult;
    }

    if (!findUserResult.data) {
      return err("User not found");
    }

    const findAccountResult = await userRepo.getUserBankAccount(userID);
    if (!findAccountResult.ok) {
      return findAccountResult;
    }

    if (!findAccountResult.data) {
      return err("User has no account");
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
