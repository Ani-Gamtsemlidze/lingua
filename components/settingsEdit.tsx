"use client"
export default function SettingsEdit({ title, content, buttonText }: {title: string; content: string; buttonText: string}) {
    return (
        <div className="flex items-center justify-between border-b px-3.5 py-4 border-slate-200">
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-slate-700 mt-2">
            {title}
          </span>
          <span className="text-sm text-[#94a3b8]">
            {content}
          </span>
        </div>
        <div className="py-1 px-3 text-sm capitalize font-medium border border-slate-300 rounded-md text-slate-700 hover:bg-slate-100 cursor-pointer">
          {buttonText}
        </div>
      </div>
    )
}