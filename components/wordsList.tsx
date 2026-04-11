"use client";
import EditWord from "./editWord";
import { Word } from "@/types/words";
import HighlightText from "./higlightText";

export default function WordsList({
  words,
  query,
}: {
  words: Word[];
  query: string;
}) {
  if (words.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-sm font-extrabold text-purple-200">
          {query ? "No words match your search." : "No words yet. Start reading!"}
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-y-auto max-h-[520px]">
      {words.map((word) => (
        <div
          key={word.id}
          className="grid grid-cols-4 items-center px-5 py-3.5 border-b-2 border-dashed border-purple-100 last:border-none hover:bg-fuchsia-50 transition-colors gap-4"
        >
          <HighlightText text={word.word ?? ""} query={query} />
          <HighlightText text={word.translation ?? ""} query={query} />
          <HighlightText text={word.note ?? ""} query={query} />
          <EditWord wordData={word} wordId={word.id} />
        </div>
      ))}
    </div>
  );
}