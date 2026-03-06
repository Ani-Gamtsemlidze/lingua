
import { addUser } from "@/app/action";

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
          className="border p-2 rounded"
          name="password"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Create Account
        </button>
      </form>
    </div>
  )
}