import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { CategoryPage } from "@/pages/Category/CategoryPage";

export const Route = createFileRoute("/products/$category")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.category} — MSK` },
      {
        name: "description",
        content: `Browse products in the ${params.category} category at MSK.`,
      },
      { property: "og:title", content: `${params.category} — MSK` },
      {
        property: "og:description",
        content: `Products available in the ${params.category} category.`,
      },
    ],
  }),
  component: CategoryRoute,
});

function CategoryRoute() {
  const { category } = Route.useParams();
  return (
    <SiteLayout>
      <CategoryPage category={category} />
    </SiteLayout>
  );
}
