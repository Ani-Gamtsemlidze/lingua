"use client";
import { deleteText } from "@/app/action";
import { textData } from "@/types/text";
import Link from "next/link";
import { BiBookOpen, BiPlus, BiX } from "react-icons/bi";
import Modal from "./modal";
import { useState } from "react";

export default function TextsList({ textData }: { textData: textData[] }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedTextId, setSelectedTextId] = useState<number | null>(null);
  function handleDeleteText(id: number) {
    setSelectedTextId(id);
    setShowModal(true);
  }
  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="max-w-xl mx-auto">

        {/* Header */}
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
          <Link
            href="/reader/new"
            className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 active:bg-slate-900
              transition-colors text-white text-sm font-medium px-4 py-2 rounded-lg"
          >
            <BiPlus className="w-4 h-4" />
            Add text
          </Link>
        </div>

        {/* Empty state */}
        {textData.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 py-16 text-center">
            <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mx-auto mb-3">
              <BiBookOpen className="w-5 h-5 text-slate-400" />
            </div>
            <p className="text-sm font-medium text-slate-400">
              No texts yet.{" "}
              <Link href="/reader/new" className="text-slate-600 underline underline-offset-2 hover:text-slate-800">
                Add your first one
              </Link>
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <ul className="flex flex-col">
              {textData.map((text, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-100 last:border-none hover:bg-slate-50 transition-colors group"
                >
                  {/* Initial chip */}
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-semibold text-slate-500">
                      {text.title.charAt(0).toUpperCase()}
                    </span>
                  </div>

                  {/* Title */}
                  <Link
                    href={`/reader/${text.id}`}
                    className="flex-1 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors truncate"
                  >
                    {text.title}
                  </Link>

                  {/* Delete */}
                  <button
                    onClick={() => handleDeleteText(text?.id)}
                    aria-label="Delete text"
                    className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-400 transition-all"
                  >
                    <BiX className="w-4 h-4" />
                  </button>
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
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}