import { UserRepository } from "@/domain/repositories/UserRepository";
import { defineDIConsumer } from "fioc-react";

export const GetUserUseCase = defineDIConsumer({
  dependencies: [UserRepository],
  description: "GetUserUseCase",
  factory: (userRepo) => async (userID: string) => {
    const userResult = await userRepo.getUser(userID);
    if (!userResult.ok) {
      return userResult;
    }

    return userResult.data;
  },
});
