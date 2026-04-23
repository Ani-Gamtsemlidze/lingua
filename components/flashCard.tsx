"use client";

import { TbClick } from "react-icons/tb";
import { Archivo_Black, Roboto } from "next/font/google";
import CardButtons from "./cardButtons";
import { Word } from "@/types/words";
import { useFlashCard } from "./useFlashcard";
import ProgressBar from "./progressBar";

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
      <div className="flex flex-col items-center gap-6">
        <h2 className="text-2xl font-bold text-purple-600">
          Session complete! 🎉
        </h2>
        <div className="flex gap-4">
          <div className="bg-green-50 text-green-700 px-6 py-4 rounded-xl text-center">
            <p className="text-2xl font-bold">{stats.known}</p>
            <p className="text-sm">Known</p>
          </div>
          <div className="bg-amber-50 text-amber-700 px-6 py-4 rounded-xl text-center">
            <p className="text-2xl font-bold">{stats.fuzzy}</p>
            <p className="text-sm">Fuzzy</p>
          </div>
          <div className="bg-red-50 text-red-700 px-6 py-4 rounded-xl text-center">
            <p className="text-2xl font-bold">{stats.learning}</p>
            <p className="text-sm">Learning</p>
          </div>
        </div>
        <button
          onClick={handleNextSession}
          className="px-6 py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors"
        >
          Next session →
        </button>
      </div>
    );
  }
  if (userWords.length === 0 || !currentWord) {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <p className="text-2xl">📚</p>
      <h2 className="text-xl font-bold text-purple-600">No words yet</h2>
      <p className="text-gray-400 text-sm">Add some words to start practicing.</p>
    </div>
  );
}
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      {/* Progress */}
      <ProgressBar knownWidth={knownWidth} learningWidth={learningWidth} stats={stats} cardsCount={cardsCount} />

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
        <div className="bg-[#AFA9EC] w-full h-full rounded-3xl absolute top-1 left-1 opacity-60" />
        <div className="bg-[#CECBF6] w-full h-full rounded-3xl absolute top-2 left-2 opacity-50" />
        <div
          className={`relative w-full h-full transition-transform duration-700 ${
            isFlipped ? "rotate-y-180" : ""
          } [transform-style:preserve-3d]`}
        >
          <div className="absolute w-full h-full [backface-visibility:hidden] flex items-center justify-center flex-col bg-[#534AB7] rounded-3xl">
            <h2 className={`text-white text-4xl ${archivoBlack.className}`}>
              {currentWord?.word}
            </h2>
            <span className="text-[#AFA9EC] flex items-center text-sm mt-4">
              <TbClick className="mr-2" />
              Click to reveal
            </span>
          </div>
          <div className="absolute w-full h-full rotate-y-180 [backface-visibility:hidden] flex items-center justify-center flex-col bg-[#534AB7] rounded-3xl gap-2">
            <span
              className={`text-[#AFA9EC] text-xs uppercase ${roboto.className}`}
            >
              Definition
            </span>
            <h2 className={`text-white text-xl ${roboto.className}`}>
              {currentWord?.translation}
            </h2>
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
