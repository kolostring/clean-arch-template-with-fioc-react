import { Result } from "@/common/Result";
import { createDIToken } from "fioc-react";
import { BankAccount } from "../entities/BankAccount";
import { User } from "../entities/User";

export interface UserRepository {
  getUserBankAccount(userID: string): Promise<Result<BankAccount | null>>;
  saveUserBankAccount(bankAccount: BankAccount): Promise<Result<void>>;
  deleteUserBankAccount(userID: string): Promise<Result<void>>;
  getUser(userID: string): Promise<Result<User | null>>;
  getUserByEmail(email: string): Promise<Result<User | null>>;
  saveUser(user: User): Promise<Result<void>>;
  deleteUser(userID: string): Promise<Result<void>>;
}

export const UserRepository = createDIToken<UserRepository>("UserRepository");
