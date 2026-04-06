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
    <div>
      <Link href="/reader/new">add text</Link>
      <ul>
        {TextData.map((text, index) => (
          <Link
            className="cursor-pointer"
            key={index}
            href={`/reader/${text.id}`}
          >
            {text.title}
          </Link>
        ))}
      </ul>
    </div>
  );
}
