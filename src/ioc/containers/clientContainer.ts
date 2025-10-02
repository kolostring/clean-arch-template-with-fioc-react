import { buildDIContainer } from "fioc";
import {
  IoCServerHandlerToken,
  createServerControllerProxy,
} from "fioc-server-utils";
import { iocServerHandler } from "./iocServerHandler.action";
import { CreateUserUseCase } from "@/application/use-cases/CreateUserUseCase";
import { LoginUseCase } from "@/application/use-cases/LoginUseCase";
import { LogoutUseCase } from "@/application/use-cases/LogoutUseCase";
import { DepositUseCase } from "@/application/use-cases/DepositUseCase";
import { WithdrawUseCase } from "@/application/use-cases/WithdrawUseCase";

export const clientContainer = buildDIContainer()
  .register(IoCServerHandlerToken, iocServerHandler)
  .registerFactoryArray([
    createServerControllerProxy(CreateUserUseCase),
    createServerControllerProxy(LoginUseCase),
    createServerControllerProxy(LogoutUseCase),
    createServerControllerProxy(DepositUseCase),
    createServerControllerProxy(WithdrawUseCase),
  ])
  .getResult();
