import { TokenWithTranslation } from "@/app/(content)/reader/[id]/page";

export type textData = {
  id: number;
  title: string;
};
export type ReaderPanelProps = {
  savedCount: number;
  activeWord: string | null;
  totalWords: number;
  handleMouseUp: () => void;
  matchWords: TokenWithTranslation[];
  setActiveWord: React.Dispatch<React.SetStateAction<string | null>>;
  setAiTranslation: React.Dispatch<React.SetStateAction<string>>;
  setNote: React.Dispatch<React.SetStateAction<string>>;
  handleWordClick: (word: string) => void;
  setPanelMode: React.Dispatch<React.SetStateAction<"new" | "saved">>;
};
