export const AVAILABLE_LANGUAGES = [
  { code: "us", name: "english", nativeName: "English" },
  { code: "es", name: "spanish", nativeName: "Español" },
  { code: "fr", name: "french", nativeName: "Français" },
  { code: "de", name: "german", nativeName: "Deutsch" },
  { code: "it", name: "italian", nativeName: "Italiano" },
  { code: "pt", name: "portuguese", nativeName: "Português" },
  { code: "tr", name: "turkish", nativeName: "Türkçe" },
  { code: "ar", name: "arabic", nativeName: "العربية" },
  { code: "zh", name: "chinese", nativeName: "简体中文" },
  { code: "ja", name: "japanese", nativeName: "日本語" },
  { code: "ko", name: "korean", nativeName: "한국어" },
];

export const getFlag = (code: string = ""): string => {
  const map: Record<string, string> = {
    us: "us",
    es: "es",
    fr: "fr",
    de: "de",
    it: "it",
    pt: "pt",
    tr: "tr",
    ar: "sa",
    zh: "cn",
    ja: "jp",
    ko: "kr",
  };

  return map[code] ?? "un";
};
