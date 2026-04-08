import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Reader from "@/components/readerText";
import { sql } from "@/lib/db";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function reader() {
  const session = await getServerSession(authOptions);
  const TextData = await sql`
    SELECT * FROM user_texts WHERE user_id = ${session?.user?.id} ORDER BY created_at DESC 
 `;
  return (
    <div className="px-4 py-6 max-w-md">
      <Link
        href="/reader/new"
        className="inline-block mb-4 text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors"
      >
        + add text
      </Link>

      <ul className="flex flex-col divide-y divide-zinc-100">
        {TextData.map((text, index) => (
          <Link
            key={index}
            href={`/reader/${text.id}`}
            className="py-3 text-sm text-zinc-800 hover:text-zinc-500 transition-colors cursor-pointer"
          >
            {text.title}
          </Link>
        ))}
      </ul>
    </div>
  );
}
