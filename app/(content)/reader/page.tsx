import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import TextsList from "@/components/textsList";
import { sql } from "@/lib/db";
import { textData } from "@/types/text";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { RiDeleteBin6Line } from "react-icons/ri";


export default async function reader() {
  const session = await getServerSession(authOptions);
  const TextData = await sql`
    SELECT * FROM user_texts WHERE language = (SELECT active_language FROM users WHERE id = ${session?.user?.id}) AND user_id = ${session?.user?.id} ORDER BY created_at DESC 
 `;
 const activeLanguageData = await sql`SELECT active_language FROM users WHERE id = ${session?.user?.id}`;
 const activeLanguage = activeLanguageData[0]?.active_language || "english";
  return (
    <div className="">

      <TextsList textData={TextData as textData[]} activeLanguage={activeLanguage} />
    </div>
  );
}
