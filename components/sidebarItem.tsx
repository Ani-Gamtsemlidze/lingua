"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiBookOpen, BiLibrary } from "react-icons/bi";
import { FaGraduationCap } from "react-icons/fa";

const icons: Record<string, React.ReactNode> = {
  words: <BiLibrary className="w-4 h-4 flex-shrink-0" />,
  reader: <BiBookOpen className="w-4 h-4 flex-shrink-0" />,
  study: <FaGraduationCap className="w-4 h-4 flex-shrink-0" />,
};

export default function SidebarItem({ label }: { label: string }) {
  const pathName = usePathname();
  const isActive = pathName.startsWith(`/${label}`);

  return (
    <Link
      href={`/${label}`}
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
  );
}