import { addUser } from "@/app/action";
import { Logo } from "@/components/logo";
import Link from "next/link";
import { GiSparkles } from "react-icons/gi";
import { MdOutlineMenuBook } from "react-icons/md";
import AuthPanel from "./authPanel";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen">
      <AuthPanel title= {`"Start your language journey today."`}/>

      <div className="flex flex-1 items-center justify-center px-6 bg-slate-50">
        <div className="w-full max-w-sm">
          <div className="lg:hidden mb-6">
            <Logo />
          </div>
          <div className="lg:hidden flex flex-col gap-1 bg-slate-100 border border-slate-200 rounded-xl px-3 py-2.5 mb-6">
            <div className="flex items-center gap-2">
              <GiSparkles className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">
                AI-powered
              </span>
            </div>
            <p className="text-xs font-semibold text-slate-500 pl-0.5">
              ✦ Generate texts by topic & level
            </p>
            <p className="text-xs font-semibold text-slate-500 pl-0.5">
              ✦ Instant word translations
            </p>
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
              className="w-full bg-slate-700 hover:bg-slate-800 active:bg-slate-900 text-white
                py-2.5 rounded-lg text-sm font-medium transition-colors mt-1 cursor-pointer"
            >
              Create account
            </button>
          </form>

          <p className="text-center text-sm text-slate-400 mt-6">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-slate-700 font-medium hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
