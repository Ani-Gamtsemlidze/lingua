import { sql } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");
  const user = await sql`
    SELECT * FROM users WHERE confirm_token = ${token}
  `;
  if (!user[0])
    return Response.json({ error: "Invalid token" }, { status: 400 });
  await sql`
    UPDATE users 
    SET email = pending_email, pending_email = NULL, confirm_token = NULL
    WHERE confirm_token = ${token}
  `;
  return Response.redirect(`${process.env.BASE_URL}/settings/confirmed-email`);
}
