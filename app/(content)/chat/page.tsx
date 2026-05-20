import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { sql } from "@/lib/db";
import ChatUI from "@/components/chatUI";

export default async function ChatPage() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  const user = (await sql`
    SELECT active_language, username FROM users WHERE id = ${userId}
  `) as { active_language: string; username: string }[];

  const activeLanguage = user[0]?.active_language ?? "english";
  const userName = user[0]?.username ?? "User";

  return <ChatUI activeLanguage={activeLanguage} userName={userName} />;
}
