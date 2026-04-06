"use client";
import { saveText } from "@/app/action";

export default function Reader({
  textData: initialText,
}: {
  textData: string;
}) {
  return (
    <div>
      {/* {initialText ? (
        <div className="mb-4 p-4 rounded">{initialText}</div>
      ) : ( */}
        <form action={saveText} className="flex flex-col gap-3">
          <input
            name="title"
            placeholder="Enter title..."
            className="w-80 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition"
          />
          <textarea
            rows={8}
            name="content"
            // onChange={(e) => setText(e.target.value)}
            placeholder="Paste a paragraph, article, or any text in your target language..."
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 placeholder-gray-400 leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition"
          />
          <button type="submit" className="cursor-pointer">
            {" "}
            {initialText ? null : "Save"}
          </button>
        </form>
      {/* )} */}
    </div>
  );
}
