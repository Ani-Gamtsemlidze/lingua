"use client";

import { Roboto } from "next/font/google";
import { useEffect, useState } from "react";
import { Word } from "@/types/words";
import { useWordGuess } from "./useWordGuess";
import QuizFilter from "./quizFilter";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { BiBookOpen } from "react-icons/bi";

const roboto = Roboto({ weight: "400", subsets: ["latin"] });

export default function WordGuess({ data }: { data: Word[] }) {
  const {
    currentWord,
    options,
    next,
    session,
    index,
    isComplete,
    handleCorrect,
    handleWrong,
    correct,
    wrong,
    restart,
    hasStarted,
    filter,
    setFilter,
    filterCounts,
  } = useWordGuess(data);

  const [clickedAnswer, setClickedAnswer] = useState<string | null>(null);
  const pathName = usePathname();

  function handleClick(word: string) {
    if (clickedAnswer || !currentWord) return;
    setClickedAnswer(word);
    if (word === currentWord.word) handleCorrect();
    else handleWrong();
    setTimeout(() => {
      setClickedAnswer(null);
      next();
    }, 800);
  }

  useEffect(() => {
    restart();
  }, [pathName, data]);

  // Not enough words
  if (data.length < 5) {
    return (
      <div className="flex w-full h-full items-center justify-center">
        <div className="bg-white border border-slate-200 rounded-xl p-8 max-w-sm w-full text-center">
          <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BiBookOpen className="w-5 h-5 text-slate-400" />
          </div>
          <h2 className="text-sm font-semibold text-slate-700 mb-1">
            Not enough words yet
          </h2>
          <p className="text-xs text-slate-400 mb-6 leading-relaxed">
            You need at least 5 words to play. Head to the reader, save some words and come back!
          </p>
          <Link
            href="/words"
            className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700
              text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
          >
            Go to vocabulary
          </Link>
        </div>
      </div>
    );
  }

  // Session complete
  if (isComplete) {
    return (
      <div className="flex w-full h-full items-center justify-center">
        <div className="bg-white border border-slate-200 rounded-xl p-8 max-w-sm w-full text-center">
          <p className="text-2xl mb-4">🎉</p>
          <h2 className="text-lg font-semibold text-slate-800 tracking-tight mb-1">
            Session complete!
          </h2>
          <p className="text-xs text-slate-400 mb-6">Here's how you did</p>
          <div className="flex justify-center gap-3 mb-6">
            <span className="text-xs font-medium bg-green-50 text-green-700 border border-green-100 px-3 py-1.5 rounded-full">
              {correct} correct
            </span>
            <span className="text-xs font-medium bg-red-50 text-red-700 border border-red-100 px-3 py-1.5 rounded-full">
              {wrong} wrong
            </span>
          </div>
          <button
            onClick={restart}
            className="w-full bg-slate-800 hover:bg-slate-700 active:bg-slate-900
              transition-colors text-white text-sm font-medium py-2.5 rounded-lg cursor-pointer"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full h-full items-center justify-center">
      <div className="w-[480px] flex flex-col gap-4">

        {/* Top row */}
        <div className="flex items-center justify-between min-h-7">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            Word guess
          </p>
          <div className="flex items-center gap-3">
            {/* Pills — fade in when started */}
            <div className={`flex gap-2 transition-opacity duration-300 ${hasStarted ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
              <span className="text-xs font-medium bg-green-50 text-green-700 border border-green-100 px-2.5 py-1 rounded-full">
                {correct} correct
              </span>
              <span className="text-xs font-medium bg-red-50 text-red-700 border border-red-100 px-2.5 py-1 rounded-full">
                {wrong} wrong
              </span>
              <span className="text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200 px-2.5 py-1 rounded-full">
                {session.length - index} left
              </span>
            </div>
            <QuizFilter
              filter={filter}
              setFilter={setFilter}
              filterCounts={filterCounts}
              hasStarted={hasStarted}
            />
          </div>
        </div>

        {/* Progress bar */}
        <div className={`overflow-hidden transition-all duration-500 ${hasStarted ? "h-1.5" : "h-0"}`}>
          <div className="h-full bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-slate-700 rounded-full transition-all duration-500"
              style={{ width: `${(index / session.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Card */}
        {!currentWord ? (
          <div className="bg-slate-800 flex flex-col items-center justify-center px-10 py-12 rounded-2xl gap-3">
            <p className="text-slate-500 text-sm">Select a set and start guessing</p>
          </div>
        ) : (
          <div className="bg-slate-800 flex flex-col items-center justify-center px-10 py-12 rounded-2xl">
            <span className={`text-xs text-slate-500 uppercase tracking-widest ${roboto.className}`}>
              What is the word for
            </span>
            <div className={`text-3xl text-slate-100 font-medium mt-3 tracking-tight ${roboto.className}`}>
              {currentWord.translation}
            </div>
          </div>
        )}

        {/* Options */}
        {currentWord && (
          <div className="gap-2 grid grid-cols-2">
            {options.map((word, i) => (
              <div
                key={i}
                onClick={() => handleClick(word)}
                className={`border py-3 px-4 rounded-xl cursor-pointer text-sm font-medium lowercase transition-colors
                  ${clickedAnswer
                    ? word === currentWord.word
                      ? "bg-green-50 border-green-200 text-green-700"
                      : word === clickedAnswer
                        ? "bg-red-50 border-red-200 text-red-700"
                        : "bg-white border-slate-200 text-slate-400"
                    : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300"
                  }`}
              >
                {word}
              </div>
            ))}
          </div>
        )}

        {/* Skip */}
        {currentWord && (
          <div className="flex justify-start">
            <button
              onClick={() => { setClickedAnswer(null); next(); }}
              className="text-sm text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            >
              Skip →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}