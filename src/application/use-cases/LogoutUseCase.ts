import { createDIToken } from "fioc";
import { AuthService } from "../services/AuthService";

export const LogoutUseCaseFactory = (authService: AuthService) => async () => {
  return authService.logoutUser();
};

export const LogoutUseCase =
  createDIToken<ReturnType<typeof LogoutUseCaseFactory>>().as("LogoutUseCase");
