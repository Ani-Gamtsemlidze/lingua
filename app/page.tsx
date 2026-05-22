import Link from "next/link";
import { Logo } from "@/components/logo";
import { BiBookOpen, BiLibrary } from "react-icons/bi";
import { BsChatDots } from "react-icons/bs";
import { FaGraduationCap, FaCheckCircle } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const features = [
  {
    icon: <BiBookOpen className="w-6 h-6" />,
    title: "Reader",
    description:
      "Import any text and read at your own pace. Tap any word to instantly look it up and save it to your vocabulary list.",
    href: "/reader",
    color: "bg-blue-500/10 text-blue-400",
    border: "hover:border-blue-500/40",
  },
  {
    icon: <BiLibrary className="w-6 h-6" />,
    title: "Word Bank",
    description:
      "All your saved words in one place, organized by language. Review definitions, base forms, and example sentences.",
    href: "/words",
    color: "bg-violet-500/10 text-violet-400",
    border: "hover:border-violet-500/40",
  },
  {
    icon: <FaGraduationCap className="w-6 h-6" />,
    title: "Study",
    description:
      "Reinforce your vocabulary with flashcards and word-guess games designed to lock words into long-term memory.",
    href: "/study",
    color: "bg-emerald-500/10 text-emerald-400",
    border: "hover:border-emerald-500/40",
  },
  {
    icon: <BsChatDots className="w-6 h-6" />,
    title: "AI Tutor",
    description:
      "Chat with Mira, your personal language tutor. Ask grammar questions, get translations, and practice anytime.",
    href: "/chat",
    color: "bg-pink-500/10 text-pink-400",
    border: "hover:border-pink-500/40",
  },
];

const steps = [
  { 
    step: "01", 
    title: "Pick a language", 
    body: "Set your target language and import a text you find interesting." 
  },
  { 
    step: "02", 
    title: "Read & save", 
    body: "As you read, tap unfamiliar words to translate and save them instantly." 
  },
  { 
    step: "03", 
    title: "Study & remember", 
    body: "Review saved words with flashcards and quizzes, or ask the AI tutor for help." 
  },
];

const benefits = [
  "Learn from content you actually care about",
  "Build vocabulary that sticks, not just lists",
  "Get instant AI help when you're stuck",
  "Track your progress over time",
];

const languages = [
  "Spanish", "French", "German", "Italian", "Portuguese", 
  "Japanese", "Korean", "Chinese", "Arabic"
];

export default async function LandingPage() {
    const session = await getServerSession();
     if (session) {
    redirect("/dashboard");  
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="fixed inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-indigo-500/5 pointer-events-none" />

      <div className="relative z-10">
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/login"
              className="text-xs sm:text-sm text-slate-400 hover:text-white transition-colors px-3 sm:px-4 py-2"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="text-xs sm:text-sm bg-violet-600 hover:bg-violet-700 text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl transition-all hover:shadow-lg hover:shadow-violet-500/20 font-medium"
            >
              Get started
            </Link>
          </div>
        </nav>
        <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 md:pt-24 pb-16 sm:pb-20 md:pb-32 text-center">
          <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-semibold px-4 py-2 rounded-full mb-6 sm:mb-8 hover:bg-violet-500/15 transition-colors">
            <HiSparkles className="w-3.5 h-3.5" />
            AI-powered language learning
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-4 sm:mb-6 px-2">
            Learn Languages from{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 animate-gradient">
              Real Content
            </span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto mb-8 sm:mb-12 px-4">
            Stop memorizing word lists. Start reading stories, articles, and books you love—and 
            let Lingua turn them into lasting vocabulary.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-12 px-4">
            <Link
              href="/signup"
              className="w-full sm:w-auto bg-violet-600 hover:bg-violet-700 text-white font-semibold px-8 py-3.5 sm:py-4 rounded-xl transition-all hover:shadow-xl hover:shadow-violet-500/25 hover:scale-[1.02] text-base"
            >
              Start learning for free
            </Link>
          </div>
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm text-slate-400 px-4">
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-emerald-400 w-4 h-4 flex-shrink-0" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-emerald-400 w-4 h-4 flex-shrink-0" />
              <span>{languages.length} languages supported</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-emerald-400 w-4 h-4 flex-shrink-0" />
              <span>100% free to start</span>
            </div>
          </div>
        </section>
        <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20">
          <p className="text-center text-slate-500 text-sm mb-4">
            Learn from real content in:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {languages.map((lang) => (
              <span
                key={lang}
                className="px-3 sm:px-4 py-1.5 sm:py-2 bg-slate-800/60 border border-slate-700/60 rounded-full text-xs font-medium text-slate-300 hover:border-violet-500/40 hover:text-violet-300 transition-colors cursor-default"
              >
                {lang}
              </span>
            ))}
          </div>
        </section>
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 border-t border-slate-800/50">
          <div className="text-center mb-12 sm:mb-16 px-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-3">
              Everything you need
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              Four tools that work together
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
              From reading to remembering, every feature is designed to help you build 
              vocabulary that actually sticks.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {features.map((f) => (
              <Link
                key={f.title}
                href={f.href}
                className={`group bg-slate-800/40 border border-slate-700/60 rounded-2xl p-6 sm:p-7 transition-all ${f.border} hover:bg-slate-800/60 hover:shadow-xl hover:scale-[1.02]`}
              >
                <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-4 sm:mb-5 ${f.color} group-hover:scale-110 transition-transform`}>
                  {f.icon}
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3">{f.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-3 sm:mb-4">{f.description}</p>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 group-hover:text-violet-400 transition-colors">
                  Explore {f.title} 
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </Link>
            ))}
          </div>
        </section>
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20 border-t border-slate-800/50">
          <div className="text-center mb-12 sm:mb-16 px-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-3">
              How it works
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              Your path to fluency
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {steps.map((s, i) => (
              <div key={s.step} className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-violet-500/50 to-transparent -translate-x-1/2" />
                )}
                <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 sm:p-7 hover:border-violet-500/30 transition-colors relative z-10">
                  <div className="inline-flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-indigo-500/20 border border-violet-500/30 mb-4 sm:mb-5">
                    <span className="text-xl sm:text-2xl font-bold text-violet-300">{s.step}</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3">{s.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20 border-t border-slate-800/50">
          <div className="bg-gradient-to-br from-violet-500/10 to-indigo-500/10 border border-violet-500/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 sm:mb-8 text-center">
              Why learners love Lingua
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-start gap-3">
                  <FaCheckCircle className="text-emerald-400 w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-slate-200">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-20 md:py-24 text-center">
          <div className="bg-gradient-to-br from-violet-600/20 to-indigo-600/20 border border-violet-500/30 rounded-2xl sm:rounded-3xl p-8 sm:p-12 md:p-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
              Ready to transform your learning?
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-slate-300 mb-6 sm:mb-8 max-w-xl mx-auto">
              Join thousands of learners who are building real vocabulary from content they love.
            </p>
            <Link
              href="/signup"
              className="inline-block bg-white hover:bg-slate-100 text-slate-900 font-bold px-8 sm:px-10 py-3.5 sm:py-4 rounded-xl transition-all hover:shadow-2xl hover:scale-[1.02] text-sm sm:text-base"
            >
              Start for free today
            </Link>
            <p className="text-xs sm:text-sm text-slate-400 mt-3 sm:mt-4">
              No credit card required • Takes 30 seconds
            </p>
          </div>
        </section>

        <footer className="border-t border-slate-800/50 py-8 sm:py-10">
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