"use client";

import { useState } from "react";
import { useDependencies } from "fioc-react";
import { WithdrawUseCase } from "@/application/use-cases/WithdrawUseCase";

export default function WithdrawPage() {
  const withdraw = useDependencies().resolve(WithdrawUseCase);
  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await withdraw(amount);
    if (result.ok) {
      setMessage("Withdrawal successful!");
    } else {
      setMessage(result.error.message);
    }
  };

  return (
    <main>
      <h1>Withdraw</h1>
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
        <button type="submit">Withdraw</button>
      </form>
      {message && <p>{message}</p>}
    </main>
  );
}
