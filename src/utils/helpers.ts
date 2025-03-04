import html2canvas from "html2canvas";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { YearlyData } from "./types";
import { RefObject } from "react";

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

const NUMBER_FORMATTER = new Intl.NumberFormat("en-US");

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export function formatLongDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
  }).format(new Date(date));
}

export async function captureChartAsImage(
  element: RefObject<HTMLDivElement | null>,
  scale: number = 2,
): Promise<string | null> {
  if (!element || !element.current) {
    return null;
  }

  try {
    const canvas = await html2canvas(element.current, { scale });
    return canvas.toDataURL("image/png");
  } catch (error) {
    console.error("Error capturing element as image:", error);
    return null;
  }
}

export function formatCurrency(amount: number) {
  return CURRENCY_FORMATTER.format(amount);
}

export function formatCompactCurrency(amount: number) {
  return CURRENCY_COMPACT_FORMATTER.format(amount);
}

export function formatNumber(number: number) {
  return NUMBER_FORMATTER.format(number);
}

// export function storeUserInputData(id: string) {
//   localStorage.setItem("report_id", JSON.stringify(id));
// }

// export function getUserInputData() {
//   const storedValue = localStorage.getItem("report_id");

//   return storedValue ? JSON.parse(storedValue) : null;
// }

export function toCamelCase(str: string): string {
  return str
    .replace(/\s(.)/g, (match) => match.toUpperCase())
    .replace(/\s/g, "")
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

export const extractYearlyData = (data: YearlyData[]) => {
  return {
    year1: data[0].year1,
    year2: data[1].year2,
    year3: data[2].year3,
  };
};

export function downloadFile(url: string, fileName: string) {
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
