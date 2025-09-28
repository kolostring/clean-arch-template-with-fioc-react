"use client";
import { DependenciesProvider } from "fioc-react";
import { DI_MANAGER } from "./DI_Manager";
import { ReactNode } from "react";

export default function DIConfigProvider({
  children,
}: {
  children: ReactNode | ReactNode[];
}) {
  return (
    <DependenciesProvider manager={DI_MANAGER}>{children}</DependenciesProvider>
  );
}
