"use client";

import { useState } from "react";
import WordAddForm from "./wordAddForm";
import { FaRegEdit } from "react-icons/fa";
import { updateText } from "@/app/action";

export default function TextEdit({
  matchWords,
  userText,
}: {
  matchWords: {
    token: string;
    word?: string;
    note?: string;
    translation?: string;
    id?: number;
  }[],
  userText: {
    id: number;
    title: string;
    content: string;
  }
}) {
  const [showWordAddForm, setShowWordAddForm] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedWord, setSelectedWord] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const handleClick = (token: string) => {
    const cleanWord = token.replace(/[^\p{L}\p{N}']/gu, "");
    setSelectedWord(cleanWord);
  };
  return (
    <div>
      <div
        onClick={() => setIsEditMode(!isEditMode)}
        className="flex justify-end cursor-pointer"
      >
        <FaRegEdit />
      </div>

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
      {isEditMode ? (
        <form action={updateText} className="space-y-4">
          <input type="hidden" name="textId" value={userText.id} />
          <textarea
            name="content"
            rows={8}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 placeholder-gray-400 leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition"
            defaultValue={userText.content}
          ></textarea>
          <button type="submit">Update</button>
        </form>
      ) : (
        <div className="mt-4">
          {matchWords.map((t, i) => (
            <span
              key={i}
              className={`cursor-pointer ${t.translation ? "text-green-600" : ""} relative group cursor-pointer`}
              onClick={() => {
                if (!t.translation) {
                  handleClick(t.token);
                  setShowWordAddForm(true);
                } else {
                  setShowEdit(true);
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
      )}
    </div>
  );
}
