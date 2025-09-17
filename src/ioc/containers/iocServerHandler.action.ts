"use server";

import { serverContainer } from "@/ioc/containers/serverContainer";
import { buildIOCServerHandler } from "fioc-server-utils";

export const iocServerHandler = buildIOCServerHandler(serverContainer);
