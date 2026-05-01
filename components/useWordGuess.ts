import { Word } from "@/types/words";
import { useEffect, useState } from "react";
import { Filter } from "./quizFilter";

export function useWordGuess(userWords: Word[]) {
  const SESSION_SIZE = 10;

  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [options, setOptions] = useState<string[]>([]);
  const [session, setSession] = useState<Word[]>([]);
  const [filter, setFilter] = useState<
   Filter | null
  >(null);

  const hasStarted = filter !== null;

  const isComplete = session.length > 0 && index >= session.length;
  const currentWord = session[index];

  function shuffle<T>(arr: T[]): T[] {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function getFilteredWords(words: Word[], f: string): Word[] {
    if (f === "all") return words;
    if (f === "learning")
      return words.filter(
        (w) => w.status === "learning" || w.status === "fuzzy",
      );
    return words.filter((w) => w.status === f);
  }

  function buildSession(words: Word[], f: string): Word[] {
    const filtered = getFilteredWords(words, f);
    return shuffle(filtered).slice(0, SESSION_SIZE);
  }

  useEffect(() => {
    if (!userWords.length || !filter) return;
    const newSession = buildSession(userWords, filter);
    setSession(newSession);
    setIndex(0);
    setCorrect(0);
    setWrong(0);
    setOptions([]);
  }, [filter, userWords]);

  useEffect(() => {
    if (!currentWord) return;

    const wrongAnswers = shuffle(
      userWords.filter((w) => w.id !== currentWord.id),
    )
      .slice(0, 3)
      .map((w) => w.word);

    setOptions(shuffle([currentWord.word, ...wrongAnswers]));
  }, [currentWord]);

  const handleCorrect = () => setCorrect((c) => c + 1);
  const handleWrong = () => setWrong((w) => w + 1);
  const next = () => setIndex((i) => i + 1);

 const restart = () => {
  setSession([]); 
  setIndex(0);
  setCorrect(0);
  setWrong(0);
  setOptions([]);
  setFilter(null); 
};

  const filterCounts = {
    all: userWords.length,
    new: userWords.filter((w) => w.status === "new").length,
    learning: userWords.filter(
      (w) => w.status === "learning" || w.status === "fuzzy",
    ).length,
    known: userWords.filter((w) => w.status === "known").length,
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
    hasStarted,
    filter,
    setFilter,
    filterCounts,
  };
}
