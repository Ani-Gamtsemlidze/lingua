import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { sql } from "@/lib/db";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import Image from "next/image";
type Word = {
  id: number;
  word: string;
  translation: string;
  created_at: string;
};
export default async function WordsList() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) return <p>Not logged in</p>;
  const words = await sql`
    SELECT * FROM words WHERE user_id = ${session.user.id}
  `;
  return (
    <div className="">
      {words.map((word) => (
        <div
          key={word.id}
          className="grid grid-cols-4 px-4 py-3 border-b border-slate-200 hover:bg-slate-50"
        >
          <p>{word.word}</p>
          <p className="text-indigo-600">{word.translation}</p>
          <p>{word.note}</p>
          <div className="flex justify-end">
            <Image
              className="w-5 h-5"
              src="/images/trash.png"
              width={200}
              height={200}
              alt="image"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
