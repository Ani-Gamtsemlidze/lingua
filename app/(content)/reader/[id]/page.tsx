import { sql } from "@/lib/db";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import TextEdit from "@/components/textEdit";
interface TokenWithTranslation {
  token: string;
  translation?: string;
}
interface userText {
  id: number;
  title: string;
  content: string;
}
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
  const tokens = userText[0]?.content.split(/(\s+)/);
  const userWords = await sql`
    SELECT * FROM words WHERE user_id = ${session?.user.id}
  `;
const tokensWithTranslations: TokenWithTranslation[] = tokens.map((token: string) => {
  const cleanToken = token.replace(/[^\p{L}\p{N}']/gu, "");

  if (!cleanToken) {
    return { token }; 
  }

  const match = userWords.find((w) => w.word === cleanToken);
  return match
    ? { token, word: match.word, note: match.note, translation: match.translation, id: match.id }
    : { token };
});


  return (
    <div>
      <TextEdit userText={userText[0] as userText} matchWords={tokensWithTranslations} />
    </div>
  );
}
