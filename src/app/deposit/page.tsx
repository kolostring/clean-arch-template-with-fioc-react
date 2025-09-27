"use client";

import { useState } from "react";
import { useDependencies } from "fioc-react";
import { DepositUseCase } from "@/application/use-cases/DepositUseCase";

export default function DepositPage() {
  const deposit = useDependencies().resolve(DepositUseCase);
  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await deposit(amount);
    if (result.ok) {
      setMessage("Deposit successful!");
    } else {
      setMessage(result.error.message);
    }
  };

  return (
    <main>
      <h1>Deposit</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Amount:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            required
          />
        </label>
        <button type="submit">Deposit</button>
      </form>
      {message && <p>{message}</p>}
    </main>
  );
}
