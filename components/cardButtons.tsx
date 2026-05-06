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
        className="flex-1 flex flex-col items-center gap-1 py-3 rounded-xl border border-red-100 bg-red-50
          text-red-700 hover:bg-red-100 active:bg-red-200 transition-colors cursor-pointer"
      >
        <BiX className="w-4 h-4 text-red-400" />
        <span className="font-medium text-xs md:text-sm">Don't know</span>
        <span className="text-xs text-red-400 hidden md:block">review again</span>
      </button>

      <button
        onClick={onFuzzy}
        className="flex-1 flex flex-col items-center gap-1 py-3 rounded-xl border border-amber-100 bg-amber-50
          text-amber-700 hover:bg-amber-100 active:bg-amber-200 transition-colors cursor-pointer"
      >
        <BiMinus className="w-4 h-4 text-amber-400" />
        <span className="font-medium text-xs md:text-sm">Fuzzy</span>
        <span className="text-xs text-amber-400 hidden md:block">almost got it</span>
      </button>

      <button
        onClick={onKnowIt}
        className="flex-1 flex flex-col items-center gap-1 py-3 rounded-xl border border-green-100 bg-green-50
          text-green-700 hover:bg-green-100 active:bg-green-200 transition-colors cursor-pointer"
      >
        <BiCheck className="w-4 h-4 text-green-400" />
        <span className="font-medium text-xs md:text-sm">Know it</span>
        <span className="text-xs text-green-400 hidden md:block">got it!</span>
      </button>

    </div>
  );
}