import Link from "next/link";
import { BsLayers } from "react-icons/bs";

export default function Study() {
  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-10">
      <div className="max-w-xl mx-auto">

        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">
          Study
        </p>
        <h1 className="text-2xl font-semibold text-slate-800 tracking-tight mb-6">
          Choose a mode
        </h1>

        <div className="flex flex-col gap-3">
          <Link
            href="/study/flashcards"
            className="flex items-center gap-4 bg-white border border-slate-200 rounded-xl px-5 py-4
              hover:border-slate-300 hover:shadow-sm transition-all group"
          >
            <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center shrink-0
              group-hover:bg-slate-200 transition-colors">
              <BsLayers className="w-5 h-5 text-slate-500" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-700">Flashcards</p>
              <p className="text-xs text-slate-400 mt-0.5">Review your saved words with spaced repetition</p>
            </div>
            <span className="ml-auto text-slate-300 group-hover:text-slate-400 transition-colors">→</span>
          </Link>
        </div>

      </div>
    </div>
  );
}