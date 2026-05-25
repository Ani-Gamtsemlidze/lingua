"use client";

import { chatWithTutor } from "@/app/actions/ai";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export type Message = {
  role: "user" | "assistant";
  content: string;
};

export function useChat(userName: string, activeLanguage: string) {
  const storageKey = `chat_history_${userName}_${activeLanguage}`;

  const storageKeyRef = useRef(storageKey);
  const skipNextSaveRef = useRef(false);

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    storageKeyRef.current = storageKey;
    skipNextSaveRef.current = true;
    try {
      const saved = sessionStorage.getItem(storageKey);
      const parsed = saved ? (JSON.parse(saved) as Message[]) : [];
      setMessages(Array.isArray(parsed) && parsed.length > 0 ? parsed : []);
    } catch {
      setMessages([]);
    }
  }, [storageKey]);

  useEffect(() => {
    if (skipNextSaveRef.current) {
      skipNextSaveRef.current = false;
      return;
    }
    try {
      sessionStorage.setItem(storageKeyRef.current, JSON.stringify(messages));
    } catch {
      // sessionStorage unavailable
    }
  }, [messages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  function clearChat() {
    skipNextSaveRef.current = true;
    setMessages([]);
    try {
      sessionStorage.removeItem(storageKeyRef.current);
    } catch {
      // sessionStorage unavailable
    }
    setShowClearModal(false);
    toast.success("Chat history cleared");
  }

  async function sendMessage(text?: string) {
    const content = (text ?? input).trim();
    if (!content || loading) return;

    const userMessage: Message = { role: "user", content };
    const next = [...messages, userMessage];
    setMessages(next);
    setInput("");
    setLoading(true);

    if (textareaRef.current) textareaRef.current.style.height = "auto";

    try {
      const reply = await chatWithTutor(next, activeLanguage);
      setMessages([...next, { role: "assistant", content: reply }]);
    } catch (err: unknown) {
      setMessages(messages);
      toast.error(
        err instanceof Error
          ? err.message
          : "Mira is thinking really hard right now! Please try again in a moment.",
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

  return {
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
  };
}
