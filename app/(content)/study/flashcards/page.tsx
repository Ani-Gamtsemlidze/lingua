import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import FlashCard from "@/components/flashCard";
import { sql } from "@/lib/db";
import { Word } from "@/types/words";
import { getServerSession } from "next-auth";

export default async function flashcards() {
  const session = await getServerSession(authOptions);

  const userWords = await sql`
    SELECT * FROM words WHERE language = (SELECT active_language FROM users WHERE id = ${session?.user?.id}) AND user_id = ${session?.user.id}
  `;

  return (
    <div className="flex items-center justify-center bg-slate-50 min-h-screen pt-14 md:pt-0">
      <FlashCard userWords={userWords as Word[]} />
    </div>
  );
}