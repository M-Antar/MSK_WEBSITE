
import { useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/Button/Button";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher/LanguageSwitcher";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { placeOrder } from "@/services/order.service";
import { formatPrice, toErrorMessage } from "@/utils/format";

import styles from "./Checkout.module.css";

/**
 * Checkout renders without navbar or footer by design.
 */
export function CheckoutPage() {
  const {
    items,
    total,
    clearCart,
  } = useCart();

  const { t } = useLanguage();

  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    country: "",
    city: "",
    street: "",
  });

  function update(field: keyof typeof form, value: string) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (items.length === 0) {
      setStatus(t("checkout.emptyCart"));
      return;
    }

    setSubmitting(true);
    setStatus(null);

    try {
      /*
       * Build the payload exactly as the NestJS
       * CreateOrderDto expects.
       */
      const payload = {
        fullName: form.fullName,
        email: form.email,

        address: {
          street: form.street,
          city: form.city,
          country: form.country,
          phoneNumber: form.phoneNumber,
        },

        products: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),

        paymentMethod: "COD" as const,
      };

      console.log("====================================");
      console.log("🛒 CHECKOUT CART:", items);
      console.log("👤 CUSTOMER:", {
        fullName: form.fullName,
        email: form.email,
      });
      console.log("📍 ADDRESS:", payload.address);
      console.log("📦 ORDER PRODUCTS:", payload.products);
      console.log("💳 PAYMENT METHOD:", payload.paymentMethod);
      console.log("📤 FINAL ORDER PAYLOAD:", payload);
      console.log("====================================");

      await placeOrder(payload);

      console.log("====================================");
      console.log("✅ ORDER PLACED SUCCESSFULLY");
      console.log("====================================");

      /*
       * Order was successfully created.
       * Clear the local cart so the same products
       * are not submitted again.
       */
      clearCart();

      /*
       * Show simple success message.
       * No order ID or status is displayed.
       */
      setStatus("Order placed successfully!");
    } catch (error) {
      console.error("====================================");
      console.error("❌ ORDER FAILED");
      console.error("Error:", error);
      console.error("====================================");

      setStatus(toErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className={styles["page"]}>
      <div className={styles["shell"]}>
        {/* =========================
            TOP BAR
        ========================= */}
        <div className={styles["top"]}>
          <Link to="/" className={styles["logo"]}>
            Maren
            <span className={styles["logoMark"]}>.</span>
          </Link>

          <div className={styles["topRight"]}>
            <LanguageSwitcher />

            <Link
              to="/cart"
              className={styles["back"]}
            >
              {t("checkout.backToCart")}
            </Link>
          </div>
        </div>

        {/* =========================
            PAGE TITLE
        ========================= */}
        <h1 className={styles["title"]}>
          {t("checkout.title")}
        </h1>

        <form
          className={styles["grid"]}
          onSubmit={handleSubmit}
        >
          {/* =========================
              CUSTOMER / ADDRESS INFO
          ========================= */}
          <div className={styles["panel"]}>
            <h2 className={styles["panelTitle"]}>
              {t("checkout.customerInfo")}
            </h2>

            {/* Full Name */}
            <label className={styles["field"]}>
              <span className={styles["label"]}>
                {t("checkout.fullName")}
              </span>

              <input
                type="text"
                className={styles["input"]}
                value={form.fullName}
                onChange={(e) =>
                  update(
                    "fullName",
                    e.target.value,
                  )
                }
                required
              />
            </label>

            {/* Email */}
            <label className={styles["field"]}>
              <span className={styles["label"]}>
                {t("checkout.email")}
              </span>

              <input
                type="email"
                className={styles["input"]}
                value={form.email}
                onChange={(e) =>
                  update(
                    "email",
                    e.target.value,
                  )
                }
                required
              />
            </label>

            {/* Phone Number */}
            <label className={styles["field"]}>
              <span className={styles["label"]}>
                Phone Number
              </span>

              <input
                type="tel"
                className={styles["input"]}
                value={form.phoneNumber}
                onChange={(e) =>
                  update(
                    "phoneNumber",
                    e.target.value,
                  )
                }
                required
              />
            </label>

            {/* Country */}
            <label className={styles["field"]}>
              <span className={styles["label"]}>
                Country
              </span>

              <input
                type="text"
                className={styles["input"]}
                value={form.country}
                onChange={(e) =>
                  update(
                    "country",
                    e.target.value,
                  )
                }
                required
              />
            </label>

            {/* City */}
            <label className={styles["field"]}>
              <span className={styles["label"]}>
                City
              </span>

              <input
                type="text"
                className={styles["input"]}
                value={form.city}
                onChange={(e) =>
                  update(
                    "city",
                    e.target.value,
                  )
                }
                required
              />
            </label>

            {/* Street / Address */}
            <label className={styles["field"]}>
              <span className={styles["label"]}>
                Street / Address
              </span>

              <textarea
                className={styles["textarea"]}
                value={form.street}
                onChange={(e) =>
                  update(
                    "street",
                    e.target.value,
                  )
                }
                required
              />
            </label>
          </div>

          {/* =========================
              ORDER SUMMARY
          ========================= */}
          <div
            className={`${styles["panel"]} ${styles["summaryPanel"]}`}
          >
            <h2 className={styles["panelTitle"]}>
              {t("checkout.summary")}
            </h2>

            {items.length === 0 ? (
              <p style={{ fontSize: "0.9rem" }}>
                {t("checkout.emptyCart")}{" "}
                <Link to="/products">
                  {t("checkout.browseProducts")}
                </Link>
              </p>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className={styles["line"]}
                >
                  <span
                    className={styles["lineName"]}
                  >
                    {item.name} × {item.quantity}
                  </span>

                  <span>
                    {formatPrice(
                      item.price *
                        item.quantity,
                    )}
                  </span>
                </div>
              ))
            )}

            {/* Total */}
            <div className={styles["totalRow"]}>
              <span>{t("cart.total")}</span>

              <span>
                {formatPrice(total)}
              </span>
            </div>

            {/* Place Order */}
            <div className={styles["submit"]}>
              <Button
                type="submit"
                block
                disabled={
                  submitting ||
                  items.length === 0
                }
              >
                {submitting
                  ? t("checkout.placing")
                  : t(
                      "checkout.placeOrder",
                    )}
              </Button>
            </div>

            {/* Status / Error */}
            {status ? (
              <p className={styles["status"]}>
                {status}
              </p>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  );
}

