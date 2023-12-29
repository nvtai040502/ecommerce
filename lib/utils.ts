import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { ReadonlyURLSearchParams } from 'next/navigation';
import { z } from "zod";
import { toast } from "sonner";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const ensureStartsWith = (stringToCheck: string, startsWith: string) =>
  stringToCheck.startsWith(startsWith) ? stringToCheck : `${startsWith}${stringToCheck}`;

export const createUrl = (pathname: string, params: URLSearchParams | ReadonlyURLSearchParams) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? '?' : ''}${paramsString}`;

  return `${pathname}${queryString}`;
};

export const formatPrice = (price: string | number, currencyCode: string): string => {
  const parsedPrice = typeof price === 'string' ? parseFloat(price) : price;
  
  if (isNaN(parsedPrice)) {
    throw new Error('Invalid price format');
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode
  }).format(parsedPrice);
};


export function isMacOs() {
  if (typeof window === "undefined") return false

  return window.navigator.userAgent.includes("Mac")
}


