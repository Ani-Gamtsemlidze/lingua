"use server";

import { sql } from "@/lib/db";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { title } from "process";
import { ActionResult } from "@/components/settingsEdit";

export async function addWord(formData: FormData) {
  const session = await getServerSession(authOptions);
  const data =
    await sql`SELECT active_language FROM users WHERE id=${session?.user.id}`;
  const language =
    (formData.get("language") as string) ||
    data[0].active_language ||
    "english";


  const activeLanguage = data[0].active_language;
  const word = formData.get("word");
  const translation = formData.get("translation");
  const note = formData.get("note");

  if (`${word}`.trim() === "") {
    return;
  }
  const existing = await sql`
  SELECT id FROM words 
  WHERE word = ${word} AND user_id = ${session?.user?.id} AND language = ${language}
`;

  if (existing.length > 0) {
    return { error: "Word already exists in this language" };
  }
  await sql`
    INSERT INTO words (word, translation, note, language, user_id)
    VALUES (${word}, ${translation}, ${note}, ${language}, ${session?.user?.id})
  `;
  revalidatePath("/words");
}

export async function deleteWord(wordId: number) {
  const session = await getServerSession(authOptions);

  await sql`
    DELETE FROM words WHERE id = ${wordId} AND user_id = ${session?.user?.id}
  `;
  revalidatePath("/words");
}

export async function updateWord(formData: FormData) {
  const session = await getServerSession(authOptions);
  const wordId = formData.get("wordId");
  const word = formData.get("word");
  const translation = formData.get("translation");
  const note = formData.get("note");
  await sql`
    UPDATE words SET word = ${word}, translation = ${translation}, note = ${note} WHERE id = ${wordId} AND user_id = ${session?.user?.id}
  `;
  revalidatePath("/words");
}

export async function addUser(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  if (password !== confirmPassword) {
    redirect("/signup?error=Passwords do not match");
  }
  const hashedPassword = await bcrypt.hash(password as string, 10);

  const existingUser = await sql`
    SELECT id FROM users WHERE email = ${email}`;

  if (existingUser.length > 0) {
    redirect("/signup?error=Email already exists");
  }

  await sql`
    INSERT INTO users (email, password)
    VALUES (${email}, ${hashedPassword})
  `;
  redirect("/login");
}

export async function saveText(formData: FormData) {
  const session = await getServerSession(authOptions);
  const text = formData.get("content");
  const title = formData.get("title");
   if(!text || !title) {
    return {error: "Please fill in all fields"}
   }
  const result = await sql`
    INSERT INTO user_texts (content,title, language, user_id) VALUES (${text},${title}, (SELECT active_language FROM users WHERE id = ${session?.user?.id}), ${session?.user?.id})
    RETURNING id
  `;
  const id = result[0].id;
  revalidatePath("/reader");
  redirect(`/reader/${id}`);
}
export async function deleteText(textId: number) {
  const session = await getServerSession(authOptions);

  await sql`
    DELETE FROM user_texts WHERE id = ${textId} AND user_id = ${session?.user?.id}
  `;
  revalidatePath("/reader");
  redirect("/reader");
}

export async function updateText(formData: FormData) {
  const session = await getServerSession(authOptions);
  const textId = formData.get("textId");
  const text = formData.get("content");
  await sql`
    UPDATE user_texts SET content = ${text} WHERE id = ${textId} AND user_id = ${session?.user?.id}
  `;
  revalidatePath("/reader");
  redirect(`/reader/${textId}`);
}

export async function updateWordStatus(status: string, wordId: number) {
  const session = await getServerSession(authOptions);
  await sql`
    UPDATE words SET status = ${status} WHERE id = ${wordId} AND user_id = ${session?.user?.id}
  `;
}
export async function updateFailCount(wordId: number) {
  const session = await getServerSession(authOptions);
  await sql`
    UPDATE words SET fail_count = fail_count + 1 WHERE id = ${wordId} AND user_id = ${session?.user?.id}
  `;
}

export async function updateUserName(
  formData: FormData,
): Promise<ActionResult> {
  const session = await getServerSession(authOptions);
  const name = formData.get("name");
  await sql`
    UPDATE users SET username = ${name} WHERE id = ${session?.user?.id}
  `;
  revalidatePath("/settings");
  return { success: true };
}
