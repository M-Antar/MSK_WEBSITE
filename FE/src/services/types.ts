
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

export interface OrderAddress {
  street: string;
  city: string;
  country: string;
  phoneNumber: string;
}

export interface OrderProduct {
  productId: string;
  quantity: number;
  price: number;
  totalPrice: number;
}

export interface PlaceOrderPayload {
  address: OrderAddress;
  products: OrderProduct[];
  paymentMethod: PaymentMethod;
}

export interface OrderConfirmation {
  orderId: string;
  status: string;
  total: number;
}

