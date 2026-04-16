"use client";
import { useEffect, useState } from "react";
import { TbClick } from "react-icons/tb";
import { Archivo_Black } from "next/font/google";
import { Roboto } from "next/font/google";
import CardButtons from "./cardButtons";
import { Word } from "@/types/words";
const archivoBlack = Archivo_Black({ weight: "400", subsets: ["latin"] });
const roboto = Roboto({ weight: "400", subsets: ["latin"] });

export default function FlashCard({
  userWords,
}: {
  userWords: Word[];
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [queue, setQueue] = useState(userWords);
  const [currentCard, setCurrentCard] = useState(0);

  const currentWord = queue[currentCard];

  useEffect(() => {
    setQueue([...userWords].sort(() => Math.random() - 0.5));
  }, []);

  const nextCard = () => {
    setIsFlipped(false);
  };

  const handleDontKnow = () => {
    const newQueue = [...queue];
    setTimeout(() => {
      const word = newQueue.splice(currentCard, 1)[0];
      newQueue.splice(currentCard + 3, 0, word);
      setQueue(newQueue);
    }, 350);
    nextCard();
  };

  const handleFuzzy = () => {
    const newQueue = [...queue];
    setTimeout(() => {
      const word = newQueue.splice(currentCard, 1)[0];
      newQueue.push(word);
      setQueue(newQueue);
    }, 350);
    nextCard();
  };

  const handleKnowIt = () => {
    const newQueue = [...queue];
    newQueue.splice(currentCard, 1);
    setQueue(newQueue);
    setIsFlipped(false);
  };

  return (
    <div className="flex items-center flex-col justify-center">
      <div className="flex mb-3.5 "> {queue.length} cards left</div>

      <div
        className="relative w-[460px] h-[260px] [perspective:1000px] bg-transparent  flip-card flex cursor-pointer"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className="bg-[#AFA9EC] w-full h-full rounded-3xl absolute top-1 left-1 opacity-[0.6]"></div>
        <div className="bg-[#CECBF6] w-full h-full rounded-3xl absolute top-2 left-2 opacity-[0.5]"></div>
        <div
          className={`relative [transform-style:preserve-3d] transition-transform duration-[800ms] rounded-3xl ${isFlipped ? "rotate-y-180" : ""}  text-center justify-center w-full h-full  bg-[#3C3489]`}
        >
          <div className=" [backface-visibility:hidden] flash-card absolute w-full h-full justify-center items-center flex flex-col">
            <h2 className={`text-white text-4xl ${archivoBlack.className}`}>
              {currentWord?.word}
            </h2>
            <span className="flex items-center text-sm text-[#AFA9EC]">
              <span className="mr-2">
                <TbClick />
              </span>
              Click to reveal
            </span>
            {/* <p className="text-gray-300">{definition}</p> */}
          </div>
          <div className="absolute w-full h-full [backface-visibility:hidden] flex-col rotate-y-180 justify-center items-center flex">
            <span
              className={`text-[#AFA9EC] text-[12px] uppercase ${roboto.className}`}
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
