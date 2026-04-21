import { ProgressBarProps } from "@/types/words";

export default function ProgressBar({ knownWidth, learningWidth, stats, cardsCount}: ProgressBarProps) {
    return (
        <div className="w-full">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-green-600">{stats.known} known</span>
          <span className="text-purple-500">
            {stats.learning + stats.fuzzy} learning
          </span>
          <span className="text-gray-400">{cardsCount} cards left</span>
        </div>
        <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden flex">
          <div
            className="h-full bg-green-500 transition-all duration-500"
            style={{ width: `${knownWidth}%` }}
          />
          <div
            className="h-full bg-purple-500 transition-all duration-500"
            style={{ width: `${learningWidth}%` }}
          />
        </div>
      </div>
    )
}