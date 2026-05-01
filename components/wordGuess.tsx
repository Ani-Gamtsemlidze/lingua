"use client";
import { Archivo_Black, Roboto } from "next/font/google";
import { useWordGuess } from "./useWordGuess";
import { useEffect, useState } from "react";
import { Word } from "@/types/words";
import GuessProgressBar from "./guessProgressBar";
const archivoBlack = Archivo_Black({ weight: "400", subsets: ["latin"] });
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
    restart
  } = useWordGuess(data);
  const [clickedAnswer, setClickedAnswer] = useState<string | null>(null);

  function handleClick(word: string) {
    if (clickedAnswer) return;
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
  useEffect(() => {}, []);
  if (isComplete) {
    return (
      <div className="flex w-full h-full items-center justify-center">
        <p className="text-slate-600 text-lg font-medium">
          Session complete! 🎉
        </p>
        <button
          onClick={() => {
            restart()
          }}
          className=" bg-slate-800 cursor-pointer flex w-32 text-white p-2 text-sm rounded-xl items-center justify-center"
        >
          restart
        </button>
      </div>
    );
  }
  return (
    // <div>
    <div className="flex w-full h-full items-center justify-center">
      <div className="w-[480px] flex flex-col gap-4">
        <GuessProgressBar
          session={session}
          index={index}
          correct={correct}
          wrong={wrong}
        />
        {/* Card */}
        <div className="bg-slate-800 flex flex-col items-center justify-center px-10 py-10 rounded-2xl">
          <span
            className={`text-xs text-slate-500 uppercase tracking-widest ${roboto.className}`}
          >
            What is the word for
          </span>
          <div
            className={`   text-3xl text-slate-100 font-medium mt-3 tracking-tight ${roboto.className}`}
          >
            {/* to watch */}
            {currentWord.translation}
          </div>
        </div>

        {/* options */}
        <div className="gap-2 grid grid-cols-2">
          {options.map((word, index) => (
            <div
              key={index}
              onClick={() => handleClick(word)}
              className={`border py-3 px-3 rounded-xl cursor-pointer lowercase
                ${
                  clickedAnswer
                    ? word === currentWord.word
                      ? "bg-[#f0fdf4] border-[#86efac] text-[#15803d]"
                      : word === clickedAnswer
                        ? "bg-[#fef2f2] border-[#fca5a5] text-[#dc2626]"
                        : "bg-white border-[#e2e8f0]"
                    : "bg-white border-[#e2e8f0]"
                }
                `}
            >
              {/* bg-[#fef2f2] border-[#fca5a5] text-[#dc2626] */}
              {word}
            </div>
          ))}
        </div>
        {/* <div className="flex relative justify-between items-center">
          <button className="absolute top-0 left-0 cursor-pointer flex w-32 text-[#94a3b8] p-2 text-sm  ">
            skip →{" "}
          </button>
          {clickedAnswer && (
            <button
              onClick={() => {
                setClickedAnswer(null);
                next();
              }}
              className=" absolute top-0 right-0 bg-slate-800 cursor-pointer flex w-32 text-white p-2 text-sm rounded-xl items-center justify-center"
            >
              Next word →{" "}
            </button>
          )}
        </div> */}
      </div>
    </div>
    // </div>
  );
}
