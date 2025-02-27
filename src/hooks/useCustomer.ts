import { CustomerDataType } from "@/utils/types";
import useSWR from "swr";

const API_URL =
  "https://event.sangfor.com/sase-roi-calculator/public/api/customer";

export interface ApiResponse<T> {
  data: T;
  error?: string;
}

// Fetcher function using `fetch`
const fetcher = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("An error occurred while fetching the data.");
  }
  return response.json();
};

// ============ Get all customers
export const useAllCustomers = () => {
  const {
    data: allCustomers,
    error: allCustomersError,
    isLoading: allCustomersIsLoading,
  } = useSWR<CustomerDataType[]>(`${API_URL}/all-info`, fetcher);

  return { allCustomers, allCustomersError, allCustomersIsLoading };
};

// ============ Get a customer by ID
export const useCustomerInfo = (userID: string) => {
  const {
    data: customer,
    error: customerError,
    isLoading: customerIsLoading,
  } = useSWR<CustomerDataType | null>(
    userID ? `${API_URL}/${userID}/info` : null,
    fetcher,
  );

  return { customer, customerError, customerIsLoading };
};
