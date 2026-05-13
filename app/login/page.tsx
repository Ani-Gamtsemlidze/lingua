"use client"
import { Logo } from "@/components/logo"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { useState } from "react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/words"
    })
  }

  return (
    <div className="flex min-h-screen">

      {/* Left — dark story panel */}
      <div className="hidden lg:flex w-1/2 bg-slate-800 flex-col justify-between p-12">
        <Logo />
        <div>
          <p className="text-xl text-slate-300 leading-relaxed italic mb-6">
            "The best way to learn a language is to read what you love."
          </p>
          <p className="text-xs text-slate-600">
            Read in your target language. Save words. Remember them.
          </p>
        </div>
        <p className="text-xs text-slate-700">© 2026 Lingua</p>
      </div>

      <div className="flex flex-1 items-center justify-center px-8 bg-slate-50">
        <div className="w-full max-w-sm">

          <div className="lg:hidden text-sm font-medium text-slate-500 tracking-widest uppercase mb-4">
            <Logo isLogin={true} />
          </div>

          <h1 className="text-2xl font-semibold text-slate-800 tracking-tight mb-1">
            Welcome back
          </h1>
          <p className="text-sm text-slate-400 mb-8">
            Log in to continue learning
          </p>

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
                  placeholder-slate-300 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400
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
                  placeholder-slate-300 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400
                  focus:border-transparent transition"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-slate-800 hover:bg-slate-700 active:bg-slate-900
                text-white py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer"
            >
              Log in
            </button>
          </form>

          <p className="text-center text-sm text-slate-400 mt-6">
            Don't have an account?{" "}
            <Link href="/signup" className="text-slate-700 font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}