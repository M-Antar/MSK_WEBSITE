
import { useState } from "react";

import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

import { Button, buttonClasses } from "@/components/ui/Button/Button";
import { Card } from "@/components/ui/Card/Card";
import { Loader } from "@/components/ui/Loader/Loader";
import { EmptyState } from "@/components/ui/EmptyState/EmptyState";
import { QuantitySelector } from "@/components/ui/QuantitySelector/QuantitySelector";

import {
  getProductDetails,
  getRelatedProducts,
} from "@/services/product.service";

import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";

import { formatPrice, toErrorMessage } from "@/utils/format";
import { getDiscountOriginalPrice } from "@/utils/discount";

import styles from "./ProductDetails.module.css";
import categoryStyles from "@/pages/Category/Category.module.css";

// Category slug that should show the care instructions block.
const CARE_INSTRUCTIONS_CATEGORY_SLUG = "isdal";

// Splits a description like:
//
// "إسدال مقفول... اليومي. الخامة: فيسكوز قطن 100%. التصميم: مشجر أو سادة. المقاس: ..."
//
// into an intro sentence and a list of labeled spec lines.
//
// Backend descriptions currently follow:
// "sentence. Label: value. Label: value."
//
// If a description has no "Label: value" segments at all,
// everything falls back into intro and specs stays empty.
function parseDescription(description: string) {
  const segments = description
    .split(/(?<=\.)\s+/)
    .map((s) => s.trim())
    .filter(Boolean);

  const introParts: string[] = [];
  const specs: { label: string; value: string }[] = [];

  for (const seg of segments) {
    const match = seg.match(/^([^:：]+)[:：]\s*(.+)$/);

    if (match) {
      specs.push({
        label: match[1].trim(),
        value: match[2].trim().replace(/\.$/, ""),
      });
    } else {
      introParts.push(seg);
    }
  }

  return {
    intro: introParts.join(" "),
    specs,
  };
}

export function ProductDetailsPage({ id }: { id: string }) {
  const { addItem } = useCart();
  const { t, lang } = useLanguage();

  const [size, setSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  // Active image gallery index & swipe tracking
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const productQuery = useQuery({
    queryKey: ["product", id, lang],
    queryFn: () => getProductDetails(id),
    retry: false,
  });

  const relatedQuery = useQuery({
    queryKey: ["related-products", id, lang],
    queryFn: () => getRelatedProducts(id),
    retry: false,
  });

  const product = productQuery.data;

  const images = product?.images ?? [];

  const soldOut = product ? product.stock === 0 : false;

  const showCareInstructions =
    product?.categorySlug === CARE_INSTRUCTIONS_CATEGORY_SLUG;

  // ---------------------------------------------------------
  // Main product discount
  // ---------------------------------------------------------
  const discountOriginalPrice = product
    ? getDiscountOriginalPrice(product.categorySlug, product.price)
    : undefined;

  const hasDiscount = discountOriginalPrice !== undefined;

  // ---------------------------------------------------------
  // Description
  // ---------------------------------------------------------
  const { intro: descriptionIntro, specs: descriptionSpecs } = product
    ? parseDescription(product.description)
    : {
        intro: "",
        specs: [] as { label: string; value: string }[],
      };

  // Handle "one size" string and array sizes
  const sizes = product
    ? Array.isArray(product.sizes)
      ? product.sizes
      : product.sizes
        ? [product.sizes]
        : []
    : [];

  // ---------------------------------------------------------
  // Gallery
  // ---------------------------------------------------------
  const handlePrevImage = () => {
    if (images.length === 0) return;

    setSelectedImageIndex(
      (prev) => (prev - 1 + images.length) % images.length,
    );
  };

  const handleNextImage = () => {
    if (images.length === 0) return;

    setSelectedImageIndex((prev) => (prev + 1) % images.length);
  };

  // ---------------------------------------------------------
  // Touch handlers for mobile swipe
  // ---------------------------------------------------------
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null || images.length <= 1) return;

    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    // Minimum swipe threshold: 50px
    if (diff > 50) {
      // Swiped left -> next photo
      handleNextImage();
    } else if (diff < -50) {
      // Swiped right -> previous photo
      handlePrevImage();
    }

    setTouchStartX(null);
  };

  // ---------------------------------------------------------
  // Add to cart
  // ---------------------------------------------------------
  function handleAddToCart() {
    if (!product || soldOut) return;

    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image:
        product.images?.[selectedImageIndex] ??
        product.images?.[0] ??
        "",
      size: sizes.length > 0 ? (size ?? sizes[0]) : undefined,
      quantity,
    });

    setAdded(true);
  }

  return (
    <section className="shop-section">
      <div className="shop-container">
        {productQuery.isPending && (
          <Loader label={t("product.loading")} />
        )}

        {productQuery.isError && (
          <EmptyState
            title={t("product.errorTitle")}
            message={toErrorMessage(productQuery.error)}
            action={
              <button
                className={buttonClasses("outline")}
                onClick={() => void productQuery.refetch()}
              >
                {t("common.tryAgain")}
              </button>
            }
          />
        )}

        {product && (
          <>
            <div className={styles.layout}>
              {/* Multi-Image Gallery */}
              <div className={styles.media}>
                {images.length > 0 && (
                  <div
                    className={styles.galleryWrapper}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                  >
                    <div className={styles.mainImageContainer}>
                      <img
                        src={
                          images[selectedImageIndex] ??
                          images[0]
                        }
                        alt={`${product.name} ${
                          selectedImageIndex + 1
                        }`}
                        className={styles.mainImage}
                      />

                      {soldOut && (
                        <span className={categoryStyles.soldOutBadge}>
                          {lang === "ar"
                            ? "نفذت الكمية"
                            : "SOLD OUT"}
                        </span>
                      )}

                      {images.length > 1 && (
                        <>
                          <button
                            type="button"
                            className={`${styles.navButton} ${styles.prevButton}`}
                            onClick={handlePrevImage}
                            aria-label={t("product.prevImage")}
                          >
                            ‹
                          </button>

                          <button
                            type="button"
                            className={`${styles.navButton} ${styles.nextButton}`}
                            onClick={handleNextImage}
                            aria-label={t("product.nextImage")}
                          >
                            ›
                          </button>
                        </>
                      )}
                    </div>

                    {/* Thumbnail List */}
                    {images.length > 1 && (
                      <div className={styles.thumbnails}>
                        {images.map((img, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() =>
                              setSelectedImageIndex(idx)
                            }
                            className={`${styles.thumbBtn} ${
                              idx === selectedImageIndex
                                ? styles.thumbActive
                                : ""
                            }`}
                          >
                            <img
                              src={img}
                              alt={`${t(
                                "product.thumbnail",
                              )} ${idx + 1}`}
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Product Information */}
              <div>
                <h1 className={styles.title}>
                  {product.name}
                </h1>

                {/* Main Product Price */}
                {hasDiscount ? (
                  <div className={styles.priceRow}>
                    <span className={styles.priceOriginal}>
                      {formatPrice(discountOriginalPrice)}
                    </span>

                    <span className={styles.price}>
                      {formatPrice(product.price)}
                    </span>
                  </div>
                ) : (
                  <div className={styles.price}>
                    {formatPrice(product.price)}
                  </div>
                )}

                <p className={styles.desc}>
                  {descriptionIntro}
                </p>

                {descriptionSpecs.length > 0 && (
                  <ul className={styles.descSpecs}>
                    {descriptionSpecs.map((spec) => (
                      <li key={spec.label}>
                        <span
                          className={styles.descSpecLabel}
                        >
                          {spec.label}:
                        </span>{" "}
                        {spec.value}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Sizes */}
                {sizes.length > 0 && (
                  <>
                    <span className={styles.blockLabel}>
                      {t("product.sizes")}
                    </span>

                    <div className={styles.sizes}>
                      {sizes.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setSize(option)}
                          disabled={soldOut}
                          className={`${styles.size} ${
                            (size ?? sizes[0]) === option
                              ? styles.sizeActive
                              : ""
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </>
                )}

                {/* Quantity */}
                {!soldOut && (
                  <>
                    <span className={styles.blockLabel}>
                      {t("product.quantity")}
                    </span>

                    <QuantitySelector
                      value={quantity}
                      onChange={setQuantity}
                    />
                  </>
                )}

                {/* Actions */}
                <div className={styles.addRow}>
                  {soldOut ? (
                    <span
                      className={categoryStyles.soldOutBtn}
                    >
                      {lang === "ar"
                        ? "نفذت الكمية"
                        : "SOLD OUT"}
                    </span>
                  ) : (
                    <Button onClick={handleAddToCart}>
                      {t("product.addToCart")}
                    </Button>
                  )}

                  <Link
                    to="/cart"
                    className={buttonClasses("outline")}
                  >
                    {t("product.goToCart")}
                  </Link>
                </div>

                {added && (
                  <p className={styles.notice}>
                    {t("product.added")}
                  </p>
                )}

                {/* Care Instructions */}
                {showCareInstructions && (
                  <Card className={styles.careCard}>
                    <h3 className={styles.careTitle}>
                      {t("product.careTitle")}
                    </h3>

                    <ul className={styles.careList}>
                      <li>{t("product.careLine1")}</li>
                      <li>{t("product.careLine2")}</li>
                      <li>{t("product.careLine3")}</li>
                    </ul>

                    <p className={styles.careNote}>
                      {t("product.careNote")}
                    </p>
                  </Card>
                )}
              </div>
            </div>

            {/* Related Products */}
            <div className={styles.related}>
              <h2 className={styles.relatedTitle}>
                {t("product.relatedTitle")}
              </h2>

              {relatedQuery.isPending && (
                <Loader label={t("product.relatedLoading")} />
              )}

              {relatedQuery.isError && (
                <EmptyState
                  title={t("product.relatedError")}
                  message={toErrorMessage(relatedQuery.error)}
                />
              )}

              {relatedQuery.data &&
                relatedQuery.data.length === 0 && (
                  <EmptyState
                    title={t("product.relatedEmpty")}
                  />
                )}

              {relatedQuery.data &&
                relatedQuery.data.length > 0 && (
                  <div className={categoryStyles.grid}>
                    {relatedQuery.data.map((item) => {
                      const relatedDiscountOriginalPrice =
                        getDiscountOriginalPrice(
                          item.categorySlug,
                          item.price,
                        );

                      const relatedHasDiscount =
                        relatedDiscountOriginalPrice !==
                        undefined;

                      return (
                        <Card
                          key={item.id}
                          flush
                          hoverable
                        >
                          <div
                            className={
                              categoryStyles.media
                            }
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              loading="lazy"
                            />
                          </div>

                          <div
                            className={
                              categoryStyles.body
                            }
                          >
                            <h3
                              className={
                                categoryStyles.name
                              }
                            >
                              {item.name}
                            </h3>

                            {relatedHasDiscount ? (
                              <div
                                className={
                                  categoryStyles.priceRow
                                }
                              >
                                <span
                                  className={
                                    categoryStyles.priceOriginal
                                  }
                                >
                                  {formatPrice(
                                    relatedDiscountOriginalPrice,
                                  )}
                                </span>

                                <span
                                  className={
                                    categoryStyles.price
                                  }
                                >
                                  {formatPrice(item.price)}
                                </span>
                              </div>
                            ) : (
                              <span
                                className={
                                  categoryStyles.price
                                }
                              >
                                {formatPrice(item.price)}
                              </span>
                            )}

                            <div
                              className={
                                categoryStyles.action
                              }
                            >
                              <Link
                                to="/product/$id"
                                params={{ id: item.id }}
                                className={buttonClasses(
                                  "outline",
                                )}
                              >
                                {t(
                                  "category.viewDetails",
                                )}
                              </Link>
                            </div>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}


