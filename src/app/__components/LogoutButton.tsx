"use client";

import { LogoutUseCase } from "@/application/use-cases/LogoutUseCase";
import { useDependencies } from "fioc-react";

export default function LogoutButton() {
  const logout = useDependencies().resolve(LogoutUseCase);

  return <button onClick={logout}>Logout</button>;
}
