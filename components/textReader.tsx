"use client";

import { useState } from "react";
import { updateText, addWord, updateWord } from "@/app/action";
import { BiCheck, BiPencil } from "react-icons/bi";
import { getAITranslation } from "@/app/actions/ai";
import { toast } from "sonner";
import ReaderPanel from "./readerPanel";
import { TokenWithTranslation } from "@/app/(content)/reader/[id]/page";
import WordsPanelDesktop from "./WordsPanelDesktop";
import WordsPanelMobile from "./WordsPanelMobile";
import { HiArrowLeft } from "react-icons/hi";
import Link from "next/link";

export default function TextReader({
  matchWords,
  userText,
  textLanguage,
}: {
  matchWords: TokenWithTranslation[];
  userText: {
    id: number;
    title: string;
    content: string;
  };
  textLanguage: string;
}) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [activeWord, setActiveWord] = useState<string | null>(null);
  const [aiTranslation, setAiTranslation] = useState("");
  const [note, setNote] = useState("");
  const [baseWord, setBaseWord] = useState("");
  const [loadingTranslation, setLoadingTranslation] = useState(false);
  const [panelMode, setPanelMode] = useState<"new" | "saved">("new");
  const [textTitle, setTextTitle] = useState("");
  const [isWordsOpen, setIsWordsOpen] = useState(true);
  const savedCount = matchWords.filter((w) => w.translation).length;
  const totalWords = matchWords.filter((w) => !w.isEmpty).length;

  function togglePanel() {
    setIsWordsOpen(!isWordsOpen);
  }

  async function handleWordClick(token: string) {
    const cleanWord = token.replace(/[^\p{L}\p{N}']/gu, "");
    if (!cleanWord) return;
    setActiveWord(cleanWord);
    setAiTranslation("");
    setNote("");
    setLoadingTranslation(true);

    try {
      const result = await getAITranslation(cleanWord, textLanguage);
      setAiTranslation(result.translation ?? "");
      setNote(
        result.example
          ? result.exampleTranslation
            ? `${result.example}\n${result.exampleTranslation}`
            : result.example
          : "",
      );
      setBaseWord(result.baseForm);
    } catch (error) {
      toast.error("Our AI tutor is currently busy. Please wait a moment and try again.");
      setLoadingTranslation(false);
    } finally {
      setLoadingTranslation(false);
    }
  }

  function handleClose() {
    setActiveWord(null);
    setAiTranslation("");
    setNote("");
  }

  async function handleSave() {
    if (!activeWord || !aiTranslation.trim()) {
      toast.error("Translation is required");
      return;
    }
    const formData = new FormData();
    formData.set("word", activeWord);
    formData.set("translation", aiTranslation);
    formData.set("note", note);
    formData.set("language", textLanguage);
    await addWord(formData);
    toast.success("Word saved!");
    handleClose();
  }

  async function handleUpdateWord() {
    if (!activeWord || !aiTranslation.trim()) {
      toast.error("Translation is required");
      return;
    }
    const formData = new FormData();
    formData.set("word", activeWord);
    formData.set("note", note);
    formData.set("translation", aiTranslation);
    await updateWord(formData);
    toast.success("Word updated!");
  }

  async function handleMouseUp() {
    const selection = window.getSelection();
    const selectedText = selection?.toString().trim();
    if (!selectedText) return;

    const wordCount = selectedText.split(/\s+/).length;
    if (wordCount < 2) return;
    if (wordCount > 5) {
      toast.error("Select up to 5 words only");
      selection?.removeAllRanges();
      return;
    }

    selection?.removeAllRanges();
    setActiveWord(selectedText);
    setAiTranslation("");
    setNote("");
    setLoadingTranslation(true);

    const result = await getAITranslation(selectedText, textLanguage);
    setAiTranslation(result.translation ?? "");
    setNote(
      result.example
        ? result.exampleTranslation
          ? `${result.example}\n${result.exampleTranslation}`
          : result.example
        : "",
    );
    setLoadingTranslation(false);
  }

  const wordsPanelProps = {
    activeWord,
    textLanguage,
    handleClose,
    aiTranslation,
    setAiTranslation,
    note,
    setNote,
    loadingTranslation,
    handleSave,
    panelMode,
    handleUpdate: handleUpdateWord,
  };

  return (
    <div className="min-h-full bg-slate-950 px-4 md:px-6 pt-20 nav:pt-10 pb-6 md:pb-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
          <div className="flex-1">
            <Link
              href="/reader"
              className="inline-flex items-center gap-2 bg-slate-800/60 hover:bg-slate-700/60 
                border border-slate-700 text-slate-300 hover:text-white text-sm font-medium 
                px-4 py-2 rounded-xl transition-all mb-3"
            >
              <HiArrowLeft className="w-4 h-4" />
              <span>Back to Library</span>
            </Link>

            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-2">
                Reading
              </p>
              {isEditMode ? (
                <input
                  type="text"
                  name="title"
                  defaultValue={userText.title}
                  onChange={(e) => setTextTitle(e.target.value)}
                  className="w-full rounded-xl border border-slate-600 bg-slate-900/50 px-4 py-2.5 
                    text-lg font-bold text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                />
              ) : (
                <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {userText.title}
                </h1>
              )}
              {savedCount > 0 && !isEditMode && (
                <p className="mt-2 text-sm text-slate-400 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 inline-block" />
                  <span>
                    {savedCount} of {totalWords} words saved
                  </span>
                </p>
              )}
            </div>
          </div>
          {!isEditMode && (
            <button
              onClick={() => setIsEditMode(true)}
              className="flex items-center justify-center gap-2 text-sm font-medium px-5 py-2.5 
                rounded-xl transition-all cursor-pointer shrink-0 bg-slate-800/60 hover:bg-slate-700/60 
                border border-slate-700 text-slate-300 hover:text-white"
            >
              <BiPencil className="w-4 h-4" /> Edit Text
            </button>
          )}
        </div>

        {isEditMode ? (
          <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-6">
            <form action={updateText} className="space-y-4">
              <input type="hidden" name="textId" value={userText.id} />
              <input type="hidden" name="title" value={textTitle} />

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Edit Content
                </label>
                <textarea
                  name="content"
                  rows={15}
                  defaultValue={userText.content
                    .replace(/\n/g, " ")
                    .replace(/\s+/g, " ")
                    .trim()}
                  className="w-full rounded-xl border border-slate-600 bg-slate-900 px-4 py-3 
                    text-base text-white leading-relaxed resize-none focus:outline-none 
                    focus:ring-2 focus:ring-violet-500/50 transition-all"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditMode(false)}
                  className="inline-flex items-center justify-center bg-slate-800/60 hover:bg-slate-700/60 
                    border border-slate-700 text-slate-300 hover:text-white text-sm font-medium 
                    px-5 py-2.5 rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 inline-flex items-center justify-center bg-violet-600 hover:bg-violet-700 
                    text-white text-sm font-medium px-6 py-2.5 rounded-xl transition-all 
                    hover:shadow-lg hover:shadow-violet-500/20"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="bg-slate-900/50 border border-slate-700/60 rounded-2xl overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-0">
              <ReaderPanel
                savedCount={savedCount}
                activeWord={activeWord}
                totalWords={totalWords}
                handleMouseUp={handleMouseUp}
                matchWords={matchWords}
                setActiveWord={setActiveWord}
                setAiTranslation={setAiTranslation}
                setNote={setNote}
                handleWordClick={handleWordClick}
                setPanelMode={setPanelMode}
                loadingTranslation={loadingTranslation}
              />
              <div className="hidden md:block">
                <WordsPanelDesktop
                  isOpen={isWordsOpen}
                  setIsOpen={setIsWordsOpen}
                  {...wordsPanelProps}
                />
              </div>
              {activeWord && (
                <WordsPanelMobile onClose={handleClose} {...wordsPanelProps} />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
