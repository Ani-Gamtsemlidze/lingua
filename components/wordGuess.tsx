"use client";

import { Roboto } from "next/font/google";
import { useEffect, useState } from "react";
import { Word } from "@/types/words";
import { useWordGuess } from "./useWordGuess";
import QuizFilter, { Filter } from "./quizFilter";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { BiBookOpen, BiChevronDown } from "react-icons/bi";
import { RiStarSmileLine } from "react-icons/ri";

const roboto = Roboto({ weight: ["400", "500"], subsets: ["latin"] });

const FILTER_CONFIG: { value: Filter; label: string; dot: string }[] = [
  { value: "all", label: "All words", dot: "bg-slate-400" },
  { value: "new", label: "New", dot: "bg-blue-400" },
  { value: "learning", label: "Learning & fuzzy", dot: "bg-amber-400" },
  { value: "known", label: "mastered", dot: "bg-green-400" },
];

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
  const [dropdownOpen, setDropdownOpen] = useState(false);
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
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
        <div className="bg-slate-900/60 border border-slate-700 rounded-3xl p-8 max-w-md w-full text-center">
          <div className="mx-auto w-12 h-12 bg-slate-800/50 rounded-2xl flex items-center justify-center mb-5">
            <BiBookOpen className="w-6 h-6 text-slate-400" />
          </div>
          <h2 className="text-lg font-semibold text-slate-50 mb-2">
            Not enough words
          </h2>
          <p className="text-slate-300 text-sm mb-7">
            Need at least 5 words to play
          </p>
          <Link
            href="/words"
            className="block bg-violet-600 hover:bg-violet-700 text-white font-medium py-3 rounded-2xl transition-all active:scale-95"
          >
            Go to Vocabulary
          </Link>
        </div>
      </div>
    );
  }

  if (isComplete) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
        <div className="bg-slate-900/60 border border-slate-700 rounded-3xl p-8 max-w-md w-full text-center">
          <div className="text-5xl mb-4">🎉</div>
          <h2 className="text-xl font-semibold text-slate-50 mb-1">
            Session Complete
          </h2>
          <p className="text-slate-300 text-sm mb-6">Here&apos;s how you did</p>

          <div className="flex gap-3 justify-center mb-8">
            <div className="inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-200 text-xs font-semibold px-2.5 py-1 rounded-full border border-emerald-400/30">
              {correct} correct
            </div>
            <div className="inline-flex items-center gap-1 bg-orange-500/20 text-orange-200 text-xs font-semibold px-2.5 py-1 rounded-full border border-orange-400/30">
              {wrong} wrong
            </div>
          </div>

          <button
            onClick={restart}
            className="w-full bg-violet-600 hover:bg-violet-700 cursor-pointer py-3.5 rounded-2xl text-white font-medium transition-all active:scale-95"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-[500px]">
        <div className="flex justify-end mb-6">
          {/* <QuizFilter
            filter={filter}
            setFilter={setFilter}
            filterCounts={filterCounts}
            hasStarted={hasStarted}
          /> */}
        </div>

        {hasStarted && (
          <div className="h-1 bg-slate-800 rounded-full mb-8 overflow-hidden border border-slate-700">
            <div
              className="h-full bg-violet-500 transition-all duration-700"
              style={{ width: `${(index / session.length) * 100}%` }}
            />
          </div>
        )}

        {hasStarted && (
          <div className="flex gap-2 flex-wrap mb-6">
            <div className="inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-200 text-xs font-semibold px-2.5 py-1 rounded-full border border-emerald-400/30">
              {correct} correct
            </div>
            <div className="inline-flex items-center gap-1 bg-orange-500/20 text-orange-200 text-xs font-semibold px-2.5 py-1 rounded-full border border-orange-400/30">
              {wrong} wrong
            </div>
            <div className="inline-flex items-center gap-1 bg-slate-800/60 text-slate-300 text-xs font-semibold px-2.5 py-1 rounded-full border border-slate-700">
              {session.length - index} left
            </div>
          </div>
        )}

        {!currentWord ? (
          <>
            <div className="flex items-center justify-center">
              <div className="bg-slate-800/80 border border-slate-700 rounded-3xl p-10 sm:p-12 flex flex-col items-center text-center text-white w-full max-w-[520px]">
                <div className="w-14 h-14 mx-auto mb-5 flex items-center justify-center bg-violet-500/20 rounded-2xl border border-violet-400/30">
                  <span className="mx-auto text-3xl">🎯</span>
                </div>
                <p className="text-slate-100 text-[17px] mb-5 font-medium">
                  Ready to start guessing?
                </p>
              </div>
            </div>
            {!hasStarted && (
              <div className="flex justify-center items-center mt-6 gap-2">
                <RiStarSmileLine className="w-3.5 h-3.5 text-violet-400" />
                <span className="text-md text-slate-300">
                  Pick a set for practice!
                </span>
              </div>
            )}
            <QuizFilter
              filter={filter}
              setFilter={setFilter}
              filterCounts={filterCounts}
              hasStarted={hasStarted}
            />
          </>
        ) : (
          <>
            <div className="bg-slate-800/80 border border-slate-700 rounded-3xl p-10 sm:p-10 text-center text-white">
              <span className="uppercase text-[10px] tracking-[2px] text-violet-400 font-medium">
                WHAT IS THE WORD FOR
              </span>
              <div
                className={`mt-3 text-[26px] sm:text-[28px] leading-tight tracking-tight font-medium text-slate-50 ${roboto.className}`}
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
                    py-[10px] px-4 cursor-pointer text-[15.5px] font-medium border-2 rounded-2xl text-left
                    transition-all active:scale-[0.985]
                    ${
                      clickedAnswer
                        ? word === currentWord.word
                          ? "bg-emerald-500/20 border-emerald-400 text-emerald-200"
                          : word === clickedAnswer
                            ? "bg-red-500/20 border-red-400 text-red-200"
                            : "bg-slate-800/40 border-slate-700 text-slate-500"
                        : "bg-slate-800/60 border-slate-600 hover:border-slate-500 hover:bg-slate-800/80 text-slate-100"
                    }
                  `}
                >
                  {word}
                </button>
              ))}
            </div>

            <div className="mt-6">
              <button
                onClick={() => {
                  setClickedAnswer(null);
                  next();
                }}
                className="text-sm text-slate-400 hover:text-slate-300 transition-colors"
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