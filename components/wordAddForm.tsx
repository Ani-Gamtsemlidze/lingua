"use client";

import { addWord } from "@/app/action";

type Props = {
  closeModal: () => void;
};

export default function WordAddForm({ closeModal }: Props) {
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

        <form action={addWord} className="space-y-4">
          <input
            name="word"
            placeholder="Word"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-indigo-500"
          />

          <input
            name="translation"
            placeholder="Translation"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-indigo-500"
          />
          <textarea
            name="note"
            id=""
            placeholder="Explanation (optional)"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-indigo-500"
          />

          <button
            type="submit"
            className="w-full rounded-lg bg-indigo-600 py-2 text-white font-medium hover:bg-indigo-700 transition"
          >
            Save Word
          </button>
        </form>
      </div>
    </div>
  );
}
