"use client";
import { saveText } from "@/app/action";

export default function Reader({
  textData: initialText,
}: {
  textData: string;
}) {
  return (
    <div className="min-h-screen bg-fuchsia-50 px-6 py-10">
      <div className="max-w-xl">

        {/* Header */}
        <p className="text-xs font-extrabold uppercase tracking-widest text-purple-300 mb-1">
          Reader
        </p>
        <h1 className=" text-4xl font-bold text-purple-950 mb-1">
          Add a Text
        </h1>
        <p className="text-sm text-purple-400 font-semibold mb-8">
          Paste any text in your target language and start reading.
        </p>

        <form action={saveText} className="flex flex-col gap-4">
          {/* Title input */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-extrabold uppercase tracking-widest text-purple-300">
              Title
            </label>
            <input
              name="title"
              placeholder="e.g. The Little Prince — Chapter 1"
              className="w-full rounded-2xl border-2 border-purple-200 bg-white px-4 py-3 text-sm font-semibold text-purple-950 placeholder-purple-200 focus:outline-none focus:border-violet-500 transition"
            />
          </div>

          {/* Content textarea */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-extrabold uppercase tracking-widest text-purple-300">
              Text
            </label>
            <textarea
              rows={10}
              name="content"
              placeholder="Paste a paragraph, article, or any text in your target language..."
              className="w-full rounded-2xl border-2 border-purple-200 bg-white px-4 py-3 text-sm font-semibold text-purple-950 placeholder-purple-200 leading-relaxed resize-none focus:outline-none focus:border-violet-500 transition"
            />
          </div>

          {/* Submit */}
          {!initialText && (
            <button
              type="submit"
              className="self-start inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 transition-colors text-white text-sm font-bold px-6 py-2.5 rounded-full cursor-pointer"
            >
              Save text
            </button>
          )}
        </form>
      </div>
    </div>
  );
}