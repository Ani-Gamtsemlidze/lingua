import { useEffect, useRef, useState } from "react";
import { Word } from "@/types/words";
import { updateFailCount, updateWordStatus } from "@/app/action";

export function useFlashCard(userWords: Word[]) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [queue, setQueue] = useState<Word[]>([]);
  const [offset, setOffset] = useState(0);
  const [stats, setStats] = useState({ known: 0, learning: 0, fuzzy: 0 });
  const [isComplete, setIsComplete] = useState(false);
  const [cardKey, setCardKey] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [exitDirection, setExitDirection] = useState<
    "left" | "right" | "up" | null
  >(null);
  const [cardsAnswered, setCardsAnswered] = useState(0);

  // SESSION_SIZE is now only a cap for large word sets, not a minimum
  const SESSION_SIZE = 10;

  const sessionFailMap = useRef<Record<number, number>>({});
  const sessionFuzzyMap = useRef<Record<number, number>>({});
  const currentWord = queue[0];

  // cardsCount reflects actual queue size, not a fixed 10
  const sessionSize = Math.min(
    SESSION_SIZE,
    userWords.filter((w) => w.status !== "known").length,
  );
  let cardsCount = sessionSize - cardsAnswered;

  useEffect(() => {
    if (isComplete) return;
    setCardsAnswered(0);

    const activeWords = userWords.filter((w) => w.status !== "known");
    const rotated = [
      ...activeWords.slice(offset),
      ...activeWords.slice(0, offset),
    ];

    const sorted = rotated.sort((a, b) => {
      if (a.status === "learning" && b.status !== "learning") return -1;
      if (a.status === "fuzzy" && b.status === "new") return -1;
      return b.fail_count - a.fail_count;
    });

    // Cap at SESSION_SIZE for large lists, but don't pad small ones
    const session = sorted.slice(0, SESSION_SIZE);

    setQueue(session);
    setIsFlipped(false);
  }, [userWords, offset, isComplete]);

  // Session ends when the queue is genuinely empty, not when a count hits 10
  const finishOrContinue = (newQueue: Word[]) => {
    setCardsAnswered((prev) => prev + 1);

    if (cardsAnswered + 1 >= sessionSize) {
      setIsComplete(true);
    } else {
      setQueue(newQueue);
    }
  };

  const nextCard = (callback: () => void) => {
    setIsExiting(true);
    setTimeout(() => {
      setIsFlipped(false);
      callback();
      setCardKey((prev) => prev + 1);
      setIsExiting(false);
      setExitDirection(null);
    }, 350);
  };

  const handleDontKnow = () => {
    if (!currentWord) return;
    setExitDirection("left");
    nextCard(() => {
      const id = currentWord.id;
      sessionFailMap.current[id] = (sessionFailMap.current[id] || 0) + 1;
      updateFailCount(id);
      updateWordStatus("learning", id);
      setStats((prev) => ({ ...prev, learning: prev.learning + 1 }));
      let newQueue = queue.slice(1);
      // Re-insert if seen fewer than 3 times this session
      if (sessionFailMap.current[id] < 3) {
        newQueue.splice(Math.min(2, newQueue.length), 0, currentWord);
      }
      finishOrContinue(newQueue);
    });
  };

  const handleFuzzy = () => {
    if (!currentWord) return;
    setExitDirection("left");
    nextCard(() => {
      const id = currentWord.id;
      sessionFuzzyMap.current[id] = (sessionFuzzyMap.current[id] || 0) + 1;
      updateWordStatus("fuzzy", id);
      setStats((prev) => ({ ...prev, fuzzy: prev.fuzzy + 1 }));
      let newQueue = queue.slice(1);
      // Re-queue once more if only seen once as fuzzy
      if (sessionFuzzyMap.current[id] < 2) {
        newQueue.push(currentWord);
      }
      finishOrContinue(newQueue);
    });
  };

  const handleKnowIt = () => {
    if (!currentWord) return;
    setExitDirection("right");
    nextCard(() => {
      updateWordStatus("known", currentWord.id);
      setStats((prev) => ({ ...prev, known: prev.known + 1 }));
      // Word is known — remove permanently, don't re-queue
      finishOrContinue(queue.slice(1));
    });
  };

 const handleNextSession = () => {
  setStats({ known: 0, learning: 0, fuzzy: 0 });
  setCardsAnswered(0);
  sessionFailMap.current = {};
  sessionFuzzyMap.current = {};
  setIsComplete(false);
  setCardKey(0);
  setIsFlipped(false);
  setQueue([]);
  const activeWords = userWords.filter((w) => w.status !== "known");

  const activeCount = activeWords.length;

  const newOffset =
    activeCount <= SESSION_SIZE ? 0 : (offset + SESSION_SIZE) % activeCount;

  setOffset(newOffset);
};

 const knownWidth = (stats.known / sessionSize) * 100;

const learningWidth =
  ((stats.learning + stats.fuzzy) / sessionSize) * 100;


  return {
    isFlipped,
    setIsFlipped,
    currentWord,
    stats,
    isComplete,
    cardKey,
    isExiting,
    knownWidth,
    learningWidth,
    exitDirection,
    handleDontKnow,
    handleFuzzy,
    handleKnowIt,
    handleNextSession,
    cardsCount,
  };
}
