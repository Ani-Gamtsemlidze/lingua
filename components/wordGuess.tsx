"use client";

import { Roboto } from "next/font/google";
import { useEffect, useState } from "react";
import { Word } from "@/types/words";
import { useWordGuess } from "./useWordGuess";
import QuizFilter from "./quizFilter";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { BiBookOpen } from "react-icons/bi";

const roboto = Roboto({ weight: ["400", "500"], subsets: ["latin"] });

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
    }, 850);
  }

  useEffect(() => {
    restart();
  }, [pathName, data]);

  if (data.length < 5) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 max-w-md w-full text-center">
          <div className="mx-auto w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center mb-5">
            <BiBookOpen className="w-6 h-6 text-slate-400" />
          </div>
          <h2 className="text-lg font-semibold text-slate-800 mb-2">Not enough words</h2>
          <p className="text-slate-500 text-sm mb-7">Need at least 5 words to play</p>
          <Link
            href="/words"
            className="block bg-slate-900 hover:bg-black text-white font-medium py-3 rounded-2xl transition-all active:scale-95"
          >
            Go to Vocabulary
          </Link>
        </div>
      </div>
    );
  }

  if (isComplete) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 max-w-md w-full text-center">
          <div className="text-5xl mb-4">🎉</div>
          <h2 className="text-xl font-semibold text-slate-800 mb-1">Session Complete</h2>
          <p className="text-slate-500 text-sm mb-6">Here&apos;s how you did</p>

          <div className="flex gap-3 justify-center mb-8">
            <div className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full">
              {correct} correct
            </div>
            <div className="inline-flex items-center gap-1 bg-amber-100 text-amber-700 text-xs font-semibold px-2.5 py-1 rounded-full">
              {wrong} wrong
            </div>
          </div>

          <button
            onClick={restart}
            className="w-full bg-slate-900 hover:bg-black py-3.5 rounded-2xl text-white font-medium transition-all active:scale-95"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-2 py-4">
      <div className="w-full max-w-[500px]">
        <div className="flex justify-end mb-6">
          <QuizFilter
            filter={filter}
            setFilter={setFilter}
            filterCounts={filterCounts}
            hasStarted={hasStarted}
          />
        </div>

        {hasStarted && (
          <div className="h-1 bg-slate-700 rounded-full mb-8 overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-700"
              style={{ width: `${(index / session.length) * 100}%` }}
            />
          </div>
        )}

        {hasStarted && (
          <div className="flex gap-2 flex-wrap mb-6">
            <div className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full">
              {correct} correct
            </div>
            <div className="inline-flex items-center gap-1 bg-amber-100 text-amber-700 text-xs font-semibold px-2.5 py-1 rounded-full">
              {wrong} wrong
            </div>
            <div className="inline-flex items-center gap-1 bg-slate-100 text-slate-600 text-xs font-semibold px-2.5 py-1 rounded-full">
              {session.length - index} left
            </div>
          </div>
        )}

        {!currentWord ? (
          <div className="flex items-center justify-center">
            <div className="bg-slate-700 rounded-3xl p-10 sm:p-12 text-center text-white w-full max-w-[520px]">
              <div className="w-14 h-14 mx-auto mb-5 bg-white/10 rounded-2xl flex items-center justify-center text-3xl">
                🎯
              </div>
              <p className="text-slate-200 text-[17px] font-medium">
                Ready to start guessing?
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="bg-slate-700 rounded-3xl p-10 sm:p-10 text-center text-white">
              <span className="uppercase text-[10px] tracking-[2px] text-slate-400 font-medium">
                WHAT IS THE WORD FOR
              </span>
              <div
                className={`mt-3 text-[26px] sm:text-[28px] leading-tight tracking-tight font-medium ${roboto.className}`}
              >
                {currentWord.translation}
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {options.map((word, i) => (
                <button
                  key={i}
                  onClick={() => handleClick(word)}
                  disabled={!!clickedAnswer}
                  className={`
                    py-[10px] px-4 text-[15.5px] font-medium border-2 rounded-2xl text-left
                    transition-all active:scale-[0.985]
                    ${
                      clickedAnswer
                        ? word === currentWord.word
                          ? "bg-green-100 border-green-600 text-green-800"
                          : word === clickedAnswer
                            ? "bg-red-100 border-red-600 text-red-800"
                            : "bg-white border-slate-200 text-slate-400"
                        : "bg-white border-slate-200 hover:border-slate-300 text-slate-700"
                    }
                  `}
                >
                  {word}
                </button>
              ))}
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => {
                  setClickedAnswer(null);
                  next();
                }}
                className="text-sm text-slate-400 hover:text-slate-500 transition-colors"
              >
                Skip →
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}