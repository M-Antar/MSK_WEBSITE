import { Link } from "@tanstack/react-router";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./Footer.module.css";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className={styles.footer}>
      <div className="shop-container">
        <div className={styles.grid}>
          <div>
            <div className={styles.logo}>
              MSK<span className={styles.logoMark}>.</span>
            </div>
            <p className={styles.blurb}>{t("footer.blurb")}</p>
          </div>

          <div>
            <h4 className={styles.heading}>{t("footer.quickLinks")}</h4>
            <ul className={styles.list}>
              <li>
                <Link to="/">{t("nav.home")}</Link>
              </li>
              <li>
                <Link to="/products">{t("nav.products")}</Link>
              </li>
              <li>
                <Link to="/cart">{t("nav.cart")}</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className={styles.heading}>{t("footer.contact")}</h4>
            <ul className={styles.list}>
              <li>
                <a href="mailto:hello@MSKstore.com">hello@MSKstore.com</a>
              </li>
              <li>
                <a href="tel:+15550182244">+1 (555) 018-2244</a>
              </li>
              <li className={styles.contactItem}>{t("footer.address")}</li>
            </ul>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <p className={styles.copy}>
            {t("footer.rights", { year: new Date().getFullYear() })}
          </p>
        </div>
      </div>
    </footer>
  );
}