import { buildDIContainer } from "fioc";
import { IOCServerHandlerToken, serverConsumerProxy } from "fioc-server-utils";
import { iocServerHandler } from "./iocServerHandler.action";
import { CreateUserController } from "@/application/controllers/CreateUserController";
import { LoginUserController } from "@/application/controllers/LoginUserController";
import { LogoutUserController } from "@/application/controllers/LogoutUserController";
import { DepositController } from "@/application/controllers/DepositController";
import { WithdrawController } from "@/application/controllers/WithdrawController";

export const clientContainer = buildDIContainer()
  .register(IOCServerHandlerToken, iocServerHandler)
  .registerConsumerArray([
    serverConsumerProxy(CreateUserController),
    serverConsumerProxy(LoginUserController),
    serverConsumerProxy(LogoutUserController),
    serverConsumerProxy(DepositController),
    serverConsumerProxy(WithdrawController),
  ])
  .getResult();
