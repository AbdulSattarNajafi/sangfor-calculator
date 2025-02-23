import useSWR, { SWRConfiguration } from "swr";

// Generic fetcher function with TypeScript
const fetcher = async <T>(url: string): Promise<T> => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
  return res.json();
};

// Custom Hook for API Calls with Generics
export default function useFetch<T>(
  endpoint: string,
  options?: SWRConfiguration,
) {
  return useSWR<T>(endpoint, fetcher<T>, options);
}
