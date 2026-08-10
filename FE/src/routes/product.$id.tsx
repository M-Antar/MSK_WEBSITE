import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ProductDetailsPage } from "@/pages/ProductDetails/ProductDetailsPage";

export const Route = createFileRoute("/product/$id")({
  head: () => ({
    meta: [
      { title: "Product Details — MSK" },
      {
        name: "description",
        content: "Sizes, pricing, and full details for this MSK product.",
      },
      { property: "og:title", content: "Product Details — MSK" },
      {
        property: "og:description",
        content: "See sizes, price, and the full description before adding to your cart.",
      },
    ],
  }),
  component: ProductRoute,
});

function ProductRoute() {
  const { id } = Route.useParams();
  return (
    <SiteLayout>
      <ProductDetailsPage id={id} />
    </SiteLayout>
  );
}
