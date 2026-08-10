import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { translations, type Language, type TranslationKey } from "@/i18n/translations";

const STORAGE_KEY = "MSK.lang";

interface LanguageContextValue {
  lang: Language;
  dir: "ltr" | "rtl";
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  /** Translate a key, with optional {placeholder} values. */
  t: (key: TranslationKey, vars?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Always start from "en" so SSR markup and first client render match,
  // then hydrate the stored preference in an effect.
  const [lang, setLangState] = useState<Language>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "ar" || stored === "en") setLangState(stored);
  }, []);

  useEffect(() => {
    const dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang]);

  const setLang = useCallback((next: Language) => {
    setLangState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const value = useMemo<LanguageContextValue>(() => {
    const dict = translations[lang];
    return {
      lang,
      dir: lang === "ar" ? "rtl" : "ltr",
      setLang,
      toggleLang: () => setLang(lang === "ar" ? "en" : "ar"),
      t: (key, vars) => {
        let text: string = dict[key] ?? translations.en[key] ?? key;
        if (vars) {
          for (const [name, val] of Object.entries(vars)) {
            text = text.replace(new RegExp(`\\{${name}\\}`, "g"), String(val));
          }
        }
        return text;
      },
    };
  }, [lang, setLang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside <LanguageProvider>");
  return ctx;
}
