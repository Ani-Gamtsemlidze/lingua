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
  const [exitDirection, setExitDirection] = useState<'left' | 'right' | 'up' | null>(null);
  const [cardsAnswered, setCardsAnswered] = useState(0);

  const SESSION_SIZE = 10;

  const sessionFailMap = useRef<Record<number, number>>({});
  const sessionFuzzyMap = useRef<Record<number, number>>({});

  const currentWord = queue[0];

  let cardsCount = SESSION_SIZE - cardsAnswered;

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

    const base = sorted.slice(0, SESSION_SIZE);
    const session =
      base.length > 0 && base.length < SESSION_SIZE
        ? Array.from({ length: SESSION_SIZE }, (_, i) => base[i % base.length])
        : base;

    setQueue(session);
    setIsFlipped(false);
  }, [userWords, offset, isComplete]);

  const finishOrContinue = (newQueue: Word[]) => {
    const next = cardsAnswered + 1;
    setCardsAnswered(next);
    if (next >= SESSION_SIZE) {
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
    setExitDirection('left');
    nextCard(() => {
      const id = currentWord.id;
      sessionFailMap.current[id] = (sessionFailMap.current[id] || 0) + 1;
      updateFailCount(id);
      updateWordStatus("learning", id);
      setStats((prev) => ({ ...prev, learning: prev.learning + 1 }));
      let newQueue = queue.slice(1);
      if (sessionFailMap.current[id] < 3) {
        newQueue.splice(Math.min(2, newQueue.length), 0, currentWord);
      }
      finishOrContinue(newQueue);
    });
  };

  const handleFuzzy = () => {
    if (!currentWord) return;
    setExitDirection('left');
    nextCard(() => {
      const id = currentWord.id;
      sessionFuzzyMap.current[id] = (sessionFuzzyMap.current[id] || 0) + 1;
      updateWordStatus("fuzzy", id);
      setStats((prev) => ({ ...prev, fuzzy: prev.fuzzy + 1 }));
      let newQueue = queue.slice(1);
      if (sessionFuzzyMap.current[id] < 2) {
        newQueue.push(currentWord);
      }
      finishOrContinue(newQueue);
    });
  };

  const handleKnowIt = () => {
    if (!currentWord) return;
    setExitDirection('right');
    nextCard(() => {
      updateWordStatus("known", currentWord.id);
      setStats((prev) => ({ ...prev, known: prev.known + 1 }));
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
    setOffset((prev) => (prev + SESSION_SIZE) % userWords.length);
  };

  const uniqueLearning = Object.keys(sessionFailMap.current).length;
  const uniqueFuzzy = Object.keys(sessionFuzzyMap.current).length;
  const knownWidth = (stats.known / SESSION_SIZE) * 100;
  const learningWidth = Math.max(
    0,
    Math.min(
      ((uniqueLearning + uniqueFuzzy) / SESSION_SIZE) * 100,
      100 - knownWidth,
    ),
  );

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
    cardsCount
  };
}