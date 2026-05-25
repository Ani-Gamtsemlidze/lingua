"use client";

import { Archivo_Black, Roboto } from "next/font/google";
import CardButtons from "./cardButtons";
import { Word } from "@/types/words";
import { useFlashCard } from "./useFlashcard";
import ProgressBar from "./progressBar";
import { LuMousePointerClick } from "react-icons/lu";
import { useEffect } from "react";
import Link from "next/link";

const archivoBlack = Archivo_Black({ weight: "400", subsets: ["latin"] });
const roboto = Roboto({ weight: "400", subsets: ["latin"] });

export default function FlashCard({ userWords }: { userWords: Word[] }) {
  const {
    isFlipped,
    setIsFlipped,
    currentWord,
    stats,
    isComplete,
    knownWidth,
    learningWidth,
    handleDontKnow,
    handleFuzzy,
    handleKnowIt,
    handleNextSession,
    cardKey,
    isExiting,
    exitDirection,
    cardsCount,
  } = useFlashCard(userWords);

  useEffect(() => {
    if (!isComplete) return;
    handleNextSession();
  }, [userWords]);

  if (isComplete) {
    return (
      <div className="flex flex-col items-center gap-6 text-center px-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-1">
            Session complete
          </p>
          <h2 className="text-2xl font-semibold text-slate-50 tracking-tight">
            Great work! 🎉
          </h2>
        </div>

        <div className="flex gap-3">
          <div className="bg-emerald-500/15 border border-emerald-400/30 text-emerald-200 px-4 sm:px-6 py-4 rounded-xl text-center">
            <p className="text-2xl font-semibold">{stats.known}</p>
            <p className="text-xs font-medium text-emerald-300 mt-0.5">Known</p>
          </div>
          <div className="bg-orange-500/15 border border-orange-400/30 text-orange-200 px-4 sm:px-6 py-4 rounded-xl text-center">
            <p className="text-2xl font-semibold">{stats.fuzzy}</p>
            <p className="text-xs font-medium text-orange-300 mt-0.5">Fuzzy</p>
          </div>
          <div className="bg-sky-500/15 border border-sky-400/30 text-sky-200 px-4 sm:px-6 py-4 rounded-xl text-center">
            <p className="text-2xl font-semibold">{stats.learning}</p>
            <p className="text-xs font-medium text-sky-300 mt-0.5">Learning</p>
          </div>
        </div>

        {userWords.filter((word) => word.status !== "known").length > 3 ? (
          <button
            onClick={handleNextSession}
            className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 active:bg-violet-800
            transition-colors text-white text-sm font-medium px-5 py-2.5 rounded-lg"
          >
            Next session →
          </button>
        ) : (
          <Link
            href={"/words"}
            className="mt-2 px-4 py-2 rounded-md bg-violet-600 hover:bg-violet-700 text-white text-sm transition-colors"
          >
            Go to vocabulary
          </Link>
        )}
      </div>
    );
  }

  if (userWords.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 text-center px-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-1">
          Study
        </p>
        <h2 className="text-xl font-semibold text-slate-50">No words yet</h2>
        <p className="text-sm text-slate-300">
          Add some words in the Reader to start practicing.
        </p>
      </div>
    );
  }

  if (!currentWord) {
    return (
      <div className="flex flex-col items-center gap-3 text-center px-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-1">
          Study
        </p>
        <h2 className="text-xl font-semibold text-slate-50">
          You're all caught up 🎉
        </h2>
        <p className="text-sm text-slate-300">
          No words left to review right now.
        </p>
        <Link
          href={"/words"}
          className="mt-2 px-4 py-2 rounded-md bg-violet-600 hover:bg-violet-700 text-white text-sm transition-colors"
        >
          Go to vocabulary
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 sm:gap-6 w-full px-4">
      {/* Progress */}
      <ProgressBar
        knownWidth={knownWidth}
        learningWidth={learningWidth}
        stats={stats}
        cardsCount={cardsCount}
      />

      {/* Card */}
      <div
        key={cardKey}
        className={`relative w-full max-w-[460px] h-[280px] sm:h-[260px] [perspective:1000px] cursor-pointer ${
          isExiting
            ? exitDirection === "left"
              ? "card-exit-left"
              : exitDirection === "right"
                ? "card-exit-right"
                : "card-exit-up"
            : "card-enter"
        }`}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Card shadows */}
        <div className="bg-slate-700 w-full h-full rounded-2xl absolute top-1 left-1 opacity-40" />
        <div className="bg-slate-600 w-full h-full rounded-2xl absolute top-2 left-2 opacity-30" />

        <div
          className={`relative w-full h-full transition-transform duration-700 ${
            isFlipped ? "rotate-y-180" : ""
          } [transform-style:preserve-3d]`}
        >
          {/* Front */}
          <div className="absolute w-full h-full [backface-visibility:hidden] flex items-center justify-center flex-col bg-slate-800 border border-slate-700 rounded-2xl gap-3 px-6">
            <h2
              className={`text-slate-50 text-3xl sm:text-4xl text-center break-words ${archivoBlack.className}`}
            >
              {currentWord?.word}
            </h2>
            <span className="text-slate-400 flex items-center gap-1.5 text-xs">
              <LuMousePointerClick className="w-3.5 h-3.5" />
              Click to reveal
            </span>
          </div>

          {/* Back */}
          <div className="absolute w-full h-full rotate-y-180 [backface-visibility:hidden] flex items-center justify-center flex-col bg-slate-800 border border-slate-700 rounded-2xl gap-2 px-6">
            <span
              className={`text-violet-400 text-xs uppercase tracking-widest ${roboto.className}`}
            >
              Translation
            </span>
            <h2
              className={`text-slate-50 text-lg sm:text-xl text-center break-words ${roboto.className}`}
            >
              {currentWord?.translation}
            </h2>
            {currentWord?.note && (
              <p className="text-slate-300 text-xs mt-1 px-4 sm:px-8 text-center">
                {currentWord.note}
              </p>
            )}
          </div>
        </div>
      </div>

      <CardButtons
        isFlipped={isFlipped}
        onDontKnow={handleDontKnow}
        onFuzzy={handleFuzzy}
        onKnowIt={handleKnowIt}
      />
    </div>
  );
}