"use client";
import AuthPanel from "@/components/authPanel";
import { Logo } from "@/components/logo";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { GiSparkles } from "react-icons/gi";
import { MdOutlineMenuBook } from "react-icons/md";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/words",
    });
  };

  return (
    <div className="flex min-h-screen">
      <AuthPanel title={`"The best way to learn a language is to read what you love."`} />
      <div className="flex flex-1 items-center justify-center px-8 bg-slate-50">
        <div className="w-full max-w-sm">
          <div className="lg:hidden mb-4">
            <Logo isLogin={true} />
          </div>

          <h1 className="text-2xl font-semibold text-slate-800 tracking-tight mb-1">
            Welcome back
          </h1>
          <p className="text-sm text-slate-400 mb-8">
            Log in to continue learning
          </p>

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

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-800
                  placeholder-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-slate-400
                  focus:border-transparent transition"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-800
                  placeholder-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-slate-400
                  focus:border-transparent transition"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-slate-700 hover:bg-slate-800 active:bg-slate-900
                text-white py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer"
            >
              Log in
            </button>
          </form>

          <p className="text-center text-sm text-slate-400 mt-6">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="text-slate-700 font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
