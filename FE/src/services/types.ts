export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  images: string[];
  description: string;
  colors: string[];
  stock: number;
}

export interface ProductDetails {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  sizes: string[];
  colors: string[];
  stock: number;
  /**
   * Slug of the product's category (e.g. "isdal"), used to conditionally
   * render category-specific content like care instructions.
   * NOTE: backend's GET /product/:id must be updated to populate/return
   * this field - see the note in product.service.ts. Until then this
   * will be `undefined` at runtime even though TypeScript won't complain.
   */
  categorySlug?: string;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  size?: string;
  color?: string;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

/* =========================
   ORDER TYPES
========================= */

export type PaymentMethod =
  | "COD"
  | "CREDIT_CARD"
  | "E_WALLET";

/* =========================
   GOVERNORATE / SHIPPING FEES
========================= */

export type Governorate = "CAIRO" | "QALIOUBIA";

export const GOVERNORATE_FEES: Record<Governorate, number> = {
  CAIRO: 60,
  QALIOUBIA: 80,
};

export const GOVERNORATE_LABELS: Record<Governorate, string> = {
  CAIRO: "Cairo",
  QALIOUBIA: "Qalioubia",
};

export interface OrderAddress {
  street: string;
  city: string;
  country: string;
  phoneNumber: string;
  governorate: Governorate;
}

export interface OrderProduct {
  productId: string;
  quantity: number;
  price: number;
  totalPrice: number;
}

export interface PlaceOrderPayload {
  fullName: string;
  email: string;
  address: OrderAddress;
  products: {
    productId: string;
    quantity: number;
  }[];
  paymentMethod: PaymentMethod;
}

export interface OrderConfirmation {
  orderId: string;
  status: string;
  shippingFee: number;
  total: number;
}