"use client";

import { useState } from "react";
import { useDependencies } from "fioc-react";
import { LoginUseCase } from "@/application/use-cases/LoginUseCase";

export default function LoginUserPage() {
  const login = useDependencies().resolve(LoginUseCase);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await login(email, password);
    if (result.ok) {
      setMessage("User authenticated successfully!");
    } else {
      setMessage(result.error.message);
    }
  };

  return (
    <main>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </main>
  );
}
