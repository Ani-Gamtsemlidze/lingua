import { Word } from "@/types/words";
import { AiOutlineQuestion } from "react-icons/ai";
import { FaQuestion } from "react-icons/fa";
import { IoMdDoneAll } from "react-icons/io";
import { MdOutlineRemoveDone } from "react-icons/md";

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
    <div className={`flex gap-3 transition-opacity duration-300 mt-8 `}>
      <button
        onClick={onDontKnow}
        className="flex flex-col items-center gap-1 px-8 py-3 rounded-xl border border-red-200 bg-red-100 text-red-700 hover:bg-red-100 transition-colors cursor-pointer"
      >
        <MdOutlineRemoveDone />
        <span className="font-medium text-sm">Don't know</span>
        <span className="text-xs text-red-400">review again</span>
      </button>
      <button
        onClick={onFuzzy}
        className="flex flex-col items-center gap-1 px-8 py-3 rounded-xl border border-amber-200 bg-amber-100 text-amber-700 hover:bg-amber-100 transition-colors cursor-pointer"
      >
        <AiOutlineQuestion />
        <span className="font-medium text-sm">Fuzzy</span>
        <span className="text-xs text-amber-400">almost got it</span>
      </button>
      <button
        onClick={onKnowIt}
        className="flex flex-col items-center gap-1 px-8 py-3 rounded-xl border border-green-200 bg-green-100 text-green-700 hover:bg-green-100 transition-colors cursor-pointer"
      >
        <IoMdDoneAll />
        <span className="font-medium text-sm">Know it</span>
        <span className="text-xs text-green-400">got it!</span>
      </button>
    </div>
  );
}
