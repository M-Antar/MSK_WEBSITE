import { Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { useCartCount } from "@/hooks/useCartCount";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher/LanguageSwitcher";
import styles from "./Navbar.module.css";

export function Navbar() {
  const itemCount = useCartCount();
  const { t } = useLanguage();

  return (
    <header className={styles["bar"]}>
      <nav className={`shop-container ${styles["inner"]}`} aria-label="Main">
        <Link to="/" className={styles["logo"]}>
          MSK<span className={styles["logoMark"]}>.</span>
        </Link>

        <div className={styles["links"]}>
          <Link
            to="/"
            className={styles["link"]}
            activeProps={{ className: `${styles["link"]} ${styles["linkActive"]}` }}
            activeOptions={{ exact: true }}
          >
            {t("nav.home")}
          </Link>
          <Link
            to="/products"
            className={styles["link"]}
            activeProps={{ className: `${styles["link"]} ${styles["linkActive"]}` }}
          >
            {t("nav.products")}
          </Link>
          <Link
            to="/cart"
            className={styles["cart"]}
            aria-label={t("nav.cartAria", { count: itemCount })}
          >
            <ShoppingBag size={19} aria-hidden="true" />
            <span className={styles["badge"]}>{itemCount}</span>
          </Link>
          <LanguageSwitcher />
        </div>
      </nav>
    </header>
  );
}
