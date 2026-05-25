"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiBookOpen, BiLibrary } from "react-icons/bi";
import { BsChatDots } from "react-icons/bs";
import { FaGraduationCap } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

const icons = {
  dashboard: <MdDashboard className="w-4 h-4" />,
  reader: <BiBookOpen className="w-4 h-4" />,
  words: <BiLibrary className="w-4 h-4" />,
  study: <FaGraduationCap className="w-4 h-4" />,
  chat: <BsChatDots className="w-4 h-4" />,
};

const colors = {
  dashboard: "text-violet-400",
  reader: "text-blue-400",
  words: "text-violet-400",
  study: "text-emerald-400",
  chat: "text-pink-400",
};

interface SidebarItemProps {
  label: keyof typeof icons;
  onNavigate: () => void;
}

export default function SidebarItem({ label, onNavigate }: SidebarItemProps) {
  const pathname = usePathname();
  const isActive = pathname.startsWith(`/${label}`);

  const displayLabel = label.charAt(0).toUpperCase() + label.slice(1);

  return (
    <Link
      href={`/${label}`}
      onClick={onNavigate}
      className={`
        flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
        transition-all duration-200
        ${
          isActive
            ? "bg-slate-800/60 text-white shadow-sm"
            : "text-slate-400 hover:text-white hover:bg-slate-800/40"
        }
      `}
    >
      <span
        className={`${isActive ? colors[label] : "text-slate-500"} transition-colors`}
      >
        {icons[label]}
      </span>
      <span>{displayLabel}</span>
    </Link>
  );
}
