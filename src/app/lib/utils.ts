import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a number as currency with locale-specific formatting
 * @param amount - The numeric amount to format
 * @param currency - Currency code (default: 'EUR')
 * @param locale - Locale for formatting (default: 'tr-TR')
 */
export function formatCurrency(
  amount: number,
  currency: string = "EUR",
  locale: string = "tr-TR"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Formats a number with thousand separators
 * @param amount - The numeric amount to format
 * @param locale - Locale for formatting (default: 'tr-TR')
 */
export function formatNumber(amount: number, locale: string = "tr-TR"): string {
  return new Intl.NumberFormat(locale).format(amount);
}

/**
 * Formats a number as weight (KG)
 * @param amount - The numeric amount in KG
 * @param locale - Locale for formatting (default: 'tr-TR')
 */
export function formatWeight(amount: number, locale: string = "tr-TR"): string {
  return `${new Intl.NumberFormat(locale).format(amount)} KG`;
}
