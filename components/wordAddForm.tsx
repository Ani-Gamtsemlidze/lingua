"use client";

import { addWord, updateWord } from "@/app/action";
import { Props } from "@/types/words";
import SubmitButton from "./submitButton";
import { toast } from "sonner";

export default function WordAddForm({
  closeModal,
  showEdit,
  wordData,
  selectedWord,
  textEdit,
  textLanguage,
}: Props) {
  async function handleSubmit(formData: FormData) {
    await updateWord(formData);
    closeModal();
  }

  async function handleAddWord(formData: FormData) {
    const res = await addWord(formData);
    if (res?.error) {
      toast.error(res.error);
      return;
    }
    textEdit && closeModal();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50">
      <div className="w-full max-w-md rounded-xl bg-white border border-slate-200 shadow-xl p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-0.5">
              {showEdit ? "Edit word" : "New word"}
            </p>
            <h2 className="text-xl font-semibold text-slate-800 tracking-tight">
              {showEdit ? wordData?.word : selectedWord || "Add to vocabulary"}
            </h2>
          </div>
          <button
            onClick={closeModal}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200
              text-slate-400 hover:border-slate-300 hover:text-slate-600 transition-colors cursor-pointer text-sm"
          >
            ✕
          </button>
        </div>

        <form
          action={showEdit ? handleSubmit : handleAddWord}
          className="flex flex-col gap-4"
        >
          {showEdit && (
            <input type="hidden" name="wordId" value={wordData?.id} />
          )}
          {textLanguage && (
            <input type="hidden" name="language" value={textLanguage} />
          )}

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Word
            </label>
            <input
              name="word"
              placeholder="Word"
              defaultValue={
                showEdit ? wordData?.word : textEdit ? selectedWord : undefined
              }
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800
                placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Translation
            </label>
            <input
              name="translation"
              placeholder="Translation"
              defaultValue={showEdit ? wordData?.translation : undefined}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800
                placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Note{" "}
              <span className="normal-case tracking-normal font-normal text-slate-300">
                (optional)
              </span>
            </label>
            <textarea
              name="note"
              placeholder="Explanation or example sentence…"
              defaultValue={showEdit ? wordData?.note : undefined}
              rows={3}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800
                placeholder-slate-300 resize-none focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition"
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <SubmitButton showEdit={showEdit} />
          </div>
        </form>
      </div>
    </div>
  );
}
