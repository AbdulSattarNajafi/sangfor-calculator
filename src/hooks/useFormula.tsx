"use client";

import { FormulaType } from "@/utils/types";
import useFetch from "./useFetch";

export default function useFormula() {
  const {
    data: formula,
    error: formulaError,
    isLoading: formulaIsLoading,
  } = useFetch<FormulaType>("/api/formula", { revalidateOnFocus: false });

  return { formula, formulaError, formulaIsLoading };
}
