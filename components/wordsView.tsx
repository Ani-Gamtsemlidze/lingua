"use client";
import { Word } from "@/types/words";
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
    <div className="min-h-screen bg-fuchsia-50 px-6 py-10">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <p className="text-xs font-extrabold uppercase tracking-widest text-purple-300 mb-1">
          Vocabulary
        </p>
        <h1 className="font-serif text-4xl font-bold text-purple-950 mb-1">
          My Words
        </h1>
        <p className="text-sm text-purple-400 font-semibold mb-8">
          {words.length} words saved so far.
        </p>

        {/* Table */}
        <div className="bg-white rounded-3xl border-2 border-purple-100 overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-5 items-center bg-purple-50 border-b-2 border-purple-100 px-5 py-3 gap-5">
            <p className="text-xs font-extrabold uppercase tracking-widest text-purple-400">
              Word
            </p>
            <p className="text-xs font-extrabold uppercase tracking-widest text-purple-400">
              Translation
            </p>
            <p className="text-xs font-extrabold uppercase tracking-widest text-purple-400">
              Note
            </p>
            <p className="text-xs font-extrabold uppercase tracking-widest text-purple-400">
              Status
            </p>
            <WordSearch setQuery={setQuery} />
          </div>

          {/* Words list */}
          <WordsList query={query} words={filteredWords} />
        </div>
      </div>
    </div>
  );
}
