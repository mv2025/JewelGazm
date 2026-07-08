import { Money } from '@/lib/shopify';

/**
 * Formats a money object (amount + currencyCode) into localized price strings
 */
export function formatPrice(price: Money | null | undefined): string {
  if (!price) return '₹0';
  const num = parseFloat(price.amount);
  if (isNaN(num)) return '₹0';

  // Use the raw amount directly (assuming it's now INR)
  const convertedAmount = num;

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(convertedAmount);
}
