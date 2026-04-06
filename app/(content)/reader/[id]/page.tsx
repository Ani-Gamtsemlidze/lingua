import { sql } from "@/lib/db";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
export default async function text({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const session = await getServerSession(authOptions);    
  const slug = await params;
  const userText = await sql`
      SELECT * FROM user_texts WHERE id = ${slug.id} AND user_id = ${session?.user.id}
    `;
  return <div>{userText[0]?.content}</div>;
}
