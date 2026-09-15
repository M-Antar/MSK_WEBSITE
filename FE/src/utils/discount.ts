export const DISCOUNT_ORIGINAL_PRICE_BY_CATEGORY: Record<string, number> = {
  isdal: 750,
  mslayh:500
};

export function getDiscountOriginalPrice(
  categorySlug: string | undefined,
  currentPrice: number,
): number | undefined {
  if (!categorySlug) return undefined;

  const originalPrice =
    DISCOUNT_ORIGINAL_PRICE_BY_CATEGORY[categorySlug];

  if (
    originalPrice === undefined ||
    originalPrice <= currentPrice
  ) {
    return undefined;
  }

  return originalPrice;
}