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
  categorySlug?: string;
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
export type Governorate =
  | "CAIRO"
  | "GIZA"
  | "ALEXANDRIA"
  | "QALIOUBIA"
  | "DAKAHLIA"
  | "SHARQIA"
  | "GHARBIA"
  | "MONUFIA"
  | "BEHEIRA"
  | "KAFR_EL_SHEIKH"
  | "DAMIETTA"
  | "PORT_SAID"
  | "ISMAILIA"
  | "SUEZ"
  | "NORTH_SINAI"
  | "SOUTH_SINAI"
  | "BENI_SUEF"
  | "FAYOUM"
  | "MINYA"
  | "ASSIUT"
  | "SOHAG"
  | "QENA"
  | "LUXOR"
  | "ASWAN"
  | "RED_SEA"
  | "NEW_VALLEY"
  | "MATROUH";

export const GOVERNORATE_FEES: Record<Governorate, number> = {
  CAIRO: 80,
  GIZA: 80,
  ALEXANDRIA: 120,
  QALIOUBIA: 80,
  DAKAHLIA: 120,
  SHARQIA: 120,
  GHARBIA: 120,
  MONUFIA: 120,
  BEHEIRA: 120,
  KAFR_EL_SHEIKH: 120,
  DAMIETTA: 120,
  PORT_SAID: 120,
  ISMAILIA: 120,
  SUEZ: 120,
  NORTH_SINAI: 120,
  SOUTH_SINAI: 120,
  BENI_SUEF: 120,
  FAYOUM: 120,
  MINYA: 120,
  ASSIUT: 120,
  SOHAG: 120,
  QENA: 120,
  LUXOR: 120,
  ASWAN: 120,
  RED_SEA: 120,
  NEW_VALLEY: 120,
  MATROUH: 120,
};

export const GOVERNORATE_LABELS: Record<Governorate, string> = {
  CAIRO: "Cairo",
  GIZA: "Giza",
  ALEXANDRIA: "Alexandria",
  QALIOUBIA: "Qalioubia",
  DAKAHLIA: "Dakahlia",
  SHARQIA: "Sharqia",
  GHARBIA: "Gharbia",
  MONUFIA: "Monufia",
  BEHEIRA: "Beheira",
  KAFR_EL_SHEIKH: "Kafr El Sheikh",
  DAMIETTA: "Damietta",
  PORT_SAID: "Port Said",
  ISMAILIA: "Ismailia",
  SUEZ: "Suez",
  NORTH_SINAI: "North Sinai",
  SOUTH_SINAI: "South Sinai",
  BENI_SUEF: "Beni Suef",
  FAYOUM: "Fayoum",
  MINYA: "Minya",
  ASSIUT: "Assiut",
  SOHAG: "Sohag",
  QENA: "Qena",
  LUXOR: "Luxor",
  ASWAN: "Aswan",
  RED_SEA: "Red Sea",
  NEW_VALLEY: "New Valley",
  MATROUH: "Matrouh",
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