import { ProgressBarProps } from "@/types/words";

export default function ProgressBar({ knownWidth, learningWidth, stats, cardsCount }: ProgressBarProps) {

  return (
    <div className="w-[460px]">
      <div className="flex justify-between text-xs mb-2">
        <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full">{stats.known} learned</span>
 <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-600 text-xs font-semibold px-2.5 py-1 rounded-full">
    {cardsCount} cards
  </span>        <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-700 text-xs font-semibold px-2.5 py-1 rounded-full">{stats.learning + stats.fuzzy} learning</span>
      </div>
      <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden flex">
        <div
          className="h-full bg-green-500 transition-all duration-500"
          style={{ width: `${knownWidth}%` }}
        />
        <div
          className="h-full bg-red-400 transition-all duration-500"
          style={{ width: `${learningWidth}%` }}
        />
      </div>
    </div>
  );
}