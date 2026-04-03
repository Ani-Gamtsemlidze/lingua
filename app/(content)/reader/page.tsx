import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Reader from "@/components/readerText";
import { sql } from "@/lib/db";
import { getServerSession } from "next-auth";

export default async function reader() {
    const session = await getServerSession(authOptions);
    const TextData = await sql`
    SELECT content FROM user_texts WHERE user_id = ${session?.user?.id} ORDER BY created_at DESC 
 `;
  return (
    <Reader textData={TextData[0]?.content || ""} />
  );
}
