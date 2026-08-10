import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { CartPage } from "@/pages/Cart/CartPage";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — MSK" },
      { name: "description", content: "Review the items in your MSK cart before checking out." },
      { property: "og:title", content: "Your Cart — MSK" },
      { property: "og:description", content: "Review your items, quantities, and order total." },
    ],
  }),
  component: CartRoute,
});

function CartRoute() {
  return (
    <SiteLayout>
      <CartPage />
    </SiteLayout>
  );
}
