import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import WordGuess from "@/components/wordGuess";
import { sql } from "@/lib/db";
import { Word } from "@/types/words";
import { getServerSession } from "next-auth";

export default async function wordGuess () {
    const session = await getServerSession(authOptions);
     const userWords = await sql`
        SELECT * FROM words WHERE language = (SELECT active_language FROM users WHERE id = ${session?.user?.id}) AND user_id = ${session?.user.id}
      `;
    return (
       <WordGuess data={userWords as Word[]} />
    )
}