import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { sql } from "@/lib/db";
import { getServerSession } from "next-auth";
import EditWord from "./editWord";
import { Word } from "@/types/words";

export default async function WordsList() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) return <p>Not logged in</p>;
    const words = (await sql`
    SELECT * FROM words WHERE user_id = ${session.user.id}
  `) as Word[];
  return (
    <div className="overflow-y-auto max-h-100">
      {words.map((word) => (
        <div
          key={word.id}
          className="grid grid-cols-4 px-4 py-3 border-b border-slate-200 hover:bg-slate-50"
        >
          <p>{word.word}</p>
          <p className="text-indigo-600">{word.translation}</p>
          <p>{word.note}</p>
          <EditWord wordData={word} wordId={word.id} />
        </div>
      ))}
    </div>
  );
}
