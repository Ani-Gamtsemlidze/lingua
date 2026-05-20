"use client";

import { useEffect, useRef, useState } from "react";
import { chatWithTutor } from "@/app/actions/ai";
import { BsSend } from "react-icons/bs";
import { toast } from "sonner";

import robotImage from "../public/images/robot.png";
import Image from "next/image";

type Message = {
  role: "user" | "assistant";
  content: string;
};

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
  const storageKey = `chat_history_${userName}`;

  const [messages, setMessages] = useState<Message[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const saved = sessionStorage.getItem(storageKey);
      return saved ? (JSON.parse(saved) as Message[]) : [];
    } catch {
      return [];
    }
  });
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    sessionStorage.setItem(storageKey, JSON.stringify(messages));
  }, [messages, storageKey]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage(text?: string) {
    const content = (text ?? input).trim();
    if (!content || loading) return;

    const userMessage: Message = { role: "user", content };
    const next = [...messages, userMessage];
    setMessages(next);
    setInput("");
    setLoading(true);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    try {
      const reply = await chatWithTutor(next, activeLanguage);
      setMessages([...next, { role: "assistant", content: reply }]);
    } catch (err: unknown) {
      setMessages(messages);
      toast.error(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    }
    setLoading(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  function handleInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 160) + "px";
  }

  const language =
    activeLanguage.charAt(0).toUpperCase() + activeLanguage.slice(1);

  return (
    <div className="flex flex-col h-screen bg-slate-900">
      <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-slate-900 [&::-webkit-scrollbar-thumb]:bg-slate-700 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-violet-600">
        <div className="max-w-2xl mx-auto px-6 py-8 flex flex-col gap-5">
          {messages.length === 0 && (
            <div className="relative flex flex-col items-center justify-center gap-6">
              <div className="relative flex items-center justify-center">
                <div className="w-36 h-36 rounded-full ring-4 ring-violet-800 bg-slate-900 flex items-center justify-center">
                  <img
                    src={robotImage.src}
                    className="w-40 h-40 rounded-full object-cover shadow-2xl shadow-violet-900/50 
    transition-transform duration-300 hover:-translate-y-2 hover:scale-105"
                    alt="avatar"
                  />
                </div>
                <span className="absolute bottom-2 right-2 w-4 h-4 bg-emerald-400 rounded-full ring-2 ring-slate-900" />
              </div>
              <div className="text-center max-w-sm">
                <p className="text-lg font-bold text-white mb-3 leading-relaxed">
                  Hi! I'm Mira, your {language} tutor.
                </p>
                <p className="text-sm text-slate-400 leading-relaxed">
                  If you don't know how to say something in {language}, you can
                  write it in English and I'll help you.
                </p>
                <p className="text-sm font-semibold text-violet-400 mt-3">
                  What would you like to talk about?
                </p>
              </div>

              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    className="text-left text-sm text-slate-400 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3
                      hover:border-violet-500 hover:text-violet-300 hover:bg-slate-800/80 transition-all"
                  >
                    <span className="text-violet-500 mr-2">→</span>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              {/* Avatar */}
              <div
                className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-xs font-bold mt-0.5
                ${
                  msg.role === "user"
                    ? "bg-slate-700 text-slate-300"
                    : "bg-gradient-to-br from-violet-500 to-indigo-700 text-white"
                }`}
              >
                {msg.role === "user" ? (
                  userName.charAt(0).toUpperCase()
                ) : (
                  <Image
                    src={robotImage.src}
                    alt="avatar"
                    width={20}
                    height={20}
                    quality={100}
                    className="rounded-full object-cover"
                  />
                )}
              </div>
              <div
                className={`max-w-[78%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap
                  ${
                    msg.role === "user"
                      ? "bg-violet-600 text-white rounded-tr-sm"
                      : "bg-slate-800 border border-slate-700 text-slate-200 rounded-tl-sm"
                  }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 flex-row">
              <div className="w-7 h-7 rounded-full shrink-0 bg-gradient-to-br from-violet-500 to-indigo-700 flex items-center justify-center text-xs font-bold text-white mt-0.5">
                AI
              </div>
              <div className="bg-slate-800 border border-slate-700 rounded-2xl rounded-tl-sm px-4 py-3">
                <div className="flex gap-1.5 items-center h-4">
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

      <div className="shrink-0 bg-slate-900 border-t border-slate-800 px-4 py-4">
        <div className="max-w-2xl mx-auto">
          <div
            className="flex items-end gap-2 bg-slate-800 border border-slate-700 rounded-2xl px-4 py-3
            focus-within:border-violet-500 focus-within:ring-1 focus-within:ring-violet-500/30 transition-all"
          >
            <textarea
              ref={textareaRef}
              value={input}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              placeholder={`Message your ${language} tutor...`}
              rows={1}
              className="flex-1 resize-none bg-transparent text-sm text-slate-200
                placeholder:text-slate-500 focus:outline-none overflow-hidden"
            />
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || loading}
              className="shrink-0 w-8 h-8 rounded-xl bg-violet-600 text-white flex items-center justify-center
                hover:bg-violet-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all mb-0.5 cursor-pointer"
            >
              <BsSend className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-xs text-slate-600 text-center mt-2">
            Enter to send · Shift+Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
}
