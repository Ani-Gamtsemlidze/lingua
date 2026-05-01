import { Word } from "@/types/words";
import { useEffect, useState } from "react";

export function useWordGuess(userWords: Word[]) {
  const SESSION_SIZE = 10;

  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [options, setOptions] = useState<string[]>([]);
  const [session, setSession] = useState<Word[]>([]);
  const [usedWordIds, setUsedWordIds] = useState<Set<string>>(new Set());

  const currentWord = session[index];
  const isComplete = index >= session.length;

  // simple shuffle (better than sort random)
  function shuffle<T>(arr: T[]) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  // generate session without repeating recent words
  function getSession(words: Word[], size: number) {
    let pool = words.filter((w) => !usedWordIds.has(w.id));

    // if not enough words → reset memory
    if (pool.length < size) {
      pool = words;
      setUsedWordIds(new Set());
    }

    return shuffle(pool).slice(0, size);
  }

  // create new session
  useEffect(() => {
    if (!userWords.length) return;

    const newSession = getSession(userWords, SESSION_SIZE);
    setSession(newSession);
    setIndex(0);

    // remember used words
    setUsedWordIds((prev) => {
      const next = new Set(prev);
      newSession.forEach((w) => next.add(w.id));
      return next;
    });
  }, [userWords]);

  // generate options for current word
  useEffect(() => {
    if (!currentWord) return;

    const wrongAnswers = shuffle(
      userWords.filter((w) => w.id !== currentWord.id)
    )
      .slice(0, 3)
      .map((w) => w.word);

    const finalOptions = shuffle([
      currentWord.word,
      ...wrongAnswers,
    ]);

    setOptions(finalOptions);
  }, [currentWord, userWords]);

  const handleCorrect = () => setCorrect((c) => c + 1);
  const handleWrong = () => setWrong((w) => w + 1);

  const next = () => setIndex((i) => i + 1);

  const restart = () => {
    setIndex(0);
    setCorrect(0);
    setWrong(0);

    // 🔥 generate a fresh session on restart
    const newSession = getSession(userWords, SESSION_SIZE);
    setSession(newSession);

    setUsedWordIds((prev) => {
      const next = new Set(prev);
      newSession.forEach((w) => next.add(w.id));
      return next;
    });
  };

  return {
    session,
    currentWord,
    options,
    next,
    index,
    isComplete,
    correct,
    wrong,
    handleCorrect,
    handleWrong,
    restart,
  };
}