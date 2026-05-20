"use server";

import { GoogleGenAI } from "@google/genai";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { sql } from "@/lib/db";

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export async function getAITranslation(word: string, language: string) {
  const isEnglish = language.toLowerCase() === "english";
  const response = await genAI.models.generateContent({
    model: "gemini-flash-latest",
    contents: `You are a language learning assistant.
    The word is: "${word}" 
    Language: ${language}
   ${
     isEnglish
       ? `"translation": "one simple synonym or short definition, max 5 words (e.g. improve → make better)"`
       : `"translation": "short English translation, max 3 words"`
   }
    Return a JSON object with exactly these fields:
    {
  "translation": "the most common English translation",
  "baseForm": "base/root form of the word if it's conjugated or declined, otherwise same as the word",
  "partOfSpeech": "noun/verb/adjective/adverb/etc",
  "example": "one short example sentence in ${language} using this word, if it is particle or suffix: brief grammatical explanation with one example ",
  ${!isEnglish ? `,\n  "exampleTranslation": "English translation of the example sentence"` : ""}
  Return only the JSON, no markdown, no explanation.`,
  });
  try {
    const parsed = JSON.parse(response.text ?? "{}");
    return parsed;
  } catch {
    return { translation: response.text ?? "" };
  } 
}

export async function generateAIText(language: string,level: string, topic?: string) {
  const prompt = `
You are an expert language teacher creating materials for ${language} learners.
Generate **one high-quality reading text** with the following requirements:
- Target Language: ${language}
- Level: ${level}
- Topic: ${topic || "Everyday life and interesting situations"  }
Rules:
- Write between 130 and 180 words.
- Use natural, correct ${language}.
- Match vocabulary and grammar difficulty to the ${level} level.
- Make the text engaging and slightly motivating.
- Include useful vocabulary for learners.
Return your response in this exact JSON format (nothing else):

{
  "title": "Short, catchy title in ${language}",
  "content": "The full text here...",
}
`;
const response = await genAI.models.generateContent({ model: "gemini-flash-latest", contents: prompt });
 try {
    const parsed = JSON.parse(response.text ?? "{}");
    return parsed;
  } catch {
    return { translation: response.text ?? "" };
  }

}

export async function chatWithTutor(
  messages: { role: "user" | "assistant"; content: string }[],
  activeLanguage: string
) {
  const systemInstruction = `You are a friendly and knowledgeable ${activeLanguage} language tutor named Lingua.
Help the user learn ${activeLanguage} by:
- Explaining grammar rules clearly with examples
- Providing translations and vocabulary in context
- Correcting mistakes kindly and explaining why
- Teaching useful phrases and idioms
- Answering any ${activeLanguage} language-related questions
Keep responses concise and educational. Always use ${activeLanguage} examples when relevant.`;

  const contents = messages.map((msg) => ({
    role: msg.role === "assistant" ? "model" : "user",
    parts: [{ text: msg.content }],
  }));

  try {
    const response = await genAI.models.generateContent({
      model: "gemini-flash-latest",
      config: { systemInstruction },
      contents,
    });
    return response.text ?? "Sorry, I couldn't generate a response. Please try again.";
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    if (msg.includes("503") || msg.toLowerCase().includes("unavailable") || msg.toLowerCase().includes("high demand")) {
      throw new Error("The AI is experiencing high demand right now. Please try again in a moment.");
    }
    throw new Error("Something went wrong. Please try again.");
  }
}

export async function generateAndSaveText(language: string, level: string, topic?: string) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }
    const ai = await generateAIText(language, level, topic);

   const result = await sql`
    INSERT INTO user_texts (content,title, language, user_id) VALUES (${ai.content},${ai.title}, (SELECT active_language FROM users WHERE id = ${session?.user?.id}), ${session?.user?.id})
    RETURNING id
  `;
  return result[0];

}
