import { Word } from "@/types/words";

type Props = {
  index: number;
  session: Word[];
  correct: number;
  wrong: number;
};
export default function GuessProgressBar({index, session, correct, wrong}: Props) {
  return (
    <>
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
          Word guess
        </p>
        <div className="flex gap-2">
          <span className="text-xs font-medium bg-green-50 text-green-700 border border-green-100 px-2.5 py-1 rounded-full">
            {correct} correct
          </span>
          <span className="text-xs font-medium bg-red-50 text-red-700 border border-red-100 px-2.5 py-1 rounded-full">
            {wrong} wrong
          </span>
          <span className="text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200 px-2.5 py-1 rounded-full">
            {session.length - index} left
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden mb-4">
        <div
          className="h-full bg-slate-800 rounded-full transition-all duration-500"
          style={{ width: `${(index / session.length) * 100}%` }}
        />
      </div>
    </>
  );
}
