import { createDIToken } from "fioc";
import { AuthService } from "../services/AuthService";

export const LogoutUserControllerFactory =
  (authService: AuthService) => async () => {
    const logoutResult = await authService.logoutUser();

    return logoutResult;
  };

export const LogoutUserController = createDIToken<
  ReturnType<typeof LogoutUserControllerFactory>
>("LogoutUserController");
