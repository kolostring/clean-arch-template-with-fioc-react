import { buildDIContainer } from "fioc";
import { IOCServerHandlerToken, serverConsumerProxy } from "fioc-server-utils";
import { iocServerHandler } from "./iocServerHandler.action";
import { CreateUserUseCase } from "@/application/use-cases/CreateUserUseCase";
import { DeleteUserUseCase } from "@/application/use-cases/DeleteUserUseCase";
import { DepositUseCase } from "@/application/use-cases/DepositUseCase";
import { GetBankAccountUseCase } from "@/application/use-cases/GetBankAccountUseCase";
import { GetUserUseCase } from "@/application/use-cases/GetUserUseCase";
import { WithdrawlUseCase } from "@/application/use-cases/WithdrawlUseCase";

export const clientContainer = buildDIContainer()
  .register(IOCServerHandlerToken, iocServerHandler)
  .registerConsumerArray([
    serverConsumerProxy(CreateUserUseCase),
    serverConsumerProxy(DeleteUserUseCase),
    serverConsumerProxy(DepositUseCase),
    serverConsumerProxy(GetBankAccountUseCase),
    serverConsumerProxy(GetUserUseCase),
    serverConsumerProxy(WithdrawlUseCase),
  ])
  .getResult();
