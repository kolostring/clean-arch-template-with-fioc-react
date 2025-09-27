"use client";

import { useState } from "react";
import { useDependencies } from "fioc-react";
import { CreateUserUseCase } from "@/application/use-cases/CreateUserUseCase";

export default function CreateUserPage() {
  const createUser = useDependencies().resolve(CreateUserUseCase);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await createUser(name, email, password, amount);
    if (result.ok) {
      setMessage("User created successfully!");
    } else {
      setMessage(result.error.message);
    }
  };

  return (
    <main>
      <h1>Create User</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Initial Deposit:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            required
          />
        </label>
        <button type="submit">Create</button>
      </form>
      {message && <p>{message}</p>}
    </main>
  );
}
