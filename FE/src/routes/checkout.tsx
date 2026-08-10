import { createFileRoute } from "@tanstack/react-router";
import { CheckoutPage } from "@/pages/Checkout/CheckoutPage";

// No SiteLayout here on purpose: checkout has no navbar and no footer.
export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — MSK" },
      { name: "description", content: "Enter your details and place your MSK order." },
      { property: "og:title", content: "Checkout — MSK" },
      { property: "og:description", content: "Complete your order in one simple step." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CheckoutPage,
});
