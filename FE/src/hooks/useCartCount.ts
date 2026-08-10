import { useCart } from "@/context/CartContext";

/** Number of units currently in the cart (used by the navbar badge). */
export function useCartCount(): number {
  return useCart().itemCount;
}
