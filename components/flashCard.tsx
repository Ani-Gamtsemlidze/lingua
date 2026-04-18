"use client";

import { useEffect, useRef, useState } from "react";
import { TbClick } from "react-icons/tb";
import { Archivo_Black, Roboto } from "next/font/google";
import CardButtons from "./cardButtons";
import { Word } from "@/types/words";
import { updateFailCount, updateWordStatus } from "@/app/action";

const archivoBlack = Archivo_Black({ weight: "400", subsets: ["latin"] });
const roboto = Roboto({ weight: "400", subsets: ["latin"] });

export default function FlashCard({ userWords }: { userWords: Word[] }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [queue, setQueue] = useState<Word[]>([]);
  const [offset, setOffset] = useState(0);
  const [sessionTotal, setSessionTotal] = useState(0);
  const [stats, setStats] = useState({ known: 0, learning: 0, fuzzy: 0 });

  const sessionFailMap = useRef<Record<number, number>>({});
  const sessionFuzzyMap = useRef<Record<number, number>>({});

  const currentWord = queue[0];

  // -----------------------------
  // RULE ENGINE
  // -----------------------------
  const isAllowed = (word: Word) => {
    const fail = sessionFailMap.current[word.id] || 0;
    const fuzzy = sessionFuzzyMap.current[word.id] || 0;
    return fail < 2 && fuzzy < 2;
  };

  const clean = (arr: Word[]) => arr.filter(isAllowed);

  // -----------------------------
  // BUILD SESSION
  // -----------------------------
  useEffect(() => {
    const activeWords = userWords.filter((w) => w.status !== "known");

    const rotated = [
      ...activeWords.slice(offset),
      ...activeWords.slice(0, offset),
    ];

    const session = rotated
      .sort((a, b) => {
        if (a.status === "learning" && b.status !== "learning") return -1;
        if (a.status === "fuzzy" && b.status === "new") return -1;
        return b.fail_count - a.fail_count;
      })
      .slice(0, 10);

    setQueue(session); // ✅ no clean on build
    setSessionTotal(session.length);
    setIsFlipped(false);
  }, [userWords, offset]);


  useEffect(() => {
    if (queue.length === 0 && userWords.length > 0) {
      setOffset((prev) => (prev + 10) % userWords.length);
    }
  }, [queue, userWords]);

  const handleDontKnow = () => {
    if (!currentWord) return;
    setIsFlipped(false);

    setTimeout(() => {
      const id = currentWord.id;
      sessionFailMap.current[id] = (sessionFailMap.current[id] || 0) + 1;
      updateFailCount(id);
      updateWordStatus("learning", id);
      setStats((prev) => ({ ...prev, learning: prev.learning + 1 }));

      let newQueue = queue.slice(1);
      if (sessionFailMap.current[id] < 3) {
        newQueue.splice(Math.min(2, newQueue.length), 0, currentWord);
      }
      setQueue(clean(newQueue));
    }, 350);
  };

  const handleFuzzy = () => {
    if (!currentWord) return;
    setIsFlipped(false);

    setTimeout(() => {
      const id = currentWord.id;
      sessionFuzzyMap.current[id] = (sessionFuzzyMap.current[id] || 0) + 1;
      updateWordStatus("fuzzy", id);
      setStats((prev) => ({ ...prev, fuzzy: prev.fuzzy + 1 }));

      let newQueue = queue.slice(1);
      if (sessionFuzzyMap.current[id] < 2) {
        newQueue.push(currentWord);
      }
      setQueue(clean(newQueue));
    }, 350);
  };

  const handleKnowIt = () => {
    if (!currentWord) return;
    setIsFlipped(false);

    setTimeout(() => {
      updateWordStatus("known", currentWord.id);
      setStats((prev) => ({ ...prev, known: prev.known + 1 }));
      const newQueue = queue.slice(1);
      setQueue(clean(newQueue));
    }, 350);
  };

  // -----------------------------
  // PROGRESS
  // -----------------------------
  const progress = sessionTotal > 0
    ? Math.round(((sessionTotal - queue.length) / sessionTotal) * 100)
    : 0;

  const uniqueCount = new Set(queue.map((w) => w.id)).size;
  const reviewCount = queue.length - uniqueCount;

  if (!currentWord) {
    return (
      <div className="flex flex-col items-center gap-6">
        <h2 className="text-2xl font-bold text-white">Session complete! 🎉</h2>
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
          onClick={() => {
            setStats({ known: 0, learning: 0, fuzzy: 0 });
            sessionFailMap.current = {};
            sessionFuzzyMap.current = {};
            setOffset((prev) => (prev + 10) % userWords.length);
          }}
          className="px-6 py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors"
        >
          Next session →
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-6">

      {/* Progress */}
      <div className="w-[460px]">
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>{uniqueCount} words {reviewCount > 0 ? `· ${reviewCount} reviews` : ""}</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full h-1.5 bg-purple-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-purple-600 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Card */}
      <div
        className="relative w-[460px] h-[260px] [perspective:1000px] cursor-pointer"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className="bg-[#AFA9EC] w-full h-full rounded-3xl absolute top-1 left-1 opacity-60" />
        <div className="bg-[#CECBF6] w-full h-full rounded-3xl absolute top-2 left-2 opacity-50" />

        <div
          className={`relative w-full h-full transition-transform duration-700 ${
            isFlipped ? "rotate-y-180" : ""
          } [transform-style:preserve-3d]`}
        >
          {/* Front */}
          <div className="absolute w-full h-full [backface-visibility:hidden] flex items-center justify-center flex-col bg-[#534AB7] rounded-3xl">
            <h2 className={`text-white text-4xl ${archivoBlack.className}`}>
              {currentWord.word}
            </h2>
            <span className="text-[#AFA9EC] flex items-center text-sm mt-4">
              <TbClick className="mr-2" />
              Click to reveal
            </span>
          </div>

          {/* Back */}
          <div className="absolute w-full h-full rotate-y-180 [backface-visibility:hidden] flex items-center justify-center flex-col bg-[#534AB7] rounded-3xl gap-2">
            <span className={`text-[#AFA9EC] text-xs uppercase ${roboto.className}`}>
              Definition
            </span>
            <h2 className={`text-white text-xl ${roboto.className}`}>
              {currentWord.translation}
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