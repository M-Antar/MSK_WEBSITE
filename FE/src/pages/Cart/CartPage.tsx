import { Link } from "@tanstack/react-router";
import { EmptyState } from "@/components/ui/EmptyState/EmptyState";
import { buttonClasses } from "@/components/ui/Button/Button";
import { QuantitySelector } from "@/components/ui/QuantitySelector/QuantitySelector";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { formatPrice } from "@/utils/format";
import styles from "./Cart.module.css";

export function CartPage() {
  const { items, total, updateQuantity, removeItem } = useCart();
  const { t } = useLanguage();

  return (
    <section className="shop-section">
      <div className="shop-container">
        <h1 className={styles["title"]}>{t("cart.title")}</h1>

        {items.length === 0 ? (
          <EmptyState
            title={t("cart.emptyTitle")}
            message={t("cart.emptyMessage")}
            action={
              <Link to="/products" className={buttonClasses("primary")}>
                {t("cart.continueShopping")}
              </Link>
            }
          />
        ) : (
          <>
            <div className={styles["list"]}>
              {items.map((item) => (
                <article key={item.id} className={styles["row"]}>
                  <div className={styles["thumb"]}>
                    {item.image ? <img src={item.image} alt={item.name} /> : null}
                  </div>
                  <div>
                    <h2 className={styles["name"]}>{item.name}</h2>
                    {item.size ? (
                      <p className={styles["meta"]}>
                        {t("cart.size")}: {item.size}
                      </p>
                    ) : null}
                    <QuantitySelector
                      value={item.quantity}
                      onChange={(next) => updateQuantity(item.id, next)}
                    />
                  </div>
                  <div className={styles["right"]}>
                    <span className={styles["price"]}>
                      {formatPrice(item.price * item.quantity)}
                    </span>
                    <button className={styles["remove"]} onClick={() => removeItem(item.id)}>
                      {t("cart.remove")}
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <div className={styles["summary"]}>
              <span className={styles["total"]}>
                {t("cart.total")}: {formatPrice(total)}
              </span>
              <div className={styles["actions"]}>
                <Link to="/products" className={buttonClasses("outline")}>
                  {t("cart.continueShopping")}
                </Link>
                <Link to="/checkout" className={buttonClasses("primary")}>
                  {t("cart.checkout")}
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}