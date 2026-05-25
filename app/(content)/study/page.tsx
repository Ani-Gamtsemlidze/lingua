import Link from "next/link";
import { BsLayers } from "react-icons/bs";
import { PiKeyboardLight } from "react-icons/pi";

export default function Study() {
  return (
    <div className="min-h-screen bg-slate-950 px-4 md:px-6 py-6 nav:py-10 flex items-center justify-center">
      <div className="max-w-xl w-full">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-2">
            Study
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-50 tracking-tight">
            Choose a mode
          </h1>
          <p className="text-sm text-slate-300 mt-2">
            Pick a study method to practice your vocabulary
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Link
            href="/study/flashcards"
            className="flex items-center gap-4 bg-slate-900/60 border border-slate-700 rounded-2xl px-5 py-4
              hover:border-slate-600 hover:bg-slate-800/60 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-violet-500/15 border border-violet-400/20 flex items-center justify-center shrink-0
              group-hover:bg-violet-500/25 transition-colors">
              <BsLayers className="w-5 h-5 text-violet-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-100">Flashcards</p>
              <p className="text-xs text-slate-400 mt-0.5">Review your saved words with spaced repetition</p>
            </div>
            <span className="ml-auto text-slate-600 group-hover:text-slate-400 transition-colors">→</span>
          </Link>

          <Link
            href="/study/word-guess"
            className="flex items-center gap-4 bg-slate-900/60 border border-slate-700 rounded-2xl px-5 py-4
              hover:border-slate-600 hover:bg-slate-800/60 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-violet-500/15 border border-violet-400/20 flex items-center justify-center shrink-0
              group-hover:bg-violet-500/25 transition-colors">
              <PiKeyboardLight className="w-5 h-5 text-violet-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-100">Word Guess</p>
              <p className="text-xs text-slate-400 mt-0.5">Type the translation from memory to test recall</p>
            </div>
            <span className="ml-auto text-slate-600 group-hover:text-slate-400 transition-colors">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}