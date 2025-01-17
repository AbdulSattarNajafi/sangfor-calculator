import html2canvas from 'html2canvas';

// import { type ClassValue, clsx } from 'clsx';
// import { twMerge } from 'tailwind-merge';

// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs));
// }

export function convertToArray(texts: string) {
  return texts.split('\n').map((text) => text.trim());
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'long',
  }).format(new Date(date));
}

export async function captureElementAsImage(
  element: HTMLElement | null,
  scale: number = 2
): Promise<string | null> {
  if (!element) {
    return null; // Return null if the element is not provided or doesn't exist
  }

  try {
    const canvas = await html2canvas(element, { scale });
    return canvas.toDataURL('image/png');
  } catch (error) {
    console.error('Error capturing element as image:', error);
    return null;
  }
}
