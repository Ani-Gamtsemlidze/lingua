"use client"

import { signIn } from "next-auth/react"
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
      callbackUrl: "/"
    })
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-80"
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          className="border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-black text-white p-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  )
}