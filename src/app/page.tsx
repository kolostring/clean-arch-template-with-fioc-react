import Link from "next/link";
import LogoutButton from "./__components/LogoutButton";

export default function Home() {
  return (
    <main>
      <h1>Welcome to the App</h1>
      <nav>
        <ul>
          <li>
            <Link href="/create-user">Create User</Link>
          </li>
          <li>
            <Link href="/login">Login</Link>
          </li>
          <li>
            <LogoutButton />
          </li>
          <li>
            <Link href="/deposit">Deposit</Link>
          </li>
          <li>
            <Link href="/withdraw">Withdraw</Link>
          </li>
          <li>
            <Link href="/get-user">Get User Details</Link>
          </li>
          <li>
            <Link href="/get-bank-account">Get Bank Account Details</Link>
          </li>
        </ul>
      </nav>
    </main>
  );
}
