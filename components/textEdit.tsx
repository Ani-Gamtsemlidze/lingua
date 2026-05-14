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

export default function TextEdit({
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
      toast.error("AI translation unavailable, please type manually");
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
    <div className="bg-slate-50 px-4 md:px-6 pt-20 md:pt-10 pb-6 md:pb-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <Link
              href="/reader"
              className="inline-flex mb-2 items-center gap-2 bg-slate-700 hover:bg-slate-800 transition-colors text-white text-xs font-extrabold px-4 py-2 rounded-full"
            >
              <HiArrowLeft className="w-3.5 h-3.5" />
              Back
            </Link>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">
              Reader
            </p>
            {isEditMode ? (
              <input
                type="text"
                name="title"
                defaultValue={userText.title}
                onChange={(e) => setTextTitle(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-800
                  focus:outline-none focus:ring-2 focus:ring-slate-400"
              />
            ) : (
              <div>
                <h1 className="text-xl md:text-2xl font-semibold text-slate-800 tracking-tight">
                  {userText.title}
                </h1>
              </div>
            )}
            {savedCount > 0 && (
              <p className="mt-1.5 text-xs text-slate-400 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400 inline-block" />
                {savedCount} of {totalWords} words saved
              </p>
            )}
          </div>
          <button
            onClick={() => setIsEditMode(!isEditMode)}
            className={`mt-1 flex items-center gap-2 text-xs font-semibold px-3 md:px-4 py-2 rounded-lg border transition-all cursor-pointer
              ${
                isEditMode
                  ? "bg-slate-800 text-white border-slate-800"
                  : "bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:text-slate-700"
              }`}
          >
            {isEditMode ? (
              <>
                <BiCheck className="w-3.5 h-3.5" /> Done
              </>
            ) : (
              <>
                <BiPencil className="w-3.5 h-3.5" /> Edit
              </>
            )}
          </button>
        </div>

        {/* Edit mode */}
        {isEditMode ? (
          <form action={updateText} className="flex flex-col gap-4">
            <input type="hidden" name="textId" value={userText.id} />
            <input type="hidden" name="title" value={textTitle} />
            <textarea
              name="content"
              rows={10}
              defaultValue={userText.content
                .replace(/\n/g, " ")
                .replace(/\s+/g, " ")
                .trim()}
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800
                leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition"
            />
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setIsEditMode(false)}
                className="text-sm text-slate-400 hover:text-slate-600 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700
                  text-white text-sm font-medium px-5 py-2.5 rounded-lg cursor-pointer"
              >
                Save changes
              </button>
            </div>
          </form>
        ) : (
          <>
            <div
              className={`grid grid-cols-1 md:grid-cols-[1fr_auto] gap-0 rounded-xl border border-slate-200 overflow-hidden`}
            >
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
              )}{" "}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
