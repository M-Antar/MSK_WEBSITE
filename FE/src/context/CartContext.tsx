import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { CartItem } from "@/services/types";

/**
 * Client-side cart state.
 *
 * TODO(backend):
 * Once the NestJS cart module exists, replace these local
 * mutations with calls to src/services/cart.service.ts.
 */

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  total: number;

  addItem: (item: Omit<CartItem, "id">) => void;

  updateQuantity: (
    cartItemId: string,
    quantity: number
  ) => void;

  removeItem: (cartItemId: string) => void;

  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

/**
 * Normalizes a size value for the purposes of merging cart lines.
 *
 * Why this exists:
 * The two entry points into the cart don't always agree on "size":
 *  - The product detail page gets the real size straight from the DB
 *    (e.g. "one size", "One Size", "one-size" depending on the record).
 *  - Quick add (category/product grid) doesn't have size data available
 *    at all for products in list view, so it sends `undefined`.
 *
 * Without normalizing, "one size" (from detail view) and `undefined`
 * (from quick add) are treated as different variants and create two
 * separate cart lines instead of merging into one with quantity 2.
 *
 * This collapses any "single/no real size" spelling - missing, "one
 * size", "one-size", "onesize", any casing/spacing - into the same
 * "default" bucket, while leaving genuinely distinct sizes (S, M, L...)
 * untouched so they still merge/split correctly.
 */
function normalizeSize(size?: string | null): string {
  if (!size) return "default";

  const collapsed = size.trim().toLowerCase().replace(/[\s_-]+/g, "");

  if (collapsed === "onesize" || collapsed === "") {
    return "default";
  }

  return collapsed;
}

function normalizeColor(color?: string | null): string {
  return color ? color.trim().toLowerCase() : "default";
}

export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback(
    (item: Omit<CartItem, "id">) => {
      setItems((prev) => {
        /*
         * A cart item is considered the same variant when:
         *
         * productId + normalized size + normalized color
         *
         * Normalizing (see normalizeSize/normalizeColor above) is what
         * lets quick add and the detail-view add merge into one line
         * even though they don't always agree on the raw size string.
         */
        const existing = prev.find(
          (i) =>
            i.productId === item.productId &&
            normalizeSize(i.size) === normalizeSize(item.size) &&
            normalizeColor(i.color) === normalizeColor(item.color)
        );

        if (existing) {
          return prev.map((i) =>
            i.id === existing.id
              ? {
                  ...i,
                  quantity: i.quantity + item.quantity,
                }
              : i
          );
        }

        return [
          ...prev,
          {
            ...item,
            id: `${item.productId}-${normalizeSize(item.size)}-${normalizeColor(
              item.color
            )}`,
          },
        ];
      });
    },
    []
  );

  const updateQuantity = useCallback(
    (cartItemId: string, quantity: number) => {
      setItems((prev) =>
        prev.map((i) =>
          i.id === cartItemId
            ? {
                ...i,
                quantity: Math.max(1, quantity),
              }
            : i
        )
      );
    },
    []
  );

  const removeItem = useCallback(
    (cartItemId: string) => {
      setItems((prev) =>
        prev.filter((i) => i.id !== cartItemId)
      );
    },
    []
  );

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const value = useMemo(
    () => ({
      items,

      itemCount: items.reduce(
        (sum, item) => sum + item.quantity,
        0
      ),

      total: items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      ),

      addItem,
      updateQuantity,
      removeItem,
      clearCart,
    }),
    [
      items,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
    ]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);

  if (!ctx) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return ctx;
}