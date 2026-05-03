"use server";

import { GoogleGenAI } from "@google/genai";

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export async function getAITranslation(
  word: string,
  language: string,
) {
  const isEnglish = language.toLowerCase() === "english";
  const response = await genAI.models.generateContent({
    model: "gemini-3.1-flash-lite-preview",
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
