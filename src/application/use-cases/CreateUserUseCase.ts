import { err, Result } from "@/common/Result";
import { BankAccount } from "@/domain/entities/BankAccount";
import { User } from "@/domain/entities/User";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { createDIToken } from "fioc";

export const CreateUserUseCaseFactory =
  (userRepo: UserRepository) =>
  async (
    name: string,
    email: string,
    amount: number
  ): Promise<Result<void>> => {
    const userResult = await userRepo.getUserByEmail(email);
    if (!userResult.ok) {
      return userResult;
    }

    const userFound = userResult.data;
    if (userFound) {
      return err(new Error("user with this email already exists"));
    }

    const user = User.create({
      name,
      email,
    });

    const saveResult = await userRepo.saveUser(user);
    if (!saveResult.ok) {
      return saveResult;
    }

    const bankAccountResult = await userRepo.getUserBankAccount(user.id);
    if (!bankAccountResult.ok) {
      return bankAccountResult;
    }

    const bankAccount = BankAccount.create(user.id, amount);
    const saveBankAccountResult = await userRepo.saveUserBankAccount(
      bankAccount
    );
    return saveBankAccountResult;
  };

export const CreateUserUseCase =
  createDIToken<ReturnType<typeof CreateUserUseCaseFactory>>(
    "CreateUserUseCase"
  );
