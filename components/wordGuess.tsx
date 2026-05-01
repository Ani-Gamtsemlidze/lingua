"use client";

import { Roboto } from "next/font/google";
import { useEffect, useState } from "react";
import { Word } from "@/types/words";
import { useWordGuess } from "./useWordGuess";
import QuizFilter from "./quizFilter";
import { FaQuestion } from "react-icons/fa";
import { usePathname } from "next/navigation";

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
  const pathName = usePathname()

  function handleClick(word: string) {
    if (clickedAnswer || !currentWord) return;
    setClickedAnswer(word);
    if (word === currentWord.word) {
      handleCorrect();
    } else {
      handleWrong();
    }
    setTimeout(() => {
      setClickedAnswer(null);
      next();
    }, 800);
  }

  useEffect(() => {
    restart();
  }, [pathName, data]);

  if (isComplete) {
    return (
      <div className="flex w-full h-full flex-col items-center justify-center gap-4">
        <p className="text-slate-700 text-lg font-medium">
          Session complete! 🎉
        </p>
        <div className="flex gap-2">
          <span className="text-xs font-medium bg-green-50 text-green-700 border border-green-100 px-2.5 py-1 rounded-full">
            {correct} correct
          </span>
          <span className="text-xs font-medium bg-red-50 text-red-700 border border-red-100 px-2.5 py-1 rounded-full">
            {wrong} wrong
          </span>
        </div>
        <button
          onClick={restart}
          className="bg-slate-800 hover:bg-slate-700 transition-colors text-white text-sm font-medium
            px-5 py-2.5 rounded-lg cursor-pointer"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="flex w-full h-full items-center justify-center">
      <div className="w-120 flex flex-col gap-4">
        <div className="flex items-center justify-end min-h-7">
          <div className="flex flex-col items-end ">
            <QuizFilter
              filter={filter}
              setFilter={setFilter}
              filterCounts={filterCounts}
              hasStarted={hasStarted}
            />
            {hasStarted && (
              <div className="flex gap-2 mt-4">
                <span className="text-xs font-medium bg-green-50 text-green-700 border border-green-100 px-2.5 py-1 rounded-full">
                  {correct} correct
                </span>
                <span className="text-xs font-medium bg-red-50 text-red-700 border border-red-100 px-2.5 py-1 rounded-full">
                  {wrong} wrong
                </span>
                <span className="text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200 px-2.5 py-1 rounded-full">
                  {session.length - index} card
                </span>
              </div>
            )}
          </div>
        </div>

        <div
          className={`overflow-hidden transition-all duration-500 ${hasStarted ? "h-1.5" : "h-0"}`}
        >
          <div className="h-full bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#2d3f55] rounded-full transition-all duration-500"
              style={{ width: `${(index / session.length) * 100}%` }}
            />
          </div>
        </div>

        {!hasStarted && !currentWord ? (
          <div className="bg-[#2d3f55] flex flex-col items-center justify-center px-10 py-10 rounded-2xl min-h-[160px] gap-3">
            <FaQuestion className="text-slate-300 text-2xl" />
            <p className="text-slate-400 text-sm">
              Select a filter and start guessing
            </p>
          </div>
        ) : currentWord ? (
          <div className="bg-[#2d3f55] flex flex-col items-center justify-center px-10 py-10 rounded-2xl">
            <span
              className={`text-xs text-slate-500 uppercase tracking-widest ${roboto.className}`}
            >
              What is the word for
            </span>
            <div
              className={`text-3xl text-slate-100 font-medium mt-3 tracking-tight ${roboto.className}`}
            >
              {currentWord.translation}
            </div>
          </div>
        ) : null}

        {currentWord && (
          <div className="gap-2 grid grid-cols-2">
            {options.map((word, i) => (
              <div
                key={i}
                onClick={() => handleClick(word)}
                className={`border py-3 px-3 rounded-xl cursor-pointer text-sm font-medium lowercase transition-colors
                  ${
                    clickedAnswer
                      ? word === currentWord.word
                        ? "bg-green-50 border-green-200 text-green-700"
                        : word === clickedAnswer
                          ? "bg-red-50 border-red-200 text-red-700"
                          : "bg-white border-slate-200 text-slate-500"
                      : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300"
                  }`}
              >
                {word}
              </div>
            ))}
          </div>
        )}

        {currentWord && (
          <div className="flex justify-between items-center">
            <button
              onClick={() => {
                setClickedAnswer(null);
                next();
              }}
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
