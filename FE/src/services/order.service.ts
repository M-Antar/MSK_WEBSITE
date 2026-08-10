
import { api } from "./api";
import type {
  OrderConfirmation,
  PlaceOrderPayload,
} from "./types";

/**
 * Place a new order.
 *
 * Backend:
 * POST /order/place
 */
export async function placeOrder(
  payload: PlaceOrderPayload
): Promise<OrderConfirmation> {
  console.log("📤 PLACING ORDER");
  console.log("Order payload:", payload);

  const response = await api.post<OrderConfirmation>(
    "/order/place",
    payload
  );

  console.log("✅ ORDER RESPONSE:", response.data);

  return response.data;
}
