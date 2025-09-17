import { err, ok } from "@/common/Result";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { createDIToken } from "fioc";
export const GetUserUseCaseFactory =
  (userRepo: UserRepository) => async (userID: string) => {
    const userResult = await userRepo.getUser(userID);
    if (!userResult.ok) {
      return userResult;
    }

    if (!userResult.data) {
      return err(new Error("User not found"));
    }

    return ok(userResult.data);
  };

export const GetUserUseCase =
  createDIToken<ReturnType<typeof GetUserUseCaseFactory>>("GetUserUseCase");
