import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import CardButtons from "@/components/cardButtons";
import FlashCard from "@/components/flashCard";
import { sql } from "@/lib/db";
import { Word } from "@/types/words";
import { getServerSession } from "next-auth";

export default async function flashcards() {
  const session = await getServerSession(authOptions);

  const userWords = await sql`
      SELECT * FROM words WHERE user_id = ${session?.user.id}
    `;

  return (
    <div className="flex items-center justify-center">
      {/* <div className="flex mb-3.5 "> {userWords.length} cards</div> */}

      <FlashCard userWords={userWords as Word[]} />
      {/* <CardButtons /> */}
    </div>
  );
}
