"use client";
import DependenciesProvider from "fioc-react/dist/context/DependenciesProvider";
import { DI_MANAGER } from "./container";

export default function DIConfigProvider({ children }: { children: any }) {
  return (
    <DependenciesProvider manager={DI_MANAGER}>{children}</DependenciesProvider>
  );
}
