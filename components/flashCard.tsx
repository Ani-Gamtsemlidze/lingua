"use client";

import { Archivo_Black, Roboto } from "next/font/google";
import CardButtons from "./cardButtons";
import { Word } from "@/types/words";
import { useFlashCard } from "./useFlashcard";
import ProgressBar from "./progressBar";
import { LuMousePointerClick } from "react-icons/lu";

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

  if (isComplete) {
    return (
      <div className="flex flex-col items-center gap-6 text-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">
            Session complete
          </p>
          <h2 className="text-2xl font-semibold text-slate-800 tracking-tight">
            Great work! 🎉
          </h2>
        </div>

        <div className="flex gap-3">
          <div className="bg-green-50 border border-green-100 text-green-700 px-6 py-4 rounded-xl text-center">
            <p className="text-2xl font-semibold">{stats.known}</p>
            <p className="text-xs font-medium text-green-500 mt-0.5">Known</p>
          </div>
          <div className="bg-amber-50 border border-amber-100 text-amber-700 px-6 py-4 rounded-xl text-center">
            <p className="text-2xl font-semibold">{stats.fuzzy}</p>
            <p className="text-xs font-medium text-amber-500 mt-0.5">Fuzzy</p>
          </div>
          <div className="bg-red-50 border border-red-100 text-red-700 px-6 py-4 rounded-xl text-center">
            <p className="text-2xl font-semibold">{stats.learning}</p>
            <p className="text-xs font-medium text-red-400 mt-0.5">Learning</p>
          </div>
        </div>

        <button
          onClick={handleNextSession}
          className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 active:bg-slate-900
            transition-colors text-white text-sm font-medium px-5 py-2.5 rounded-lg"
        >
          Next session →
        </button>
      </div>
    );
  }

  if (userWords.length === 0 || !currentWord) {
    return (
      <div className="flex flex-col items-center gap-3 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">
          Study
        </p>
        <h2 className="text-xl font-semibold text-slate-800">No words yet</h2>
        <p className="text-sm text-slate-400">
          Add some words in the Reader to start practicing.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-6">

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
        className={`relative w-[460px] h-[260px] [perspective:1000px] cursor-pointer ${
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
        <div className="bg-slate-500 w-full h-full rounded-2xl absolute top-1 left-1 opacity-50" />
        <div className="bg-slate-400 w-full h-full rounded-2xl absolute top-2 left-2 opacity-40" />

        <div
          className={`relative w-full h-full transition-transform duration-700 ${
            isFlipped ? "rotate-y-180" : ""
          } [transform-style:preserve-3d]`}
        >
          {/* Front */}
          <div className="absolute w-full h-full [backface-visibility:hidden] flex items-center justify-center flex-col  bg-[#2d3f55] rounded-2xl gap-3">
            <h2 className={`text-white text-4xl ${archivoBlack.className}`}>
              {currentWord?.word}
            </h2>
            <span className="text-slate-400 flex items-center gap-1.5 text-xs">
              <LuMousePointerClick className="w-3.5 h-3.5" />
              Click to reveal
            </span>
          </div>

          {/* Back */}
          <div className="absolute w-full h-full rotate-y-180 [backface-visibility:hidden] flex items-center justify-center flex-col bg-[#2d3f55] rounded-2xl gap-2">
            <span className={`text-slate-400 text-xs uppercase tracking-widest ${roboto.className}`}>
              Translation
            </span>
            <h2 className={`text-white text-xl ${roboto.className}`}>
              {currentWord?.translation}
            </h2>
            {currentWord?.note && (
              <p className="text-slate-400 text-xs mt-1 px-8 text-center">
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