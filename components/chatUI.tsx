"use client";

import { useChat } from "@/hooks/useChat";
import { formatMessage } from "@/lib/formatMessage";
import Image from "next/image";
import robotImage from "../public/images/robot.png";
import { BsSend } from "react-icons/bs";

const SUGGESTIONS = [
  "How do I conjugate verbs in past tense?",
  "What's the difference between formal and informal speech?",
  "Give me 5 common phrases for beginners.",
  "Explain the grammar of a basic sentence.",
];

export default function ChatUI({
  activeLanguage,
  userName,
}: {
  activeLanguage: string;
  userName: string;
}) {
  const {
    messages,
    input,
    loading,
    showClearModal,
    setShowClearModal,
    bottomRef,
    textareaRef,
    clearChat,
    sendMessage,
    handleKeyDown,
    handleInput,
  } = useChat(userName, activeLanguage);

  const language = activeLanguage.charAt(0).toUpperCase() + activeLanguage.slice(1);

  return (
    <div className="flex flex-col h-screen bg-slate-950">
      {messages.length > 0 && (
        <div className="shrink-0 bg-slate-950 border-b border-slate-800 px-3 sm:px-4 py-2.5 sm:py-3">
          <div className="max-w-3xl mx-auto flex items-center justify-between">
            <div>
              <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-violet-400">
                mira
              </p>
              <p className="text-[10px] sm:text-xs text-slate-400 mt-0.5">
                {language} tutor
              </p>
            </div>
            <button
              onClick={() => setShowClearModal(true)}
              className="text-[10px] sm:text-xs text-slate-400 hover:text-red-400 transition-colors px-2.5 sm:px-3 py-1.5 rounded-lg
                border border-slate-700 hover:border-red-400/30 hover:bg-red-500/10"
            >
              Clear chat
            </button>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-slate-900 [&::-webkit-scrollbar-thumb]:bg-slate-700 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-violet-600">
        <div className="max-w-3xl mx-auto px-3 sm:px-6 py-4 sm:py-8 flex flex-col gap-3 sm:gap-5">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center gap-4 sm:gap-6 pt-20 sm:pt-12 px-4">
              <div className="relative flex items-center justify-center">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full ring-2 sm:ring-4 ring-violet-800 bg-slate-900" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image
                    src={robotImage.src}
                    width={200}
                    height={200}
                    quality={100}
                    priority
                    className="w-28 h-28 sm:w-36 sm:h-36 object-cover rounded-full transition-all duration-300 hover:-translate-y-3 hover:scale-110"
                    alt="Mira avatar"
                  />
                </div>
                <span className="absolute bottom-0.5 right-0.5 sm:bottom-2 sm:right-2 w-3 h-3 sm:w-4 sm:h-4 bg-emerald-400 rounded-full ring-2 ring-slate-900 z-10" />
              </div>

              <div className="text-center max-w-md px-2">
                <p className="text-base sm:text-lg font-bold text-white mb-2 leading-relaxed">
                  Hi! I'm Mira, your {language} tutor.
                </p>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  If you don't know how to say something in {language}, you can write it in English and I'll help you.
                </p>
                <p className="text-xs sm:text-sm font-semibold text-violet-400 mt-2.5 sm:mt-3">
                  What would you like to talk about?
                </p>
              </div>

              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    disabled={loading}
                    className="text-left text-xs sm:text-sm text-slate-300 bg-slate-800/50 border border-slate-700 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3
                      hover:border-violet-500 hover:text-violet-300 hover:bg-slate-800 transition-all active:scale-[0.98]
                      disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="text-violet-500 mr-1.5 sm:mr-2">→</span>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-2 sm:gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              <div
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full shrink-0 flex items-center justify-center text-sm sm:text-base font-bold mt-0.5
                  ${msg.role === "user" ? "bg-slate-700 text-slate-300" : "bg-linear-to-br from-violet-500 to-indigo-700 text-white"}`}
              >
                {msg.role === "user" ? userName.charAt(0).toUpperCase() : "Mi"}
              </div>
              <div
                className={`max-w-[82%] sm:max-w-[78%] rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm leading-relaxed break-words
                  ${msg.role === "user"
                    ? "bg-violet-600 text-white rounded-tr-sm whitespace-pre-wrap"
                    : "bg-slate-800 border border-slate-700 text-slate-200 rounded-tl-sm"}`}
              >
                {msg.role === "assistant" ? formatMessage(msg.content) : msg.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-2 sm:gap-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full shrink-0 bg-linear-to-br from-violet-500 to-indigo-700 flex items-center justify-center text-sm text-white mt-0.5">
                Mi
              </div>
              <div className="bg-slate-800 border border-slate-700 rounded-2xl rounded-tl-sm px-3 sm:px-4 py-2.5 sm:py-3">
                <div className="flex gap-1.5 items-center h-3 sm:h-4">
                  <span className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce [animation-delay:0ms]" />
                  <span className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce [animation-delay:150ms]" />
                  <span className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {showClearModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
          onClick={() => setShowClearModal(false)}
        >
          <div
            className="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-full max-w-sm shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-base font-semibold text-slate-100 mb-1">Clear chat history?</h2>
            <p className="text-sm text-slate-400 mb-6">
              This will permanently delete all messages. This cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowClearModal(false)}
                className="px-4 py-2 text-sm text-slate-300 bg-slate-800 border border-slate-700 rounded-xl hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={clearChat}
                className="px-4 py-2 text-sm text-white bg-red-600 rounded-xl hover:bg-red-700 transition-colors"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="shrink-0 bg-slate-950 border-t border-slate-800 px-3 sm:px-4 py-3 sm:py-4">
        <div className="max-w-3xl mx-auto">
          <div
            className="flex items-end gap-2 bg-slate-800 border border-slate-700 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3
              focus-within:border-violet-500 focus-within:ring-1 focus-within:ring-violet-500/30 transition-all"
          >
            <textarea
              ref={textareaRef}
              value={input}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              placeholder={`Message your ${language} tutor...`}
              rows={1}
              disabled={loading}
              className="flex-1 resize-none bg-transparent text-xs sm:text-sm text-slate-200
                placeholder:text-slate-500 focus:outline-none overflow-hidden disabled:opacity-50"
            />
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || loading}
              className="shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-violet-600 text-white flex items-center justify-center
                hover:bg-violet-700 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all mb-0.5"
            >
              <BsSend className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>
          <p className="text-[10px] sm:text-xs text-slate-600 text-center mt-1.5 sm:mt-2 hidden sm:block">
            Enter to send · Shift+Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
}
