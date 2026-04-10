"use client";

import { addWord, updateWord } from "@/app/action";
import { Props } from "@/types/words";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import SubmitButton from "./submitButton";
import { text } from "stream/consumers";

export default function WordAddForm({ closeModal, showEdit, wordData, selectedWord, textEdit }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const { pending } = useFormStatus();

  async function handleSubmit(formData: FormData) {
    await updateWord(formData);
    closeModal();
  }

  async function handleAddWord(formData: FormData) {
    setIsLoading(true);
    await addWord(formData);
    setIsLoading(false);
    textEdit && closeModal();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-purple-950/40">
      <div className="w-full max-w-md rounded-3xl bg-fuchsia-50 border-2 border-purple-200 p-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-widest text-purple-300 mb-0.5">
              {showEdit ? "Edit word" : "New word"}
            </p>
            <h2 className="font-serif text-2xl font-bold text-purple-950">
              {showEdit ? wordData?.word : selectedWord || "Add to vocabulary"}
            </h2>
          </div>
          <button
            onClick={closeModal}
            className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-purple-200 text-purple-300 hover:border-violet-500 hover:text-violet-600 transition-colors cursor-pointer text-sm font-bold"
          >
            ✕
          </button>
        </div>

        <form action={showEdit ? handleSubmit : handleAddWord} className="flex flex-col gap-3">
          {showEdit && (
            <input type="hidden" name="wordId" value={wordData?.id} />
          )}

          <div className="flex flex-col gap-1">
            <label className="text-xs font-extrabold uppercase tracking-widest text-purple-300">
              Word
            </label>
            <input
              name="word"
              placeholder="Word"
              defaultValue={showEdit ? wordData?.word : textEdit ? selectedWord : undefined}
              className="w-full rounded-2xl border-2 border-purple-200 bg-white px-4 py-2.5 text-sm font-semibold text-purple-950 placeholder-purple-200 focus:outline-none focus:border-violet-500 transition"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-extrabold uppercase tracking-widest text-purple-300">
              Translation
            </label>
            <input
              name="translation"
              placeholder="Translation"
              defaultValue={showEdit ? wordData?.translation : undefined}
              className="w-full rounded-2xl border-2 border-purple-200 bg-white px-4 py-2.5 text-sm font-semibold text-purple-950 placeholder-purple-200 focus:outline-none focus:border-violet-500 transition"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-extrabold uppercase tracking-widest text-purple-300">
              Note <span className="normal-case tracking-normal font-semibold text-purple-200">(optional)</span>
            </label>
            <textarea
              name="note"
              placeholder="Explanation or example sentence..."
              defaultValue={showEdit ? wordData?.note : undefined}
              rows={3}
              className="w-full rounded-2xl border-2 border-purple-200 bg-white px-4 py-2.5 text-sm font-semibold text-purple-950 placeholder-purple-200 resize-none focus:outline-none focus:border-violet-500 transition"
            />
          </div>

          <SubmitButton showEdit={showEdit} />
        </form>
      </div>
    </div>
  );
}