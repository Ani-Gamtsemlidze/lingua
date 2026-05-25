import { ProgressBarProps } from "@/types/words";

export default function ProgressBar({
  knownWidth,
  learningWidth,
  stats,
  cardsCount,
}: ProgressBarProps) {
  return (
    <div className="w-full max-w-[460px]">
      <div className="flex justify-between text-xs mb-2">
        <span className="inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-200 text-xs font-semibold px-2.5 py-1 rounded-full border border-emerald-400/30">
          {stats.known} learned
        </span>
        <span className="inline-flex items-center gap-1 bg-slate-800/60 text-slate-300 text-xs font-semibold px-2.5 py-1 rounded-full border border-slate-700">
          {cardsCount} cards
        </span>
        <span className="inline-flex items-center gap-1 bg-orange-500/20 text-orange-200 text-xs font-semibold px-2.5 py-1 rounded-full border border-orange-400/30">
          {stats.learning + stats.fuzzy} learning
        </span>
      </div>
      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden flex border border-slate-700">
        <div
          className="h-full bg-emerald-500 transition-all duration-500"
          style={{ width: `${knownWidth}%` }}
        />
        <div
          className="h-full bg-orange-500 transition-all duration-500"
          style={{ width: `${learningWidth}%` }}
        />
      </div>
    </div>
  );
}