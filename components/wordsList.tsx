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
        <p className="text-sm text-slate-400">
          {query ? "No words match your search." : "No words yet. Start reading!"}
        </p>
      </div>
    );
  }

  const statusConfig: Record<string, { label: string; className: string }> = {
    known:    { label: "nailed it", className: "bg-green-50 text-green-700 border-green-200" },
    learning: { label: "learning",  className: "bg-blue-50 text-blue-700 border-blue-200" },
    fuzzy:    { label: "fuzzy",     className: "bg-amber-50 text-amber-700 border-amber-200" },
    new:      { label: "new",       className: "bg-slate-100 text-slate-600 border-slate-200" },
  };

  return (
    <div className="overflow-y-auto max-h-[420px]">

      {/* Desktop table */}
      <div className="hidden md:block">
        {words.map((word) => {
          const status = statusConfig[word.status] ?? {
            label: word.status,
            className: "bg-slate-100 text-slate-500 border-slate-200",
          };
          return (
            <div
              key={word.id}
              className="grid grid-cols-5 items-center px-5 py-3.5 border-b border-slate-100 last:border-none hover:bg-slate-50 transition-colors gap-5"
            >
              <HighlightText text={word.word ?? ""} query={query} />
              <HighlightText text={word.translation ?? ""} query={query} />
              <HighlightText text={word.note ?? ""} query={query} />
              <span className={`inline-flex w-fit items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${status.className}`}>
                {status.label}
              </span>
              <EditWord wordData={word} wordId={word.id} />
            </div>
          );
        })}
      </div>

      {/* Mobile cards */}
      <div className="md:hidden flex flex-col divide-y divide-slate-100">
        {words.map((word) => {
          const status = statusConfig[word.status] ?? {
            label: word.status,
            className: "bg-slate-100 text-slate-500 border-slate-200",
          };
          return (
            <div key={word.id} className="flex items-start justify-between px-4 py-3.5 hover:bg-slate-50 transition-colors gap-3">
              <div className="flex flex-col gap-1 min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-sm font-medium text-slate-800 break-words">{word.word}</p>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border shrink-0 ${status.className}`}>
                    {status.label}
                  </span>
                </div>
                <p className="text-xs text-slate-500 break-words">{word.translation}</p>
                {word.note && (
                  <p className="text-xs text-slate-400 break-words">{word.note}</p>
                )}
              </div>
              <div className="shrink-0">
                <EditWord wordData={word} wordId={word.id} />
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}