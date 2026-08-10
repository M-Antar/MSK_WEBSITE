  import { useEffect, useRef, useState } from "react";
  import { Link } from "@tanstack/react-router";
  import { useQuery } from "@tanstack/react-query";
  import { Card } from "@/components/ui/Card/Card";
  import { Loader } from "@/components/ui/Loader/Loader";
  import { buttonClasses } from "@/components/ui/Button/Button";
  import { getCategories } from "@/services/product.service";
  import { useLanguage } from "@/context/LanguageContext";
  import styles from "./Home.module.css";

  const heroImages = [
    "https://res.cloudinary.com/dvq8x0qja/image/upload/v1786019395/Eisdal-Green_ws06kc.jpg",
    "https://res.cloudinary.com/dvq8x0qja/image/upload/v1786020794/Eisdal-black_rgjeta.jpg",
    "https://res.cloudinary.com/dvq8x0qja/image/upload/v1786050594/Eisdal-Beig_2_bnfs93.jpg",
    "https://res.cloudinary.com/dvq8x0qja/image/upload/v1786050595/Eisdal-Pink_hocadt.jpg",
  ];

  const categoryImages = [
    "https://res.cloudinary.com/dvq8x0qja/image/upload/v1786019395/Eisdal-Green_ws06kc.jpg",
    "https://res.cloudinary.com/dvq8x0qja/image/upload/v1786136546/Mosalya_lmresx.jpg",
    "https://res.cloudinary.com/dvq8x0qja/image/upload/v1786053615/Perfume__buug4r.jpg",
  ];

  const AUTOPLAY_INTERVAL = 4500;

  export function HomePage() {
    const { t, lang } = useLanguage();

    const [activeIndex, setActiveIndex] = useState(0);
    const [touchStartX, setTouchStartX] = useState<number | null>(null);
    const [isPaused, setIsPaused] = useState(false);

    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const {
      data: categories,
      isPending: isCategoriesPending,
    } = useQuery({
      queryKey: ["categories", lang],
      queryFn: getCategories,
      retry: false,
    });

    const goPrev = () => {
      setActiveIndex(
        (prev) => (prev - 1 + heroImages.length) % heroImages.length
      );
    };

    const goNext = () => {
      setActiveIndex((prev) => (prev + 1) % heroImages.length);
    };

    useEffect(() => {
      if (isPaused || heroImages.length <= 1) return;

      timerRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % heroImages.length);
      }, AUTOPLAY_INTERVAL);

      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      };
    }, [isPaused]);

    const pauseThenResume = () => {
      setIsPaused(true);

      window.setTimeout(() => {
        setIsPaused(false);
      }, AUTOPLAY_INTERVAL);
    };

    const handleManualGo = (idx: number) => {
      setActiveIndex(idx);
      pauseThenResume();
    };

    const handleTouchStart = (e: React.TouchEvent) => {
      setTouchStartX(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
      if (touchStartX === null) return;

      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartX - touchEndX;

      if (diff > 50) {
        goNext();
        pauseThenResume();
      } else if (diff < -50) {
        goPrev();
        pauseThenResume();
      }

      setTouchStartX(null);
    };

    return (
      <>
        {/* ================= HERO ================= */}
        <section
          className={styles["hero"]}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className={styles["heroSwiper"]}>
            {heroImages.map((src, idx) => (
              <img
                key={src}
                src={src}
                alt=""
                className={`${styles["heroImage"]} ${
                  idx === activeIndex
                    ? styles["heroImageActive"]
                    : ""
                }`}
                loading={idx === 0 ? "eager" : "lazy"}
              />
            ))}

            <div className={styles["heroScrim"]} />
          </div>

          <div className="shop-container">
            <div className={styles["heroInner"]}>
              <h1 className={styles["heroTitle"]}>
                {t("home.heroTitle")}
              </h1>

              <p className={styles["heroText"]}>
                {t("home.heroText")}
              </p>

              <div className={styles["heroActions"]}>
                <Link
                  to="/products"
                  className={buttonClasses("light")}
                >
                  {t("home.shopNow")}
                </Link>
              </div>
            </div>
          </div>

          {heroImages.length > 1 && (
            <div className={styles["dots"]}>
              {heroImages.map((src, idx) => (
                <button
                  key={src}
                  type="button"
                  className={`${styles["dot"]} ${
                    idx === activeIndex
                      ? styles["dotActive"]
                      : ""
                  }`}
                  onClick={() => handleManualGo(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </section>

        {/* ================= CATEGORIES ================= */}
        {(isCategoriesPending ||
          (categories && categories.length > 0)) && (
          <section className="shop-section">
            <div className="shop-container">
              <div className={styles["categoriesHeader"]}>
                <span className={styles["eyebrow"]}>
                  {t("home.eyebrow")}
                </span>

                <h2 className={styles["categoriesTitle"]}>
                  {t("products.title")}
                </h2>

                <p className={styles["categoriesSubtitle"]}>
                  {t("products.subtitle")}
                </p>
              </div>

              {isCategoriesPending ? (
                <Loader label={t("products.loading")} />
              ) : (
                <div className={styles["categoriesGrid"]}>
                  {categories!.map((category, index) => {
                    const categoryImage =
                      categoryImages[index];

                    return (
                      <Card
                        key={category.id}
                        hoverable
                        className={styles["categoryCard"]}
                      >
                        {/* Category Photo */}
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

                        {/* Category Information */}
                        <div
                          className={
                            styles["categoryContent"]
                          }
                        >
                          <h3
                            className={
                              styles["categoryName"]
                            }
                          >
                            {category.name}
                          </h3>

                          <p
                            className={
                              styles["categoryDesc"]
                            }
                          >
                            {category.description}
                          </p>

                          <div
                            className={
                              styles["categoryAction"]
                            }
                          >
                            <Link
                              to="/products/$category"
                              params={{
                                category: category.id,
                              }}
                              className={buttonClasses(
                                "outline"
                              )}
                            >
                              {t(
                                "products.viewProducts"
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
          </section>
        )}
      </>
    );
  }