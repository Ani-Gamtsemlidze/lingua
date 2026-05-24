import { ReaderPanelProps } from "@/types/text";
import { HiSparkles } from "react-icons/hi";

export default function ReaderPanel({
  savedCount,
  activeWord,
  totalWords,
  handleMouseUp,
  matchWords,
  setActiveWord,
  setAiTranslation,
  setNote,
  handleWordClick,
  setPanelMode,
  loadingTranslation,
}: ReaderPanelProps) {
  return (
    <div className="bg-slate-900 border-r border-slate-700/40 flex flex-col min-h-[500px]">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-5 py-4 border-b border-slate-700/40 bg-slate-800/50">
        <div className="flex items-center gap-2">
          <HiSparkles className="w-4 h-4 text-violet-400 flex-shrink-0" />
          <p className="text-sm font-medium text-slate-300">
            Tap any word to save and learn
          </p>
        </div>
        <div className="flex items-center gap-3">
          {savedCount > 0 && (
            <div className="h-2 bg-slate-800 rounded-full w-28 overflow-hidden border border-slate-700/50">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min(100, (savedCount / totalWords) * 100)}%`,
                }}
              />
            </div>
          )}
          <span className="text-sm font-semibold text-slate-300 tabular-nums">
            {savedCount}<span className="text-slate-600">/</span>{totalWords}
          </span>
        </div>
      </div>

      <div
        onMouseUp={handleMouseUp}
        onTouchEnd={handleMouseUp}
        className="flex-1 bg-slate-900 px-6  sm:px-8 py-8 leading-[2.2] text-[15px] text-slate-200 
          overflow-y-auto overflow-x-hidden selection:bg-violet-500/30"
      >
        {matchWords.map((t, i) => (
          t.isEmpty ? (
            <span key={i}>{t.token}</span>
          ) : (
          <span
            key={i}
            className={`relative group rounded-md px-1 py-0.5 transition-all duration-200 ${
              t.isPhrase
                  ? "text-blue-400 underline decoration-dotted decoration-blue-500/50 decoration-2 underline-offset-4 hover:bg-blue-500/15 hover:decoration-blue-400 cursor-pointer"
                  : t.translation
                    ? "text-emerald-400 underline decoration-dotted decoration-emerald-500/50 decoration-2 underline-offset-4 hover:bg-emerald-500/15 hover:decoration-emerald-400 cursor-pointer"
                    : activeWord === t.token.replace(/[^\p{L}\p{N}']/gu, "")
                      ? "bg-violet-500/25 text-violet-200 cursor-pointer ring-2 ring-violet-500/40 shadow-lg shadow-violet-500/10"
                      : "hover:bg-slate-800/60 hover:text-white cursor-pointer"
            }`}
            onClick={() => {
              if (t.isPhrase || t.translation) {
                setActiveWord(t.word as string);
                setAiTranslation(t.translation ?? "");
                setNote(t.note ?? "");
                setPanelMode("saved");
                return;
              }
              if (loadingTranslation) return;
              handleWordClick(t.token);
              setPanelMode("new");
            }}
          >
            {t.token}
          </span>
        )))}
      </div>
    </div>
  );
}