import { err, ok } from "@/common/Result";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { createDIToken } from "fioc";
import { AuthService } from "../services/AuthService";
export const GetUserUseCaseFactory =
  (userRepo: UserRepository, authService: AuthService) => async () => {
    const logedUserResult = await authService.getLogedUser();
    if (!logedUserResult.ok) {
      return logedUserResult;
    }

    if (!logedUserResult.data) {
      return err("Not authenticated");
    }

    const userID = logedUserResult.data.userID;

    const userResult = await userRepo.getUser(userID);
    if (!userResult.ok) {
      return userResult;
    }

    if (!userResult.data) {
      return err("User not found");
    }

    return ok(userResult.data);
  };

export const GetUserUseCase =
  createDIToken<ReturnType<typeof GetUserUseCaseFactory>>("GetUserUseCase");
