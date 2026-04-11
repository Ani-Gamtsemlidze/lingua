"use client";

import { useState } from "react";
import WordAddForm from "./wordAddForm";
import { FaRegEdit } from "react-icons/fa";
import { HiCheck } from "react-icons/hi";
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
  }[];
  userText: {
    id: number;
    title: string;
    content: string;
  };
}) {
  console.log(userText, "user text")
  const [showWordAddForm, setShowWordAddForm] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedWord, setSelectedWord] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);

  const handleClick = (token: string) => {
    const cleanWord = token.replace(/[^\p{L}\p{N}']/gu, "");
    setSelectedWord(cleanWord);
  };
  const found = matchWords.find(w => w.word === selectedWord);
  // if (!found || found.id == null) return null;

  return (
    <div className=" bg-fuchsia-50 px-6 py-10">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-widest text-purple-300 mb-1">
              Reader
            </p>
            <h1 className="font-serif text-3xl font-bold text-purple-950">
              {userText.title}
            </h1>
          </div>

          {/* Edit toggle */}
          <button
            onClick={() => setIsEditMode(!isEditMode)}
            className={`mt-1 flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest px-4 py-2 rounded-full border-2 transition-colors cursor-pointer ${
              isEditMode
                ? "bg-violet-600 text-white border-violet-600"
                : "bg-white text-purple-400 border-purple-200 hover:border-violet-400 hover:text-violet-600"
            }`}
          >
            {isEditMode ? (
              <>
                <HiCheck className="w-3.5 h-3.5" /> Done
              </>
            ) : (
              <>
                <FaRegEdit className="w-3.5 h-3.5" /> Edit
              </>
            )}
          </button>
        </div>

        {/* Modals */}
        {showWordAddForm && (
          <WordAddForm
            selectedWord={selectedWord}
            textEdit={showWordAddForm}
            closeModal={() => setShowWordAddForm(false)}
          />
        )}
        {showEdit && (
          <WordAddForm
            wordData={found}
            closeModal={() => setShowEdit(false)}
            showEdit={showEdit}
          />
        )}

        {/* Edit mode — textarea */}
        {isEditMode ? (
          <form action={updateText} className="flex flex-col gap-4">
            <input type="hidden" name="textId" value={userText.id} />
            <textarea
              name="content"
              rows={12}
              defaultValue={userText.content}
              className="w-full rounded-2xl border-2 border-purple-200 bg-white px-4 py-3 text-sm font-semibold text-purple-950 placeholder-purple-200 leading-relaxed resize-none focus:outline-none focus:border-violet-500 transition"
            />
            <button
              type="submit"
              className="self-start inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 transition-colors text-white text-sm font-bold px-6 py-2.5 rounded-full cursor-pointer"
            >
              Save changes
            </button>
          </form>
        ) : (
          <>
            {/* Hint */}
            <p className="text-xs font-bold text-purple-300 uppercase tracking-widest mb-4">
              Tap a word to save it
            </p>

            {/* Text reader */}
            <div className="bg-white rounded-3xl border-2 border-purple-100 px-6 py-6 leading-8 text-base text-purple-950 font-semibold">
              {matchWords.map((t, i) => (
                <span
                  key={i}
                  className={`relative group cursor-pointer rounded-md px-0.5 transition-colors ${
                    t.translation
                      ? "text-violet-600 underline decoration-dotted decoration-violet-300 underline-offset-4"
                      : "hover:bg-purple-100 hover:text-violet-700"
                  }`}
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
                  {t.translation && (
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex items-center whitespace-nowrap bg-violet-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md pointer-events-none z-10">
                      {t.translation}
                    </span>
                  )}
                </span>
              ))}
            </div>

            {/* Saved words count */}
            {matchWords.some((w) => w.translation) && (
              <p className="mt-4 text-xs font-extrabold uppercase tracking-widest text-purple-300">
                {matchWords.filter((w) => w.translation).length} word
                {matchWords.filter((w) => w.translation).length !== 1 ? "s" : ""} saved
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}