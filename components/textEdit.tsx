"use client";

import { useState } from "react";
import WordAddForm from "./wordAddForm";

export default function TextEdit({ tokens }: { tokens: any }) {
    const [showWordAddForm, setShowWordAddForm] = useState(false);
    const [selectedWord, setSelectedWord] = useState("");
  const handleClick = (token: string) => {
    const cleanWord = token.replace(/[^\p{L}\p{N}']/gu, "");
    setSelectedWord(cleanWord);
  };

  return (
    <div>
      {showWordAddForm && (
        <WordAddForm
          selectedWord={selectedWord}
          textEdit={showWordAddForm}
          closeModal={() => setShowWordAddForm(false)}
        />
      )}
      {tokens.map((token: string, index: number) => (
        <span
          onClick={() => {
            handleClick(token);
            setShowWordAddForm(true);
          }}
          key={index}
          className="text-gray-800 cursor-pointer hover:text-blue-500"
        >
          {token}
        </span>
      ))}
    </div>
  );
}
