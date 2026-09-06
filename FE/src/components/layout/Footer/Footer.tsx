import { Link } from "@tanstack/react-router";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./Footer.module.css";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className={styles.footer}>
      <div className="shop-container">
        <div className={styles.grid}>
          
          {/* Logo and description */}
          <div>
            <div className={styles.logo}>
              MSK<span className={styles.logoMark}>.</span>
            </div>

            <p className={styles.blurb}>{t("footer.blurb")}</p>
          </div>

          {/* Quick Links */}
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

          {/* Instagram */}
          <div>
            <h4 className={styles.heading}>Follow Us</h4>

            <ul className={styles.list}>
              <li>
                <a
                  href="https://www.instagram.com/msk_nsq/?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram: @msk_nsq
                </a>
              </li>
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