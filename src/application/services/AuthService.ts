import { Result } from "@/common/Result";
import { createDIToken } from "fioc";

export interface AuthService {
  createUser(userID: string, password: string): Promise<Result<void>>;
  loginUser(email: string, password: string): Promise<Result<void>>;
  logoutUser(): Promise<Result<void>>;
  getUser(): Promise<
    Result<null | {
      userID: string;
    }>
  >;
}

export const AuthService = createDIToken<AuthService>("AuthService");
