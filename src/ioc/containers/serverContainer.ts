import {
  CreateUserController,
  CreateUserControllerFactory,
} from "@/application/controllers/CreateUserController";
import {
  DepositController,
  DepositControllerFactory,
} from "@/application/controllers/DepositController";
import {
  LoginUserController,
  LoginUserControllerFactory,
} from "@/application/controllers/LoginUserController";
import {
  LogoutUserController,
  LogoutUserControllerFactory,
} from "@/application/controllers/LogoutUserController";
import {
  WithdrawController,
  WithdrawControllerFactory,
} from "@/application/controllers/WithdrawController";
import { AuthService } from "@/application/services/AuthService";
import {
  CreateUserUseCase,
  CreateUserUseCaseFactory,
} from "@/application/use-cases/CreateUserUseCase";
import {
  DeleteUserUseCase,
  DeleteUserUseCaseFactory,
} from "@/application/use-cases/DeleteUserUseCase";
import {
  DepositUseCase,
  DepositUseCaseFactory,
} from "@/application/use-cases/DepositUseCase";
import {
  GetBankAccountUseCase,
  GetBankAccountUseCaseFactory,
} from "@/application/use-cases/GetBankAccountUseCase";
import {
  GetUserUseCase,
  GetUserUseCaseFactory,
} from "@/application/use-cases/GetUserUseCase";
import {
  WithdrawUseCase,
  WithdrawUseCaseFactory,
} from "@/application/use-cases/WithdrawUseCase";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { JWTAuthService } from "@/infrastructure/JWTAuthService";
import { LowDBUserRepository } from "@/infrastructure/LowDBUserRepository";
import { buildDIContainer } from "fioc";

export const serverContainer = buildDIContainer()
  .register(UserRepository, LowDBUserRepository)
  .register(AuthService, JWTAuthService)
  .registerConsumerArray([
    {
      token: CreateUserUseCase,
      factory: CreateUserUseCaseFactory,
      dependencies: [UserRepository],
    },
    {
      token: DeleteUserUseCase,
      factory: DeleteUserUseCaseFactory,
      dependencies: [UserRepository],
    },
    {
      token: DepositUseCase,
      factory: DepositUseCaseFactory,
      dependencies: [UserRepository],
    },
    {
      token: GetBankAccountUseCase,
      factory: GetBankAccountUseCaseFactory,
      dependencies: [UserRepository],
    },
    {
      token: GetUserUseCase,
      factory: GetUserUseCaseFactory,
      dependencies: [UserRepository],
    },
    {
      token: WithdrawUseCase,
      factory: WithdrawUseCaseFactory,
      dependencies: [UserRepository],
    },
  ])
  .registerConsumer({
    token: CreateUserController,
    factory: CreateUserControllerFactory,
    dependencies: [CreateUserUseCase, AuthService],
  })
  .registerConsumer({
    token: LoginUserController,
    factory: LoginUserControllerFactory,
    dependencies: [AuthService],
  })
  .registerConsumer({
    token: LogoutUserController,
    factory: LogoutUserControllerFactory,
    dependencies: [AuthService],
  })
  .registerConsumer({
    token: DepositController,
    factory: DepositControllerFactory,
    dependencies: [DepositUseCase, AuthService],
  })
  .registerConsumer({
    token: WithdrawController,
    factory: WithdrawControllerFactory,
    dependencies: [WithdrawUseCase, AuthService],
  })
  .getResult();
