"use client"
import Link from "next/link";
import { Logo } from "./logo";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/dashboard",
    });
  };
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
      <div className="fixed inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-indigo-500/5 pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-6 sm:mb-8 md:mb-10">
          <Link
            href="/"
            className="inline-block hover:opacity-80 transition-opacity"
          >
            <Logo />
          </Link>
        </div>

        <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Welcome back
            </h1>
            <p className="text-sm sm:text-base text-slate-400">
              Log in to continue learning
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-300 mb-1.5"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-sm text-white
                  placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50
                  focus:border-violet-500/50 transition"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-300 mb-1.5"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-sm text-white
                  placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50
                  focus:border-violet-500/50 transition"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 sm:py-3.5 rounded-xl 
                transition-all hover:shadow-lg hover:shadow-violet-500/20 text-sm sm:text-base mt-2"
            >
              Log in
            </button>
          </form>

          <div className="mt-6 sm:mt-8 text-center">
            <p className="text-sm text-slate-400">
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="text-violet-400 font-medium hover:text-violet-300 transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
        <div className="text-center mt-6 sm:mt-8">
          <Link
            href="/"
            className="text-sm text-slate-500 hover:text-slate-400 transition-colors inline-flex items-center gap-1"
          >
            <span>←</span> Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
