/** Formats a numeric price coming from the API. */
export function formatPrice(value: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(value);
}

/** Turns an API/service error into a short user-facing message. */
export function toErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return "Something went wrong while loading this content.";
}

export function normalizeSize(size: string | null | undefined): string {
  if (!size) return "One Size";
  return size.trim().toLowerCase() === "one size" ? "One Size" : size;
}