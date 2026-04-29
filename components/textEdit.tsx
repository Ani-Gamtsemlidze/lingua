"use client";

import { useState } from "react";
import WordAddForm from "./wordAddForm";
import { updateText } from "@/app/action";
import { BiCheck, BiPencil } from "react-icons/bi";

export default function TextEdit({
  matchWords,
  userText,
  textLanguage
}: {
  matchWords: {
    token: string;
    word?: string;
    note?: string;
    translation?: string;
    id?: number;
    isEmpty?: boolean;
  }[];
  userText: {
    id: number;
    title: string;
    content: string;
  };
  textLanguage: string
}) {
  const [showWordAddForm, setShowWordAddForm] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedWord, setSelectedWord] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);

  const handleClick = (token: string) => {
    const cleanWord = token.replace(/[^\p{L}\p{N}']/gu, "");
    setSelectedWord(cleanWord);
  };

  const found = matchWords.find((w) => w.word === selectedWord);
  const savedCount = matchWords.filter((w) => w.translation).length;
  const totalWords = matchWords.filter((w) => !w.isEmpty).length;

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">
              Reader
            </p>
            <h1 className="text-2xl font-semibold text-slate-800 tracking-tight">
              {userText.title}
            </h1>
            {savedCount > 0 && (
              <p className="mt-1.5 text-xs text-slate-400 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400 inline-block" />
                {savedCount} of {totalWords} words saved
              </p>
            )}
          </div>

          {/* Edit toggle */}
          <button
            onClick={() => setIsEditMode(!isEditMode)}
            className={`mt-1 flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg border transition-all cursor-pointer
              ${isEditMode
                ? "bg-slate-800 text-white border-slate-800"
                : "bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:text-slate-700"
              }`}
          >
            {isEditMode ? (
              <><BiCheck className="w-3.5 h-3.5" /> Done</>
            ) : (
              <><BiPencil className="w-3.5 h-3.5" /> Edit</>
            )}
          </button>
        </div>

        {/* Modals */}
        {showWordAddForm && (
          <WordAddForm
            selectedWord={selectedWord}
            textEdit={showWordAddForm}
            closeModal={() => setShowWordAddForm(false)}
            textLanguage={textLanguage} 
          />
        )}
        {showEdit && (
          <WordAddForm
            wordData={found}
            closeModal={() => setShowEdit(false)}
            showEdit={showEdit}
          />
        )}

        {/* Edit mode */}
        {isEditMode ? (
          <form action={updateText} className="flex flex-col gap-4">
            <input type="hidden" name="textId" value={userText.id} />
            <textarea
              name="content"
              rows={12}
              defaultValue={userText.content.replace(/\n/g, " ").replace(/\s+/g, " ").trim()}
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800
                leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition"
            />
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setIsEditMode(false)}
                className="text-sm text-slate-400 hover:text-slate-600 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 active:bg-slate-900
                  transition-colors text-white text-sm font-medium px-5 py-2.5 rounded-lg cursor-pointer"
              >
                Save changes
              </button>
            </div>
          </form>
        ) : (
          <>
            {/* Hint + language tag */}
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-medium text-slate-400">
                Tap a word to save it
              </p>
            </div>

            {/* Text reader */}
            <div className="max-h-[420px] overflow-y-scroll rounded-xl border border-slate-200">

            <div className="bg-white px-5 pt-10 pb-5 leading-8 text-sm text-slate-700  rounded-xl">
              {matchWords.map((t, i) => (
                <span
                  key={i}
                  className={`relative group cursor-pointer rounded px-0.5 transition-colors ${
                    t.isEmpty
                      ? "pointer-events-none"
                      : t.translation
                        ? "text-green-700 underline decoration-dotted decoration-green-400 underline-offset-4 hover:bg-green-50"
                        : "hover:bg-slate-100 hover:text-slate-900"
                  }`}
                  onClick={() => {
                    if (t.isEmpty) return;
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
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex
                      items-center whitespace-nowrap bg-slate-800 text-white text-xs font-medium
                      px-3 py-1.5 rounded-lg shadow-sm pointer-events-none z-10">
                      {t.translation}
                    </span>
                  )}
                </span>
              ))}
            </div>
            </div>

            {/* Progress bar */}
            {savedCount > 0 && (
              <div className="mt-4 flex items-center gap-3">
                <div className="h-1.5 bg-slate-200 rounded-full flex-1 overflow-hidden">
                  <div
                    className="h-full bg-green-500 rounded-full transition-all"
                    style={{ width: `${Math.min(100, (savedCount / totalWords) * 100)}%` }}
                  />
                </div>
                <span className="text-xs text-slate-400 shrink-0">
                  {savedCount} / {totalWords}
                </span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}