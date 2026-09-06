import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/Card/Card";
import { Loader } from "@/components/ui/Loader/Loader";
import { EmptyState } from "@/components/ui/EmptyState/EmptyState";
import { buttonClasses } from "@/components/ui/Button/Button";
import { getCategories } from "@/services/product.service";
import { useLanguage } from "@/context/LanguageContext";
import { toErrorMessage } from "@/utils/format";
import styles from "./Products.module.css";

/**
 * Category images.
 * The order matches the categories returned by the API.
 */
  const categoryImages = [
    "https://res.cloudinary.com/dvq8x0qja/image/upload/v1786019395/Eisdal-Green_ws06kc.jpg",
    "https://res.cloudinary.com/dvq8x0qja/image/upload/v1787838254/IMG_8126_pfirgr.jpg",
    "https://res.cloudinary.com/dvq8x0qja/image/upload/v1786053615/Perfume__buug4r.jpg",
    "https://res.cloudinary.com/dvq8x0qja/image/upload/v1787832825/31.jfif_ktktx0.jpg",
    "https://res.cloudinary.com/dvq8x0qja/image/upload/v1786136546/Mosalya_lmresx.jpg",
    "https://res.cloudinary.com/dvq8x0qja/image/upload/v1788598595/IMG_8115_nnzaoa.jpg"
  ];
export function ProductsPage() {
  const { t, lang } = useLanguage();

  const {
    data,
    isPending,
    isError,
    error,
    refetch,
  } = useQuery({
    // lang is part of the key so the API can return localised copy.
    queryKey: ["categories", lang],
    queryFn: getCategories,
    retry: false,
  });

  return (
    <section className="shop-section">
      <div className="shop-container">
        {/* ================= HEADER ================= */}
        <div className={styles["header"]}>
          <h1 className={styles["title"]}>
            {t("products.title")}
          </h1>

          <p className={styles["subtitle"]}>
            {t("products.subtitle")}
          </p>
        </div>

        {/* ================= LOADING ================= */}
        {isPending ? (
          <Loader label={t("products.loading")} />
        ) : null}

        {/* ================= ERROR ================= */}
        {isError ? (
          <EmptyState
            title={t("products.errorTitle")}
            message={toErrorMessage(error)}
            action={
              <button
                className={buttonClasses("outline")}
                onClick={() => void refetch()}
              >
                {t("common.tryAgain")}
              </button>
            }
          />
        ) : null}

        {/* ================= EMPTY ================= */}
        {data && data.length === 0 ? (
          <EmptyState
            title={t("products.emptyTitle")}
            message={t("products.emptyMessage")}
          />
        ) : null}

        {/* ================= CATEGORIES ================= */}
        {data && data.length > 0 ? (
          <div className={styles["grid"]}>
            {data.map((category, index) => {
              const categoryImage =
                categoryImages[index] ?? categoryImages[0];

              return (
                <Card
                  key={category.id}
                  hoverable
                  className={styles["categoryCard"]}
                >
                  {/* Category Image */}
                  <div
                    className={
                      styles["categoryImageWrapper"]
                    }
                  >
                    <img
                      src={categoryImage}
                      alt={category.name}
                      className={
                        styles["categoryImage"]
                      }
                      loading="lazy"
                    />
                  </div>

                  {/* Category Content */}
                  <div
                    className={
                      styles["categoryContent"]
                    }
                  >
                    <h2 className={styles["name"]}>
                      {category.name}
                    </h2>

                    <p className={styles["desc"]}>
                      {category.description}
                    </p>

                    <div className={styles["action"]}>
                      <Link
                        to="/products/$category"
                        params={{
                          category: category.id,
                        }}
                        className={buttonClasses("primary")}
                      >
                        {t("products.viewProducts")}
                      </Link>
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