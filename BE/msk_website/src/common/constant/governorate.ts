export enum Governorate {
  CAIRO = 'CAIRO',
  QALIOUBIA = 'QALIOUBIA',
  // add more governorates here as needed, e.g.:
  // GIZA = 'GIZA',
  // ALEXANDRIA = 'ALEXANDRIA',
}

export const SHIPPING_FEES: Record<Governorate, number> = {
  [Governorate.CAIRO]: 60,
  [Governorate.QALIOUBIA]: 80,
};

export const DEFAULT_SHIPPING_FEE = 80;

export function getShippingFee(governorate: Governorate): number {
  return SHIPPING_FEES[governorate] ?? DEFAULT_SHIPPING_FEE;
}