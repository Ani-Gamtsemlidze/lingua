import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import WordsView from "@/components/wordsView";
import { sql } from "@/lib/db";
import { Word } from "@/types/words";

import { getServerSession } from "next-auth";

export default async function Words() {
  const session = await getServerSession(authOptions);
  const words = (await sql`
    SELECT * FROM words WHERE language = (SELECT active_language FROM users WHERE id = ${session?.user?.id}) AND user_id = ${session?.user.id} ORDER BY id DESC
  `) as Word[];

  return <WordsView words={words} />;
}
