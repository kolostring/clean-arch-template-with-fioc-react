import { CreateUserUseCase } from "@/application/use-cases/CreateUserUseCase";
import { DeleteUserUseCase } from "@/application/use-cases/DeleteUserUseCase";
import { DepositUseCase } from "@/application/use-cases/DepositUseCase";
import { GetBankAccountUseCase } from "@/application/use-cases/GetBankAccountUseCase";
import { GetUserUseCase } from "@/application/use-cases/GetUserUseCase";
import { WithdrawlUseCase } from "@/application/use-cases/WithdrawlUseCase";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { LocalStorageUserRepository } from "@/infrastructure/LocalStorageRepositories/LocalStorageUserRepository";
import { buildContainer, buildManager } from "fioc-react";

export const DI_MANAGER = buildManager().registerContainer(
  buildContainer()
    .register(UserRepository, LocalStorageUserRepository)
    .registerConsumer(CreateUserUseCase)
    .registerConsumer(DeleteUserUseCase)
    .registerConsumer(DepositUseCase)
    .registerConsumer(WithdrawlUseCase)
    .registerConsumer(GetUserUseCase)
    .registerConsumer(GetBankAccountUseCase)
    .makeStatic()
);
