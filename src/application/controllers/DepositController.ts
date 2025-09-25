import { err } from "@/common/Result";
import { AuthService } from "../services/AuthService";
import { DepositUseCaseFactory } from "../use-cases/DepositUseCase";
import { createDIToken } from "fioc";

export const DepositControllerFactory =
  (
    depositUseCase: ReturnType<typeof DepositUseCaseFactory>,
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

    const depositResult = await depositUseCase(user.userID, amount);
    return depositResult;
  };

export const DepositController =
  createDIToken<ReturnType<typeof DepositControllerFactory>>(
    "DepositController"
  );
