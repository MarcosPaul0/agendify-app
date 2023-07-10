export function formatPrice(price: number) {
  return Intl.NumberFormat('pt-BR', {
    currency: 'BRL',
    style: 'currency',
  }).format(price);
}
