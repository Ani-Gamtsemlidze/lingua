"use client";
import { deleteText } from "@/app/action";
import { textData } from "@/types/text";
import Link from "next/link";
import { BiPlus, BiX } from "react-icons/bi";
import Modal from "./modal";
import { useState } from "react";
import { MdOutlineMenuBook } from "react-icons/md";
import { GiSpellBook } from "react-icons/gi";
import { HiSparkles } from "react-icons/hi";
import { generateAndSaveText } from "@/app/actions/ai";
import { useRouter } from "next/navigation";
import GenerateTextModal from "./generateTextModal";
import { toast } from "sonner";

export default function TextsList({
  textData,
  activeLanguage,
}: {
  textData: textData[];
  activeLanguage: string;
}) {
  const [showModal, setShowModal] = useState(false);
  const [generateModal, setGenerateModal] = useState(false);
  const [selectedTextId, setSelectedTextId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  
  function handleDeleteText(id: number) {
    setSelectedTextId(id);
    setShowModal(true);
  }

  const handleGenerate = async (level: string, topic: string) => {
    try {
      setIsLoading(true);
      const result = await generateAndSaveText(activeLanguage, level, topic);
      setGenerateModal(false);
      router.push(`/reader/${result.id}`);
    } catch (error) {
      toast.error("Our AI tutor is currently busy. Please wait a moment and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-full bg-slate-950 px-4 sm:px-6 lg:px-8 py-8 pt-20 nav:pt-8">
      <div className="fixed inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-blue-500/5 pointer-events-none" />
      
      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-2">
              Reader
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Your Library
            </h1>
            <p className="text-sm text-slate-400 mt-2">
              {textData.length} {textData.length === 1 ? "text" : "texts"} in your reading list
            </p>
          </div>
          
          {textData.length > 0 && (
            <div className="flex gap-2">
              <Link
                href="/reader/new"
                className="inline-flex items-center gap-2 bg-slate-800/60 hover:bg-slate-700/60 
                  border border-slate-700 text-white text-sm font-medium px-4 py-2.5 rounded-xl 
                  transition-all hover:scale-[1.02]"
              >
                <BiPlus className="w-4 h-4" />
                <span className="hidden sm:inline">Add Text</span>
                <span className="sm:hidden">Add</span>
              </Link>
              <button
                onClick={() => setGenerateModal(true)}
                className="inline-flex cursor-pointer items-center gap-2 bg-violet-600 hover:bg-violet-700
                  text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-all 
                  hover:scale-[1.02] hover:shadow-lg hover:shadow-violet-500/20"
              >
                <HiSparkles className="w-4 h-4" />
                <span className="hidden sm:inline">Generate with AI</span>
                <span className="sm:hidden">Generate</span>
              </button>
            </div>
          )}
        </div>

        {textData.length === 0 ? (
          <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl">
            <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-violet-500/20 to-indigo-500/20 
                rounded-3xl flex items-center justify-center mb-6 border border-violet-500/30">
                <GiSpellBook className="w-12 h-12 text-violet-400" />
              </div>

              <h3 className="text-2xl font-bold text-white mb-3">
                Start Your Reading Journey
              </h3>

              <p className="text-slate-400 max-w-md mb-10 leading-relaxed">
                Build your personal library by adding texts you want to read, or let our 
                AI generate content tailored to your learning level.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
                <Link
                  href="/reader/new"
                  className="flex-1 bg-slate-800/60 hover:bg-slate-700/60 border border-slate-700 
                    hover:border-slate-600 text-white font-medium py-3.5 px-6 rounded-xl 
                    transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                  <BiPlus className="w-5 h-5" />
                  <span>Add Text Manually</span>
                </Link>
                <button
                  onClick={() => setGenerateModal(true)}
                  className="flex-1 cursor-pointer bg-violet-600 hover:bg-violet-700
                    text-white font-medium py-3.5 px-6 rounded-xl 
                    transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-violet-500/25
                    flex items-center justify-center gap-2"
                >
                  <HiSparkles className="w-5 h-5" />
                  <span>Generate with AI</span>
                </button>
              </div>

              <p className="text-xs text-slate-500 mt-6">
                💡 AI-generated texts adapt to your language level
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {textData.map((text, index) => (
              <div
                key={index}
                className="group bg-slate-800/40 border border-slate-700/60 hover:border-slate-600 
                  rounded-2xl overflow-hidden transition-all hover:shadow-xl hover:scale-[1.02]"
              >
                <Link href={`/reader/${text.id}`} className="block p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center 
                      border border-blue-500/20 group-hover:border-blue-500/40 transition-colors">
                      <MdOutlineMenuBook className="w-6 h-6 text-blue-400" />
                    </div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleDeleteText(text?.id);
                      }}
                      aria-label="Delete text"
                      className="text-slate-500 hover:text-red-400 cursor-pointer transition-colors 
                        p-1.5 opacity-0 group-hover:opacity-100"
                    >
                      <BiX className="w-5 h-5" />
                    </button>
                  </div>

                  <h3 className="text-base font-semibold text-white mb-2 line-clamp-2 
                    group-hover:text-violet-300 transition-colors">
                    {text.title}
                  </h3>

                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span>📖</span>
                    <span>Tap to read</span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        handleDelete={() => {
          if (selectedTextId !== null) {
            deleteText(selectedTextId);
          }
          setShowModal(false);
        }}
        title="Delete this text?"
      />

      <GenerateTextModal
        open={generateModal}
        onClose={() => setGenerateModal(false)}
        onGenerate={handleGenerate}
        isLoading={isLoading}
      />
    </div>
  );
}