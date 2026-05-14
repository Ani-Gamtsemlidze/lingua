import { MdOutlineMenuBook } from "react-icons/md";
import { Logo } from "./logo";
import { GiSparkles } from "react-icons/gi";

export default function AuthPanel({ title }: { title?: string }) {
  return (
    <div className="hidden lg:flex w-1/2 bg-slate-800 flex-col justify-between p-12">
      <Logo />

      <div className="flex flex-col gap-8">
        <div>
          <p className="text-xl text-slate-300 leading-relaxed italic mb-3">
            {title}
          </p>
          <p className="text-xs text-slate-600">
            Read in your target language. Save words. Remember them.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-slate-700 flex items-center justify-center flex-shrink-0">
              <div className=" flex items-center justify-center">
                <MdOutlineMenuBook className="text-sm w-full h-full text-slate-50" />
              </div>
            </div>
            <span className="text-sm text-slate-400 font-medium">
              Paste any text and read in your target language
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-slate-700 flex items-center justify-center flex-shrink-0">
              <div className=" flex items-center justify-center">
                <MdOutlineMenuBook className="text-sm w-full h-full text-slate-50" />
              </div>
            </div>
            <span className="text-sm text-slate-400 font-medium">
              Tap unknown words to save them instantly
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-slate-700 flex items-center justify-center flex-shrink-0">
              <div className=" flex items-center justify-center">
                <MdOutlineMenuBook className="text-sm w-full h-full text-slate-50" />
              </div>
            </div>
            <span className="text-sm text-slate-400 font-medium">
              Study with flashcards and quizzes
            </span>
          </div>

          <div className="flex flex-col gap-2 mt-1 bg-slate-800 rounded-xl px-4 py-3 border border-slate-700">
            <div className="flex items-center gap-2">
              <GiSparkles className="w-4 h-4 text-indigo-400 flex-shrink-0" />
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">
                AI-powered
              </span>
            </div>
            <div className="flex flex-col gap-1.5 pl-1">
              <p className="text-sm text-indigo-300 font-semibold">
                ✦ Generate reading texts by topic and level
              </p>
              <p className="text-sm text-indigo-300 font-semibold">
                ✦ Instant word translations as you read
              </p>
            </div>
          </div>
        </div>
      </div>

      <p className="text-xs text-slate-600">© 2026 Lingua</p>
    </div>
  );
}
