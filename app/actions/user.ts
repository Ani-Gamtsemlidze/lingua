"use server";

import { ConfirmEmailTemplate } from "@/components/email-template";
import { getServerSession } from "next-auth";
import { Resend } from "resend";
import { authOptions } from "../api/auth/[...nextauth]/route";
import crypto from "crypto";
import { sql } from "@/lib/db";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { ActionResult } from "@/components/settingsEdit";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function updateUserEmail(formData: FormData): Promise<ActionResult> {
  const session = await getServerSession(authOptions);
  const email = formData.get("email") as string;
  const token = crypto.randomBytes(32).toString("hex");

  await sql`UPDATE users SET pending_email = ${email}, confirm_token = ${token} WHERE id = ${session?.user?.id} `;

  await resend.emails.send({
    from: "Lingua <onboarding@resend.dev>",
    to: email,
    subject: "Confirm your new email",
    react: ConfirmEmailTemplate({
      confirmUrl: `${process.env.BASE_URL}/api/confirm-email?token=${token}`,
    }),
  });
  redirect("/settings/email-sent");
}

export async function updateUserPassword(formData: FormData): Promise<ActionResult> {
  const session = await getServerSession(authOptions);
  const currentPassword = formData.get("currentPassword") as string;
  const newPassword = formData.get("newPassword") as string;
  const confirmPassword = formData.get("confirmPassword") as string;
  const user =
    await sql`SELECT password FROM users WHERE id = ${session?.user?.id}`;
  if (!session?.user?.id) {
    return { error: "Unauthorized" };
  }
  if (newPassword !== confirmPassword) {
    return { error: "Passwords do not match" };
  }
  if (!currentPassword || !newPassword || !confirmPassword) {
    return { error: "Missing fields" };
  }
  const isValid = await bcrypt.compare(currentPassword, user[0].password);
  if (!isValid) return { error: "Current password is incorrect" };
  const hashed = await bcrypt.hash(newPassword, 10);
  const result =
    await sql`UPDATE users SET password = ${hashed} WHERE id=${session?.user?.id}`;
  return { success: true };
}

export async function deleteAccount() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return { error: "Unauthorized" };
  }

  await sql`
  UPDATE users
  SET deleted_at = NOW()
  WHERE id = ${session.user.id}
`;
  return { success: true };
}
