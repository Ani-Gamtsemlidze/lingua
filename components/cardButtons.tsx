export default function CardButtons({isFlipped, onFuzzy, onDontKnow, onKnowIt}: {isFlipped: boolean; onDontKnow: () => void; onFuzzy: () => void; onKnowIt: () => void }) {
  return (
    <div
        className={`flex gap-3 transition-opacity duration-300 mt-8 ${
          isFlipped ? "opacity-100" : "opacity-30 pointer-events-none"
        }`}
      >
        <button onClick={onDontKnow}  className="flex flex-col items-center gap-1 px-8 py-3 rounded-xl border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 transition-colors cursor-pointer">
          <span className="font-medium text-sm">Don't know</span>
          <span className="text-xs text-red-400">review again</span>
        </button>
        <button onClick={onFuzzy} className="flex flex-col items-center gap-1 px-8 py-3 rounded-xl border border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100 transition-colors cursor-pointer">
          <span className="font-medium text-sm">Fuzzy</span>
          <span className="text-xs text-amber-400">almost got it</span>
        </button>
        <button onClick={onKnowIt} className="flex flex-col items-center gap-1 px-8 py-3 rounded-xl border border-green-200 bg-green-50 text-green-700 hover:bg-green-100 transition-colors cursor-pointer">
          <span className="font-medium text-sm">Know it</span>
          <span className="text-xs text-green-400">got it!</span>
        </button>
      </div>

  );
}