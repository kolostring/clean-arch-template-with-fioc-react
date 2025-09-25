import { createDIToken } from "fioc";
import { AuthService } from "../services/AuthService";

export const LoginUserControllerFactory =
  (authService: AuthService) => async (email: string, password: string) => {
    const loginResult = await authService.loginUser(email, password);

    return loginResult;
  };

export const LoginUserController = createDIToken<
  ReturnType<typeof LoginUserControllerFactory>
>("LoginUserController");
