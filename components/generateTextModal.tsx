"use client";

import { useState } from "react";
import { HiSparkles, HiX } from "react-icons/hi";

type Props = {
  open: boolean;
  onClose: () => void;
  onGenerate: (level: string, topic: string) => void;
  isLoading: boolean;
};

const LEVELS = [
  { value: "A1", label: "A1 — Beginner" },
  { value: "A2", label: "A2 — Elementary" },
  { value: "B1", label: "B1 — Intermediate" },
  { value: "B2", label: "B2 — Upper Intermediate" },
];

export default function GenerateTextModal({
  open,
  onClose,
  onGenerate,
  isLoading,
}: Props) {
  const [level, setLevel] = useState("A1");
  const [topic, setTopic] = useState("");

  const handleClose = () => {
    onClose();
    setTopic("");
    setLevel("A1");
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end md:items-center justify-center z-50"
      onClick={handleClose}
    >
      <div
        className="w-full md:max-w-lg bg-slate-800 border border-slate-700 rounded-t-2xl md:rounded-2xl
          shadow-2xl p-6 max-h-[85dvh] overflow-y-auto "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <HiSparkles className="w-5 h-5 text-violet-400" />
              <p className="text-xs font-semibold uppercase tracking-wider text-violet-400">
                AI Generate
              </p>
            </div>
            <h2 className="text-2xl font-bold text-white">Generate a Text</h2>
            <p className="text-sm text-slate-400 mt-1">
              Create a custom reading text at your level
            </p>
          </div>
          <button
            onClick={handleClose}
            className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg 
              text-slate-400 hover:text-white hover:bg-slate-700 transition-all ml-3"
            aria-label="Close"
          >
            <HiX className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-3">
              Language Level
            </label>
            <div className="grid grid-cols-2 gap-2">
              {LEVELS.map((l) => (
                <button
                  key={l.value}
                  type="button"
                  onClick={() => setLevel(l.value)}
                  className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all cursor-pointer
                    ${
                      level === l.value
                        ? "bg-violet-600 text-white border-violet-600 shadow-lg shadow-violet-500/20"
                        : "bg-slate-900/50 text-slate-300 border-slate-600 hover:border-slate-500 hover:bg-slate-900"
                    }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-3">
              Topic{" "}
              <span className="font-normal text-slate-500">(optional)</span>
            </label>
            <input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. travel, food, daily routines…"
              className="w-full rounded-xl border border-slate-600 bg-slate-900/50 px-4 py-3 text-sm text-white
                placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 
                focus:border-violet-500/50 transition-all"
            />
            <p className="text-xs text-slate-500 mt-2">
              💡 Leave blank for a random topic
            </p>
          </div>

          <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <button
              onClick={handleClose}
              disabled={isLoading}
              className="flex-1 px-5 py-3 rounded-xl bg-slate-700/50 hover:bg-slate-700 
                border border-slate-600 text-slate-300 hover:text-white text-sm font-medium 
                transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              onClick={() => onGenerate(level, topic)}
              disabled={isLoading}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 
                active:bg-violet-800 text-white text-sm font-medium px-5 py-3 rounded-xl transition-all
                hover:shadow-lg hover:shadow-violet-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <svg
                    className="w-4 h-4 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    />
                  </svg>
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <HiSparkles className="w-4 h-4" />
                  <span>Generate Text</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
