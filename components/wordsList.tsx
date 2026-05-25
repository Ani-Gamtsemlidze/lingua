"use client";
import EditWord from "./editWord";
import { Word } from "@/types/words";
import HighlightText from "./higlightText";
import { useState } from "react";

export default function WordsList({
  words,
  query,
}: {
  words: Word[];
  query: string;
}) {
  const [expandedNote, setExpandedNote] = useState<number | null>(null);

  if (words.length === 0) {
    return (
      <div className="text-center py-20 px-4">
        <div className="max-w-sm mx-auto">
          <div className="w-16 h-16 bg-slate-800/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">📚</span>
          </div>
          <p className="text-base font-medium text-slate-100 mb-2">
            {query ? "No matches found" : "No words yet"}
          </p>
          <p className="text-sm text-slate-300">
            {query
              ? "Try a different search term"
              : "Start reading to build your vocabulary!"}
          </p>
        </div>
      </div>
    );
  }

  const statusConfig: Record<
    string,
    { label: string; badgeClass: string; dotColor: string; wordColor: string }
  > = {
    known: {
      label: "Known",
      badgeClass: "bg-emerald-500/20 text-emerald-200 border-emerald-400/30",
      dotColor: "bg-emerald-400",
      wordColor: "text-white",
    },
    learning: {
      label: "Learning",
      badgeClass: "bg-sky-500/20 text-sky-200 border-sky-400/30",
      dotColor: "bg-sky-400",
      wordColor: "text-white",
    },
    fuzzy: {
      label: "Fuzzy",
      badgeClass: "bg-orange-500/20 text-orange-200 border-orange-400/30",
      dotColor: "bg-orange-400",
      wordColor: "text-white",
    },
    new: {
      label: "New",
      badgeClass: "bg-fuchsia-500/20 text-fuchsia-200 border-fuchsia-400/30",
      dotColor: "bg-fuchsia-400",
      wordColor: "text-white",
    },
  };

  return (
    <div className="overflow-y-auto max-h-[600px]">
      <div className="hidden md:block">
        {words.map((word) => {
          const status = statusConfig[word.status] ?? {
            label: word.status,
            badgeClass: "bg-slate-500/20 text-slate-200 border-slate-400/30",
            dotColor: "bg-slate-400",
            wordColor: "text-slate-50",
          };

          const isExpanded = expandedNote === word.id;
          const hasLongNote = word.note && word.note.length > 60;

          return (
            <div
              key={word.id}
              className="grid grid-cols-[2fr_2fr_3fr_140px_60px] items-start gap-4 px-5 py-4 
                border-b border-slate-700/40 last:border-none 
                hover:bg-slate-800/50 transition-colors group"
            >
              <div
                className={`text-base font-semibold ${status.wordColor} pt-0.5`}
              >
                <HighlightText text={word.word ?? ""} query={query} />
              </div>

              <div
                className={`text-base ${status.wordColor} opacity-90 pt-0.5`}
              >
                <HighlightText text={word.translation ?? ""} query={query} />
              </div>

              <div className="text-sm text-slate-200">
                {word.note ? (
                  <div>
                    <div className={isExpanded ? "" : "line-clamp-2"}>
                      <HighlightText text={word.note} query={query} />
                    </div>
                    {hasLongNote && (
                      <button
                        onClick={() =>
                          setExpandedNote(isExpanded ? null : word.id)
                        }
                        className="text-xs text-violet-400 hover:text-violet-300 mt-1 transition-colors font-medium"
                      >
                        {isExpanded ? "Show less" : "Show more"}
                      </button>
                    )}
                  </div>
                ) : (
                  <span className="text-slate-500 italic">No note</span>
                )}
              </div>

              <div className="flex items-center gap-2 pt-0.5">
                <span
                  className={`w-2 h-2 rounded-full ${status.dotColor} flex-shrink-0`}
                />
                <span
                  className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium border ${status.badgeClass}`}
                >
                  {status.label}
                </span>
              </div>

              <div className="flex justify-end  transition-opacity pt-0.5">
                <EditWord wordData={word} wordId={word.id} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="md:hidden">
        {words.map((word) => {
          const status = statusConfig[word.status] ?? {
            label: word.status,
            badgeClass: "bg-slate-500/20 text-slate-200 border-slate-400/30",
            dotColor: "bg-slate-400",
            wordColor: "text-slate-50",
          };

          const isExpanded = expandedNote === word.id;

          return (
            <div
              key={word.id}
              className="px-4 py-4 border-b border-slate-700/40 last:border-none 
                hover:bg-slate-800/50 transition-colors"
            >
              <div className="flex items-start gap-3 mb-2">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-baseline gap-2">
                    <span
                      className={`text-base font-semibold ${status.wordColor}`}
                    >
                      <HighlightText text={word.word ?? ""} query={query} />
                    </span>
                    <span className="text-slate-400">→</span>
                    <span
                      className={`text-base ${status.wordColor} opacity-90`}
                    >
                      <HighlightText
                        text={word.translation ?? ""}
                        query={query}
                      />
                    </span>
                  </div>
                </div>
                <EditWord wordData={word} wordId={word.id} />
              </div>

              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${status.dotColor}`} />
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border ${status.badgeClass}`}
                >
                  {status.label}
                </span>
              </div>

              {word.note && (
                <div className="mt-3 pt-3 border-t border-slate-700/40">
                  <div
                    className={`text-sm text-slate-200 ${isExpanded ? "" : "line-clamp-2"}`}
                  >
                    <HighlightText text={word.note} query={query} />
                  </div>
                  {word.note.length > 100 && (
                    <button
                      onClick={() =>
                        setExpandedNote(isExpanded ? null : word.id)
                      }
                      className="text-xs text-violet-400 hover:text-violet-300 mt-1 transition-colors font-medium"
                    >
                      {isExpanded ? "Show less" : "Show more"}
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
