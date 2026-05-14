import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Conditional class composer — clsx + Tailwind class deduplication. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
