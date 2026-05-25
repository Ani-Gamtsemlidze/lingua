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
  aiTranslation,
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
    <>
      <div
        onClick={closeModal}
        className="fixed inset-0 z-50 flex items-end md:items-center md:justify-center bg-slate-950/80 backdrop-blur-sm"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-full max-h-[85dvh] overflow-y-auto
            bg-slate-900 border border-slate-700 shadow-2xl p-6
            rounded-t-2xl md:rounded-xl md:max-w-md"
        >
          <div className="w-10 h-1 bg-slate-700 rounded-full mx-auto mb-4 md:hidden" />

          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-0.5">
                {showEdit ? "Edit word" : "New word"}
              </p>
              <h2 className="text-xl font-semibold text-slate-50 tracking-tight">
                {showEdit
                  ? wordData?.word
                  : selectedWord || "Add to vocabulary"}
              </h2>
            </div>
            <button
              onClick={closeModal}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-600
                text-slate-400 hover:border-slate-500 hover:text-slate-200 transition-colors cursor-pointer text-sm"
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
              <label className="text-xs font-semibold uppercase tracking-widest text-slate-300">
                Word
              </label>
              <input
                name="word"
                placeholder="Word"
                defaultValue={
                  showEdit
                    ? wordData?.word
                    : textEdit
                      ? selectedWord
                      : aiTranslation
                }
                className="w-full font-bold rounded-lg border border-slate-600 bg-slate-800/50 px-4 py-2.5 text-sm text-purple-300
                  placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent 
                  transition-all hover:border-slate-500"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-widest text-slate-300">
                Translation
              </label>
              <input
                name="translation"
                placeholder="Translation"
                defaultValue={showEdit ? wordData?.translation : aiTranslation}
                className="w-full rounded-lg border border-slate-600 bg-slate-800/50 px-4 py-2.5 text-sm text-slate-100
                  placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent 
                  transition-all hover:border-slate-500"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-widest text-slate-300">
                Note{" "}
                <span className="normal-case tracking-normal font-normal text-slate-400">
                  (optional)
                </span>
              </label>
              <textarea
                name="note"
                placeholder="Explanation or example sentence…"
                defaultValue={showEdit ? wordData?.note : undefined}
                rows={3}
                className="w-full rounded-lg border border-slate-600 bg-slate-800/50 px-4 py-2.5 text-sm text-slate-100
                  placeholder-slate-500 resize-none focus:outline-none focus:ring-2 focus:ring-violet-500 
                  focus:border-transparent transition-all hover:border-slate-500"
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <SubmitButton showEdit={showEdit} />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
