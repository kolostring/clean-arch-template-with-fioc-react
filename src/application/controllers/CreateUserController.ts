import { createDIToken } from "fioc";
import { AuthService } from "../services/AuthService";
import { CreateUserUseCaseFactory } from "../use-cases/CreateUserUseCase";

export const CreateUserControllerFactory =
  (
    createUserUseCase: ReturnType<typeof CreateUserUseCaseFactory>,
    authService: AuthService
  ) =>
  async (
    name: string,
    email: string,
    password: string,
    initialDeposit: number
  ) => {
    const createUserResult = await createUserUseCase(
      name,
      email,
      initialDeposit
    );
    if (!createUserResult.ok) {
      return createUserResult;
    }

    const createSecuredUserResult = await authService.createUser(
      createUserResult.data.id,
      password
    );

    return createSecuredUserResult;
  };

export const CreateUserController = createDIToken<
  ReturnType<typeof CreateUserControllerFactory>
>("CreateUserController");
