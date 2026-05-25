import { sql } from "@/lib/db";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import TextReader from "@/components/textReader";

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

interface UserText {
  id: number;
  title: string;
  content: string;
  language: string;
}

interface UserWord {
  id: number;
  word: string;
  translation: string;
  note: string;
  language: string;
}

function normalizeToken(token: string): string {
  return token.replace(/[^\p{L}\p{N}']/gu, "").toLowerCase();
}

function buildPhraseMap(
  tokens: string[],
  phrases: UserWord[]
): Map<number, { translation: string; word: string; note: string; id: number; isStart: boolean }> {
  const phraseMap = new Map();
  
  if (phrases.length === 0) return phraseMap;

  for (const phrase of phrases) {
    const phraseTokens = phrase.word.toLowerCase().split(/\s+/);
    const phraseLength = phraseTokens.length;
    
    let tokenIndex = 0;
    
    while (tokenIndex < tokens.length) {
      if (/^\s+$/.test(tokens[tokenIndex])) {
        tokenIndex++;
        continue;
      }
      
      let matchCount = 0;
      let currentIndex = tokenIndex;
      
      for (let phraseIdx = 0; phraseIdx < phraseLength && currentIndex < tokens.length; ) {
        if (/^\s+$/.test(tokens[currentIndex])) {
          currentIndex++;
          continue;
        }
        
        const normalizedToken = normalizeToken(tokens[currentIndex]);
        
        if (normalizedToken === phraseTokens[phraseIdx]) {
          matchCount++;
          phraseIdx++;
          currentIndex++;
        } else {
          break;
        }
      }
      
      if (matchCount === phraseLength) {
        for (let i = tokenIndex; i < currentIndex; i++) {
          phraseMap.set(i, {
            translation: phrase.translation,
            word: phrase.word,
            note: phrase.note,
            id: phrase.id,
            isStart: i === tokenIndex,
          });
        }
        tokenIndex = currentIndex;
      } else {
        tokenIndex++;
      }
    }
  }
  
  return phraseMap;
}

function mapTokensToTranslations(
  tokens: string[],
  phraseMap: Map<number, any>,
  singleWordsMap: Map<string, UserWord>
): TokenWithTranslation[] {
  return tokens.map((token, index) => {
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

    const normalized = normalizeToken(token);
    if (!normalized) {
      return { token, isEmpty: true };
    }

    const match = singleWordsMap.get(normalized);
    if (match) {
      return {
        token,
        word: match.word,
        note: match.note,
        translation: match.translation,
        id: match.id,
        isEmpty: false,
      };
    }
    return { token, isEmpty: false };
  });
}

function groupPhraseTokens(tokens: TokenWithTranslation[]): TokenWithTranslation[] {
  const grouped: TokenWithTranslation[] = [];
  let i = 0;

  while (i < tokens.length) {
    const current = tokens[i];

    if (current.isPhraseStart) {
      let phraseText = "";
      let j = i;

      while (
        j < tokens.length &&
        tokens[j].isPhrase &&
        tokens[j].word === current.word 
      ) {
        phraseText += tokens[j].token;
        j++;
      }

      grouped.push({ ...current, token: phraseText });
      i = j;
    } else {
      grouped.push(current);
      i++;
    }
  }

  return grouped;
}

export default async function TextPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const session = await getServerSession(authOptions);
  const slug = await params;

  const userTextResult = await sql`
    SELECT * FROM user_texts 
    WHERE id = ${slug.id} 
    AND user_id = ${session?.user.id}
  `;

  if (!userTextResult[0]) {
    throw new Error("Text not found");
  }

  const userText = userTextResult[0] as UserText;

  const tokens = userText.content.split(/(\s+)/);

  const userWords = await sql`
    SELECT * FROM words 
    WHERE language = ${userText.language} 
    AND user_id = ${session?.user.id}
  `;

  const singleWords = userWords.filter((w) => !w.word.includes(" ")) as UserWord[];
  const phrases = userWords.filter((w) => w.word.includes(" ")) as UserWord[];

  const singleWordsMap = new Map<string, UserWord>(
    singleWords.map((w) => [w.word.toLowerCase(), w])
  );

  const phraseMap = buildPhraseMap(tokens, phrases);

  const tokensWithTranslations = mapTokensToTranslations(
    tokens,
    phraseMap,
    singleWordsMap
  );

  const groupedTokens = groupPhraseTokens(tokensWithTranslations);

  return (
    <TextReader
      userText={userText}
      matchWords={groupedTokens}
      textLanguage={userText.language}
    />
  );
}