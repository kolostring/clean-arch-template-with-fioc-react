import { err, ok, Result } from "@/common/Result";
import { BankAccount } from "@/domain/entities/BankAccount";
import { User } from "@/domain/entities/User";
import { UserRepository } from "@/domain/repositories/UserRepository";

const USERS_KEY = "users";
const BANK_ACCOUNTS_KEY = "bankAccounts";

export const LocalStorageUserRepository: UserRepository = {
  async getUserBankAccount(
    userID: string
  ): Promise<Result<BankAccount | null>> {
    try {
      const accounts = loadFromStorage<BankAccount>(BANK_ACCOUNTS_KEY);
      const account = accounts.find((a) => a.userID === userID) || null;
      return ok(account);
    } catch (e) {
      if (e instanceof Error) {
        return err(e.message);
      }
      return err("unknown error");
    }
  },

  async saveUserBankAccount(bankAccount: BankAccount): Promise<Result<void>> {
    try {
      let accounts = loadFromStorage<BankAccount>(BANK_ACCOUNTS_KEY);
      accounts = accounts.filter((a) => a.userID !== bankAccount.userID);
      accounts.push(bankAccount);
      saveToStorage(BANK_ACCOUNTS_KEY, accounts);
      return ok(undefined);
    } catch (e) {
      if (e instanceof Error) {
        return err(e.message);
      }
      return err("unknown error");
    }
  },

  async deleteUserBankAccount(userID: string): Promise<Result<void>> {
    try {
      let accounts = loadFromStorage<BankAccount>(BANK_ACCOUNTS_KEY);
      accounts = accounts.filter((a) => a.userID !== userID);
      saveToStorage(BANK_ACCOUNTS_KEY, accounts);
      return ok(undefined);
    } catch (e) {
      if (e instanceof Error) {
        return err(e.message);
      }
      return err("unknown error");
    }
  },

  async getUser(userID: string): Promise<Result<User | null>> {
    try {
      const users = loadFromStorage<User>(USERS_KEY);
      const user = users.find((u) => u.id === userID) || null;
      return ok(user);
    } catch (e) {
      if (e instanceof Error) {
        return err(e.message);
      }
      return err("unknown error");
    }
  },

  async getUserByEmail(email: string): Promise<Result<User | null>> {
    try {
      const users = loadFromStorage<User>(USERS_KEY);
      const user = users.find((u) => u.email === email) || null;
      return ok(user);
    } catch (e) {
      if (e instanceof Error) {
        return err(e.message);
      }
      return err("unknown error");
    }
  },

  async saveUser(user: User): Promise<Result<void>> {
    try {
      let users = loadFromStorage<User>(USERS_KEY);
      users = users.filter((u) => u.id !== user.id);
      users.push(user);
      saveToStorage(USERS_KEY, users);
      return ok(undefined);
    } catch (e) {
      if (e instanceof Error) {
        return err(e.message);
      }
      return err("unknown error");
    }
  },

  async deleteUser(userID: string): Promise<Result<void>> {
    try {
      let users = loadFromStorage<User>(USERS_KEY);
      users = users.filter((u) => u.id !== userID);
      saveToStorage(USERS_KEY, users);
      return ok(undefined);
    } catch (e) {
      if (e instanceof Error) {
        return err(e.message);
      }
      return err("unknown error");
    }
  },
};

function loadFromStorage<T>(key: string): T[] {
  const data = localStorage.getItem(key);
  return data ? (JSON.parse(data) as T[]) : [];
}

function saveToStorage<T>(key: string, data: T[]): void {
  localStorage.setItem(key, JSON.stringify(data));
}
