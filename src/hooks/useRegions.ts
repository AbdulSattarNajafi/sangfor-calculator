import { SelectedCountryType } from "@/utils/types";
import useFetch from "./useFetch";

type RegionsType = {
  regions: SelectedCountryType[];
};

export default function useRegions() {
  const {
    data,
    error: regionsError,
    isLoading: regionsIsLoading,
  } = useFetch<RegionsType>("/api/regions", {
    revalidateOnFocus: false,
  });

  return { regions: data?.regions, regionsError, regionsIsLoading };
}
