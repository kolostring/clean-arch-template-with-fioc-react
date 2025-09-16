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
  WithdrawlUseCase,
  WithdrawlUseCaseFactory,
} from "@/application/use-cases/WithdrawlUseCase";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { LocalStorageUserRepository } from "@/infrastructure/LocalStorageRepositories/LocalStorageUserRepository";
import { buildDIContainer, buildDIContainerManager } from "fioc-react";

export const DI_MANAGER = buildDIContainerManager()
  .registerContainer(
    buildDIContainer()
      .register(UserRepository, LocalStorageUserRepository)
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
          token: WithdrawlUseCase,
          factory: WithdrawlUseCaseFactory,
          dependencies: [UserRepository],
        },
      ])
      .getResult()
  )
  .getResult();
