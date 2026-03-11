import { addUser } from "@/app/action";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <form action={addUser} className="flex flex-col gap-4 w-80">
        <input
          type="email"
          placeholder="Email"
          name="email"
          className="border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          className="border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-black text-white p-2 rounded cursor-pointer"
        >
          Create Account
        </button>
          <Link href="/login" className="text-sm text-blue-500 hover:underline">
            Already have an account? Login
          </Link>
      </form>
    </div>
  )
}