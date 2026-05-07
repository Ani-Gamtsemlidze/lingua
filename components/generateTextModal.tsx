"use client";

import { useState } from "react";
import { GiSparkles, GiXylophone } from "react-icons/gi";
import { TiDeleteOutline } from "react-icons/ti";

type Props = {
  open: boolean;
  onClose: () => void;
  onGenerate: (level: string, topic: string) => void;
};

const LEVELS = [
  { value: "A1", label: "A1 — Beginner" },
  { value: "A2", label: "A2 — Elementary" },
  { value: "B1", label: "B1 — Intermediate" },
  { value: "B2", label: "B2 — Upper intermediate" },
];

export default function GenerateTextModal({
  open,
  onClose,
  onGenerate,
}: Props) {
  const [level, setLevel] = useState("A1");
  const [topic, setTopic] = useState("");

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-slate-900/50 flex items-end md:items-center justify-center z-50"
      onClick={() => {
        onClose();
        setTopic("");
        setLevel("A1");
      }}
    >
      <div
        className="w-full md:max-w-sm bg-white rounded-t-2xl md:rounded-xl border border-slate-200
          shadow-xl p-6 max-h-[85dvh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-10 h-1 bg-slate-200 rounded-full mx-auto mb-4 md:hidden" />

        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <GiSparkles className="w-4 h-4 text-slate-500" />
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                AI Generate
              </p>
            </div>
            <h2 className="text-xl font-semibold text-slate-800 tracking-tight">
              Generate a text
            </h2>
          </div>
          <button onClick={() => {
            onClose();
            setTopic("");
            setLevel("A1");
          }} className=" ">
            <TiDeleteOutline className="w-6 h-6 object-contain text-slate-700 hover:text-slate-600 cursor-pointer" />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Level
            </label>
            <div className="grid grid-cols-2 gap-2">
              {LEVELS.map((l) => (
                <button
                  key={l.value}
                  type="button"
                  onClick={() => setLevel(l.value)}
                  className={`px-3 py-2 rounded-lg border text-sm font-medium transition-colors cursor-pointer text-left
                    ${
                      level === l.value
                        ? "bg-slate-800 text-white border-slate-800"
                        : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                    }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Topic{" "}
              <span className="normal-case tracking-normal font-normal text-slate-300">
                (optional)
              </span>
            </label>
            <input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. travel, food, daily life…"
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800
                placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition"
            />
          </div>
          <div className="flex items-center justify-between pt-1">
            <button
              onClick={onClose}
              className="text-sm text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={() => onGenerate(level, topic)}
              className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 active:bg-slate-900
                transition-colors text-white text-sm font-medium px-5 py-2.5 rounded-lg cursor-pointer"
            >
              <GiSparkles className="w-3.5 h-3.5" />
              Generate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
