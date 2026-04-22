import { addUser } from "@/app/action";
import Link from "next/link";
import { BiBookOpen } from "react-icons/bi";

export default function SignupPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-fuchsia-50">
      <div className="bg-white border border-gray-100 rounded-2xl p-9 w-full max-w-sm shadow-sm">

        {/* Logo mark */}
        <div className="w-10 h-10 rounded-xl bg-[#534AB7] flex items-center justify-center mb-6">
          <BiBookOpen className="text-white w-5 h-5" />
        </div>

        <h1 className="text-xl font-medium text-gray-900 mb-1">Create an account</h1>
        <p className="text-sm text-gray-400 mb-7">Start building your vocabulary</p>

        <form action={addUser} className="flex flex-col gap-4">
          <div>
            <label className="text-xs text-gray-500 block mb-1.5">Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#534AB7]/30 focus:border-[#534AB7]"
            />
          </div>

          <div>
            <label className="text-xs text-gray-500 block mb-1.5">Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#534AB7]/30 focus:border-[#534AB7]"
            />
          </div>

          <div>
            <label className="text-xs text-gray-500 block mb-1.5">Confirm password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="••••••••"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#534AB7]/30 focus:border-[#534AB7]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#534AB7] hover:bg-[#4840a0] text-white py-2.5 rounded-lg text-sm font-medium transition-colors mt-1"
          >
            Create account
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-5">
          Already have an account?{" "}
          <Link href="/login" className="text-[#534AB7] font-medium hover:underline">
            Log in
          </Link>
        </p>

      </div>
    </div>
  )
}