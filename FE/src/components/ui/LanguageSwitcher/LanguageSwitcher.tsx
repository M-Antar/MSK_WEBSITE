import { Languages } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./LanguageSwitcher.module.css";

/** Compact EN / العربية toggle. Sits at the top-right of the navbar. */
export function LanguageSwitcher() {
  const { lang, toggleLang, t } = useLanguage();

  return (
    <button
      type="button"
      className={styles["button"]}
      onClick={toggleLang}
      aria-label={t("lang.switchTo")}
      title={t("lang.switchTo")}
    >
      <Languages size={16} aria-hidden="true" />
      <span className={styles["label"]}>{lang === "en" ? "العربية" : "English"}</span>
    </button>
  );
}
