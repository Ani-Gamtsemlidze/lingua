"use client";
import { Word } from "@/types/words";
import WordSearch from "./wordSearch";
import WordsList from "./wordsList";
import WordAddForm from "./wordAddForm";
import { useState } from "react";
import { BiPlus } from "react-icons/bi";

export default function WordsView({ words }: { words: Word[] }) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredWords = words.filter(
    (word) =>
      word.word.toLowerCase().includes(query.toLowerCase()) ||
      word.translation.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="nav:hidden sticky top-0 z-20 bg-slate-950/98 backdrop-blur-sm border-b border-slate-700 px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h1 className="text-base sm:text-lg font-semibold text-slate-50">
              My Words
            </h1>
            <p className="text-xs text-slate-300">
              {words.length} word{words.length !== 1 ? "s" : ""} saved
            </p>
          </div>
          
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700
              transition-colors text-white text-sm font-medium px-3 py-2 rounded-lg cursor-pointer shrink-0"
          >
            <BiPlus className="w-4 h-4" />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>
      </div>

      <div className="px-4 md:px-6 py-6 nav:py-10">
        <div className="max-w-6xl mx-auto">
          <div className="hidden nav:flex items-end justify-between mb-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-2">
                Vocabulary
              </p>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-50 tracking-tight">
                My Words
              </h1>
              <p className="text-sm text-slate-300 mt-2">
                {words.length} word{words.length !== 1 ? "s" : ""} saved
              </p>
            </div>
            <button
              onClick={() => setIsOpen(true)}
              className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700
                transition-all text-white text-sm font-medium px-5 py-2.5 rounded-xl cursor-pointer
                hover:shadow-lg hover:shadow-violet-500/20"
            >
              <BiPlus className="w-4 h-4" />
              Add Word
            </button>
          </div>

          <div className="bg-slate-900/60 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl">
           {words.length > 0 && (
              <div className="hidden md:block px-5 py-3 bg-slate-800/50 border-b border-slate-700">
                <WordSearch setQuery={setQuery} />
              </div>
            )}

            <div className="hidden md:grid grid-cols-[2fr_2fr_3fr_140px_60px] items-center bg-slate-800/60 border-b border-slate-700 px-5 py-3.5 gap-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                Word
              </p>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                Translation
              </p>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                Note
              </p>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                Status
              </p>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-200 text-right">
                Edit
              </p>
            </div>
            {words.length > 0 && (
              <div className="md:hidden px-4 py-3 border-b border-slate-700 bg-slate-800/50">
                <WordSearch setQuery={setQuery} />
              </div>
            )}
            <WordsList query={query} words={filteredWords} />
          </div>
        </div>
      </div>
      {isOpen && (
        <WordAddForm closeModal={() => setIsOpen(false)} aiTranslation="" />
      )}
    </div>
  );
}