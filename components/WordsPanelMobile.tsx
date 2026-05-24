import { useRef, useState } from "react";
import WordsPanelContent from "./WordsPanelContent";

export default function WordsPanelMobile({ onClose, ...props }: { onClose: () => void }) {
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const scrollTop = panelRef.current?.scrollTop || 0;
        if (scrollTop === 0) {
      setCurrentY(e.touches[0].clientY);
    }
  };

  const handleTouchEnd = () => {
    const diff = currentY - startY;
    
    if (diff > 100) {
      onClose();
    }
    
    setStartY(0);
    setCurrentY(0);
  };

  return (
    <>
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden" 
      />

      <div
        ref={panelRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="fixed z-50 md:hidden
        bg-slate-800 border border-slate-700 shadow-2xl
        overflow-y-auto
        bottom-0 inset-x-0 rounded-t-3xl max-h-[85vh]
        animate-slideUp
        transition-transform duration-200"
        style={{
          transform: currentY > startY ? `translateY(${currentY - startY}px)` : undefined
        }}
      >
        <div className="sticky top-0 bg-slate-800 pt-3 pb-2 border-b border-slate-700/50 z-10">
          <div className="w-12 h-1.5 bg-slate-600 rounded-full mx-auto" />
        </div>

        <WordsPanelContent onClose={onClose} {...props} />
      </div>
    </>
  );
}