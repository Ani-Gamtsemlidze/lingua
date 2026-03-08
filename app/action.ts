'use server'

import { sql } from "@/lib/db"
import { getServerSession } from "next-auth"
import { revalidatePath } from "next/cache"
import { authOptions } from "./api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import bcrypt from "bcrypt"

export async function addWord(formData: FormData) {
  const session = await getServerSession(authOptions)

  const word = formData.get("word")
  const translation = formData.get("translation")
  await sql`
    INSERT INTO words (word, translation, user_id)
    VALUES (${word}, ${translation}, ${session?.user?.id})
  `
  revalidatePath('/words')
}

export async function addUser(formData: FormData) {
  const email = formData.get("email")
  const password = formData.get("password")
  const hashedPassword = await bcrypt.hash(password as string, 10)
  await sql`
    INSERT INTO users (email, password)
    VALUES (${email}, ${hashedPassword})
  `
  redirect('/login')
}