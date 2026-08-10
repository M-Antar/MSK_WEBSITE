import { NotImplementedError } from "./api";
import type { Cart } from "./types";

/**
 * Cart service.
 *
 * The cart UI currently reads client-side state from CartContext.
 * Once these endpoints exist, CartContext should call them and treat the
 * server response as the source of truth.
 */

/**
 * Purpose: add a product variant to the cart.
 *
 * POST /cart
 * Request body: { productId: string, size: string, quantity: number }
 * Response: { items: CartItem[], total: number }
 */
export async function addToCart(
  productId: string,
  size: string,
  quantity: number,
): Promise<Cart> {
  // return (await api.post<Cart>("/cart", { productId, size, quantity })).data;
  void [productId, size, quantity];
  throw new NotImplementedError("POST /cart");
}

/**
 * Purpose: load the current cart (cart page + navbar badge).
 *
 * GET /cart
 * Request body: none
 * Response: {
 *   items: [{ id, productId, name, price, image, size, quantity }],
 *   total: number
 * }
 */
export async function getCart(): Promise<Cart> {
  // return (await api.get<Cart>("/cart")).data;
  throw new NotImplementedError("GET /cart");
}

/**
 * Purpose: change the quantity of one cart line.
 *
 * PATCH /cart/:id
 * Request body: { quantity: number }
 * Response: { items: CartItem[], total: number }
 */
export async function updateQuantity(cartItemId: string, quantity: number): Promise<Cart> {
  // return (await api.patch<Cart>(`/cart/${cartItemId}`, { quantity })).data;
  void [cartItemId, quantity];
  throw new NotImplementedError("PATCH /cart/:id");
}

/**
 * Purpose: remove one cart line.
 *
 * DELETE /cart/:id
 * Request body: none
 * Response: { items: CartItem[], total: number }
 */
export async function removeItem(cartItemId: string): Promise<Cart> {
  // return (await api.delete<Cart>(`/cart/${cartItemId}`)).data;
  void cartItemId;
  throw new NotImplementedError("DELETE /cart/:id");
}
