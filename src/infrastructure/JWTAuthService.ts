import { AuthService } from "@/application/services/AuthService";
import { Result, ok, err } from "@/common/Result";
import { BankAccount } from "@/domain/entities/BankAccount";
import { User } from "@/domain/entities/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { cookies } from "next/headers";

// you’ll want this in env vars
const JWT_SECRET = process.env.JWT_SECRET ?? "changeme";
const JWT_EXPIRES_IN = "1h"; // short-lived access token

const COOKIE_AUTH_TOKEN = "auth-token";

const adapter = new JSONFile<{
  users: User[] | undefined;
  bankAccounts: BankAccount[] | undefined;
}>("db.json");
// Updated to include default data initialization
const db = new Low(adapter, { users: [], bankAccounts: [] });

// Ensure db.data is initialized with default values
await db.read();

export const JWTAuthService: AuthService = {
  async hashPassword(password: string): Promise<Result<string>> {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    return ok(hashed);
  },
  async loginUser(email: string, password: string): Promise<Result<void>> {
    try {
      await db.read();

      const userID = db.data.users?.find((u) => u.email === email)?.id;

      const user = db.data.users?.find((u) => u.id === userID);

      if (!user) {
        return err(new Error("User not found"));
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return err(new Error("Invalid password"));
      }

      const token = jwt.sign(
        {
          userID,
        },
        JWT_SECRET,
        {
          expiresIn: JWT_EXPIRES_IN,
        }
      );

      (await cookies()).set(COOKIE_AUTH_TOKEN, token);

      return ok(undefined);
    } catch (e) {
      return err(e as Error);
    }
  },

  async logoutUser() {
    (await cookies()).delete(COOKIE_AUTH_TOKEN);
    return ok(undefined);
  },

  async getLogedUser() {
    try {
      await db.read();
      const token = (await cookies()).get(COOKIE_AUTH_TOKEN)?.value;
      if (!token) {
        return ok(null);
      }

      const decoded = jwt.verify(token, JWT_SECRET) as { userID: string };
      return ok(decoded);
    } catch (e) {
      return err(e as Error);
    }
  },
};
