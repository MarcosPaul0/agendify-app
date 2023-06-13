/* eslint-disable no-useless-escape */
export function formatPriceValue(price: string | number) {
  return String(price).replace(/[R$ ,\.]/g, '');
}
