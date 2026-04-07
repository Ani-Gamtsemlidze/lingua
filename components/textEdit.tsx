"use client";

import { useState } from "react";
import WordAddForm from "./wordAddForm";

export default function TextEdit({
  matchWords,
}: {
  matchWords: { token: string; word?: string; note?: string; translation?: string; id?: number }[];
}) {
  const [showWordAddForm, setShowWordAddForm] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
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
          // showEdit={showEdit}
        />
      )}
      {showEdit && (
        <WordAddForm
          wordData={matchWords.find((w: any) => w.word === selectedWord)}
          closeModal={() => setShowEdit(false)}
          showEdit={showEdit}
        />
      )}
      {matchWords.map((t, i) => (
          <span
            key={i}
            className={`cursor-pointer ${t.translation ? "text-green-600" : ""} relative group cursor-pointer`}
            onClick={() => {
              if (!t.translation) {
                handleClick(t.token);
                setShowWordAddForm(true);
              } else {
                setShowEdit(true)
                setSelectedWord(t.word as string);
              }
            }}
          >
            {t.token}
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 hidden group-hover:block text-sm bg-gray-200 p-1 rounded shadow">
              {t.translation ? ` (${t.translation})` : ""}
            </span>
          </span>
      ))}
    </div>
  );
}
