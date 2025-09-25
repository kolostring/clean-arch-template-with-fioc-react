import { err } from "@/common/Result";
import { AuthService } from "../services/AuthService";
import { createDIToken } from "fioc";
import { WithdrawUseCaseFactory } from "../use-cases/WithdrawUseCase";

export const WithdrawControllerFactory =
  (
    withdrawUseCase: ReturnType<typeof WithdrawUseCaseFactory>,
    authService: AuthService
  ) =>
  async (amount: number) => {
    const userResult = await authService.getUser();
    if (!userResult.ok) {
      return userResult;
    }

    const user = userResult.data;
    if (!user) {
      return err(new Error("Not authenticated"));
    }

    const depositResult = await withdrawUseCase(user.userID, amount);
    return depositResult;
  };

export const WithdrawController =
  createDIToken<ReturnType<typeof WithdrawControllerFactory>>(
    "WithdrawController"
  );
