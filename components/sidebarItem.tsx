"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BiBookOpen, BiLibrary } from "react-icons/bi";
import { BsLayers, BsPuzzle, BsChatDots } from "react-icons/bs";
import { FaGraduationCap } from "react-icons/fa";

const icons: Record<string, React.ReactNode> = {
  words: <BiLibrary className="w-4 h-4 shrink-0" />,
  reader: <BiBookOpen className="w-4 h-4 shrink-0" />,
  study: <FaGraduationCap className="w-4 h-4 shrink-0" />,
  chat: <BsChatDots className="w-4 h-4 shrink-0" />,
};

const subItems: Record<
  string,
  { label: string; href: string; icon: React.ReactNode }[]
> = {
  study: [
    {
      label: "Flashcards",
      href: "/study/flashcards",
      icon: <BsLayers className="w-3.5 h-3.5 shrink-0" />,
    },
    {
      label: "Word guess",
      href: "/study/word-guess",
      icon: <BsPuzzle className="w-3.5 h-3.5 shrink-0" />,
    },
  ],
};

export default function SidebarItem({ label, onNavigate }: { label: string; onNavigate?: () => void }) {
  const [isStudyClicked, setIsStudyClicked] = useState(false);
  const pathName = usePathname();
  const subs = subItems[label];
  const isActive = pathName.startsWith(`/${label}`);
  if (subs) {
    return (
      <div className="flex flex-col">
        <div
          onClick={() => setIsStudyClicked(!isStudyClicked)}
          className={`  w-full cursor-pointer flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium capitalize
    ${
      isActive
        ? "bg-blue-500/20 text-white"
        : "text-slate-400 hover:bg-slate-700 hover:text-slate-100"
    } cursor-default`}
        >
          {icons[label] ?? null}
          {label}
        </div>
        {isStudyClicked && (
          <div className="ml-3 mt-1 flex flex-col gap-0.5 border-l border-slate-700 pl-3">
            {subs.map((sub) => (
              <Link
                key={sub.href}
                href={sub.href}
                onClick={onNavigate}
                className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs font-medium transition-all
              ${pathName === sub.href ? "text-white" : "text-slate-500 hover:text-slate-200"}`}
              >
                {sub.icon}
                {sub.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <Link
        href={`/${label}`}
        onClick={onNavigate}
        className={`w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium capitalize transition-all duration-150
          ${
            isActive
              ? "bg-blue-500/20 text-white"
              : "text-slate-400 hover:bg-slate-700 hover:text-slate-100"
          }`}
      >
        {icons[label] ?? null}
        {label}
      </Link>
    </div>
  );
}
