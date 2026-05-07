"use client";
import { deleteText } from "@/app/action";
import { textData } from "@/types/text";
import Link from "next/link";
import { BiPlus, BiX } from "react-icons/bi";
import Modal from "./modal";
import { useState } from "react";
import { MdOutlineMenuBook } from "react-icons/md";
import { GiSpellBook } from "react-icons/gi";
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
  // const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  function handleDeleteText(id: number) {
    setSelectedTextId(id);
    setShowModal(true);
  }

  const handleGenerate = async (level: string, topic: string) => {
    try {
      const result = await generateAndSaveText(activeLanguage, level, topic);
      setGenerateModal(false);
      router.push(`/reader/${result.id}`);
    } catch (error) {
      toast.error("Failed to generate text, please try again");
    }
  };

  return (
    <div className="bg-slate-50 px-4 md:px-6 py-6 md:py-10 pt-20 md:pt-10">
      <div className=" mt-8 md:mt-0 max-w-xl mx-auto">
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">
              Reader
            </p>
            <h1 className="text-2xl font-semibold text-slate-800 tracking-tight">
              Your texts
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              {textData.length} text{textData.length !== 1 ? "s" : ""} added
            </p>
          </div>
          {textData.length > 0 && (
            <div className="flex flex-col md:flex-row gap-2">
              <Link
                href="/reader/new"
                className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 active:bg-slate-900
              transition-colors text-white text-sm font-medium px-4 py-2 rounded-lg"
              >
                <BiPlus className="w-4 h-4" />
                Add text
              </Link>
              <button
                onClick={() => setGenerateModal(true)}
                className="inline-flex cursor-pointer md:ml-2 ml-0 items-center gap-2 bg-slate-800 hover:bg-slate-700 active:bg-slate-900
              transition-colors text-white text-sm font-medium px-4 py-2 rounded-lg"
              >
                ✨ Generate with AI
              </button>
            </div>
          )}
        </div>
        {textData.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 text-center">
            <div className="flex flex-col items-center justify-center py-8 px-6 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl flex items-center justify-center mb-6">
                <span className="text-4xl">
                  <GiSpellBook className="text-slate-700" />
                </span>
              </div>

              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                No texts yet
              </h3>

              <p className="text-slate-500 max-w-xs mb-8">
                Start building your reading library. Add your first text or let
                AI create one for you.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
                <Link
                  href="/reader/new"
                  className="flex-1 bg-white border border-slate-200 hover:border-slate-300 
                 text-slate-700 font-medium py-2 px-4 rounded-xl 
                 transition-all active:scale-[0.985] flex items-center justify-center gap-2"
                >
                  <span>Add Manually</span>
                </Link>
                <button
                  onClick={() => setGenerateModal(true)}
                  className="flex-1 cursor-pointer bg-gradient-to-r from-slate-800 to-slate-700 
                 hover:bg-slate-400 hover:bg-slate-500
                 text-white font-medium py-2 px-4 rounded-xl 
                 transition-all active:scale-[0.985] flex items-center justify-center gap-2"
                >
                  ✨ Generate with AI
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white overflow-y-auto max-h-80 rounded-xl border border-slate-200 overflow-hidden">
            <ul className="flex flex-col">
              {textData.map((text, index) => (
                <li
                  key={index}
                  className="flex cursor-pointer items-center gap-3 px-4 py-3.5 border-b border-slate-100 last:border-none hover:bg-slate-50 transition-colors group"
                >
                  {/* Initial chip */}
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-semibold text-slate-500">
                      <MdOutlineMenuBook className="w-4 h-4 object-cover text-slate-700" />
                    </span>
                  </div>
                  <Link
                    href={`/reader/${text.id}`}
                    className="flex-1 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors truncate"
                  >
                    {text.title}
                  </Link>

                  <button
                    onClick={() => handleDeleteText(text?.id)}
                    aria-label="Delete text"
                    className=" text-slate-300 cursor-pointer transition-all"
                  >
                    <BiX className="w-4 h-4" />
                  </button>
                </li>
              ))}
            </ul>
            <Modal
              show={showModal}
              onClose={() => {
                setShowModal(false);
              }}
              handleDelete={() => {
                if (selectedTextId !== null) {
                  deleteText(selectedTextId);
                }
                setShowModal(false);
              }}
              title="Delete this text?"
            />
          </div>
        )}
      </div>
      <GenerateTextModal
        open={generateModal}
        onClose={() => setGenerateModal(false)}
        onGenerate={handleGenerate}
      />
    </div>
  );
}
