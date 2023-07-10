export function formatPriceToSend(price: string) {
  const lastTowDigits = price.length - 2;
  return `${price.slice(0, lastTowDigits)}.${price.slice(lastTowDigits)}`;
}
