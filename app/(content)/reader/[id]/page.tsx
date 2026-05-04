import { sql } from "@/lib/db";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import TextEdit from "@/components/textEdit";

export interface TokenWithTranslation {
  token: string;
  translation?: string;
  word?: string;
  note?: string;
  id?: number;
  isEmpty?: boolean;
  isPhrase?: boolean;
  isPhraseStart?: boolean;
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
  const tokens: string[] = userText[0]?.content.split(/(\s+)/);
  const userWords = await sql`
    SELECT * FROM words 
    WHERE language = ${userText[0].language} 
    AND user_id = ${session?.user.id}
  `;

  const singleWords = userWords.filter((w) => !w.word.includes(" "));
  const phrases = userWords.filter((w) => w.word.includes(" "));

  const phraseMap = new Map<number, { translation: string; word: string; note: string; id: number; isStart: boolean }>();

  phrases.forEach((phrase) => {
    const phraseTokens = phrase.word.split(" "); 

    for (let i = 0; i < tokens.length; i++) {
      let tokenIndex = i;
      let phraseIndex = 0;

      while (phraseIndex < phraseTokens.length && tokenIndex < tokens.length) {
        const token = tokens[tokenIndex];

        // Skip whitespace tokens
        if (/^\s+$/.test(token)) {
          tokenIndex++;
          continue;
        }

        const cleanToken = token.replace(/[^\p{L}\p{N}']/gu, "");
        if (cleanToken.toLowerCase() !== phraseTokens[phraseIndex].toLowerCase()) break;

        phraseIndex++;
        tokenIndex++;
      }

      // Full phrase matched
      if (phraseIndex === phraseTokens.length) {
        for (let j = i; j < tokenIndex; j++) {
          phraseMap.set(j, {
            translation: phrase.translation,
            word: phrase.word,
            note: phrase.note,
            id: phrase.id,
            isStart: j === i,
          });
        }
      }
    }
  });

  const tokensWithTranslations: TokenWithTranslation[] = tokens.map(
    (token: string, index: number) => {
      const cleanToken = token.replace(/[^\p{L}\p{N}']/gu, "");

      // Part of a saved phrase
      if (phraseMap.has(index)) {
        const phraseData = phraseMap.get(index)!;
        return {
          token,
          word: phraseData.word,
          translation: phraseData.translation,
          note: phraseData.note,
          id: phraseData.id,
          isPhrase: true,
          isPhraseStart: phraseData.isStart,
          isEmpty: false,
        };
      }

      if (!cleanToken) return { token, isEmpty: true };
      const match = singleWords.find((w) => w.word === cleanToken);
      return match
        ? { token, word: match.word, note: match.note, translation: match.translation, id: match.id }
        : { token };
    },
  );

const groupedTokens: TokenWithTranslation[] = [];
let i = 0;

while (i < tokensWithTranslations.length) {
  const t = tokensWithTranslations[i];
  
  if (t.isPhraseStart) {
    // Collect all tokens of this phrase including whitespace
    let phraseText = "";
    let j = i;
    while (j < tokensWithTranslations.length && 
           (tokensWithTranslations[j].isPhrase || 
            (tokensWithTranslations[j].isEmpty && j > i && tokensWithTranslations[j-1].isPhrase))) {
      phraseText += tokensWithTranslations[j].token;
      j++;
    }
    groupedTokens.push({ ...t, token: phraseText });
    i = j;
  } else {
    groupedTokens.push(t);
    i++;
  }
}

  return (
    <TextEdit
      userText={userText[0] as userText}
      matchWords={groupedTokens}
      textLanguage={userText[0].language}
    />
  );
}