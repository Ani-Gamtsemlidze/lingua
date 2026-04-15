"use client";
import { useState } from "react";
import { TbClick } from "react-icons/tb";
import { Archivo_Black } from "next/font/google";
import { Roboto } from "next/font/google";
const archivoBlack = Archivo_Black({ weight: "400", subsets: ["latin"] });
const roboto = Roboto({ weight: "400", subsets: ["latin"] });

export default function FlashCard({
  word,
  definition,
}: {
  word: string;
  definition: string;
}) {
  const [isFlipped, setIsFlipped] = useState(true);
  return (
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
            {word}
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
            {definition}
          </h2>
        </div>
      </div>
    </div>
  );
}
