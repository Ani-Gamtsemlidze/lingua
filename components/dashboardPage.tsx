"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { signOut } from "next-auth/react";
import { Logo } from "@/components/logo";
import { BiBookOpen, BiLibrary } from "react-icons/bi";
import { BsChatDots } from "react-icons/bs";
import { FaGraduationCap } from "react-icons/fa";
import { HiSparkles, HiArrowRight } from "react-icons/hi";
import { Language } from "@google/genai";
import LanguageSwitcher from "./languageSwitcher";

interface DashboardData {
  user: {
    name: string;
    email: string;
  };
  stats: {
    wordsLearned: number;
    textsRead: number;
  };
  recentWords: Array<{
    word: string;
    language: string;
    date: string;
  }>;
  continueReading?: {
    title: string;
    progress: number;
    href: string;
  };
}

const features = [
  {
    icon: <BiBookOpen className="w-6 h-6" />,
    title: "Reader",
    description: "Import and read texts at your own pace",
    href: "/reader",
    color: "bg-blue-500/10 text-blue-400",
    border: "hover:border-blue-500/40",
    cta: "Start Reading",
  },
  {
    icon: <BiLibrary className="w-6 h-6" />,
    title: "Word Bank",
    description: "Review all your saved vocabulary",
    href: "/words",
    color: "bg-violet-500/10 text-violet-400",
    border: "hover:border-violet-500/40",
    cta: "View Words",
  },
  {
    icon: <FaGraduationCap className="w-6 h-6" />,
    title: "Study",
    description: "Practice with flashcards and games",
    href: "/study",
    color: "bg-emerald-500/10 text-emerald-400",
    border: "hover:border-emerald-500/40",
    cta: "Study Now",
  },
  {
    icon: <BsChatDots className="w-6 h-6" />,
    title: "AI Tutor",
    description: "Get instant help with Mira",
    href: "/chat",
    color: "bg-pink-500/10 text-pink-400",
    border: "hover:border-pink-500/40",
    cta: "Chat with Mira",
  },
];

interface DashboardPageProps {
  data: DashboardData;
}

export default function DashboardPage({ data }: DashboardPageProps) {
  const dashboardData = data;
  const isNewUser = dashboardData.stats.wordsLearned === 0 && dashboardData.stats.textsRead === 0;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="fixed inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-indigo-500/5 pointer-events-none" />

      <div className="relative z-10">
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between border-b border-slate-800/50">
          <Logo />
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="/reader"
              className="text-xs sm:text-sm bg-violet-600 hover:bg-violet-700 text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl transition-all hover:shadow-lg hover:shadow-violet-500/20 font-medium"
            >
              Start Reading
            </Link>
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((o) => !o)}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center justify-center transition-colors"
              >
                <span className="text-sm font-medium text-violet-400">
                  {dashboardData.user.name?.charAt(0).toUpperCase()}
                </span>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-slate-800 border border-slate-700 rounded-xl shadow-xl z-50 overflow-hidden">
                  <div className="px-4 py-3 border-b border-slate-700">
                    <p className="text-sm font-medium text-white truncate">{dashboardData.user.name}</p>
                    <p className="text-xs text-slate-400 truncate">{dashboardData.user.email}</p>
                  </div>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-slate-700/60 transition-colors"
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          </div>
        </nav>

        <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 pb-8 sm:pb-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
                {isNewUser
                  ? `Welcome, ${dashboardData.user.name}! 🎉`
                  : `Welcome back, ${dashboardData.user.name}! 👋`}
              </h1>
              <p className="text-slate-400 text-sm sm:text-base">
                {isNewUser
                  ? "Your language journey starts here."
                  : "Ready to continue your language journey?"}
              </p>
            </div>
          </div>

          {isNewUser ? (
            <div className="bg-linear-to-br from-violet-600/10 to-indigo-600/10 border border-violet-500/20 rounded-2xl p-6 sm:p-8 mb-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-4">Get Started</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { step: "1", title: "Import a text", desc: "Paste or upload any text in your target language.", href: "/reader", cta: "Go to Reader" },
                  { step: "2", title: "Read & save words", desc: "Tap any word while reading to save it to your Word Bank.", href: "/reader", cta: "Start Reading" },
                  { step: "3", title: "Study your words", desc: "Use flashcards and games to make new words stick.", href: "/study", cta: "Open Study" },
                ].map(({ step, title, desc, href, cta }) => (
                  <div key={step} className="flex flex-col gap-3">
                    <div className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center shrink-0">
                      <span className="text-sm font-bold text-violet-400">{step}</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white mb-1">{title}</p>
                      <p className="text-xs text-slate-400 leading-relaxed mb-3">{desc}</p>
                      <Link href={href} className="inline-flex items-center gap-1 text-xs font-semibold text-violet-400 hover:text-violet-300 transition-colors">
                        {cta} <HiArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-5 sm:p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-400 text-sm">Words Saved</span>
                  <BiLibrary className="w-5 h-5 text-violet-400" />
                </div>
                <p className="text-3xl sm:text-4xl font-bold text-white">{dashboardData.stats.wordsLearned}</p>
                <p className="text-xs text-slate-500 mt-1">Ready to review</p>
              </div>
              <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-5 sm:p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-400 text-sm">Texts Read</span>
                  <BiBookOpen className="w-5 h-5 text-blue-400" />
                </div>
                <p className="text-3xl sm:text-4xl font-bold text-white">{dashboardData.stats.textsRead}</p>
                <p className="text-xs text-slate-500 mt-1">Keep reading to learn more</p>
              </div>
            </div>
          )}

          {dashboardData.continueReading && (
            <Link
              href={dashboardData.continueReading.href}
              className="block bg-gradient-to-br from-violet-600/20 to-indigo-600/20 border border-violet-500/30 rounded-2xl p-6 sm:p-8 hover:border-violet-500/50 transition-all group mb-8"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-2">
                    Continue Reading
                  </p>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                    {dashboardData.continueReading.title}
                  </h3>
                </div>
                <HiArrowRight className="w-6 h-6 text-violet-400 group-hover:translate-x-1 transition-transform flex-shrink-0" />
              </div>
              <div className="w-full bg-slate-800/50 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-violet-500 to-indigo-500 h-full rounded-full transition-all"
                  style={{ width: `${dashboardData.continueReading.progress}%` }}
                />
              </div>
            </Link>
          )}
        </section>

        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 border-t border-slate-800/50">
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Quick Access
            </h2>
            <p className="text-sm sm:text-base text-slate-400">
              Jump into any of your learning tools
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {features.map((f) => (
              <Link
                key={f.title}
                href={f.href}
                className={`group bg-slate-800/40 border border-slate-700/60 rounded-2xl p-6 sm:p-7 transition-all ${f.border} hover:bg-slate-800/60 hover:shadow-xl hover:scale-[1.02]`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center ${f.color} group-hover:scale-110 transition-transform`}>
                    {f.icon}
                  </div>
                  <HiArrowRight className="w-5 h-5 text-slate-500 group-hover:text-violet-400 group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-4">{f.description}</p>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 group-hover:text-violet-400 transition-colors">
                  {f.cta}
                </span>
              </Link>
            ))}
          </div>
        </section>
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 border-t border-slate-800/50">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Recently Saved Words
            </h2>
             {dashboardData.recentWords.length > 0 && (
              <Link
                href="/words"
                className="text-sm text-violet-400 hover:text-violet-300 transition-colors font-medium"
              >
                View all →
              </Link>
            )}
          </div>

          {dashboardData.recentWords.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center border border-dashed border-slate-700 rounded-2xl">
              <BiLibrary className="w-8 h-8 text-slate-600 mb-3" />
              <p className="text-sm font-medium text-slate-400 mb-1">No words saved yet</p>
              <p className="text-xs text-slate-500 mb-4">Start reading a text and tap words to save them here.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              {dashboardData.recentWords.map((item, i) => (
                <div
                  key={i}
                  className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-4 sm:p-5 hover:border-slate-600 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-lg sm:text-xl font-semibold text-white">{item.word}</p>
                    <span className="text-xs text-slate-500 shrink-0 ml-2">{item.date}</span>
                  </div>
                  <p className="text-xs text-slate-400">{item.language}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-2xl p-6 sm:p-8 text-center">
            <HiSparkles className="w-8 h-8 text-emerald-400 mx-auto mb-4" />
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              {isNewUser ? "You're all set!" : "Keep up the great work!"}
            </h3>
            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
              {isNewUser
                ? "Import your first text, read at your own pace, and save words as you go. Your progress will appear here."
                : `You've saved ${dashboardData.stats.wordsLearned} words so far. Reading just 10 minutes today will help solidify them in your memory.`}
            </p>
          </div>
        </section>

        <footer className="border-t border-slate-800/50 py-8 sm:py-10 mt-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <Logo />
              <p className="text-xs text-slate-500">
                © 2026 Lingua. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}