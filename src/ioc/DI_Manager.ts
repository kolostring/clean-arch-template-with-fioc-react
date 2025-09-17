import { buildDIContainerManager } from "fioc";
import { clientContainer } from "./containers/clientContainer";

export const DI_MANAGER = buildDIContainerManager()
  .registerContainer(clientContainer)
  .getResult();
