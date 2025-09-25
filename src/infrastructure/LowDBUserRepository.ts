import { err, ok, Result } from "@/common/Result";
import { BankAccount } from "@/domain/entities/BankAccount";
import { User } from "@/domain/entities/User";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

const adapter = new JSONFile<{
  users: User[] | undefined;
  bankAccounts: BankAccount[] | undefined;
}>("db.json");
// Updated to include default data initialization
const db = new Low(adapter, { users: [], bankAccounts: [] });

// Ensure db.data is initialized with default values
await db.read();

export const LowDBUserRepository: UserRepository = {
  async getUserBankAccount(
    userID: string
  ): Promise<Result<BankAccount | null>> {
    try {
      await db.read();
      const account =
        db.data?.bankAccounts?.find((a) => a.userID === userID) || null;
      return ok(account);
    } catch (e) {
      return err(e as Error);
    }
  },

  async saveUserBankAccount(bankAccount: BankAccount): Promise<Result<void>> {
    try {
      await db.read();

      db.data.bankAccounts =
        db.data.bankAccounts?.filter((a) => a.userID !== bankAccount.userID) ??
        [];
      db.data.bankAccounts?.push(bankAccount);
      await db.write();
      return ok(undefined);
    } catch (e) {
      return err(e as Error);
    }
  },

  async deleteUserBankAccount(userID: string): Promise<Result<void>> {
    try {
      await db.read();

      db.data.bankAccounts = db.data.bankAccounts?.filter(
        (a) => a.userID !== userID
      );
      await db.write();
      return ok(undefined);
    } catch (e) {
      return err(e as Error);
    }
  },

  async getUser(userID: string): Promise<Result<User | null>> {
    try {
      await db.read();
      const user = db.data?.users?.find((u) => u.id === userID) || null;
      return ok(user);
    } catch (e) {
      return err(e as Error);
    }
  },

  async getUserByEmail(email: string): Promise<Result<User | null>> {
    try {
      await db.read();
      const user = db.data?.users?.find((u) => u.email === email) || null;
      return ok(user);
    } catch (e) {
      return err(e as Error);
    }
  },

  async saveUser(user: User): Promise<Result<void>> {
    try {
      await db.read();

      db.data.users = db.data.users?.filter((u) => u.id !== user.id) ?? [];
      db.data.users?.push(user);
      await db.write();
      return ok(undefined);
    } catch (e) {
      return err(e as Error);
    }
  },

  async deleteUser(userID: string): Promise<Result<void>> {
    try {
      await db.read();

      db.data.users = db.data.users?.filter((u) => u.id !== userID);
      await db.write();
      return ok(undefined);
    } catch (e) {
      return err(e as Error);
    }
  },
};
