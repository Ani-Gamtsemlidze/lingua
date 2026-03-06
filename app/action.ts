'use server'

import { sql } from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function addWord(formData: FormData) {
  const word = formData.get("word")
  const translation = formData.get("translation")
  await sql`
    INSERT INTO words (word, translation)
    VALUES (${word}, ${translation})
  `
  revalidatePath('/words')
}

export async function addUser(formData: FormData) {
  const email = formData.get("email")
  const password = formData.get("password")
  await sql`
    INSERT INTO users (email, password)
    VALUES (${email}, ${password})
  `
  revalidatePath('/login')
}