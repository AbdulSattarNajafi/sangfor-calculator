import html2canvas from "html2canvas";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { UserInputDataType } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertToArray(texts: string) {
  return texts.split("\n").map((text) => text.trim());
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
  }).format(new Date(date));
}

export async function captureElementAsImage(
  element: HTMLElement | null,
  scale: number = 2,
): Promise<string | null> {
  if (!element) {
    return null;
  }

  try {
    const canvas = await html2canvas(element, { scale });
    return canvas.toDataURL("image/png");
  } catch (error) {
    console.error("Error capturing element as image:", error);
    return null;
  }
}

const CURRENCY_FORMATTER = new Intl.NumberFormat("en-US", {
  currency: "USD",
  style: "currency",
  minimumFractionDigits: 0,
});

const CURRENCY_COMPACT_FORMATTER = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
});

export function formatCurrency(amount: number) {
  return CURRENCY_FORMATTER.format(amount);
}

export function formatCompactCurrency(amount: number) {
  return CURRENCY_COMPACT_FORMATTER.format(amount);
}

const NUMBER_FORMATTER = new Intl.NumberFormat("en-US");

export function formatNumber(number: number) {
  return NUMBER_FORMATTER.format(number);
}

export function shortenNumber(value: number): string {
  if (value >= 1_000_000) {
    return (value / 1_000_000).toFixed(1).replace(/\.0$/, "") + " million";
  } else if (value >= 1_000) {
    return (value / 1_000).toFixed(0) + "K";
  }
  return value.toString();
}

export function storeUserInputData(data: UserInputDataType) {
  localStorage.setItem("sangforPdfData", JSON.stringify(data));
}

export function getUserInputData() {
  const storedValue = localStorage.getItem("sangforPdfData");

  return storedValue ? JSON.parse(storedValue) : null;
}

export function toCamelCase(str: string): string {
  return str
    .replace(/\s(.)/g, (match) => match.toUpperCase())
    .replace(/\s/g, "") // Remove spaces
    .replace(/^(.)/, (match) => match.toLowerCase());
}

export const omitKeys = <T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[],
): Omit<T, K> => {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !keys.includes(key as K)),
  ) as Omit<T, K>;
};
