import { createDIToken } from "fioc";
import { AuthService } from "../services/AuthService";

export const LoginUseCaseFactory =
  (authService: AuthService) => async (email: string, password: string) => {
    return authService.loginUser(email, password);
  };

export const LoginUseCase =
  createDIToken<ReturnType<typeof LoginUseCaseFactory>>().as("LoginUseCase");
