import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ProductsPage } from "@/pages/Products/ProductsPage";

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: "Shop Categories — MSK" },
      {
        name: "description",
        content: "Browse MSK's two product categories and see what is currently in stock.",
      },
      { property: "og:title", content: "Shop Categories — MSK" },
      {
        property: "og:description",
        content: "Two categories, kept deliberately small. Pick one to start browsing.",
      },
    ],
  }),
  component: ProductsRoute,
});

function ProductsRoute() {
  return (
    <SiteLayout>
      <ProductsPage />
    </SiteLayout>
  );
}
