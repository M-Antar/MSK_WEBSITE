import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { HomePage } from "@/pages/Home/HomePage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MSK — Everyday Essentials, Carefully Chosen" },
      {
        name: "description",
        content:
          "MSK is a small independent shop for everyday essentials: two tight categories, quality materials, fast shipping.",
      },
      { property: "og:title", content: "MSK — Everyday Essentials, Carefully Chosen" },
      {
        property: "og:description",
        content: "A short, honest catalogue of well-made everyday essentials.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <SiteLayout>
      <HomePage />
    </SiteLayout>
  );
}
