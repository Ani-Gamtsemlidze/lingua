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
  return (
    <div className="overflow-y-auto max-h-100">
      {words.map((word) => (
        <div
          key={word.id}
          className="grid grid-cols-4 px-4 py-3 border-b border-slate-200 hover:bg-slate-50"
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
