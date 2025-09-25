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
import { LowDBUserRepository } from "@/infrastructure/LowDBUserRepository";
import { buildDIContainer } from "fioc";

export const serverContainer = buildDIContainer()
  .register(UserRepository, LowDBUserRepository)
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
  .getResult();
