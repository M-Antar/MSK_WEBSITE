export enum Governorate {
  CAIRO = 'CAIRO',
  QALIOUBIA = 'QALIOUBIA',
    GIZA = 'GIZA',
  // add more governorates here as needed, e.g.:

  // ALEXANDRIA = 'ALEXANDRIA',
}

export const SHIPPING_FEES: Record<Governorate, number> = {
  [Governorate.CAIRO]: 80,
  [Governorate.QALIOUBIA]: 80,
  [Governorate.GIZA]: 80,

  
};

export const DEFAULT_SHIPPING_FEE = 120;

export function getShippingFee(governorate: Governorate): number {
  return SHIPPING_FEES[governorate] ?? DEFAULT_SHIPPING_FEE;
}