import { BiCheck, BiMinus, BiX } from "react-icons/bi";

export default function CardButtons({
  onFuzzy,
  onDontKnow,
  onKnowIt,
}: {
  isFlipped: boolean;
  onDontKnow: () => void;
  onFuzzy: () => void;
  onKnowIt: () => void;
}) {
  return (
    <div className="flex gap-2 md:gap-3 w-full max-w-[460px]">

      <button
        onClick={onDontKnow}
        className="flex-1 flex flex-col items-center gap-1 py-3 rounded-xl border-2 border-red-400/30 bg-red-500/15
          text-red-200 hover:bg-red-500/25 hover:border-red-400/40 active:bg-red-500/30 transition-all cursor-pointer"
      >
        <BiX className="w-4 h-4 text-red-300" />
        <span className="font-medium text-xs md:text-sm">Don't know</span>
        <span className="text-xs text-red-300/80 hidden md:block">review again</span>
      </button>

      <button
        onClick={onFuzzy}
        className="flex-1 flex flex-col items-center gap-1 py-3 rounded-xl border-2 border-orange-400/30 bg-orange-500/15
          text-orange-200 hover:bg-orange-500/25 hover:border-orange-400/40 active:bg-orange-500/30 transition-all cursor-pointer"
      >
        <BiMinus className="w-4 h-4 text-orange-300" />
        <span className="font-medium text-xs md:text-sm">Fuzzy</span>
        <span className="text-xs text-orange-300/80 hidden md:block">almost got it</span>
      </button>

      <button
        onClick={onKnowIt}
        className="flex-1 flex flex-col items-center gap-1 py-3 rounded-xl border-2 border-emerald-400/30 bg-emerald-500/15
          text-emerald-200 hover:bg-emerald-500/25 hover:border-emerald-400/40 active:bg-emerald-500/30 transition-all cursor-pointer"
      >
        <BiCheck className="w-4 h-4 text-emerald-300" />
        <span className="font-medium text-xs md:text-sm">Know it</span>
        <span className="text-xs text-emerald-300/80 hidden md:block">got it!</span>
      </button>

    </div>
  );
}