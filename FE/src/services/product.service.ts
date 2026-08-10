import { api } from "./api";

import type {
  Category,
  Product,
  ProductDetails,
} from "./types";

export async function getCategories(): Promise<Category[]> {
  const { data } = await api.get<Category[]>("/category");
  return data;
}

export async function getCategoryById(categoryId: string): Promise<Category> {
  const { data } = await api.get<Category>(`/category/${categoryId}`);
  return data;
}

export async function getProductsByCategory(
  categoryId: string
): Promise<Product[]> {
  const { data } = await api.get<Product[]>(
    `/product/category/${categoryId}`
  );
  return data;
}

export async function getProductDetails(
  productId: string
): Promise<ProductDetails> {
  const { data } = await api.get<ProductDetails>(`/product/${productId}`);
  return data;
}

export async function getRelatedProducts(
  productId: string
): Promise<Product[]> {
  const { data } = await api.get<Product[]>(`/product/${productId}/related`);
  return data;
}