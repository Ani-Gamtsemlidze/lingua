"use client";

import { addWord, updateWord } from "@/app/action";
import { Props } from "@/types/words";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import SubmitButton from "./submitButton";

export default function WordAddForm({ closeModal, showEdit, wordData }: Props) {
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
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Add New Word</h2>
          <button
            onClick={closeModal}
            className="text-slate-500 hover:text-slate-800 cursor-pointer"
          >
            ✕
          </button>
        </div>

        <form
          action={showEdit ? handleSubmit : handleAddWord}
          className="space-y-4"
        >
          {showEdit && (
            <input type="hidden" name="wordId" value={wordData?.id} />
          )}
          <input
            name="word"
            placeholder="Word"
            defaultValue={showEdit ? wordData?.word : undefined}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-indigo-500"
          />

          <input
            name="translation"
            placeholder="Translation"
            defaultValue={showEdit ? wordData?.translation : undefined}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-indigo-500"
          />
          <textarea
            name="note"
            id=""
            placeholder="Explanation (optional)"
            defaultValue={showEdit ? wordData?.note : undefined}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-indigo-500"
          />
          {/* {showEdit ? (
            <button
              type="submit"
              disabled={pending}
              className=" disabled:opacity-50 w-full rounded-lg bg-indigo-600 py-2 text-white font-medium hover:bg-indigo-700 transition"
            >
              update word
            </button>
          ) : ( */}
            <SubmitButton showEdit={showEdit} />
          {/* )} */}
        </form>
      </div>
    </div>
  );
}
