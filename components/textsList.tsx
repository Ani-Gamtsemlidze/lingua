"use client";
import { deleteText } from "@/app/action";
import { textData } from "@/types/text";
import Link from "next/link";
import { HiPlus, HiX } from "react-icons/hi";

export default function TextsList({ textData }: { textData: textData[] }) {
  return (
    <div className="h-full bg-fuchsia-50 px-6 py-10">
      <div className="max-w-xl">

        {/* Header */}
        <p className="text-xs font-extrabold uppercase tracking-widest text-purple-300 mb-1">
          Reader
        </p>
        <h1 className="font-serif text-4xl font-bold text-purple-950 mb-1">
          Your Texts
        </h1>
        <p className="text-sm text-purple-400 font-semibold mb-8">
          Read, discover, and save new words.
        </p>

        {/* Add button */}
        <Link
          href="/reader/new"
          className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 transition-colors text-white text-sm font-bold px-5 py-2.5 rounded-full mb-8"
        >
          <HiPlus className="w-4 h-4" />
          Add text
        </Link>

        {/* List */}
        {textData.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-2xl bg-violet-100 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-extrabold text-violet-300">?</span>
            </div>
            <p className="text-sm font-bold text-purple-300">No texts yet. Add your first one!</p>
          </div>
        ) : (
          <ul className="flex flex-col">
            {textData.map((text, index) => (
              <li
                key={index}
                className="flex items-center gap-3 py-3 border-b-2 border-dashed border-purple-200 last:border-none"
              >
                {/* Chip */}
                <div className="w-9 h-9 rounded-xl bg-violet-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-extrabold text-white">
                    {text.title.charAt(0).toUpperCase()}
                  </span>
                </div>

                {/* Title */}
                <Link
                  href={`/reader/${text.id}`}
                  className="flex-1 text-sm font-bold text-purple-950 hover:text-violet-600 transition-colors truncate"
                >
                  {text.title}
                </Link>

                {/* Delete */}
                <button
                  onClick={() => deleteText(text?.id)}
                  aria-label="Delete text"
                  className="text-purple-300 hover:text-violet-600 transition-colors"
                >
                  <HiX className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}