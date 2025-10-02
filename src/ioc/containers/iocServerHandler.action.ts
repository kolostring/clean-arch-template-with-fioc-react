"use server";

import { serverContainer } from "@/ioc/containers/serverContainer";
import { buildIoCServerHandler } from "fioc-server-utils";

export const iocServerHandler = buildIoCServerHandler(serverContainer);
