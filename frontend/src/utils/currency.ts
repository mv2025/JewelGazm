import { Money } from '@/lib/shopify';

/**
 * Formats a money object (amount + currencyCode) into localized price strings
 */
export function formatPrice(price: Money | null | undefined): string {
  if (!price) return '₹0';
  const num = parseFloat(price.amount);
  if (isNaN(num)) return '₹0';

  // Convert from base USD to INR (approximate exchange rate)
  const conversionRate = 83.5;
  const convertedAmount = num * conversionRate;

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(convertedAmount);
}
