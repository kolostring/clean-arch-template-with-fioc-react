"use client";
import { DependenciesProvider } from "fioc-react";
import { DI_MANAGER } from "./DI_Manager";

export default function DIConfigProvider({ children }: { children: any }) {
  return (
    <DependenciesProvider manager={DI_MANAGER}>{children}</DependenciesProvider>
  );
}
