"use client"
import { Logo } from "@/components/logo"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { useState } from "react"
import { BiBookOpen } from "react-icons/bi"

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
    <div className="flex items-center justify-center h-screen bg-fuchsia-50">
      <div className="bg-white border border-gray-100 rounded-2xl p-9 w-full max-w-sm shadow-sm">

        {/* Logo mark */}
       <Logo />

        <h1 className="text-xl font-medium text-gray-900 mb-1">Welcome back</h1>
        <p className="text-sm text-gray-400 mb-7">Log in to continue learning</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-xs text-gray-500 block mb-1.5">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#534AB7]/30 focus:border-[#534AB7]"
            />
          </div>

          <div>
            <label className="text-xs text-gray-500 block mb-1.5">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#534AB7]/30 focus:border-[#534AB7]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#534AB7] hover:bg-[#4840a0] text-white py-2.5 rounded-lg text-sm font-medium transition-colors mt-1"
          >
            Log in
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-5">
          Don't have an account?{" "}
          <Link href="/signup" className="text-[#534AB7] font-medium hover:underline">
            Sign up
          </Link>
        </p>

      </div>
    </div>
  )
}