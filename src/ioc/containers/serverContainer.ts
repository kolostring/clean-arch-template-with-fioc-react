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
  LoginUseCase,
  LoginUseCaseFactory,
} from "@/application/use-cases/LoginUseCase";
import {
  LogoutUseCase,
  LogoutUseCaseFactory,
} from "@/application/use-cases/LogoutUseCase";
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
  .registerFactoryArray([
    {
      token: LoginUseCase,
      factory: LoginUseCaseFactory,
      dependencies: [AuthService],
    },
    {
      token: LogoutUseCase,
      factory: LogoutUseCaseFactory,
      dependencies: [AuthService],
    },
    {
      token: CreateUserUseCase,
      factory: CreateUserUseCaseFactory,
      dependencies: [UserRepository, AuthService],
    },
    {
      token: DeleteUserUseCase,
      factory: DeleteUserUseCaseFactory,
      dependencies: [UserRepository, AuthService],
    },
    {
      token: DepositUseCase,
      factory: DepositUseCaseFactory,
      dependencies: [UserRepository, AuthService],
    },
    {
      token: GetBankAccountUseCase,
      factory: GetBankAccountUseCaseFactory,
      dependencies: [UserRepository, AuthService],
    },
    {
      token: GetUserUseCase,
      factory: GetUserUseCaseFactory,
      dependencies: [UserRepository, AuthService],
    },
    {
      token: WithdrawUseCase,
      factory: WithdrawUseCaseFactory,
      dependencies: [UserRepository, AuthService],
    },
  ])
  .getResult();
