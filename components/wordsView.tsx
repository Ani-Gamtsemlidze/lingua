"use client"
import { Word } from "@/types/words";
import EditWord from "./editWord";
import WordSearch from "./wordSearch";
import WordsList from "./wordsList";
import { useState } from "react";

export default function WordsView({ words }: { words: Word[] }) {
  const [query, setQuery] = useState("");

  const filteredWords = words.filter(
    (word) =>
      word.word.toLowerCase().includes(query.toLowerCase()) ||
      word.translation.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div>
      <div className="grid grid-cols-4 bg-gray-200 px-4 py-2 font-semibold rounded-t-lg">
        <p>Word</p>
        <p>Translation</p>
        <p>Note</p>
        <WordSearch setQuery={setQuery} />
      </div>
      <WordsList query={query} words={filteredWords} />
    </div>
  );
}
