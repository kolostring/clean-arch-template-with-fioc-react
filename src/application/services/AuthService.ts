import { Result } from "@/common/Result";
import { createDIToken } from "fioc";

export interface AuthService {
  hashPassword(password: string): Promise<Result<string>>;
  loginUser(email: string, password: string): Promise<Result<void>>;
  logoutUser(): Promise<Result<void>>;
  getLogedUser(): Promise<
    Result<null | {
      userID: string;
    }>
  >;
}

export const AuthService = createDIToken<AuthService>("AuthService");
