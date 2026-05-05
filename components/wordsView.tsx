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
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className=" mt-9 lg:mt-0 max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="text-[10px] md:text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">
              Vocabulary
            </p>
            <h1 className="text-base md:text-2xl font-sans font-semibold text-slate-800 tracking-tight">
              My words
            </h1>
            <p className=" text-[10px] md:text-sm text-slate-400 mt-1">
              {words.length} word{words.length !== 1 ? "s" : ""} saved
            </p>
          </div>
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 active:bg-slate-900
              transition-colors text-white text-[10px] md:text-sm font-medium px-4 py-2 rounded-lg cursor-pointer"
          >
            <BiPlus className="w-3 h-3 md:w-4 md:h-4 " />
            Add word
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="hidden md:grid grid-cols-5 items-center bg-slate-50 border-b border-slate-200 px-5 py-3 gap-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Word
            </p>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Translation
            </p>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Note
            </p>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Status
            </p>
            <WordSearch setQuery={setQuery} />
          </div>
          <div className="md:hidden px-4 py-3 border-b border-slate-200">
            <WordSearch setQuery={setQuery} />
          </div>
          <WordsList query={query} words={filteredWords} />
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <WordAddForm closeModal={() => setIsOpen(false)} aiTranslation="" />
      )}
    </div>
  );
}
