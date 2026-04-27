import { addUser } from "@/app/action";
import { Logo } from "@/components/logo";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="flex h-screen bg-zinc-50">

      {/* Left panel */}
      <div className="hidden lg:flex w-1/2 bg-slate-800 flex-col justify-between p-12">
        <Logo />
        <div>
          <p className="text-3xl font-semibold text-white leading-snug mb-3">
            Start your language journey.
          </p>
          <p className="text-sm text-slate-400">
            Save words as you read, study them with flashcards, and track your progress.
          </p>
        </div>
        <p className="text-xs text-slate-600">© 2026 Lingua</p>
      </div>

      {/* Right panel */}
      <div className="flex flex-1 items-center justify-center px-6">
        <div className="w-full max-w-sm">

          {/* Mobile logo */}
          <div className="lg:hidden mb-8">
            <Logo />
          </div>

          <h1 className="text-2xl font-semibold text-slate-800 tracking-tight mb-1">
            Create an account
          </h1>
          <p className="text-sm text-slate-400 mb-8">
            Start building your vocabulary
          </p>

          <form action={addUser} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-800
                  placeholder-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-800
                  placeholder-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                Confirm password
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="••••••••"
                className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-800
                  placeholder-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-slate-800 hover:bg-slate-700 active:bg-slate-900 text-white
                py-2.5 rounded-lg text-sm font-medium transition-colors mt-1 cursor-pointer"
            >
              Create account
            </button>
          </form>

          <p className="text-center text-sm text-slate-400 mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-slate-700 font-medium hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}