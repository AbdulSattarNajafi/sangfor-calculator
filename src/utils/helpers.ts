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

export function formatCurrency(amount: number) {
  return CURRENCY_FORMATTER.format(amount);
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
