
import { Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import type { MouseEvent } from "react";

import { Card } from "@/components/ui/Card/Card";
import { Loader } from "@/components/ui/Loader/Loader";
import { EmptyState } from "@/components/ui/EmptyState/EmptyState";
import { buttonClasses } from "@/components/ui/Button/Button";

import {
  getProductsByCategory,
  getCategoryById,
} from "@/services/product.service";

import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { formatPrice, toErrorMessage } from "@/utils/format";


import type { Product } from "@/services/types";

import styles from "./Category.module.css";

import { ShoppingCart } from "lucide-react";
import { getDiscountOriginalPrice } from "@/utils/discount";

export function CategoryPage({ category }: { category: string }) {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const {
    data: categoryInfo,
    isPending: isCategoryPending,
  } = useQuery({
    queryKey: ["category", category, lang],
    queryFn: () => getCategoryById(category),
    retry: false,
  });

  const {
    data,
    isPending,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["products", category, lang],
    queryFn: () => getProductsByCategory(category),
    retry: false,
  });

  const goToProduct = (id: string) => {
    void navigate({
      to: "/product/$id",
      params: { id },
    });
  };

  const handleQuickAdd = (
    e: MouseEvent<HTMLButtonElement>,
    product: Product,
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (product.stock === 0) {
      return;
    }

    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: undefined,
      color: undefined,
      quantity: 1,
    });
  };

  return (
    <section className="shop-section">
      <div className="shop-container">

        {/* HEADER */}
        <div className={styles["header"]}>
          <Link
            to="/products"
            className={styles["crumb"]}
          >
            {t("category.allCategories")}
          </Link>

          <h1 className={styles["title"]}>
            {isCategoryPending
              ? t("category.loading")
              : categoryInfo?.name ||
                t("products.title") ||
                "Products"}
          </h1>
        </div>

        {/* LOADING STATE */}
        {isPending ? (
          <Loader label={t("category.loading")} />
        ) : null}

        {/* ERROR STATE */}
        {isError ? (
          <EmptyState
            title={t("category.errorTitle")}
            message={toErrorMessage(error)}
            action={
              <button
                type="button"
                className={buttonClasses("outline")}
                onClick={() => void refetch()}
              >
                {t("common.tryAgain")}
              </button>
            }
          />
        ) : null}

        {/* EMPTY STATE */}
        {data && data.length === 0 ? (
          <EmptyState
            title={t("category.emptyTitle")}
            message={t("category.emptyMessage")}
            action={
              <Link
                to="/products"
                className={buttonClasses("outline")}
              >
                {t("category.back")}
              </Link>
            }
          />
        ) : null}

        {/* PRODUCT GRID */}
        {data && data.length > 0 ? (
          <div className={styles["grid"]}>
            {data.map((product) => {
              /*
               * Frontend discount:
               *
               * Example:
               * categorySlug = "isdal"
               * original price = 750
               * actual price = product.price (e.g. 550)
               *
               * The original price is only displayed when
               * it is greater than the current product price.
               */
              const discountOriginalPrice =
                getDiscountOriginalPrice(
                  product.categorySlug,
                  product.price,
                );

              const hasDiscount =
                discountOriginalPrice !== undefined;

              return (
                <Card
                  key={product.id}
                  flush
                  hoverable
                  className={styles["clickable"]}
                  onClick={() =>
                    goToProduct(product.id)
                  }
                >
                  {/* MEDIA & BADGE */}
                  <div className={styles["media"]}>
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                    />

                    {product.stock === 0 && (
                      <span
                        className={
                          styles["soldOutBadge"]
                        }
                      >
                        {lang === "ar"
                          ? "نفذت الكمية"
                          : "SOLD OUT"}
                      </span>
                    )}
                  </div>

                  {/* DETAILS */}
                  <div className={styles["body"]}>
                    <h2 className={styles["name"]}>
                      {product.name}
                    </h2>

                    {/* PRICE */}
                    {hasDiscount ? (
                      <div
                        className={
                          styles["priceRow"]
                        }
                      >
                        <span
                          className={
                            styles["priceOriginal"]
                          }
                        >
                          {formatPrice(
                            discountOriginalPrice,
                          )}
                        </span>

                        <span
                          className={
                            styles["price"]
                          }
                        >
                          {formatPrice(
                            product.price,
                          )}
                        </span>
                      </div>
                    ) : (
                      <span
                        className={
                          styles["price"]
                        }
                      >
                        {formatPrice(
                          product.price,
                        )}
                      </span>
                    )}

                    <p className={styles["desc"]}>
                      {product.description}
                    </p>

                    {/* ACTION */}
                    <div className={styles["action"]}>
                      {product.stock === 0 ? (
                        <span
                          className={
                            styles["soldOutBtn"]
                          }
                        >
                          {lang === "ar"
                            ? "نفذت الكمية"
                            : "SOLD OUT"}
                        </span>
                      ) : (
                        <button
                          type="button"
                          className={buttonClasses(
                            "outline",
                          )}
                          onClick={(e) =>
                            handleQuickAdd(
                              e,
                              product,
                            )
                          }
                          aria-label={t(
                            "category.quickAdd",
                          )}
                        >
                          <ShoppingCart
                            size={16}
                            aria-hidden="true"
                          />
                        </button>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        ) : null}
      </div>
    </section>
  );
}


